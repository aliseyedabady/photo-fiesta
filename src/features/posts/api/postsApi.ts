import { baseApi } from '@/app/api'
import {
  GetCommentAnswersArgs,
  GetCommentAnswersLikesArgs,
  GetCommentAnswersLikesResponse,
  GetCommentAnswersResponse,
  GetCommentLikesArgs,
  GetPostByUsernameArgs,
  GetPostByUsernameResponse,
  GetPostCommentsArgs,
  GetPostCommentsResponse,
  GetPostLikesArgs,
  LikeStatus,
  PostArgsType,
  PostsImages,
  PostsType,
} from '@/features'
import { API_URLS, METHOD } from '@/shared/config'

const { DELETE, GET, POST, PUT } = METHOD
const {
  CREATE_POST,
  DeletePost,
  DeleteUploadImage,
  GetCommentAnswers,
  GetCommentAnswersLikes,
  GetCommentLikes,
  GetPostComments,
  GetPostLikes,
  GetPostsByUsername,
  UPLOAD_POST_IMAGE,
  UpdatePost,
  UpdatePostLikeStatus,
} = API_URLS.POSTS

/**
 * @module postsApi
 * @description API endpoints for handling posts.
 */

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    /**
     * Creates a new post.
     * @returns {Promise<PostsType>} The created post.
     * @param {PostArgsType} params - The post data.
     */
    createPost: builder.mutation<PostsType, PostArgsType>({
      invalidatesTags: ['Posts'],
      query: body => ({
        body,
        method: POST,
        url: CREATE_POST,
      }),
    }),
    /**
     * Deletes a post by its ID.
     * @param {{ postId: number }} params - The ID of the post to delete.
     */
    deletePost: builder.mutation<void, { postId: number }>({
      invalidatesTags: ['Posts'],
      query: ({ postId }) => ({
        method: DELETE,
        url: DeletePost(postId),
      }),
    }),
    /**
     * Deletes an uploaded image by its ID.
     * @param {{ uploadId: string }} params - The ID of the uploaded image to delete.
     */
    deleteUploadImage: builder.mutation<void, { uploadId: string | string[] }>({
      invalidatesTags: ['Posts'],
      query: ({ uploadId }) => ({
        method: DELETE,
        url: DeleteUploadImage(uploadId),
      }),
    }),
    getCommentAnswers: builder.query<GetCommentAnswersResponse, GetCommentAnswersArgs>({
      providesTags: ['Posts'],
      query: ({ commentId, postId }) => ({
        method: GET,
        url: GetCommentAnswers(commentId, postId),
      }),
    }),
    getCommentAnswersLikes: builder.query<
      GetCommentAnswersLikesResponse,
      GetCommentAnswersLikesArgs
    >({
      providesTags: ['Posts'],
      query: ({ answerId, commentId, postId }) => ({
        method: GET,
        url: GetCommentAnswersLikes(commentId, postId, answerId),
      }),
    }),
    getCommentLikes: builder.query<GetCommentAnswersLikesResponse, GetCommentLikesArgs>({
      providesTags: ['Posts'],
      query: ({ commentId, postId }) => ({
        method: GET,
        url: GetCommentLikes(commentId, postId),
      }),
    }),
    getPostComments: builder.query<GetPostCommentsResponse, GetPostCommentsArgs>({
      providesTags: ['Posts'],
      query: ({ postId }) => ({
        method: GET,
        url: GetPostComments(postId),
      }),
    }),
    getPostLikes: builder.query<GetCommentAnswersResponse, GetPostLikesArgs>({
      providesTags: ['Posts'],
      query: ({ postId }) => ({
        method: GET,
        url: GetPostLikes(postId),
      }),
    }),
    getPostsByUsername: builder.query<GetPostByUsernameResponse, GetPostByUsernameArgs>({
      providesTags: ['Posts'],
      query: ({ userName }) => ({
        method: GET,
        url: GetPostsByUsername(userName),
      }),
    }),
    /**
     * Updates a post by its ID.
     * @param {{ description: string, postId: number }} params - The updated post data and its ID.
     */
    updatePost: builder.mutation<void, { description: string; postId: number }>({
      invalidatesTags: ['Posts'],
      query: ({ description, postId }) => ({
        body: { description },
        method: PUT,
        url: UpdatePost(postId),
      }),
    }),
    /**
     * Uploads an image for a post.
     * @param {FormData} formData - The image file to upload.
     */

    updatePostLikeStatus: builder.mutation<void, { likeStatus: LikeStatus; postId: number }>({
      invalidatesTags: ['Posts'],
      query: ({ likeStatus, postId }) => ({
        body: { likeStatus },
        method: PUT,
        url: UpdatePostLikeStatus(postId),
      }),
    }),
    uploadPostImage: builder.mutation<PostsImages, FormData>({
      invalidatesTags: ['Posts'],
      query: (formData: FormData) => ({
        body: formData,
        method: POST,
        url: UPLOAD_POST_IMAGE,
      }),
    }),
  }),
})

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useDeleteUploadImageMutation,
  useGetCommentAnswersLikesQuery,
  useGetCommentAnswersQuery,
  useGetCommentLikesQuery,
  useGetPostCommentsQuery,
  useGetPostLikesQuery,
  useGetPostsByUsernameQuery,
  useUpdatePostLikeStatusMutation,
  useUpdatePostMutation,
  useUploadPostImageMutation,
} = postsApi
