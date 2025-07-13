import { createSlice } from "@reduxjs/toolkit";
import courses from '../db/courses.json';


const coursesSlice = createSlice({
    name: "courses",
    initialState: courses,
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
        update_courses: (state, action) => {
            const { id, name } = action.payload;
            const item = state.find(ob => ob.id == id);
            if (item) {
                item.name = name;
                item.editMode = false;
            }
        }

    }
});

export const { add, editMode, update_courses } = coursesSlice.actions;
export default coursesSlice.reducer;