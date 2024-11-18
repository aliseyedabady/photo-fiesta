import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Avatar, GetPublicPostsResponse, ImagePostModal, useGetUserPostsQuery } from '@/features'
import { ImageOutline } from '@/shared/assets'
import { Loader } from '@/shared/ui'
import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from './postList.module.scss'

type PostListProps = {
  avatar: Avatar[] | undefined
  initialPosts: GetPublicPostsResponse
  userId: number
}

export const PostList = ({ avatar, initialPosts, userId }: PostListProps) => {
  const router = useRouter()
  const { postId, ...restQuery } = router.query

  const [endCursorPostId, setEndCursorPostId] = useState<null | number>(
    initialPosts.items[initialPosts.items.length - 1]?.id || null
  )

  const { data, isLoading } = useGetUserPostsQuery(
    {
      endCursorPostId: endCursorPostId || 0,
      pageSize: 8,
      sortBy: 'createdAt',
      sortDirection: 'desc',
      userId,
    },
    { skip: !endCursorPostId === null }
  )

  const [openModal, setOpenModal] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<null | number>(null)
  const [selectedImage, setSelectedImage] = useState<null | string | string[]>(null)

  const [posts, setPosts] = useState(initialPosts.items)
  const [hasMore, setHasMore] = useState(posts.length < initialPosts.totalCount)

  useEffect(() => {
    setPosts(initialPosts.items)
    setEndCursorPostId(initialPosts.items[initialPosts.items.length - 1]?.id || null)
    setHasMore(initialPosts.items.length < initialPosts.totalCount)
  }, [userId, initialPosts])

  const classNames = {
    image: styles.image,
    postGrid: styles.postGrid,
  } as const

  useEffect(() => {
    if (postId) {
      const parsedPostId = Number(postId)
      const post = posts.find(p => p.id === parsedPostId)

      if (post) {
        setSelectedPostId(parsedPostId)
        setSelectedImage(post.images[0]?.url)
        setOpenModal(true)
      }
    }
  }, [postId, posts])

  const handleOpenImageModal = (postId: number, imageUrl: string) => {
    setSelectedPostId(postId)
    setSelectedImage(imageUrl)
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedPostId(null)
    setSelectedImage(null)

    router.push(
      {
        pathname: router.pathname,
        query: restQuery,
      },
      undefined,
      { shallow: true }
    )
  }

  const loadMorePosts = () => {
    if (data?.items.length) {
      setPosts(prevPosts => {
        const newPosts = data.items.filter(
          newPost => !prevPosts.some(post => post.id === newPost.id)
        )

        return [...prevPosts, ...newPosts]
      })
      setEndCursorPostId(data.items[data.items.length - 1]?.id || null)
      setHasMore(data.items.length >= 8)
    } else {
      setHasMore(false)
    }
  }

  if (!posts?.length) {
    return (
      <div className={styles.placeholder}>
        <ImageOutline className={styles.icon} />
      </div>
    )
  }

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        hasMore={hasMore}
        loader={isLoading ? <Loader /> : null}
        next={loadMorePosts}
      >
        <div className={classNames.postGrid}>
          {posts?.map(post => (
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
      </InfiniteScroll>
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
