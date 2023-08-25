import React, { useEffect, useState } from 'react'
import PortalLayout from '../portalLayout/PortalLayout'
import { BarChart, Bar, Tooltip, XAxis, YAxis, PieChart, Pie, LineChart, CartesianGrid, Legend, Line, ResponsiveContainer } from 'recharts';
import SeekersView from './view/SeekersView';
import { useDispatch, useSelector } from 'react-redux';
import { AllSeekers } from '../store/actions/seekerActions';
import { Link } from 'react-router-dom';







const Seekers = () => {
// search===============
const [search ,setSearch  ] = useState('')
console.log(search)
// =============




    const [currentPage, setCurrentPage] = useState(1)
    const numbersPerPage = 5;
    const [records, setRecords] = useState()
    const [nPage, setPage] = useState()
    const [Numbers, setNumbers] = useState()
    const [lastIndex, setLastIndex] = useState()
    const [firstIndex, setFirstIndex] = useState()


    
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [view, setView] = useState(false);
  const [data, setData] = useState()

  const dispatch = useDispatch()

  const handleClick = (value) => {
    setOpenView(!open)
    setData(value)
  }


  const seekers = useSelector(state => state.seeker.seekers)
  const loading = useSelector(state => state.seeker.isLoading)

  useEffect(() => {
    setLastIndex(currentPage * numbersPerPage);
  }, [currentPage])

  useEffect(() => {
    setFirstIndex(lastIndex - numbersPerPage);
  }, [lastIndex])

  useEffect(() => {
    if (seekers) {
      setRecords(seekers.slice(firstIndex, lastIndex));
      setPage(Math.ceil(seekers.length / numbersPerPage));
    }
  }, [seekers, firstIndex])

  useEffect(() => {
    if (nPage) {
      setNumbers([...Array(nPage + 1).keys()].slice(1))
    }
  }, [nPage])

  useEffect(() => {
    if (seekers !== null || seekers !== undefined || seekers.length !== 0) {
      dispatch(AllSeekers())
    }
  }, [dispatch])
// nodata===========
const [nodata ,setNodata] = useState(false)
useEffect(()=>{
if (seekers?.lenght===0) {
  setNodata(true)
} else {
  setNodata(false)
  
}
},[seekers])
  return (
    <PortalLayout>
      {loading ?
        <center> <div class="flex justify-center items-center h-screen">
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
        </center>
        : <>
        {nodata? <center> <div className=" pt-[10%]" > <img src="/assets/nodata3.png" alt="no image" className="opacity-75 w-[60%] h-[50%] mt-[-10%]" />
            <h1 className=" text-[2rem] text-gray-500 mt-[-4rem] pt-10" >No Seeker Found</h1>
        

          </div> </center> 
          :
           <>
      <h1 className='text-[3.125rem] font-[800] text-[#000] text-center max-md:text-[2rem] uppercase'>seeker</h1>

      <div className="w-[100%] max-md:h-full  max-md:px-2 flex flex-col justify-center bg-gray-100">

        <div className='flex justify-center mt-[3rem] w-[90%] m-auto'>

          <input type="search"   onChange={(e) => setSearch(e.target.value)}  name="" id="" placeholder='Search...' className='border-2 border-gray-600 pl-[4rem] rounded-[1.0625rem] py-2  w-[27.8125rem] mr-auto max-md:py-[1px] max-md:w-[15rem] max-md:text-[0.7rem] focus:outline-none focus:ring-0 focus:border-gray-900 peer' />
          
        </div>

        <SeekersView open={openView} setOpen={setOpenView} title={" VIEW"} data={data} />
        <div className="rounded-xl p-5 bg-white w-[90%] m-auto max-md:w-[100%]  mt-6 ">
          <thead className='mt-10'>

            <tr className=" uppercase  text-sm leading-normal w-[100%]">
              <th className="py-[2%] border-r-[1px] border-b-[2px] border-b-black  w-[3%] max-md:text-[.6rem] max-md:font-[400] text-center max-md:w-[2%]  text-[13px]">ID </th>
              <th className="py-[2%] border-r-[1px] border-b-[2px] border-b-black  w-[10%] max-md:text-[.6rem] max-md:font-[400] text-center max-md:w-[2%] text-[13px]">User</th>
              <th className="py-[2%] border-r-[1px] border-b-[2px] border-b-black w-[1%] max-md:text-[.6rem] max-md:font-[400] text-center max-md:w-[3%] text-[13px]">Country</th>
              <th className="py-[2%] border-r-[1px] border-b-[2px] border-b-black w-[2%] max-md:text-[.6rem] max-md:font-[400] text-center text-[13px]">Status</th>
              <th className="py-[2%] border-r-[1px] border-b-[2px] border-b-black  w-[2%] max-md:text-[.6rem] max-md:font-[400] text-center text-[13px]">Actions</th>
              <th className="py-[2%]   border-b-[2px] border-b-black  w-[1%] max-md:text-[.6rem] max-md:font-[400] text-center"></th>

            </tr>

          </thead>

          {records?.
          filter((value)=>{
            return search.toLowerCase() === ''
            ? value :value.name.toLowerCase().includes(search);
          })
          .map((value, index) => (
              <tbody className="text-[#000000] text-sm font-light w-[100%] bg-white ">
              <tr className='' >
                <td className="py-[2%] w-[3%]   border-r-[1px] border-t-[1px]   text-center">
                  <span className="font-bold max-md:text-[.7rem] text-[13px] text-blue-500">{value.id}</span>
                </td>
                <td className="py-[2%] w-[10%]   border-r-[1px] border-t-[1px]   text-center">
                  <span className=" max-md:text-[.7rem] text-[13px] font-[350]">{value.username}</span>
                </td>
                <td className="py-[1%] w-[2%]  max-md:text-[.7rem]  border-r-[1px] border-t-[1px]   text-center">
                  <span className=' text-[13px] font-[350]'>{value.country}</span>
                </td>

                <td className="py-[2%] max-md:text-[.7rem] w-[2%] border-r-[1px] border-t-[1px]   text-center">
                  <span className="bg-green-600 text-white font-[500] py-[3px] px-[10px] max-md:w-[8%] rounded-xl text-[0.6rem] max-md:py-1 max-md:px-2 max-md:text-[0.6rem] cursor-pointer hover:bg-green-700 ">{value.status}</span>
                </td>


                <td className="py-[2%] w-[1%] max-md:text-[.7rem]  border-t-[1px]   ">
                  <div className="w-4 m-auto transform hover:text-blue-500  hover:scale-110 " onClick={() => handleClick(value)}>   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  </div>
                </td>
              </tr>

            </tbody>
          ))}
        </div>

        <nav className='m-auto mt-5' >
          <ul class="flex items-center -space-x-px h-10 text-base">
            <li>
              <a href="#" onClick={prevPage} class="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" >
                <span class="sr-only">Previous</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                </svg>
              </a>
            </li>
            {Numbers?.map((n, i) => (<li> <a href="#" onClick={() => changeCurrentPage(n)} class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{n}</a> </li>))}

            <li>
              <Link to="#" onClick={nextPage} class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"> <span class="sr-only">Next</span><svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" /> </svg></Link>
            </li>
          </ul>
        </nav>

      </div>
      </>}
      </>}
    </PortalLayout>
  )
  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCurrentPage(id) {
    setCurrentPage(id)
  }
  function nextPage() {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1)
    }
  }

}

export default Seekers
