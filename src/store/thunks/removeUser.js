import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUser = createAsyncThunk( "users/remove" ,async (user) => {
    const response = await axios.delete(`http://localhost:3005/users/${user.id}`);

    //FIX !!!
    // return response.data; // action payload is empty 

    return user; // action 
});

export { removeUser };