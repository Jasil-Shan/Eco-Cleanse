import React, { useEffect, useState } from 'react';
import { getBookings } from '../../../services/userApi';

const Table = () => {
  const [bookings, setBookings] = useState([])
  useEffect(() => {
    try {
      (
        async function () {
          const { data } = await getBookings()
          if (data.status) {
            setBookings(data.bookings)
          }
        })()
    } catch (error) {
      console.log(error);
    }
  }, []);


  return (

    <>

      <section className="container mx-auto p- mt-16 font-mono">
        <h1 className='font-extrabold text-3xl ml-3 mb-8 '>REQUEST HISTORY</h1>
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-2xl">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-white uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Order Id</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Driver</th>
                  <th className="px-4 py-3">Worker</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Payment</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {
                  bookings.map((item, index) => {
                    return <tr key={index} className="text-gray-700">
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <div>
                            <p className="font-semibold text-black">{item.order_id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 border text-ms font-semibold">{item.createdAt}</td>
                      <td className="px-4 py-3 border text-ms font-semibold">{item?.driver?.name}</td>
                      <td className="px-4 py-3 border text-ms font-semibold">{item?.worker?.name}</td>
                      <td className="px-4 py-3 border text-xs">
                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">{item.status}</span>
                      </td>
                      <td className="px-4 py-3 border text-sm">{item.paymentMethod}</td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </>
  );
};

export default Table
