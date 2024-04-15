import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import {useAuthContext} from '../hooks/useAuthContext'

const Sidebar = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()
  
    const handleClick = () => {
      logout()
    }

    return (
        <div className="flex flex-col h-screen w-2/12 overflow-auto p-8 bg-app-lightGray">
            <p className="text-left font-bold text-xl w-10 leading-snug mb-5">PRODUCTIVITY PRO</p>
            <Link to="/">
                <p className="text-right text-sm font-bold leading-snug py-1.5 px-3 m-1">TODO LIST</p>
            </Link>
            <Link to="/map">
                <p className="text-right text-sm font-bold leading-snug py-1.5 px-3 m-1">HEATMAP</p>
            </Link>

            <div className="mt-auto">
                <Link to="/about">  
                    <p className="text-right text-xs leading-snug py-1.5 m-1 opacity-50">ABOUT</p>
                </Link>
                {user && (
                    <div className='flex flex-col'>
                        <p className="text-right text-xs leading-snug py-1.5 px-3 mx-1 opacity-50">{user.email}</p>
                        <p className="text-right text-xs leading-snug py-1.5 px-3 mx-1 opacity-50 cursor-pointer" onClick={handleClick}>LOGOUT?</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;