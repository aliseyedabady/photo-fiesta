import { useState } from 'react'

import { Avatar, GetPublicPostsResponse } from '@/features'
import { ImagePostModal } from '@/features/posts'
import { ImageOutline } from '@/shared/assets'
import Image from 'next/image'

import styles from './postList.module.scss'

type Props = {
  avatar: Avatar[] | undefined
  posts: GetPublicPostsResponse
  userId: number
}

export const PostList = ({ avatar, posts, userId }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<null | number>(null)
  const [selectedImage, setSelectedImage] = useState<null | string | string[]>(null)

  console.log(posts)
  console.log(userId)

  if (!posts?.items.length) {
    return (
      <div className={styles.placeholder}>
        <ImageOutline className={styles.icon} />
      </div>
    )
  }

  const handleOpenImageModal = (postId: number, imageUrl: string) => {
    setSelectedPostId(postId)
    setSelectedImage(imageUrl)
    setOpenModal(true)
  }

  const classNames = {
    image: styles.image,
    postGrid: styles.postGrid,
  } as const

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
            handleClose={() => setOpenModal(false)}
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
