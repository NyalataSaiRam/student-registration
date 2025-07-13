import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { add, editMode, update_type } from '../store/course_types.slice';
const CourseTypes = () => {

    const course_types = useSelector((state) => state.courseTypes);
    const dispatch = useDispatch();
    const [ inputValue, setInputValue ] = useState("");


    const [ showModal, setShowModal ] = useState(false);
    const [ newCourseType, setNewCourseType ] = useState("");

    const changeEditMode = (id, name) => {
        course_types.forEach(ct => {
            if (ct.editMode && ct.id !== id) {
                dispatch(editMode({ id: ct.id, toggleState: false }));
            }
        });

        dispatch(editMode({ id: id, toggleState: true }));
        setInputValue(name);
    };

    const handleCancle = () => {
        setShowModal(false);
        setNewCourseType("");
    };

    const handleAdd = () => {


        dispatch(add({
            id: course_types.length + 1,
            name: newCourseType,
            editMode: false
        }));




        setNewCourseType("");
        setShowModal(false);
        toast.success("Added Successfully");
    };



    const onchange = (e) => {
        setInputValue(e.target.value);
    };

    const update = (id) => {
        const val = inputValue.trim();
        if (val == "") {
            toast.error("Fields cannot be empty");
            return;
        }
        dispatch(update_type({ ct_id: id, ct_name: inputValue }));

        setInputValue("");
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
                    <h1 className='capitalize rrs'>course types</h1>
                    <button onClick={() => setShowModal(true)} className='capitalize p-2 border-1 border-blue w-[120px] rounded-sm hover:cursor-pointer hover:bg-blue/50 transition-colors duration-300 ease-in'>add</button>
                </div>
                <div>
                    <table className='table-auto w-full'>

                        <tbody className='capitalize'>
                            {
                                course_types.map((t, i) => (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: .3, ease: 'easeOut', delay: .3 * i }}
                                        key={t.id} className=' my-2 bg-blue/25  items-center rounded hover:bg-blue/50 hover:cursor-pointer p-2 flex justify-around text-xl'>
                                        <td className=' w-full item-center justify-center flex'>{t.id}.</td>
                                        <td className=' w-full item-center justify-center flex'>
                                            {
                                                t.editMode ?
                                                    <input autoFocus onChange={onchange} name='name' type="text" value={inputValue} className='border-b-1 border-blue outline-0' />
                                                    :
                                                    <span>{t.name}</span>
                                            }


                                        </td>
                                        <td className='rrs w-full item-center justify-center flex'>
                                            {
                                                t.editMode ?
                                                    <button onClick={() => update(t.id)} className='capitalize rrs p-2 border-1 border-blue w-[120px] rounded-sm hover:cursor-pointer hover:bg-blue/50 transition-colors duration-300 ease-in'>update</button>
                                                    : <button onClick={() => changeEditMode(t.id, t.name)} className='capitalize rrs p-2 border-1 border-blue w-[120px] rounded-sm hover:cursor-pointer hover:bg-blue/50 transition-colors duration-300 ease-in'>edit</button>

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
                        <div className='flex flex-col items-center justify-center border-1 border-blue p-4 w-[30%]'>
                            <div className='w-full py-2 px-6 rounded flex flex-col'>
                                <label htmlFor="newCourseType" className='rrs'>Course Type</label>
                                <input value={newCourseType} onChange={(e) => setNewCourseType(e.target.value)} type="text" name='newCourseType' className='p-2 rrs border-1 rounded focus:outline-none focus:border-blue' />
                            </div>
                            <div className='w-full flex justify-around'>
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

export default CourseTypes;