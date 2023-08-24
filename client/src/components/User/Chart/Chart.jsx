import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Navbar from '../Navbar/Navbar';
import { useLocation } from 'react-router-dom';
import { userBooking, userOnlinePay, verifyPayment } from '../../../services/userApi';
import { toast } from 'react-toastify';
import Success from '../Success Card/Success';

const Chart = () => {
  const [selectedOption, setSelectedOption] = useState('Cash')
  const [orderId, setOrder] = useState()
  const [succesful, setSuccess] = useState(false)

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const getLocation = useLocation()
  const { values } = getLocation?.state

  const valuesArray = [
    values.eWaste,
    values.plasticWaste,
    values.foodWaste,
    values.others,
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      if (selectedOption == 'Online') {

        const { data: { order } } = await userOnlinePay()
        var options = {
          key: "rzp_test_X2EWEu9JQG1E2R",
          amount: "250000",
          currency: "INR",
          name: "Eco Cleanse",
          description: "Service Charge",
          image: "https://example.com/your_logo",
          order_id: order.id,
          handler: async (response) => {
            try {
              await payment(response)
              console.log(response);
            } catch (error) {
              console.error(error);
            }
          },
          prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9000090000"
          },
          notes: {
            address: "Eco Cleanse Corporate Office"
          },
          theme: {
            color: "#3399cc"
          }
        };
        const razor = new window.Razorpay(options)
        razor.open();

      } else {

        const { data } = await userBooking({ payment: selectedOption }, values);

        if (data.success) {
          setOrder(data.order_id)
          setSuccess(true)
          toast.success(data.message, {
            position: "top-center",
          });
        } else {
          toast.error(data.message, {
            position: "top-center",
          });
        }
      }

      const payment = async (response) => {
        try {
          const { data } = await verifyPayment(response)

          if (data.success) {
            const { data } = await userBooking({ payment: selectedOption }, values);

            setOrder(data.order_id)
            setSuccess(true)
            toast.success(data.message, {
              position: "top-center",
            });
          } else {
            toast.error(data.message, {
              position: "top-center",
            });
          }

        } catch (error) {
          console.error(error);
        }
      };

    } catch (error) {
      console.log(error);
    }
  };

  const series = [...valuesArray];

  const options = {
    chart: {
      height: 390,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
          image: undefined,
        },
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            show: true,
          },
        },
      },
    },
    colors: ['#e63946', '#1d3557', '#38b000', '#99582a'],
    labels: ['Plastic Waste', 'E waste', 'Food Waste', 'Others'],
    legend: {
      show: true,
      floating: true,
      fontSize: '16px',
      position: 'left',
      offsetX: 160,
      offsetY: 15,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0,
      },
      formatter: function (seriesName, opts) {
        return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex] + ' %';
      },
      itemMargin: {
        vertical: 3,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  return (
    <>
      <div className="h-screen bg-[url(https://res.cloudinary.com/dlhldjuis/image/upload/v1690101413/Eco%20cleanse/Untitled_6_l4znzl.png)] bg-cover backdrop-blur-3xl">

        <Navbar />
        {
          succesful ? <Success orderId={orderId} />
            : (
              <div id="chart" className='flex card pb-8 glass flex-col overflow-hidden '>
                <ReactApexChart options={options} series={series} type="radialBar" height={390} />
                <div className="self-center flex flex-row gap-8 mb-8">
                  <div
                    className={`card border-2 cursor-pointer drop-shadow-lg p-6 bg-white ${selectedOption === 'Cash' ? ' border-blue-700' : ''
                      }`}
                    onClick={() => handleOptionSelect('Cash')}
                  >
                    Cash
                  </div>
                  <div
                    className={`card border-2 cursor-pointer drop-shadow-lg p-6 bg-white ${selectedOption === 'Online' ? 'border-blue-700' : ''
                      }`}
                    onClick={() => handleOptionSelect('Online')}
                  >
                    Online
                  </div>
                </div>
                <button onClick={handleSubmit} className='btn btn-sm drop-shadow-lg w-fit self-center btn-success text-white'>Confirm</button>
              </div>
            )
        }
        </div>
      </>
      );
}

      export default Chart
