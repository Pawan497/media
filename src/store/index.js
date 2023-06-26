import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photosApi";


export const store = configureStore({
        reducer: {
                 users: usersReducer,
                //  albums: albumsApi.reducer
                // OR better version no  chance of typo
                [albumsApi.reducerPath]: albumsApi.reducer,  // for fetching redux toolkit 1 (connect Api to the store)
                [photosApi.reducerPath]: photosApi.reducer
        },
        middleware: (getDefaultMiddleware) => {   // for fetching redux toolkit 2
                return getDefaultMiddleware()
                        .concat(albumsApi.middleware)
                        .concat(photosApi.middleware);
        }
});

// Temporary
// window.store = store;

setupListeners(store.dispatch);  // for fetching redux toolkit 3 (one time only)

//central export is this store index.js for components 
// here this line means find every export in fetchUser file and also export it fromthis file
export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks/removeUser";

export { 
        useFetchAlbumsQuery, 
        useAddAlbumMutation,
        useRemoveAlbumMutation 
} from "./apis/albumsApi";

export {
        useFetchPhotosQuery,
        useAddPhotosMutation,
        useRemovePhotoMutation
} from "./apis/photosApi";