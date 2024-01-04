import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Container, Logo, Logout} from '../index'
function Header(props) {
    const authStatus = useSelector((state)=>state.auth.status)
    const naviagte = useNavigate()
    const navItems=[
        {
            name :"home",
            slug :'/',
            active :true
        }, 
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
      },
      {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
      },
      {
          name: "All Posts",
          slug: "/all-posts",
          active: authStatus,
      },
      {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
      },
    ]
    return (
       <>
       <header className='py-3 shadow bg-gray-500'>
       <Container >
        <nav className='flex'>
            <div className="mr-4">
                <Link to="/">
                    <Logo width='70px'></Logo>
                </Link>
                <ul className='ml-auto flex'> 
                {
                  navItems.map((item)=> item.active ? ( 
                    <li key={item.name}>
                        <button onClick={naviagte(item.slug)}>{item.name}</button>
                    </li>
                  ):"")
                }

                {
                    authStatus && (<Logout/>)
                }
                </ul>
            </div>

        </nav>


       </Container>
       </header>
       </>
    );
}

export default Header;