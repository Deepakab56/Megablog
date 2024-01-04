import React from 'react';
import { useDispatch } from 'react-redux';
import authservice from '../../appwrite/Auth';
import { logout } from '../../Store/AuthSlice';


function Logout(props) {
    const dispatch = useDispatch()
    const logouthandler =()=>{
       authservice.logout().then(()=>{
        dispatch(logout())
       })
    }
    return (
        <div>
            <button className='inline-bock px-6 py-2 duration-200 hover:bg-grey-600 rounded-full'> text</button>
        </div>
    );
}

export default Logout;