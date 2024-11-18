import { GetPublicPostsResponse } from '@/features'
import { API_URLS, ROUTES } from '@/shared/config'
import { ProfileAvatar, RegisteredUsersCounter } from '@/shared/ui'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from '@/features/public/publicPage.module.scss'

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `${API_URLS.BASE_URL}${API_URLS.PUBLIC.GetAllPublicPosts(undefined)}?pageSize=4`
  )
  const data: Pick<GetPublicPostsResponse, 'items' | 'totalUsers'> = await res.json()

  return { props: data, revalidate: 60 }
}

const Home = ({ items, totalUsers }: Pick<GetPublicPostsResponse, 'items' | 'totalUsers'>) => {
  const router = useRouter()

  const handlePostClick = (ownerId: number, postId: number) => {
    router.push(
      {
        pathname: `${ROUTES.PROFILE}/${ownerId}`,
        query: { postId: postId.toString() },
      },
      undefined,
      { shallow: true }
    )
  }

  const classNames = {
    container: styles.container,
    posts: styles.posts,
  } as const

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
      <div className={classNames.container}>
        <RegisteredUsersCounter totalUsers={totalUsers} />
        <div className={classNames.posts}>
          {items && items.length > 0 ? (
            items?.map(post => (
              <div key={post.id}>
                <Image
                  alt={'post image'}
                  height={228}
                  onClick={() => handlePostClick(post.ownerId, post.id)}
                  src={post.images[0]?.url}
                  width={234}
                />
                <Link href={`${ROUTES.PROFILE}/${post.ownerId}`}>
                  <ProfileAvatar avatarOwner={post.avatarOwner} />
                  <div>{post.userName}</div>
                </Link>
                <div>{post.createdAt}</div>
                <div>{post.description}</div>
              </div>
            ))
          ) : (
            <div>No posts available</div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
