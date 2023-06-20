import React from 'react';
import { CChart } from '@coreui/react-chartjs';


export default function StatisticPage() {
  return (
  
  
  
        <CChart
        style={{marginLeft:160}}
        type="line"
     width={200}
     height={70}
    data={{
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
    datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(220, 220, 220, 0.2)",
          borderColor: "rgba(220, 220, 220, 1)",
          pointBackgroundColor: "rgba(220, 220, 220, 1)",
          pointBorderColor: "#fff",
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40,50,2,3]
        },
        {
          label: "My Second dataset",
          backgroundColor: "rgba(151, 187, 205, 0.2)",
          borderColor: "rgba(151, 187, 205, 1)",
          pointBackgroundColor: "rgba(151, 187, 205, 1)",
          pointBorderColor: "#fff",
          data: [50, 12, 28, 29, 7, 25, 12, 70, 60,10,1,12]
        },
      ],
  }}
  
/>
    

    
  )
}


