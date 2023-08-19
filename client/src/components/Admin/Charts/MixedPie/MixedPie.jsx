import React from 'react';
import ReactApexChart from 'react-apexcharts';

const MixedPie = ({online})=> {
    console.log(online);
  const series = [online[0],online[1]];
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
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function (w) {
              return 2
            },
          },
        },
      },
    },
    labels: ['Drivers', 'Workers'],
  };

  return (
    <div id="chart" className=' card shadow-md p-5 '>
      <ReactApexChart options={options} series={series} type="radialBar" height={350} />
    </div>
  );
}

export default MixedPie
