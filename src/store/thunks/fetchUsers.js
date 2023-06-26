import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//arguments 1) base type used with action like users/fetch/error action.type
// 2) axios network request
const fetchUsers = createAsyncThunk("users/fetch", async () => {
    const response = await axios.get("http://localhost:3005/users");

    // DEV ONLY!! 2
    await pause(2000);

    return response.data;// returned as payload property of fulfilled
});

// these are action type automatically generated
// fetchUsers.pending => request just started
// fetchUsers.fulfilled
// fetchUsers.rejected

// DEV ONLY!! 1
const pause = ( duration ) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export { fetchUsers };