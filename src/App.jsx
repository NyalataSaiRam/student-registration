import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import Layout from './pages/Layout.page';
import CourseTypes from './components/CourseTypes.component';
import Courses from './components/Courses.component';
import CourseOfferings from './components/CourseOfferings.component';
import Register from './components/Register.component';

const App = () => {

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/course-types');
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route path='course-types' index element={<CourseTypes />} />
        <Route path='courses' element={<Courses />} />
        <Route path='course-offerings' element={<CourseOfferings />} />
        <Route path='register' element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;