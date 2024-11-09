import {baseApi} from '@/app/api'
import {
    GetPostResponse,
    GetPublicPostCommentArgs, GetPublicPostCommentsResponse,
    GetPublicPostsArgs,
    GetPublicPostsResponse, GetPublicProfileResponse,
    GetUserPublicPostsArgs
} from "@/features";
import {API_URLS, METHOD} from '@/shared/config'

const {GET} = METHOD
const {
    GET_TOTAL_COUNT_USERS,
    GetAllPublicPosts,
    GetPostById,
    GetPublicPostComments,
    GetPublicProfileById,
    GetUserPublicPosts
} = API_URLS.PUBLIC


/**
 * API service for public-page endpoints.
 */
export const publicApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getAllPublicPosts: builder.query<GetPublicPostsResponse, GetPublicPostsArgs>({
            providesTags: ['Public-posts'],
            query: ({endCursorPostId}) => ({
                method: GET,
                url: GetAllPublicPosts(endCursorPostId)
            })
        }),
        /**
         * Fetches a post by its ID.
         * @param {{ postId: number }} params - The ID of the post to fetch.
         */
        getPostById: builder.query<GetPostResponse, { postId: number | undefined }>({
            providesTags: ['Public-posts'],
            query: ({postId}) => ({
                method: GET,
                url: GetPostById(postId),
            }),
        }),
        getPublicPostComments: builder.query<GetPublicPostCommentsResponse, GetPublicPostCommentArgs>({
            providesTags: ['Public-posts'],
            query: ({postId}) => ({
                method: GET,
                url: GetPublicPostComments(postId),
            }),
        }),
        getPublicProfileById: builder.query<GetPublicProfileResponse, { profileId: number }>({
            providesTags: ['Public-user'],
            query: ({profileId}) => ({
                method: GET,
                url: GetPublicProfileById(profileId),
            })
        }),
        /**
         * Fetches public posts for a specific user.
         * @param {GetUserPublicPostsArgs} params - The user ID and optional end cursor post ID.
         */
        getUserPosts: builder.query<GetPublicPostsResponse, GetUserPublicPostsArgs>({
            providesTags: ['Public-posts'],
            query: ({endCursorPostId, userId}) => ({
                method: GET,
                url: GetUserPublicPosts(endCursorPostId, userId),
            }),
        }),
        /**
         * Fetches the total number of registered users from the API.
         */
        getUsersCount: builder.query<{ totalCount: number }, void>({
            providesTags: ['Public-user'],
            query: () => GET_TOTAL_COUNT_USERS,
        })
    }),
})

export const {
    useGetAllPublicPostsQuery,
    useGetPostByIdQuery,
    useGetPublicPostCommentsQuery,
    useGetPublicProfileByIdQuery,
    useGetUserPostsQuery,
    useGetUsersCountQuery
} = publicApi
