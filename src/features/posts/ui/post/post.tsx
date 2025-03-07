import { Avatar, PostForm } from '@/features'
import { PinOutline } from '@/shared/assets'
import { ProfileAvatar } from '@/shared/ui'
import { Typography } from '@photo-fiesta/ui-lib'

import styles from './post.module.scss'

export type Step = 'cropping' | 'filters' | 'publication'

type PostProps = {
  avatar: Avatar[] | undefined
  handleClose: () => void
  photos: string[]
  postId?: number
  setIsEditing: (isEditing: boolean) => void
  step: Step
  userId: number | undefined
}

/**
 * The Post component represents a section of modal with different steps like cropping, filters, and publication.
 */

export const Post = ({
  avatar,
  handleClose,
  photos,
  postId,
  setIsEditing,
  step,
  userId,
}: PostProps) => {
  if (step === 'publication') {
    return (
      <section className={styles.formSection}>
        <div className={styles.profileInfo}>
          <ProfileAvatar avatarOwner={avatar?.[0].url} />
          <Typography variant={'h3'}>{userId}</Typography>
        </div>
        <div className={styles.form}>
          <PostForm
            handleClose={handleClose}
            photos={photos}
            postId={postId}
            setIsEditing={setIsEditing}
          />
        </div>
        <div className={styles.locationContainer}>
          <Typography>
            <label className={styles.locationLabel}>Add location</label>
            <div className={styles.textareaWrapper}>
              <textarea className={styles.location} name={'location'} placeholder={'NewYork'} />
              <PinOutline className={styles.icon} />
            </div>
          </Typography>
        </div>
      </section>
    )
  }

  if (step === 'filters') {
    return (
      <div className={styles.filterSection}>
        <Typography variant={'h3'}>Apply Filters</Typography>
        {/* Здесь могут быть ползунки фильтров и другие элементы */}
      </div>
    )
  }

  return null // Если step === 'cropping', правая часть не отображается
}
