import { useEffect, useState } from 'react'

import { Avatar, GetPublicPostsResponse } from '@/features'
import { ImagePostModal } from '@/features/posts'
import { ImageOutline } from '@/shared/assets'
import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from './postList.module.scss'

type Props = {
  avatar: Avatar[] | undefined
  posts: GetPublicPostsResponse
  userId: number
}

export const PostList = ({ avatar, posts, userId }: Props) => {
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<null | number>(null)
  const [selectedImage, setSelectedImage] = useState<null | string | string[]>(null)

  const classNames = {
    image: styles.image,
    postGrid: styles.postGrid,
  } as const

  useEffect(() => {
    if (router.query.postId) {
      const postId = Number(router.query.postId)
      const post = posts.items.find(p => p.id === postId)

      if (post) {
        setSelectedPostId(postId)
        setSelectedImage(post.images[0]?.url)
        setOpenModal(true)
      }
    }
  }, [router.query.postId, posts])

  const handleOpenImageModal = (postId: number, imageUrl: string) => {
    setSelectedPostId(postId)
    setSelectedImage(imageUrl)
    setOpenModal(true)
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, postId: postId.toString() },
      },
      undefined,
      { shallow: true }
    )
  }
  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedPostId(null)
    setSelectedImage(null)

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { postId, ...restQuery } = router.query

    router.push(
      {
        pathname: router.pathname,
        query: restQuery,
      },
      undefined,
      { shallow: true }
    )
  }

  if (!posts?.items.length) {
    return (
      <div className={styles.placeholder}>
        <ImageOutline className={styles.icon} />
      </div>
    )
  }

  // TODO: scroll for posts
  return (
    <>
      <div className={classNames.postGrid}>
        {posts?.items.map(post => (
          <Image
            alt={'post image'}
            className={classNames.image}
            height={228}
            key={post.id}
            onClick={() => handleOpenImageModal(post.id, post.images[0]?.url)}
            src={post.images[0]?.url}
            width={234}
          />
        ))}
      </div>
      {openModal && selectedPostId && selectedImage && (
        <div className={styles.postModal}>
          <ImagePostModal
            avatar={avatar}
            handleClose={handleCloseModal}
            postId={selectedPostId}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            userId={userId}
            viewMode
          />
        </div>
      )}
    </>
  )
}
