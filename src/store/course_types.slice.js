import { createSlice } from "@reduxjs/toolkit";
import course_types from '../db/course_types.json';


const courseTypesSlice = createSlice({
    name: "course_types",
    initialState: course_types,
    reducers: {
        add: (state, action) => {
            state.push(action.payload);
        },
        editMode: (state, action) => {
            const { id, toggleState } = action.payload;
            const matchedOb = state.find(ob => ob.id == id);
            if (matchedOb) {
                matchedOb.editMode = toggleState;
            }
        },
        update_type: (state, action) => {
            const { ct_id, ct_name } = action.payload;
            const item = state.find(ob => ob.id == ct_id);
            if (item) {
                item.name = ct_name;
                item.editMode = false;
            }
        }
    }
});

export const { add, editMode, update_type } = courseTypesSlice.actions;
export default courseTypesSlice.reducer; 