import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import authservice from '../appwrite/Auth';
import { login as authlogin } from '../Store/AuthSlice';
import Logo from './Logo';
import Input from './Input';

function Login(props) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, seterror] = useState("")
    const { register, handleSubmit } = useForm()

    const login = async (data) => {
        seterror("")
        try {
            const respone = await authservice.loginAccount(data)

            if (respone) {
                const userdata = await authservice.getCurrentUser()
                if (userdata) {
                    dispatch(authlogin(data))
                }
                navigate("/")
            }

        } catch (error) {
            seterror(error.message)
        }
    }

    return (
        <div className='flex item-center justify-center w-full'>
            <div className='p-10 bg-gray-100 border border-black rounded-xl mx-auto w-full mx-w-lg '>
                <div className="flex justify-center mb-2">
                    <span className='max-w-[100px] inline-block w-full'>
                        <Logo width='100%' />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold  leading-tight "> sign into your account </h2>

                <p className="mt-2 text-base text-black/20"> do&apos;t have any account  &nbsp;

                    <Link to={'/signup'} className='font-medium text-primary transition-all duration-200 hover:underline'> Sign Up </Link>
                </p>

                {error && <p className='text-center text-red-600 mt-8 '>{error}</p>}
 
                     <form onSubmit={handleSubmit(login)} className='mt-3'>
                        <div className="space-y-8">
                           <Input 
                           label="email"
                           placeholder="enter the email"
                           type="email"
                           {...register("email" ,{
                            required :true,
                            validate : {
                                matchMedia :(value)=> /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "enter the email address valid "
                            }
                           })}
                           />
                           <Input label="password"
                            placeholder="enter the password"
                            type="password"
                            {...require("password" ,{
                                require:true
                            })}
                           
                           />

                           
                           <button className='w-full ' type='submit'>Login</button>
                          
                        </div>


                     </form>
 


            </div>

        </div>
    );
}

export default Login;   