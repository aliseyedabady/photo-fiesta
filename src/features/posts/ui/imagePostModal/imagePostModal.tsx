import { forwardRef, useState } from 'react'

import {
  Avatar,
  PostForm,
  useDeletePostMutation,
  useDeleteUploadImageMutation,
  useGetPostByIdQuery,
} from '@/features'
import { Close, CloseOutline, Edit2, MoreHorizontalOutline } from '@/shared/assets'
import { PopoverContent, PopoverRoot, PopoverTrigger, ProfileAvatar } from '@/shared/ui'
import { useChangeTitle } from '@/shared/utils'
import { Carousel, ConfirmationModal } from '@/widgets'
import { Button, Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'

import styles from './imagePostModal.module.scss'

type ImagePostModalProps = {
  avatar: Avatar[] | undefined
  handleClose: () => void
  postId: number | undefined
  // selectedImage: null | string
  selectedImage: null | string | string[]
  setSelectedImage: (image: null | string | string[]) => void
  userId: number | undefined
  viewMode?: boolean
}

/**
 * A modal component for display creating and editing image posts.
 *
 * @example
 * <ImagePostModal
 *   avatar={avatarData}
 *   handleClose={handleCloseModal}
 *   postId={postId}
 *   selectedImage={selectedImage}
 *   userId={userId}
 *   viewMode={true}
 * />
 */

export const ImagePostModal = forwardRef<HTMLFormElement, ImagePostModalProps>(
  ({ avatar, handleClose, postId, selectedImage, setSelectedImage, userId, viewMode = false }) => {
    const { data: postById } = useGetPostByIdQuery({ postId }, { skip: !postId })
    const [deleteImage] = useDeleteUploadImageMutation()
    const [deletePost] = useDeletePostMutation()

    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false)
    const [showConfirmCloseModal, setShowConfirmCloseModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const { getStepTitle } = useChangeTitle({ isEditing, viewMode })

    /** Delete post function */
    const confirmDelete = async () => {
      if (postId) {
        if (selectedImage) {
          /**  Delete the image, and if the operation is successful, then delete all posts with the same description */
          await deleteImage({ uploadId: selectedImage })
        }
        await deletePost({ postId })
      }
      handleClose()
    }

    const classNames = {
      body: styles.body,
      closeIcon: styles.closeIcon,
      header: styles.header,
      icon: styles.icon,
      imageSection: styles.imageSection,
      info: styles.info,
      modalContent: styles.modalContent,
      overlay: styles.overlay,
      popover: styles.popover,
      postDetails: styles.postDetails,
      profileInfo: styles.profileInfo,
      viewMode: styles.viewMode,
    }
    // TODO: addTranslate

    return (
      <div className={classNames.overlay}>
        <div className={clsx(classNames.modalContent)}>
          {!isEditing && <CloseOutline className={classNames.closeIcon} onClick={handleClose} />}
          {isEditing && (
            <div className={classNames.header}>
              <Typography variant={'h1'}>{getStepTitle()}</Typography>
              <Close onClick={() => setShowConfirmCloseModal(true)} />
            </div>
          )}
          <div className={classNames.body}>
            <section className={classNames.imageSection}>
              {selectedImage ? (
                <Carousel
                  handleCloseModal={handleClose}
                  photos={selectedImage}
                  // postPhoto
                  setImage={setSelectedImage}
                />
              ) : (
                <Typography variant={'h2'}>No image selected</Typography>
              )}
            </section>
            <section className={classNames.viewMode}>
              <div className={classNames.info}>
                <div className={classNames.profileInfo}>
                  <ProfileAvatar avatarOwner={avatar?.[0]?.url} />
                  <Typography variant={'h3'}>{userId}</Typography>
                </div>
                <div className={classNames.popover}>
                  <PopoverRoot>
                    <PopoverTrigger asChild>
                      <MoreHorizontalOutline className={classNames.icon} />
                    </PopoverTrigger>
                    <PopoverContent align={'start'} alignOffset={20} side={'right'} sideOffset={1}>
                      <Button onClick={() => setIsEditing(true)} variant={'icon-link'}>
                        <Edit2 className={classNames.icon} />
                        Edit Post
                      </Button>
                      <Button onClick={() => setShowConfirmDeleteModal(true)} variant={'icon-link'}>
                        <CloseOutline className={classNames.icon} />
                        Delete Post
                      </Button>
                    </PopoverContent>
                  </PopoverRoot>
                </div>
              </div>
              <div className={classNames.postDetails}>
                {isEditing ? (
                  <div>
                    <PostForm
                      handleClose={handleClose}
                      isEditing
                      postId={postId}
                      selectedImage={selectedImage}
                      setIsEditing={setIsEditing}
                    />
                    {showConfirmCloseModal && (
                      <ConfirmationModal
                        closeModal={() => setShowConfirmCloseModal(false)}
                        confirmation={handleClose}
                        content={
                          'Do you really want to close the edition of the publication? If you close changes won`t be saved'
                        }
                        isOpen={showConfirmCloseModal}
                        isTwoButtons
                        title={'Close Post'}
                      />
                    )}
                  </div>
                ) : (
                  <Typography variant={'h3'}>{postById?.description}</Typography> // Иначе показываем описание
                )}
                {showConfirmDeleteModal && (
                  <ConfirmationModal
                    closeModal={() => setShowConfirmDeleteModal(false)}
                    confirmation={confirmDelete}
                    content={'Are you sure you want to delete this post?'}
                    isOpen={showConfirmDeleteModal}
                    isTwoButtons
                    title={'Delete Post'}
                  />
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }
)
