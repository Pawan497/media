import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const photosApi = createApi({
    reducerPath: "photos",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3005"
    }),
    endpoints(builder) {
        return{
            fetchPhotos: builder.query({
                query: (album) => {
                    return {
                        url: "/photos",
                        params: {
                            albumId: album.id
                        },
                        method: "GET" // default behaviour socan be skipped it will work just fine
                    };
                },
                providesTags: (result, error, album) => {
                    const tags = result.map(photo => {
                        return {
                            type: "Photo", id: photo.id
                        };
                    });
                    tags.push({ type: "AlbumPhoto", id: album.id });

                    return tags;
                }
            }),
            addPhotos: builder.mutation({
                query: (album) => {
                    return {
                        url: "/photos",
                        body: {
                            albumId: album.id,
                            url: faker.image.abstract(150, 150, true) 
                        },
                        method: "POST"
                    };
                },
                invalidatesTags: (result, error, album) => {
                    return [{ type: "AlbumPhoto", id: album.id }];
                }
            }),
            removePhoto: builder.mutation({
                query: (photo) => {
                    return {
                        url: `/photos/${photo.id}`,
                        method: "DELETE"
                    };
                },
                invalidatesTags: (result, error, photo) => {
                    return [{ type: "Photo", id: photo.id }];
                }
            })
        }
    }
});

export const {
    useFetchPhotosQuery,
    useAddPhotosMutation,
    useRemovePhotoMutation
} = photosApi;

export { photosApi };