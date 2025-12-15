import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setTeacherProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const {  setTeacherProfile } = teacherSlice.actions;
export default teacherSlice.reducer;
