import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Protected({ children, authentication = true }) {
    const authStatus = useSelector((state) => state.auth.status)
    const [loading, setloading] = useState(true)
    const navigate = useNavigate()


    useEffect(() => {
 
        if(authentication && authStatus !== authentication)
        {
            navigate('/login')

        }
        else if(!authentication && authStatus !==authentication)
        {
            navigate('/')
        }
        setloading(false)
    }, [])
    return loading ? loading : {children}
}

export default Protected;