import { ChangeEvent, useRef } from 'react'

import { ImageOutline } from '@/shared/assets'
import { Button } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'

import styles from './imageControlButtons.module.scss'

import { ExpandPhotoButton } from './expandPhotoButton'
import { ZoomPhotoButton } from './zoomPhotoButton'
type ButtonsBlockProps = {
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const ImageControlButtons = ({ handleFileChange }: ButtonsBlockProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddPhoto = () => {
    fileInputRef.current?.click()
  }

  const classNames = {
    addPhoto: styles.addPhoto,
    icon: styles.icon,
    wrapper: styles.wrapper,
  } as const

  return (
    <div>
      {/*TODO: extract to component addPhotoButton and add popover for add button*/}
      <div className={clsx(classNames.wrapper, classNames.addPhoto)}>
        <Button asChild onClick={handleAddPhoto} variant={'icon-link'}>
          <ImageOutline className={classNames.icon} />
        </Button>
      </div>

      <ExpandPhotoButton />
      <ZoomPhotoButton />
      <input
        accept={'image/*'}
        hidden
        multiple
        onChange={handleFileChange}
        ref={fileInputRef}
        type={'file'}
      />
    </div>
  )
}
