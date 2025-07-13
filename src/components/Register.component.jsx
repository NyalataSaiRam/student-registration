import React, { useState } from 'react';



import { motion } from 'framer-motion';


import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { add, editMode, update_users } from '../store/users.slice';


const Register = () => {

    const users = useSelector(state => state.users);
    const course_offers = useSelector(state => state.courseOfferings);
    const course_types = useSelector(state => state.courseTypes);
    const courses = useSelector(state => state.courses);
    const dispatch = useDispatch();



    const [ optedCourse, setOptedCourse ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ filter, setFilter ] = useState("");
    const [ showModal, setShowModal ] = useState(false);



    const changeEditMode = (id, name, optc) => {
        users.forEach(user => {
            if (user.editMode && user.id !== id) {
                dispatch(editMode({ id: user.id, toggleState: false }));
            }
        });

        dispatch(editMode({ id, toggleState: true }));
        setUsername(name);
        setOptedCourse(optc);
    };

    const update = (id) => {

        if (username == "") {
            toast.error("Fields cannot be empty");
            return;
        }
        if (optedCourse == "") {
            toast.error("Fields cannot be empty");
            return;
        }

        dispatch(update_users({ id: id, name: username, course_opted: parseInt(optedCourse, 10) }));


        setUsername("");
        setOptedCourse("");
        toast.success('Successfully updated!');
    };

    const handleCancle = () => {
        setShowModal(false);
        setUsername("");
        setOptedCourse("");
    };

    const handleAdd = () => {

        if (!username) {

            toast.error("All fields are mandatory");
            return;
        }
        if (!optedCourse) {

            toast.error("All fields are mandatory");
            return;
        }


        dispatch(add({
            id: users.length + 1,
            name: username,
            editMode: false,
            course_opted: parseInt(optedCourse, 10)
        }));



        setUsername("");
        setOptedCourse("");
        setShowModal(false);
        toast.success("Added Successfully");
    };

    const get_opted_course_name = (cOff_id) => {


        const course_offering = course_offers.find(ob => ob.id == cOff_id);
        if (course_offering != undefined) {
            const course = courses.find(ob => ob.id == course_offering.course);
            if (course != undefined) {
                return course.name;
            }
        }

        return "-";

    };

    const get_opted_course_type = (cOff_id) => {

        const course_offering = course_offers.find(ob => ob.id == cOff_id);
        if (course_offering != undefined) {
            const course = course_types.find(ob => ob.id == course_offering.course_type);
            if (course != undefined) {
                return course.name;
            }
        }

        return "-";

    };





    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}>
            <Toaster />
            <div className='p-2'>
                <div className='flex justify-between'>
                    <h1 className='capitalize rrs'>Registered Users</h1>
                    <div className='flex gap-2'>
                        <div className='flex gap-2 items-center'>
                            <label htmlFor="">Filter by - </label>
                            <select value={filter} onChange={(e) => setFilter(e.target.value)} name="ctp" className='p-2  rrs border-1 border-blue w-[200px] rounded focus:outline-none focus:border-blue bg-black transition-all' >
                                <option value={""} >None</option>
                                {
                                    course_offers.map(ct => <option key={ct.id} value={ct.id} className='p-2'>{get_opted_course_name(ct.id)} - {get_opted_course_type(ct.id)}</option>)
                                }
                            </select>
                        </div>
                        <button onClick={() => setShowModal(true)} className='capitalize p-2 border-1 border-blue w-[120px] rounded-sm hover:cursor-pointer hover:bg-blue/50 transition-colors duration-300 ease-in'>add</button>
                    </div>
                </div>
                <div>
                    <table className='table-auto w-full'>

                        <tbody className='capitalize'>
                            {!filter ?
                                users.map((t, i) => (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: .3, ease: 'easeOut', delay: .3 * i }}
                                        key={t.id} className=' my-2 bg-blue/25  items-center rounded hover:bg-blue/50 hover:cursor-pointer p-2 flex justify-around text-xl'>
                                        <td className=' w-full item-center justify-center flex'>{t.id}.</td>
                                        <td className=' w-full item-center justify-center flex'>

                                            {
                                                t.editMode ?
                                                    < input value={username} name='username' autoFocus onChange={(e) => setUsername(e.target.value)} type="text" className='border-b-1 border-blue outline-0' />



                                                    :
                                                    <span>{t.name} </span>
                                            }
                                        </td>
                                        <td className=' w-full item-center justify-center flex'>

                                            {
                                                t.editMode ?
                                                    <div className='w-full flex flex-row items-center justify-center gap-3'>

                                                        <select value={optedCourse} onChange={(e) => setOptedCourse(e.target.value)} name="opt_course" className='p-2 mt-2 rrs border-1 rounded focus:outline-none focus:border-blue w-full bg-black transition-all' >
                                                            <option disabled value={""} >select</option>
                                                            {
                                                                course_offers.map(ct => <option key={ct.id} value={ct.id}>{get_opted_course_name(ct.id)} - {get_opted_course_type(ct.id)}</option>)
                                                            }
                                                        </select>



                                                    </div>
                                                    :
                                                    <span>{get_opted_course_name(t.course_opted)} - {get_opted_course_type(t.course_opted)}</span>
                                            }
                                        </td>
                                        <td className='rrs w-full item-center justify-center flex'>
                                            {
                                                t.editMode ?
                                                    <button onClick={() => update(t.id)} className='capitalize rrs p-2 border-1 border-blue w-[120px] rounded-sm hover:cursor-pointer hover:bg-blue/50 transition-colors duration-300 ease-in'>update</button>
                                                    : <button onClick={() => changeEditMode(t.id, t.name, t.course_opted)} className='capitalize rrs p-2 border-1 border-blue w-[120px] rounded-sm hover:cursor-pointer hover:bg-blue/50 transition-colors duration-300 ease-in'>edit</button>

                                            }

                                        </td>
                                    </motion.tr>
                                )) :
                                users.filter(u => u.course_opted == filter).length == 0 ?
                                    <tr>

                                        <td colSpan={4} className='rrl text-center'>No items found</td>
                                    </tr>
                                    : users.filter(u => u.course_opted == filter).map((t, i) => (
                                        <motion.tr
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: .3, ease: 'easeOut', delay: .3 * i }}
                                            key={t.id} className=' my-2 bg-blue/25  items-center rounded hover:bg-blue/50 hover:cursor-pointer p-2 flex justify-around text-xl'>
                                            <td className=' w-full item-center justify-center flex'>{t.id}.</td>
                                            <td className=' w-full item-center justify-center flex'>

                                                {
                                                    t.editMode ?
                                                        < input value={username} name='username' autoFocus onChange={(e) => setUsername(e.target.value)} type="text" className='border-b-1 border-blue outline-0' />



                                                        :
                                                        <span>{t.name} </span>
                                                }
                                            </td>
                                            <td className=' w-full item-center justify-center flex'>

                                                {
                                                    t.editMode ?
                                                        <div className='w-full flex flex-row items-center justify-center gap-3'>

                                                            <select value={optedCourse} onChange={(e) => setOptedCourse(e.target.value)} name="opt_course" className='p-2 mt-2 rrs border-1 rounded focus:outline-none focus:border-blue w-full bg-black transition-all' >
                                                                <option disabled value={""} >select</option>
                                                                {
                                                                    course_offers.map(ct => <option key={ct.id} value={ct.id}>{get_opted_course_name(ct.id)} - {get_opted_course_type(ct.id)}</option>)
                                                                }
                                                            </select>



                                                        </div>
                                                        :
                                                        <span>{get_opted_course_name(t.course_opted)} - {get_opted_course_type(t.course_opted)}</span>
                                                }
                                            </td>
                                            <td className='rrs w-full item-center justify-center flex'>
                                                {
                                                    t.editMode ?
                                                        <button onClick={() => update(t.id)} className='capitalize rrs p-2 border-1 border-blue w-[120px] rounded-sm hover:cursor-pointer hover:bg-blue/50 transition-colors duration-300 ease-in'>update</button>
                                                        : <button onClick={() => changeEditMode(t.id, t.name, t.course_opted)} className='capitalize rrs p-2 border-1 border-blue w-[120px] rounded-sm hover:cursor-pointer hover:bg-blue/50 transition-colors duration-300 ease-in'>edit</button>

                                                }

                                            </td>
                                        </motion.tr>
                                    ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            {
                showModal &&
                <motion.div className='absolute top w-[100vw] h-[100vh] top-0 left-0 bg-black/50 backdrop-blur-xs'>
                    <div className='flex items-center justify-center w-full h-full flex-col '>
                        <div className='flex rounded flex-col items-center justify-center border-1 border-blue p-4 w-[30%]'>
                            <h1 className='rrs text-blue'>Registration Form</h1>
                            <div className='w-full py-2 px-6 rounded flex flex-col gap-4'>
                                <div className='w-full flex flex-col'>
                                    <label htmlFor="newCourseType" className='rrs'>Name</label>
                                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name='usn' className='p-2 rrs border-1 rounded focus:outline-none focus:border-blue' />
                                </div>
                                <div className='w-full flex flex-col'>
                                    <label htmlFor="newCourseType" className='rrs text-gray-300'>Available Courses</label>

                                    <select value={optedCourse} onChange={(e) => setOptedCourse(e.target.value)} name="optcrs" className='p-2 mt-2 rrs border-1 rounded focus:outline-none focus:border-blue bg-black transition-all' >
                                        <option disabled value={""} >select</option>
                                        {
                                            course_offers.map(ct => <option key={ct.id} value={ct.id}>{get_opted_course_name(ct.id)} - {get_opted_course_type(ct.id)}</option>)
                                        }
                                    </select>
                                </div>



                            </div>
                            <div className='w-full flex justify-around mt-4'>
                                <button onClick={handleCancle} className='capitalize p-2 border-1 rrs border-blue w-[120px] rounded-sm hover:cursor-pointer hover:bg-blue/50 transition-colors duration-300 ease-in'>cancel</button>
                                <button onClick={handleAdd} className='capitalize p-2 border-1 rrs border-blue w-[120px] rounded-sm hover:cursor-pointer hover:bg-blue/50 transition-colors duration-300 ease-in'>add</button>
                            </div>
                        </div>

                    </div>
                </motion.div>
            }
        </motion.div>
    );
};

export default Register;