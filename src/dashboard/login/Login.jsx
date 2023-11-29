import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LoginUser } from "../../store"
import { AiFillEye, AiFillEyeInvisible, AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { ToastContainer, toast } from "react-toastify"
import { SESSION_ADMIN_ID, SESSION_ADMIN_LOGIN, SESSION_ADMIN_TYPE, SESSION_ADMIN_USER, SESSION_PROVIDER_LOGIN } from "../../Utils/Constant"
import picture from '../../assets/panelLogin.png'
import { IoMail } from "react-icons/io5"
import { FaKey } from "react-icons/fa"

const Login = () => {


  const [loading, setLoading] = useState(false)


  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const handleChange = (e) => {
    setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    const isLogin = sessionStorage.getItem(SESSION_ADMIN_LOGIN)
    const adminType = sessionStorage.getItem(SESSION_ADMIN_TYPE)
    if (isLogin === "true" && adminType === "USER") {
      navigate('/userPanel')
    } else {
    }
  }, [])

  const login = () => {
    setLoading(true)
    LoginUser(loginData.email, loginData.password).then(res => {
      const { data: { data } } = res
      const { data: { status } } = res
      if (loginData?.email?.length || loginData?.password?.length !== 0) {
        if (loginData?.email?.length != 0) {
          if (loginData?.password?.length != 0) {
            if (status === 'OK') {
              setLoading(false)
              sessionStorage.setItem(SESSION_ADMIN_LOGIN, "true")
              sessionStorage.setItem(SESSION_ADMIN_ID, data.id)
              sessionStorage.setItem(SESSION_ADMIN_TYPE, "USER")
              sessionStorage.setItem(SESSION_ADMIN_USER, JSON.stringify(data))
              sessionStorage.setItem(SESSION_PROVIDER_LOGIN, "false")
              navigate('/userPanel',
                toast.success('Login Successfully', {
                  position: "top-right",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                }))
            } else {
              toast.error('No Email or Password Exists', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }

          } else {
            toast.error('Enter Your Valid Password', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }

        } else {
          toast.error('Please Enter Your Valid Email', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
      else {
        toast.error('Enter Your Valid Email Address or Password', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    })
  }

  const [show, setShow] = useState(false)

  const handleSubmit = () => {
    setShow(!show)
    myFunction()
  }
  // navigate('/')


  function myFunction() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  return (
    <>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className='w-[100%] h-[24rem] bg-blue-600'>
        </div>
        <div className=' bg-gray-400 '>
          <div className="flex bg-white py-10 rounded-xl w-[60%] relative top-[-250px] m-auto ">
            <div className="w-[50%] mt-[10%] max-md:hidden">
              <img src={picture} alt="" className="w-160 " />
            </div>
            <center className="w-[40%] max-md:w-[90%] max-md:m-auto">
              <div className=' p-[10px]'><br />
                <h1 className='text-[22px]'>Welcome Back :)</h1><br />
                <h1 className='text-[13px] text-gray-600 font-[600]'>To keep connected with us please login with your personal information by email and password</h1><br />
                <input type="email" name="email" onChange={handleChange} placeholder='Enter Your Email' className='shadow-lg rounded-[12px] text-[.9rem] text-gray-700 font-[500] w-[100%] max-md:w-[100%] pl-[50px] border-2 pt-[7px] pb-[7px]' /><br />
                <div className="relative top-[-1.9rem] left-[-44%] w-[10%]"> <IoMail />
                </div>
                <input type="password" id="myInput" name="password" onChange={handleChange} placeholder='Password' className='shadow-lg rounded-[12px] text-[.9rem] text-gray-700 font-[500] w-[100%] pr-[50px] max-md:w-[100%] pl-[50px] border-2 pt-[7px] pb-[7px]' /><br />
                <div className="relative top-[-1.9rem] left-[-44%] w-[10%]"> <FaKey />
                </div>
                {show ?
                  <div className="relative top-[-2.9rem] left-[44%] w-[10%] text-[1.4rem]" onClick={() => handleSubmit()}> <AiFillEye />
                  </div>
                  :
                  <div className="relative top-[-2.9rem] left-[44%] w-[10%] text-[1.4rem]" onClick={() => handleSubmit()}> <AiFillEyeInvisible />
                  </div>
                }
                {loading ?
                  <center> <div className="flex justify-center items-center bg-blue-600 px-10 py-[8px] w-[100%] rounded-full mt-6">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                  </div>
                  </center>
                  :
                  <input type='submit' value='Log In' onClick={() => login()} className='bg-blue-600 text-white cursor-pointer font-[600] px-10 py-[5px] w-[100%] rounded-full mt-6' />
                }
              </div>

            </center>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
