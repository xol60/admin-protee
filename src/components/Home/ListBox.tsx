import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import InfoBox from './InfoBox'
import api from '../../api/setUpApi'
import { AnalyticsDto, SlideDataDto } from '../../module/analytics.dto'
import styled from 'styled-components'
import { InfoData } from './InfoData'
export default function ListBox() {
    const [loading, setLoading] = useState(true)
    const [activeSlideNo, setActiveSlideNo] = useState(0);
    const [currentData, setCurrentData] = useState<SlideDataDto>({ title: InfoData[0].title + '', image: InfoData[0].image, type: InfoData[0].type + '' })
    const [number, setNumber] = useState(0)
    useEffect(() => {
        let resData;
        const type = currentData.type
        console.log(type)
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
    }, [currentData])
    // const [analytic, setAnalytic] = React.useState<AnalyticsDto>({
    //     user: 0,
    //     family: 0,
    //     location: 0
    // });
    // React.useEffect(() => {
    //     const resUser = api.analytics.user()
    //     const resFamily = api.analytics.family()
    //     const resLocation = api.analytics.location()
    //     Promise.all([resUser, resFamily, resLocation]).then(values => {
    //         setAnalytic({
    //             user: values[0],
    //             family: values[1],
    //             location: values[2]
    //         })
    //         setLoading(false)
    //     })
    // }, [])
    // if (loading) return <></>

    const onClickNext = () => {
        var curSlideNo = activeSlideNo;
        if (curSlideNo < InfoData.length - 1) {
            curSlideNo++;
            setActiveSlideNo(curSlideNo);
        }
        else {
            setActiveSlideNo(0);
        }
        console.log(activeSlideNo)
        setCurrentData({ title: InfoData[activeSlideNo].title + '', image: InfoData[activeSlideNo].image, type: InfoData[activeSlideNo].type + '' });
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
    };
    return (
        <div>
            <InfoBox data={currentData} number={number} onClickNext={onClickNext} onClickPrev={onClickPrev} />
        </div>
    );
}