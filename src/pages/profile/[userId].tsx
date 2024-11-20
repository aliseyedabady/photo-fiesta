import {
  GetPostResponse,
  GetPublicPostsResponse,
  GetPublicProfileResponse,
  Profile,
  useAuthMeQuery,
  useGetPublicProfileByIdQuery,
} from '@/features'
import { API_URLS } from '@/shared/config'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

/**
 * Fetches the user's public profile, a specific post by ID, and all their public posts.
 * Queries based on the userId and postId parameters from the request.
 *
 * @returns {Promise<{ props: { posts: GetPublicPostsResponse, profileId: number, userProfile: GetPublicProfileResponse, postId: number, publicPost: GetPostResponse } }>} Server-side props.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps = async context => {
  const { postId, userId } = context.query

  const userProfileResponse = await fetch(
    `${API_URLS.BASE_URL}${API_URLS.PUBLIC.GetPublicProfileById(Number(userId))}`
  )
  const userProfile: GetPublicProfileResponse = await userProfileResponse.json()

  const publicPostById = await fetch(
    `${API_URLS.BASE_URL}${API_URLS.PUBLIC.GetPostById(Number(postId))}`
  )
  const publicPost: GetPostResponse = await publicPostById.json()

  const publicPostsResponse = await fetch(
    `${API_URLS.BASE_URL}${API_URLS.PUBLIC.GetUserPublicPosts(null, Number(userId))}?pageSize=8`
  )
  const userAllPosts: GetPublicPostsResponse = await publicPostsResponse.json()

  return {
    props: {
      postId: postId ? Number(postId) : null,
      posts: userAllPosts,
      profileId: Number(userId),
      publicPost,
      userProfile,
    },
  }
}

type ProfilePageProps = {
  posts: GetPublicPostsResponse
  profileId: number
  userProfile: GetPublicProfileResponse
}

/**
 * ProfilePage component for rendering a user's public profile with their posts.
 * Fetches data server-side using Next.js `getServerSideProps`.
 */
const ProfilePage = ({ posts, profileId, userProfile }: ProfilePageProps) => {
  const { data: currentUser } = useAuthMeQuery()

  const { data: user } = useGetPublicProfileByIdQuery({ profileId })
  const isOwnProfile = currentUser?.userId === profileId

  return (
    <>
      <Head>
        <title>Profile: {user?.userName}</title>
        <meta
          content={`Profile of ${user?.userName}. Check out the project on GitHub: https://github.com/NoName-ForTeam`}
          name={'description'}
        />
        <meta content={`profile, ${user?.userName}, GitHub`} name={'keywords'} />
        <meta content={'index, follow'} name={'robots'} />
      </Head>
      <Profile
        isOwnProfile={isOwnProfile}
        posts={posts}
        profileId={profileId}
        profileInfo={userProfile}
      />
    </>
  )
}

export default ProfilePage
