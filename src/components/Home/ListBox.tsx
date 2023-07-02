import { useState, useEffect } from 'react';
import InfoBox from './InfoBox'
import api from '../../api/setUpApi'
import { SlideDataDto } from '../../module/analytics.dto'
import { InfoData } from './InfoData'
export default function ListBox() {
    const [activeSlideNo, setActiveSlideNo] = useState(0);
    const [currentData, setCurrentData] = useState<SlideDataDto>({ title: InfoData[0].title + '', image: InfoData[0].image, type: InfoData[0].type + '' })
    const [number, setNumber] = useState(0)
    const [type, setType] = useState('user')
    useEffect(() => {
        let resData;
        if (type === "family") {
            resData = api.analytics.family()
        }
        if (type === "location") {
            resData = api.analytics.location()
        }
        if (type === "user") {
            resData = api.analytics.user()
        }
        Promise.all([resData]).then(values => {
            setNumber(Number(values[0]))
        })
    }, [type])

    const onClickNext = () => {
        var curSlideNo = activeSlideNo;
        if (curSlideNo < InfoData.length - 1) {
            curSlideNo++;
            setActiveSlideNo(curSlideNo);
        }
        else {
            setActiveSlideNo(0);
        }
        setCurrentData({ title: InfoData[activeSlideNo].title + '', image: InfoData[activeSlideNo].image, type: InfoData[activeSlideNo].type + '' });
        setType(InfoData[activeSlideNo].type + '')
    };

    const onClickPrev = () => {
        var curSlideNo = activeSlideNo;

        if (curSlideNo > 0) {
            curSlideNo--;
            setActiveSlideNo(curSlideNo);
        }
        else {
            setActiveSlideNo(InfoData.length - 1);
        }
        setCurrentData({ title: InfoData[activeSlideNo].title + '', image: InfoData[activeSlideNo].image, type: InfoData[activeSlideNo].type + '' });
        setType(InfoData[activeSlideNo].type + '')
    };
    return (
        <div>
            <InfoBox data={currentData} number={number} onClickNext={onClickNext} onClickPrev={onClickPrev} />
        </div>
    );
}