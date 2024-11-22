import { GetPublicPostsResponse, PublicPosts, RegisteredUsersCounter } from '@/features'
import { API_URLS } from '@/shared/config'
import { GetStaticProps } from 'next'
import Head from 'next/head'

/**
 * Fetches public posts and total registered users data for static generation.
 * Uses the API URL configuration and fetches the first 4 posts.
 *
 * @returns {Promise<{ props: Pick<GetPublicPostsResponse, 'items' | 'totalUsers'>, revalidate: number }>} Static props.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `${API_URLS.BASE_URL}${API_URLS.PUBLIC.GetAllPublicPosts(undefined)}?pageSize=4`
  )
  const data: Pick<GetPublicPostsResponse, 'items' | 'totalUsers'> = await res.json()

  return { props: data, revalidate: 60 }
}
/**
 * Public component for displaying public posts and a total registered users counter.
 * It uses Next.js `getStaticProps` to fetch and render data at build time.
 *
 * Props:
 * - `items` (GetPostResponse[]): List of public posts to display.
 * - `totalUsers` (number): Total count of registered users.
 */
const Public = ({ items, totalUsers }: Pick<GetPublicPostsResponse, 'items' | 'totalUsers'>) => {
  return (
    <>
      <Head>
        <title>Public Page</title>
        <meta
          content={`Public page of Photo Fiesta. Check out the project on GitHub: https://github.com/NoName-ForTeam`}
          name={'description'}
        />
        <meta content={`public, photo, fiesta, github`} name={'keywords'} />
        <meta content={'index, follow'} name={'robots'} />
      </Head>
      <div>
        <RegisteredUsersCounter totalUsers={totalUsers} />
        <PublicPosts items={items} />
      </div>
    </>
  )
}

export default Public
