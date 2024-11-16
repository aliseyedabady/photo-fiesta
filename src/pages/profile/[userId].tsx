import {
  GetPostResponse,
  GetPublicPostsResponse,
  GetPublicProfileResponse,
  Profile,
  useAuthMeQuery,
} from '@/features'
import { API_URLS } from '@/shared/config'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
/**
 * it is  responsible for rendering the user's profile page.
 */

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
    `${API_URLS.BASE_URL}${API_URLS.PUBLIC.GetUserPublicPosts(undefined, Number(userId))}`
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

const ProfilePage = ({ posts, profileId, userProfile }: ProfilePageProps) => {
  const { data: user } = useAuthMeQuery()

  const isOwnProfile = user?.userId === profileId

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
