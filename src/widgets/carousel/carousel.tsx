import { ChangeEvent, useState } from 'react'

import { Step } from '@/features'
import { ALLOWED_FORMATS, MAX_FILE_SIZE_FOR_POST, MAX_PHOTOS } from '@/shared/config'
import { CustomSlider } from '@/shared/ui'
import { ErrorMessage } from '@/widgets'
import Image from 'next/image'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import styles from './carousel.module.scss'

import { NextArrow, PrevArrow } from './carouselArrows'
import { ImageControlButtons } from './imageControlButtons'

type CarouselProps = {
  handleCloseModal: () => void
  photos: string[]
  postPhoto?: boolean
  setPhotos: (image: string[]) => void
  step?: Step
}
/**
 * Carousel component for displaying images in a slider, with the ability to add more images.
 * It includes navigation arrows for browsing through images and logic for handling file input and image uploads.
 */
export const Carousel = ({
  handleCloseModal,
  photos,
  postPhoto,
  setPhotos,
  step,
}: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [indexArrow, setIndexArrow] = useState(0)
  const [error, setError] = useState<null | string>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (!files) {
      return
    }

    const newImages: string[] = []
    let hasError = false

    if (photos.length > MAX_PHOTOS) {
      setError('You can only upload 10 photos')

      return
    }

    Array.from(files).forEach(file => {
      if (!ALLOWED_FORMATS.includes(file.type)) {
        setError('The format of the uploaded photo must be PNG and JPEG')
        hasError = true

        return
      }

      if (file.size > MAX_FILE_SIZE_FOR_POST) {
        setError('Photo size must be less than 20 MB!')
        hasError = true

        return
      }

      newImages.push(URL.createObjectURL(file))
    })

    if (!hasError) {
      setError(null)
      const updatedPhotos = [...photos, ...newImages]

      setPhotos(updatedPhotos)
      setActiveIndex(updatedPhotos.length - 1)
      setIndexArrow(updatedPhotos.length - 1)

      if (postPhoto) {
        handleCloseModal()
      }
    }

    event.target.value = ''
  }
  const classNames = {
    selectedImage: styles.selectedImage,
    slider: styles.slider,
  } as const

  const carousel = photos.map((photo, index) => (
    <div key={index}>
      <Image
        alt={`Image ${index + 1}`}
        className={classNames.selectedImage}
        height={432}
        src={photo}
        width={492}
      />
    </div>
  ))

  // TODO: logic for cropping step
  return (
    <div className={classNames.slider}>
      <CustomSlider
        NextArrow={NextArrow}
        PrevArrow={PrevArrow}
        activeIndex={activeIndex}
        indexArrow={indexArrow}
        photosLength={photos.length}
        setActiveIndex={setActiveIndex}
        setIndexArrow={setIndexArrow}
      >
        {carousel}
      </CustomSlider>
      {error && <ErrorMessage error={error} />}
      {step === 'cropping' && <ImageControlButtons handleFileChange={handleFileChange} />}
    </div>
  )
}
