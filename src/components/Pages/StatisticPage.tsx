import React from 'react';
import { CChart } from '@coreui/react-chartjs';
import api from './../../api/setUpApi'
import { StatisticDto } from './../../module/analytics.dto'
import dayjs from 'dayjs';
const getListQuantityTime = (list: any[]) => {
  const fromDate = new Date(list[0].time)
  const toDate = new Date(list.slice(-1)[0].time)
  let timeList = []
  for (let i = fromDate; i <= toDate; i.setMonth(i.getMonth() + 1)) {
    timeList.push(dayjs(i).format('YYYY-MM'))
  }
  let curListIndex = 0;
  let quantityList = []
  for (let i = 0; i < timeList.length; i++) {
    if (list[curListIndex].time === timeList[i]) {
      quantityList.push(Number(list[curListIndex].quantity))
      curListIndex++;
    }
    else quantityList.push(0)
  }
  return { quantityList, timeList }
}
const list = [
  {
    time: '2021-06',
    quantity: "6"
  },
  {
    time: '2022-06',
    quantity: "4"
  },
  {
    time: '2023-06',
    quantity: "5"
  }

]
export default function StatisticPage() {
  const [timeList, setTimeList] = React.useState<string[]>([])
  const [quantityList, setQuantityList] = React.useState<number[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const loadStatistic = async () => {
    try {
      const res = await api.analytics.statistic();
      Promise.all([res]).then(values => {
        console.log(values[0])
        const result = getListQuantityTime(values[0])
        setTimeList(result.timeList)
        setQuantityList(result.quantityList)
        setIsLoading(false)
      });
    }
    catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    loadStatistic()
  }, [])
  if (isLoading) return <></>
  return (

    <div style={{ marginLeft: 400, marginTop: 100, marginRight: 50 }}>

      <CChart
        type="line"
        width={200}
        height={70}
        data={{
          labels: timeList,
          datasets: [
            {
              label: "User registered",
              backgroundColor: "rgba(102, 237, 140, 0.8)",
              borderColor: "rgba(151, 187, 205, 1)",
              pointBackgroundColor: "rgba(151, 187, 205, 1)",
              pointBorderColor: "#fff",
              data: quantityList
            },
          ],
        }}

      />

    </div>

  )
}


