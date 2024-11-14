import {
  GetPostResponse,
  GetPublicPostsResponse,
  Profile,
  useAuthMeQuery,
  useGetPublicProfileByIdQuery,
} from '@/features'
import { API_URLS } from '@/shared/config'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
/**
 * it is  responsible for rendering the user's profile page.
 */

export const getServerSideProps: GetServerSideProps = async context => {
  const { postId, userId } = context.params || {}

  const userPostsResponse = await fetch(`${API_URLS.BASE_URL}v1/public-user/profile/${userId}`)
  const userPosts = await userPostsResponse.json()

  const publicPostById = await fetch(`${API_URLS.BASE_URL}v1/public-posts/${postId}`)
  const publicPost = await publicPostById.json()

  const publicPostsResponse = await fetch(`${API_URLS.BASE_URL}v1/public-posts/user/${userId}`)
  const userAllPosts = await publicPostsResponse.json()

  return {
    props: {
      postId: Number(postId),
      posts: userAllPosts,
      profileId: Number(userId),
      publicPost,
      userPosts,
    },
  }
}
type ProfilePageProps = {
  postId?: number
  posts: GetPublicPostsResponse
  profileId: number
  publicPost: GetPostResponse
}

const ProfilePage = ({ posts, profileId }: ProfilePageProps) => {
  const { data: user } = useAuthMeQuery()
  const { data: profileInfo, refetch: getProfile } = useGetPublicProfileByIdQuery({ profileId })
  const isOwnProfile = user?.userId === profileId

  console.log(posts)

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
        getProfile={getProfile}
        isOwnProfile={isOwnProfile}
        posts={posts}
        profileId={profileId}
        profileInfo={profileInfo}
      />
    </>
  )
}

export default ProfilePage
