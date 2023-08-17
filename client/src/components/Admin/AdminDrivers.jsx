import axios from "axios"
import { useEffect, useState } from "react"
import Sidebar from "./Sidebar/Sidebar"
import Header from "../Header/Header"
import { useNavigate } from "react-router-dom"
import FormModal from "./Modal/FormModal"
import Swal from "sweetalert2"
import SearchBar from "./SearchBar/SearchBar"
import SelectBox from "./SelectBox/SelectBox"



const AdminDrivers = () => {

    const [drivers, setdrivers] = useState([])
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const [obj, setObj] = useState({})
    const [sort, setSort] = useState({ sort: '', order: 'desc' })
    const [filter, setFilter] = useState([])
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    const [total, setTotal] = useState()
    const [limit, setLimit] = useState()



    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        try {
            (
                async function () {
                    const { data } = await axios.get(`/admin/drivers?page=${page}&sort=${sort}&filter=${filter.toString()}&search=${search}`)
                    if (data.status) {
                        console.log(data);
                        setdrivers(data.drivers)
                        setLimit(data.limit)
                        setTotal(data.total)
                        setPage(data.page)
                        console.log(sort);
                    }
                })()
        } catch (error) {
            console.log(error);
        }
    }, [refresh, sort, filter, search, page])
    async function block(values) {
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

    async function unBlock(values) {
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
        <div>
            <Sidebar />
            <Header />
            <section className="py-1 bg-blueGray-50">
                <div className="ml-60 mt-2"><SelectBox sort={sort} setSort={(sort) => setSort(sort)} /></div>
                <SearchBar setSearch={(search) => setSearch(search)} />
                <div className="w-full flex flex-col  xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">Drivers</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <FormModal role={'driver'} />
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
                                    {
                                        drivers.map((item, index) => {
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
                                                            <button onClick={(e) => unBlock(item)} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-2 py-1 mt-2 text-center mr-2 mb-2">
                                                                Unblock</button>
                                                            :
                                                            <button onClick={(e) => block(item)} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-md text-sm px-2 py-1 text-center mr-3 ml-3 mt-2 mb-2">
                                                                Block</button>
                                                    }
                                                </td>
                                            </tr>
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="mt-auto">
                        <div className="flex justify-center">
                            <button
                                className="px-4 py-2 mt-4 mb-8 font-semibold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 focus:outline-none"
                                onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 mt-4 mb-8 font-semibold text-blue-600">
                                Page {page} of {Math.ceil(total / limit)}
                            </span>
                            <button
                                className="px-4 py-2 mt-4 mb-8 font-semibold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 focus:outline-none"
                                onClick={() => setPage(prevPage => Math.min(prevPage + 1, Math.ceil(total / limit)))}
                            >
                                Next
                            </button>
                        </div>
                    </div>

                </div>


            </section>

        </div>

    )
}

export default AdminDrivers