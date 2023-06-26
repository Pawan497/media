import { createApi, fetchBaseQuery  } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

// DEV ONLY!! 1
const pause = ( duration ) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

const albumsApi = createApi({
    reducerPath: "albums", // gives key of big state object here albums that means state= { users: {}, albums***: {}} *** means here that word is used
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3005",
        //Dev Only!!2 also fetchFn function is used to make a request
        fetchFn: async (...args) => {
            await pause(2000);
            return fetch(...args);
        }
    }),
    endpoints(builder) {
        return {
            fetchAlbums: builder.query({ // name of hook depends on this fetchAlbum or anything placed here 
                query: (user) => {
                    return {
                        url: "/albums",
                        params: {
                            userId: user.id
                        },
                        method: "GET"
                    };
                },
                // providesTags: ["Album"]
                providesTags: (result, error, user) => {  // providesTags: (result, error, arg) => {
                    const tags = result.map(album => {
                        return { type: "Album", id: album.id };
                    });
                    tags.push({type: "UserAlbums", id: user.id });

                    return tags;
                }
            }),
            addAlbum: builder.mutation({
                query: (user) => {
                    return {
                        url: "/albums",
                        method: "POST",
                        body: {// this is used to write in db.json
                            userId: user.id,
                            title: faker.commerce.productName()
                        }
                    }
                },
                // invalidatesTags: ["Album"]
                invalidatesTags: (result, error, user) => {
                    return [{type: "UserAlbums", id: user.id }];
                }
            }),
            removeAlbum: builder.mutation({
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: "DELETE"
                    }
                },
                invalidatesTags: (result, error, album) => {
                    console.log(album);
                    // return [{type: "Album", id: album.userId }]; // lucky because album has userId propert

                    return [{type: "Album", id: album.id }];
                }
            })
        };
    }
});

export const { 
    useFetchAlbumsQuery, 
    useAddAlbumMutation, 
    useRemoveAlbumMutation 
} = albumsApi;
export { albumsApi }; 