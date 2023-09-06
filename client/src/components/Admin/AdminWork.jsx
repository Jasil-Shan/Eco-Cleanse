import { useEffect, useState } from "react"
import { getBookings } from "../../services/adminApi"
import Sidebar from "./Sidebar/Sidebar"
import AssignModal from "./Modal/AssignModal"





const AdminWork = () => {
    const [works, setWorks] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState()
    const [limit, setLimit] = useState(5)

    useEffect(() => {
        try {
            (
                async function () {
                    const { data } = await getBookings(page, limit)
                    if (data.success) {
                        setWorks(data.bookings)
                        setLimit(data.limit);
                        setTotal(data.total);
                        setPage(data.page);
                    }
                })()
        } catch (error) {
            console.log(error);
        }
    }, [refresh, page])
    return (
        <>
            <Sidebar />
            <section className="  h-screen flex justify-center items-center flex-col ml-32 bg-blueGray-50">
                <div className="w-full  xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-fit mb-6 shadow-lg rounded">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">Requests</h3>
                                </div>
                            </div>
                        </div>
                        <div className="block w-fit">
                            <table className=" items-center bg-transparent w-full  border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            ID
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            USER NAME
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            EMAIL
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            ADDRESS
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            PAYMENT
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Assigned Worker
                                        </th>
                                        <th className=" px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Assigned Driver
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            STATUS
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {works &&
                                        works.map((item, index) => {
                                            return <tr key={index}>
                                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                                    {index + 1}
                                                </th>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {item.user.name}
                                                </td>
                                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {item.user.email}
                                                </td>
                                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {item.user.address}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {item.paymentMethod}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {item.worker?.name}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {item.driver?.name}
                                                </td>
                                                <td>
                                                    {
                                                        item &&
                                                            item.assigned ?
                                                            <button className="disabled text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-2 py-1 mt-2 text-center mr-2 mb-2">
                                                                {item.status}</button>
                                                            :
                                                            <AssignModal booking={item} />

                                                    }
                                                </td>
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
        </>
    )
}


export default AdminWork