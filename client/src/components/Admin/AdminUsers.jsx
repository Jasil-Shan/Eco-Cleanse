import { useEffect, useState } from "react"
import Sidebar from "./Sidebar/Sidebar"
import axios from "axios"
import Swal from 'sweetalert2'
import { getUsers } from "../../services/adminApi"



const AdminUsers = () => {
    const [users, setUsers] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10)

    useEffect(() => {
        try {
            (
                async function () {
                    const { data } = await getUsers(currentPage, perPage);
                    if (data.success) {
                        setUsers(data.users)
                    }
                })()
        } catch (error) {
            console.log(error);
        }
    }, [refresh, currentPage])




    async function blockUser(values) {
        Swal.fire({
            title: 'Are you sure? Block',
            text: "Block this user!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#7e3af2',
            cancelButtonColor: '##a8a8a8',
            confirmButtonText: 'Yes, Block!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axios.patch("/admin/block", { ...values });
                setRefresh(!refresh)
            }
        })
    }

    async function unBlockUser(values) {
        Swal.fire({
            title: 'Are you sure? Unblock',
            text: "Unblock this user!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#7e3af2',
            cancelButtonColor: '##a8a8a8',
            confirmButtonText: 'Yes, Unblock!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axios.patch("/admin/unblock", { ...values });
                setRefresh(!refresh)
            }
        })
    }

    return (
        <>
            <Sidebar />

            <section className="py-1 bg-blueGray-50">

                <div className="w-full  xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">Users</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    {/* <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                        See all
                                    </button> */}
                                </div>
                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className=" items-center bg-transparent w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            ID
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            NAME
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            EMAIL
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            MOBILE
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            STATUS
                                        </th> <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            ACTION
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {users.map((item, index) => {
                                        return <tr key={index}>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                                {index + 1}
                                            </th>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {item.name}
                                            </td>
                                            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {item.email}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <i className="fas fa-arrow-up text-emerald-500"></i>
                                                {item.mobile}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <i className="fas fa-arrow-up text-emerald-500 mr-2"></i>
                                                {item.blocked == true ? 'Blocked' : 'Active'}
                                            </td>
                                            <td>
                                                {
                                                    item.blocked ?
                                                        <button onClick={() => unBlockUser(item)} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-2 py-1 mt-2 text-center mr-2 mb-2">
                                                            Unblock</button>
                                                        :
                                                        <button onClick={() => blockUser(item)} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-md text-sm px-2 py-1 text-center mr-3 ml-3 mt-2 mb-2">
                                                            Block</button>
                                                }
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-2 mr-2 bg-blue-500 text-white rounded"
                                >
                                    Previous Page
                                </button>
                                <button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    className="px-3 py-2 ml-2 bg-blue-500 text-white rounded"
                                >
                                    Next Page
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default AdminUsers