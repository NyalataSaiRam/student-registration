import { configureStore } from "@reduxjs/toolkit";
import courseOfferingsSlice from './course_offerings.slice';
import courseTypesSlice from './course_types.slice';
import coursesSlice from './courses.slice';
import usersSlice from './users.slice';


const appStore = configureStore({
    reducer: {
        courseOfferings: courseOfferingsSlice,
        courseTypes: courseTypesSlice,
        courses: coursesSlice,
        users: usersSlice,
    },
    devTools: true
});

export default appStore;