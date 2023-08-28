import React from 'react';
import ReactApexChart from 'react-apexcharts';

const MixedPie = ({ online }) => {
  console.log(online);
  const series = [online[0], online[1]];
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
              return val// Remove decimal points and percentage symbol
            },
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function () {
              return series.reduce((a, b) => a + b, 0).toFixed(0); // Remove decimal points and percentage symbol
            },
          },
        },
      },
    },
    labels: ['Drivers', 'Workers'],
  };

  return (
    <div id="chart" className='card shadow-md font-semibold px-8'>
      <p className='text-center font-bold mt-8'>Online Employees</p>
      <ReactApexChart options={options} series={series} type="radialBar" height={350} />
    </div>
  );
};

export default MixedPie;
