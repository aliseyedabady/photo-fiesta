import { GetPublicPostsResponse, PublicPosts, RegisteredUsersCounter } from '@/features'
import { API_URLS } from '@/shared/config'
import { GetStaticProps } from 'next'
import Head from 'next/head'

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `${API_URLS.BASE_URL}${API_URLS.PUBLIC.GetAllPublicPosts(undefined)}?pageSize=4`
  )
  const data: Pick<GetPublicPostsResponse, 'items' | 'totalUsers'> = await res.json()

  return { props: data, revalidate: 60 }
}

const Home = ({ items, totalUsers }: Pick<GetPublicPostsResponse, 'items' | 'totalUsers'>) => {
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

export default Home
