import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Pie = ({ data }) => {

    let series = [data?.eWaste, data?.foodWaste, data?.Others, data?.plasticWaste]

    const [options, setOptions] = useState({
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: ['E-Waste', 'Food Waste', 'Others', 'Plastic Waste'],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    });

    return (
        <div className='card shadow-md py-12'>
            <h1 className='text-center font-bold mb-8'>Garbage Details</h1>
            <div id="chart" >
                <ReactApexChart options={options} series={series} type="pie" width={380} />
            </div>
        </div>
    );
};

export default Pie
