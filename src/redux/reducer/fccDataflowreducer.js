import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    user:{},
    Teampreview:{}
  };


  export const fccDataflowreducer = createSlice({
    name: "fccDataflowreducer",
    initialState,
    reducers: {
      GetprofileAction(state, action) {
        state.user = action.payload;
      },
      GetTeampreviewAction(state, action) {
        state.Teampreview = action.payload;
      },
    },
  });
  
  export const {
    GetprofileAction,
    GetTeampreviewAction
  } = fccDataflowreducer.actions;
  
  export default fccDataflowreducer.reducer;