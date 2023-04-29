import React from 'react';
import { NavLink } from 'react-router-dom';

function UserMenu({isAdmin, isAuthorized}) {
    console.log(isAdmin, isAuthorized)
    return (
        <div>
            {
            isAuthorized ? (
              isAdmin ? (
                <ul className='navUl'>
                  <li className='navLi'><NavLink to="/blogs" className='nav_navLink'>Blogs</NavLink></li>
                  <li className='navLi'><NavLink to="/users" className='nav_navLink'>Users</NavLink></li>
                  <li className='navLi'><NavLink to="/create" className='nav_navLink'>Create Blog</NavLink></li>
                </ul>
              ) : (
                <ul className='navUl'>
                  <li className='navLi'><NavLink to="/blogs" className='nav_navLink'>Blogs</NavLink></li>
                  <li className='navLi'><NavLink to="/create" className='nav_navLink'>Create Blog</NavLink></li>
                </ul>
              )
            ) : (
                <ul className='navUl'>
                    <li className='navLi'><NavLink to="/login" className='nav_navLink'>Login</NavLink></li>
                    <li className='navLi'><NavLink to="/signup" className='nav_navLink'>Sign up</NavLink></li>
                </ul>
            )
          }
        </div>
    )
}

export default UserMenu;