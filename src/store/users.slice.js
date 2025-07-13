import { createSlice } from "@reduxjs/toolkit";
import users from '../db/users.json';


const usersSlice = createSlice({
    name: "users",
    initialState: users,
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
        update_users: (state, action) => {
            const { id, name, course_opted } = action.payload;
            const item = state.find(ob => ob.id == id);

            if (item) {
                item.name = name;
                item.course_opted = course_opted;
                item.editMode = false;
            }
        }
    }
});

export const { add, editMode, update_users } = usersSlice.actions;
export default usersSlice.reducer;