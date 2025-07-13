import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink, Outlet } from 'react-router';

const Navbar = () => {

    const [ showMenu, setShowMenu ] = useState(false);
    const navItems = [ { name: "course types", path: '/course-types' }, { name: "courses", path: '/courses' }, { name: "course offerings", path: "/course-offerings" }, { name: 'register', path: '/register' } ];


    return (
        <AnimatePresence>
            <motion.nav initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }} className='p-2 flex flex-col sm:flex-row sm:justify-between sm:items-center'>
                <ul className='capitalize pb-2 sm:pb-0 justify-between flex flex-row items-center '>
                    <Link to={'/course-types'}>
                        <li className='p-0'>
                            <h1 className='rrm text-blue'>courses</h1>
                        </li>
                    </Link>
                    <li className='p-0 sm:hidden'>
                        <div onClick={() => setShowMenu(prev => !prev)} className='rrs text-white hover:cursor-pointer h-[2rem] w-[2rem] flex items-center justify-center  rounded-full hover:bg-blue/50'>x</div>
                    </li>
                </ul>
                {
                    showMenu &&
                    <motion.ul
                        initial={{ opacity: 0, y: `-50px` }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ease: "easeInOut", duration: .3 }}

                        className={`capitalize rounded  sm:hidden flex flex-col gap-[1rem] border-b-1  ${showMenu ? "border-blue pb-2" : ''}`}>
                        {
                            navItems.map((item, i) => <NavLink key={item.name} to={item.path}>
                                {({ isActive }) => (
                                    <motion.li
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ ease: "easeInOut", duration: 1, delay: i * 0.3 }}
                                        className={`p-2 rounded hover:cursor-pointer hover:bg-blue/50 transition-colors duration-300 ease-in-out ${isActive ? 'bg-blue text-white' : 'bg-black text-white'
                                            }`}
                                    >
                                        {item.name}
                                    </motion.li>
                                )}
                            </NavLink>)
                        }
                    </motion.ul>
                }
                <ul className='hidden capitalize  sm:flex items-center gap-1.5'>
                    {
                        navItems.map((item) => <NavLink key={item.name} to={item.path} >
                            {
                                ({ isActive }) => (
                                    <li

                                        className={`p-2 hover:cursor-pointer hover:bg-blue/50 transition-colors duration-300 ease-in-out rounded ${isActive ? "bg-blue" : ""}`}
                                    >
                                        {item.name}
                                    </li>
                                )
                            }

                        </NavLink>)
                    }
                </ul>


            </motion.nav>
        </AnimatePresence >
    );
};

export default Navbar;