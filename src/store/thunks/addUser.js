import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";

//arguments 1) base type used with action like users/fetch/error action.type
// 2) axios network request
const addUser = createAsyncThunk("users/add", async () => {
    const response = await axios.post("http://localhost:3005/users", {
        name: faker.name.fullName()
    });

    return response.data; // this is action.payload
});

export { addUser }