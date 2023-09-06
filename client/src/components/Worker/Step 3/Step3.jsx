import React from 'react';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';

const Step3 = ({ onSubmit, onPreviousStep }) => {
    const garbageDetails = useSelector((state) => state.worker.garbageDetails);
    const series = [
        parseFloat(garbageDetails.eWaste),
        parseFloat(garbageDetails.plasticWaste),
        parseFloat(garbageDetails.foodWaste),
        parseFloat(garbageDetails.Others),
    ];

    const totalKg = series.reduce((sum, val) => sum + val, 0);

    const options = {
        chart: {
            height: 350,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        fontSize: '22px',
                    },
                    value: {
                        fontSize: '16px',
                        formatter: function (val) {
                            return `${val} kg`; // Format value as kg
                        },
                    },
                    total: {
                        show: true,
                        label: 'Total',
                        formatter: function (w) {
                            return `${totalKg.toFixed(2)} kg`;
                        },
                    },
                },
            },
        },
        labels: ['E waste', 'Plastic Waste', 'Food Waste', 'Others'],
    };

    return (
        <div id="chart" className='card shadow-md p-5'>
            <ReactApexChart options={options} series={series} type="radialBar" height={350} />
            <div className='text-center'>
            <button className='btn bg-green-600 text-white btn-sm mr-4' onClick={onPreviousStep}>Previous</button>
            <button className='btn bg-green-600 text-white btn-sm' onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default Step3;



