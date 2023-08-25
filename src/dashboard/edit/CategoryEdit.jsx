import React, { useEffect, useState } from 'react'
import PortalLayout from '../../portalLayout/PortalLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory, updateCategory } from '../../store/actions/categoryActions';
import { useLocation, useNavigate } from 'react-router-dom';

const CategoryEdit = () => {
  // const category = useSelector((state) => currentId ? state.category.categories.find((c) => c.id === currentId) : null)
  const params = useLocation();
  const id = params.state.ID;
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState({ name: '', image: '', description: '' })
  // const { id } = route.params
  // console.log (id)
  const category = useSelector(state => state.category.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory(id))
  }, [dispatch])

  useEffect(() => {
    if(category){
      setCategoryData({ name: category?.name, image: category?.image, description: category?.description })
    }
  }, [category])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateCategory(id,categoryData))
    navigate('/categories')
  }

  const ClickInput = (e) => {
    setCategoryData(prev => ({...prev,[e.target.name]: e.target.value}))
  }
  console.log(categoryData)



  // useEffect(() => {
  //   dispatch(updateCategory(id))
  // }, [dispatch])



  return (
    <PortalLayout>
    <h1 className='text-center bg-gradient-to-r from-sky-600 to-cyan-400  text-white font-[600] mb-5 py-4 rounded-xl shadow-md shadow-blue-300 text-[1.5rem]'>EDIT CATEGORY</h1>
    <div class="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 flex flex-col  my-2">
      <form action="">

      
  <div class="-mx-3 md:flex mb-6 justify-center">
    <div class="md:w-[60%] px-3">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-Name">
        Name
      </label>
      <input onChange={ClickInput} value={categoryData.name} type="text" name="name" id="floating_email" className="pl-4 block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent rounded-xl p-2 border-2 border-gray-300 appearance-none  text-white  border-gray-600  focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Enter Name" required />
    </div>
  </div>
  <div class="-mx-3 md:flex mb-6 justify-center">
    <div class="md:w-[60%] px-3">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-Name">
        Image
      </label>
      <input onChange={ClickInput} value={categoryData.image} type="text" name="image" id="floating_email" className="pl-4 block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent rounded-xl p-2 border-2 border-gray-300 appearance-none  text-white  border-gray-600  focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Paste Img URL ......" required />
    </div>
  </div>
  <div class="-mx-3 md:flex mb-6 justify-center">
    <div class="md:w-[60%] px-3">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-Name">
        Description
      </label>
      <textarea onChange={ClickInput} value={categoryData.description} name='description' class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 rounded-xl mb-3 border-2 border-gray-300 appearance-none  text-white  border-gray-600  focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" id="grid-Name" type="text" placeholder="Enter Description"/>
    </div>
  </div>
  
<div className='flex justify-center'>
  <input onClick={handleSubmit} type='submit' className='cursor-pointer bg-gradient-to-r from-sky-600 to-cyan-400 text-white font-[600] py-2 px-[3rem] mt-4 rounded-lg' value="Submit" />
</div>
</form>

</div>



</PortalLayout>
  )
}

export default CategoryEdit
