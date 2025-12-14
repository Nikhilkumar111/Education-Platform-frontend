import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudentProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setStudentProfile } = studentSlice.actions;
export default studentSlice.reducer;
