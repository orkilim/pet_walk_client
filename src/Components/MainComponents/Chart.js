import * as React from 'react'
import { Pie } from 'react-chartjs-2';

const Chart = (props) => {
    const {mydata} = props;
    console.log(mydata);

    let charData= {
        datasets: [{
            data:[mydata,20-mydata],
            backgroundColor: ['rgb(110, 168, 255)','rgb(255, 255, 255)']
        }]
    }
    const [data, setData] = React.useState(charData); 
    console.log(charData);


    return (
        <Pie
            data= {data}
            width={100}
            height={50}
        />

    )
}

export default Chart