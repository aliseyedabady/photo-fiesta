import { GetPublicPostsResponse } from '@/features'
import { ProfileAvatar, RegisteredUsersCounter } from '@/shared/ui'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import styles from '@/features/public/publicPage.module.scss'

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://inctagram.work/api/v1/public-posts/all/,?pageSize=4')
  const data: Pick<GetPublicPostsResponse, 'items' | 'totalUsers'> = await res.json()

  return { props: data, revalidate: 60 }
}

const Home = ({ items, totalUsers }: Pick<GetPublicPostsResponse, 'items' | 'totalUsers'>) => {
  // const router = useRouter()

  console.log(items)
  console.log(totalUsers)
  const classNames = {
    container: styles.container,
    posts: styles.posts,
  } as const

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const token = Storage.getToken()
  //
  //     if (!token) {
  //       router.push(ROUTES.PUBLIC)
  //
  //       return
  //     } else {
  //       router.push(ROUTES.HOME)
  //
  //       return
  //     }
  //   }
  //
  //   checkAuth()
  // }, [router])
  //
  // return <Loader />
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
                  // className={classNames.image}
                  height={228}
                  // key={post.id}
                  // onClick={() => handleOpenImageModal(post.id, post.images[0]?.url)}
                  src={post.images[0]?.url}
                  width={234}
                />
                <div>
                  <ProfileAvatar avatarOwner={post.avatarOwner} />
                </div>
                <div>{post.userName}</div>
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
