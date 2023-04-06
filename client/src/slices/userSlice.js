import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserServices from "../services/userServices";

// const initialState = {
//   error: false,
//   usersData: [],
// };

const initialState = [];

export const createUser = createAsyncThunk(
  "user/create",
  async ({ name, email, mobile, dob }, { rejectWithValue }) => {
    try {
      const res = await UserServices.create({ name, email, mobile, dob });
      console.log("res in reducer create--", res);
      return res;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const retrieveUser = createAsyncThunk("user/retrieve", async () => {
  const res = await UserServices.getAll();
  return res;
});

export const retrieveSearchUser = createAsyncThunk(
  "user/search",
  async (search) => {
    const res = await UserServices.search(search);
    return res;
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ _id, name, email, mobile, dob }) => {
    const res = await UserServices.update({ _id, name, email, mobile, dob });
    return res;
  }
);

export const deleteUser = createAsyncThunk("user/delete", async (id) => {
  const res = await UserServices.remove(id);
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [createUser.fulfilled]: (state, action) => {
      console.log("action--", action.payload);
      state.push(action.payload.data);
    },
    // [createUser.rejected]: (state, action) => {
    //   console.log("action--", action);
    //   return action.;
    // },
    [retrieveUser.fulfilled]: (state, action) => {
      // state.usersData = action.payload;
      console.log(action.payload);
      return action.payload;
    },
    // [retrieveUser.rejected]: (state, action) => {
    //   console.log("state--", state);
    //   state.error = true;
    // },
    [retrieveSearchUser.fulfilled]: (state, action) => {
      return action.payload;
    },
    [updateUser.fulfilled]: (state, action) => {
      const index = state.findIndex((data) => data._id === action.payload._id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteUser.fulfilled]: (state, action) => {
      let index = state.findIndex((data) => data._id === action.payload._id);
      state.splice(index, 1);
    },
  },
});

const { reducer } = userSlice;
export default reducer;
