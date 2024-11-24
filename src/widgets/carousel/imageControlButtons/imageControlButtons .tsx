import { ChangeEvent, useRef } from 'react'

import { ImageOutline } from '@/shared/assets'
import { Button } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'

import styles from './imageControlButtons.module.scss'

import { ExpandPhotoButton } from './expandPhotoButton'
import { ZoomPhotoButton } from './zoomPhotoButton'

type ButtonsBlockProps = {
  currentAspectRatio: { label: string; value: null | number }
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
  onAspectRatioChange: (newAspectRatio: { label: string; value: null | number }) => void
  onZoomChange: (newZoom: number) => void
  zoom: number
}

export const ImageControlButtons = ({
  currentAspectRatio,
  handleFileChange,
  onAspectRatioChange,
  onZoomChange,
  zoom,
}: ButtonsBlockProps) => {
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

      <ExpandPhotoButton
        currentAspectRatio={currentAspectRatio}
        onAspectRatioChange={onAspectRatioChange}
      />
      <ZoomPhotoButton onZoomChange={onZoomChange} zoom={zoom} />
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
