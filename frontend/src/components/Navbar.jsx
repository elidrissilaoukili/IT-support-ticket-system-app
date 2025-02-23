import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const token = localStorage.getItem('token');
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className=' bg-gray-800 text-white py-4 px-6'>
            <nav className='max-w-[1300px] mx-auto flex justify-between items-center'>
                <div>
                    <Link to="/" className="text-xl font-semibold">Logo</Link>
                </div>
                <div className="hidden md:flex space-x-4">
                    <Link to="/" className="hover:text-indigo-400">Home</Link>
                    {token ?
                        <Link to="/profile" className="hover:text-indigo-400">Profile</Link> :
                        <>
                            <Link to="/login" className="hover:text-indigo-400">Log in</Link>
                            <Link to="/register" className="hover:text-indigo-400">Register</Link>
                        </>
                    }
                </div>

                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-xl" aria-label="Menu">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>

                <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-14 left-0 w-full bg-gray-800 text-white p-4`}>
                    <Link to="/" className="block py-2 hover:text-indigo-400">Home</Link>
                    {token ?
                        <Link to="/profile" className="block py-2 hover:text-indigo-400">Profile</Link>
                        : <>
                            <Link to="/login" className="block py-2 hover:text-indigo-400">Log in</Link>
                            <Link to="/register" className="block py-2 hover:text-indigo-400">Register</Link>
                        </>
                    }
                </div>
            </nav>
        </header>
    );
}
