import axios from "axios"
import { useEffect, useState } from "react"
import Sidebar from "./Sidebar/Sidebar"
import SearchBar from "./SearchBar/SearchBar"
import jsPDF from "jspdf"
import "jspdf-autotable"; // Import the autotable plugin



const AdminGarbageReport = () => {

  const [garbageReport, setGarbageReport] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [sort, setSort] = useState()
  const [filter, setFilter] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [total, setTotal] = useState()
  const [limit, setLimit] = useState(5)
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");




  useEffect(() => {
    try {
      (
        async function () {
          const { data } = await axios.get(`/admin/bookings?page=${page}&sort=${sort}&search=${search}&limit=${limit}&fromDate=${fromDate}&toDate=${toDate}`);
          if (data.success) {
            setGarbageReport(data.bookings)
            console.log(data)
            setLimit(data.limit);
            setTotal(data.total);
            setPage(data.page);
          }
        })()
    } catch (error) {
      console.log(error);
    }
  }, [refresh, sort, filter, search, page, toDate])

  const generatePDF = () => {
    const pdf = new jsPDF();
    if (fromDate && toDate) {
      pdf.text(` Date Range: ${fromDate} to ${toDate}`, 10, 20);
    }

    const startY = fromDate && toDate ? 40 : 30; // Adjust startY based on date range

    pdf.text("Garbage Report", 10, startY);
    const tableColumnHeaders = [
      "ORDER ID",
      "DATE",
      "USER NAME",
      "E Waste",
      "Food Waste",
      "Plastic Waste",
      "Other Waste",
      "AMOUNT",
      "STATUS"
    ];

    const tableRows = garbageReport.map(item => [
      item.order_id,
      new Date(item.createdAt).toLocaleDateString(),
      item.user.name,
      item.garbageCollected?.eWaste,
      item.garbageCollected?.foodWaste,
      item.garbageCollected?.plasticWaste,
      item.garbageCollected?.Others,
      item.amount,
      item.status
    ]);

    pdf.autoTable({
      startY: startY + 10,
      head: [tableColumnHeaders],
      body: tableRows,
    });

    pdf.save("garbage_report.pdf");
  };

  return (
    <div>
      <Sidebar />
      <section className=" mt-12 h-full flex justify-center items-center flex-col ml-40 bg-blueGray-50">
        <div className="dropdown mt-10 w-fit self-start ml-40">
          <label tabIndex={0} className="btn btn-sm bg-white shadow-xl m-1 font-semibold mt-10">Sort</label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li onClick={() => setSort('name')} className="ml-4 w-fit  cursor-pointer py-1">Name</li>
          </ul>
        </div>
        <SearchBar setSearch={(search) => setSearch(search)} />

        <div className="w-full flex flex-col  xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div className="flex mt-2 ">
            <label className="label">
              <span className="label-text font-semibold">From : </span>
            </label>
            <input type="date" className="mr-4 border-success border-2 rounded-md p-1" onChange={(e) => setFromDate(e.target.value)}
              required />
            <label className="label">
              <span className="label-text font-semibold">To : </span>
            </label>
            <input type="date" className="mr-4 border-success border-2 rounded-md p-1" onChange={(e) => setToDate(e.target.value)} required />
            <button onClick={generatePDF} className="btn ml-56 btn-neutral btn-sm mt-4">
              Download PDF
            </button>
          </div>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-fit mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">

                <div className="relative w-full px-4 max-w-full flex-grow flex-1">

                  <h3 className=" text-base text-blueGray-700 uppercase py-2 font-bold">Garbage Report</h3>
                </div>

              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className=" items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr >
                    <th className="px-6  bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      ORDER ID
                    </th>
                    <th className="px-6  bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      DATE
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      USER NAME
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      E Waste
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Food Waste
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Plastic Waste
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Other Waste
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      AMOUNT
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      STATUS
                    </th>
                    {/* <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            ACTION
                                        </th> */}
                  </tr>
                </thead>

                <tbody>
                  {garbageReport &&
                    garbageReport.map((item, index) => {
                      return <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          {item.order_id}
                        </th>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item.user.name}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item.garbageCollected?.eWaste}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item.garbageCollected?.foodWaste}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item.garbageCollected?.plasticWaste}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item.garbageCollected?.Others}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item.totalAmount}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item.status}
                        </td>
                        {/* <td className="ml-4">
                                                    {
                                                        item.blocked ?
                                                            <button onClick={(e) => unBlock(item)} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-2 py-1 mt-2 text-center mb-2">
                                                                Unblock</button>
                                                            :
                                                            <button onClick={(e) => block(item)} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-md text-sm px-2 py-1 text-center mr-3 ml-5 mt-2 mb-2">
                                                                Block</button>
                                                    }
                                                </td> */}
                      </tr>
                    })}
                </tbody>
              </table>
            </div>
          </div>


        </div>
        <div className="mt-28">
          <div className="flex justify-center items-baseline">
            <div className="join">
              {Array.from({ length: Math.ceil(total / limit) }).map((_, index) => (
                <button
                  key={index}
                  className={`join-item btn btn-sm btn-white ${page === index + 1 ? 'btn-active' : ''}`}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

      </section>

    </div>

  )
}

export default AdminGarbageReport