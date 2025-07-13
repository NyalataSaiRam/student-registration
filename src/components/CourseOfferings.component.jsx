import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { add, editMode, update_offers } from '../store/course_offerings.slice';


const CourseOfferings = () => {

    const course_offerings = useSelector(state => state.courseOfferings);
    const course_types = useSelector(state => state.courseTypes);
    const courses = useSelector(state => state.courses);
    const dispatch = useDispatch();


    const [ showModal, setShowModal ] = useState(false);
    const [ filter, setFilter ] = useState("");

    const [ aci, setAci ] = useState("");
    const [ ati, setAti ] = useState("");

    const changeEditMode = (id, ac, at) => {
        course_offerings.forEach(off => {
            if (off.editMode && off.id !== id) {
                dispatch(editMode({ id: off.id, toggleState: false }));
            }
        });

        dispatch(editMode({ id: id, toggleState: true }));
        setAci(ac);
        setAti(at);
    };

    const handleCancle = () => {
        setShowModal(false);
        setAci("");
        setAti("");
    };

    const handleAdd = () => {

        if (!aci) {

            toast.error("All fields are mandatory");
            return;
        }
        if (!ati) {

            toast.error("All fields are mandatory");
            return;
        }


        dispatch(add({
            id: course_offerings.length + 1,
            course: parseInt(aci, 10),
            course_type: parseInt(ati, 10),
            editMode: false
        }));



        setAci("");
        setAti("");
        setShowModal(false);
        toast.success("Added Successfully");
    };


    const update = (id) => {

        if (aci == "") {
            toast.error("Fields cannot be empty");
            return;
        }
        if (ati == "") {
            toast.error("Fields cannot be empty");
            return;
        }

        dispatch(update_offers({ id: id, course: parseInt(aci, 10), course_type: parseInt(ati, 10) }));


        setAci("");
        setAti('');
        toast.success('Successfully updated!');
    };



    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}>
            <Toaster />
            <div className='p-2'>
                <div className='flex justify-between'>
                    <h1 className='capitalize rrs'>courses offered</h1>
                    <div className='flex gap-2'>
                        <div className='flex gap-2 items-center'>
                            <label htmlFor="">Filter by - </label>
                            <select value={filter} onChange={(e) => setFilter(e.target.value)} name="ctp" className='p-2  rrs border-1 border-blue w-[120px] rounded focus:outline-none focus:border-blue bg-black transition-all' >
                                <option value={""} >None</option>
                                {
                                    course_types.map(ct => <option key={ct.id} value={ct.id} className='p-2'>{ct.name}</option>)
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
                                course_offerings.map((t, i) => (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: .3, ease: 'easeOut', delay: .3 * i }}
                                        key={t.id} className=' my-2 bg-blue/25  items-center rounded hover:bg-blue/50 hover:cursor-pointer p-2 flex justify-around text-xl'>
                                        <td className=' w-full item-center justify-center flex'>{t.id}.</td>
                                        <td className=' w-full item-center justify-center flex'>
                                            {
                                                t.editMode ?
                                                    <div className='w-full flex flex-row items-center justify-center gap-3'>

                                                        <select value={aci} onChange={(e) => setAci(e.target.value)} name="cn" className='p-2 mt-2 rrs border-1 rounded focus:outline-none focus:border-blue w-[40%] bg-black transition-all' >
                                                            <option disabled value={""} >select</option>
                                                            {
                                                                courses.map(ct => <option key={ct.id} value={ct.id}>{ct.name}</option>)
                                                            }
                                                        </select>

                                                        <span> - </span>
                                                        <select value={ati} onChange={(e) => setAti(e.target.value)} name="ctp" className='p-2 mt-2 rrs border-1 rounded focus:outline-none w-[40%] focus:border-blue bg-black transition-all' >
                                                            <option disabled value={""} >select</option>
                                                            {
                                                                course_types.map(ct => <option key={ct.id} value={ct.id}>{ct.name}</option>)
                                                            }
                                                        </select>

                                                    </div>
                                                    :
                                                    <span>{courses.find(c => c.id == t.course)?.name} - {course_types.find(c => c.id == t.course_type)?.name}</span>

                                            }
                                        </td>
                                        <td className='rrs w-full item-center justify-center flex'>
                                            {
                                                t.editMode ?
                                                    <button onClick={() => update(t.id)} className='capitalize rrs p-2 border-1 border-blue w-[120px] rounded-sm hover:cursor-pointer hover:bg-blue/50 transition-colors duration-300 ease-in'>update</button>
                                                    : <button onClick={() => changeEditMode(t.id, t.course, t.course_type)} className='capitalize rrs p-2 border-1 border-blue w-[120px] rounded-sm hover:cursor-pointer hover:bg-blue/50 transition-colors duration-300 ease-in'>edit</button>

                                            }

                                        </td>
                                    </motion.tr>
                                ))
                                :
                                course_offerings.filter(cf => cf.course_type == filter).length == 0 ?
                                    <tr>

                                        <td colSpan={3} className='rrl text-center'>No items found</td>
                                    </tr>
                                    : course_offerings.filter(cf => cf.course_type == filter).map((t, i) => (
                                        <motion.tr
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: .3, ease: 'easeOut', delay: .3 * i }}
                                            key={t.id} className=' my-2 bg-blue/25  items-center rounded hover:bg-blue/50 hover:cursor-pointer p-2 flex justify-around text-xl'>
                                            <td className=' w-full item-center justify-center flex'>{t.id}.</td>
                                            <td className=' w-full item-center justify-center flex'>
                                                {
                                                    t.editMode ?
                                                        <div className='w-full flex flex-row items-center justify-center gap-3'>

                                                            <select value={aci} onChange={(e) => setAci(e.target.value)} name="cn" className='p-2 mt-2 rrs border-1 rounded focus:outline-none focus:border-blue w-[40%] bg-black transition-all' >
                                                                <option disabled value={""} >select</option>
                                                                {
                                                                    courses.map(ct => <option key={ct.id} value={ct.id}>{ct.name}</option>)
                                                                }
                                                            </select>

                                                            <span> - </span>
                                                            <select value={ati} onChange={(e) => setAti(e.target.value)} name="ctp" className='p-2 mt-2 rrs border-1 rounded focus:outline-none w-[40%] focus:border-blue bg-black transition-all' >
                                                                <option disabled value={""} >select</option>
                                                                {
                                                                    course_types.map(ct => <option key={ct.id} value={ct.id}>{ct.name}</option>)
                                                                }
                                                            </select>

                                                        </div>
                                                        :
                                                        <span>{courses.find(c => c.id == t.course)?.name} - {course_types.find(c => c.id == t.course_type)?.name}</span>

                                                }
                                            </td>
                                            <td className='rrs w-full item-center justify-center flex'>
                                                {
                                                    t.editMode ?
                                                        <button onClick={() => update(t.id)} className='capitalize rrs p-2 border-1 border-blue w-[120px] rounded-sm hover:cursor-pointer hover:bg-blue/50 transition-colors duration-300 ease-in'>update</button>
                                                        : <button onClick={() => changeEditMode(t.id, t.course, t.course_type)} className='capitalize rrs p-2 border-1 border-blue w-[120px] rounded-sm hover:cursor-pointer hover:bg-blue/50 transition-colors duration-300 ease-in'>edit</button>

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
                            <h1 className='rrs text-blue'>Add new course</h1>
                            <div className='w-full py-2 px-6 rounded flex flex-col gap-4'>
                                <div className='w-full flex flex-col'>
                                    <label htmlFor="newCourseType" className='rrs text-gray-300'>Available Courses</label>

                                    <select value={aci} onChange={(e) => setAci(e.target.value)} name="cn" className='p-2 mt-2 rrs border-1 rounded focus:outline-none focus:border-blue bg-black transition-all' >
                                        <option disabled value={""} >select</option>
                                        {
                                            courses.map(ct => <option key={ct.id} value={ct.id}>{ct.name}</option>)
                                        }
                                    </select>
                                </div>
                                <div className='w-full flex flex-col'>
                                    <label htmlFor="newCourseType" className='rrs text-gray-300'>Available Types</label>

                                    <select value={ati} onChange={(e) => setAti(e.target.value)} name="ctp" className='p-2 mt-2 rrs border-1 rounded focus:outline-none focus:border-blue bg-black transition-all' >
                                        <option disabled value={""} >select</option>
                                        {
                                            course_types.map(ct => <option key={ct.id} value={ct.id}>{ct.name}</option>)
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

export default CourseOfferings;