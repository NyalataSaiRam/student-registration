import { createSlice } from "@reduxjs/toolkit";
import coursesoffered from "../db/course_offerings.json";



const courseOfferingsSlice = createSlice({
    name: "course_offerings",
    initialState: coursesoffered,
    reducers: {
        add: (state, action) => {
            const item = action.payload;
            state.push(item);
        },
        editMode: (state, action) => {
            const { id, toggleState } = action.payload;
            const matchedOb = state.find(ob => ob.id == id);
            if (matchedOb) {
                matchedOb.editMode = toggleState;
            }
        },
        update_offers: (state, action) => {
            const { id, course, course_type } = action.payload;
            const item = state.find(ob => ob.id == id);
            if (item) {
                item.course = course;
                item.course_type = course_type;
                item.editMode = false;
            }
        }


    }
});

export const { add, editMode, update_offers } = courseOfferingsSlice.actions;
export default courseOfferingsSlice.reducer; 