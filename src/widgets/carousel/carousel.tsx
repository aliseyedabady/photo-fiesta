import { ChangeEvent, useRef, useState } from 'react'
import Slider from 'react-slick'

import { Step } from '@/features'
import { ArrowIosBackOutline, ArrowIosForwardOutline, ImageOutline } from '@/shared/assets'
import { ALLOWED_FORMATS, MAX_FILE_SIZE_FOR_POST, MAX_PHOTOS } from '@/shared/config'
import { ErrorMessage } from '@/widgets'
import { Button } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'
import Image from 'next/image'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import styles from './carousel.module.scss'

type CarouselProps = {
  handleCloseModal: () => void
  photos: string | string[]
  postPhoto?: boolean
  setImage: (image: string[]) => void
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
  setImage,
  step,
}: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [indexArrow, setIndexArrow] = useState(0)
  const [allPhotos, setAllPhotos] = useState<string[]>(Array.isArray(photos) ? photos : [photos])
  const [error, setError] = useState<null | string>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (!files) {
      return
    }

    const newImages: string[] = []
    let hasError = false

    if (allPhotos.length > MAX_PHOTOS) {
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
      const updatedPhotos = [...allPhotos, ...newImages]

      setAllPhotos(updatedPhotos)
      setImage(updatedPhotos)
      setActiveIndex(updatedPhotos.length - 1)
      setIndexArrow(updatedPhotos.length - 1)

      if (postPhoto) {
        handleCloseModal()
      }
    }

    event.target.value = ''
  }
  const classNames = {
    dotsItem: styles.dotsItem,
    dotsItemActive: styles.dotsItemActive,
    error: styles.error,
    icon: styles.icon,
    selectedImage: styles.selectedImage,
    slider: styles.slider,
    visible: styles.visible,
  } as const
  /**
   * Settings for the react-slick slider.
   * These settings configure how the carousel behaves, including arrows, dots, and transition speed.
   */
  const settings = {
    adaptiveHeight: true,
    arrows: allPhotos.length > 1,
    beforeChange: (current: number, next: number) => {
      setActiveIndex(next)
      setIndexArrow(next)
    },
    customPaging: (index: number) => (
      <div
        className={clsx(classNames.dotsItem, {
          [classNames.dotsItemActive]: index === activeIndex,
        })}
      ></div>
    ),
    dots: allPhotos.length > 1,
    infinite: allPhotos.length > 1,
    initialSlide: activeIndex,
    nextArrow: (
      <NextArrowComponent
        indexArrow={indexArrow}
        photosLength={photos?.length}
        setIndexArrow={setIndexArrow}
      />
    ),
    prevArrow: (
      <PrevArrowComponent
        indexArrow={indexArrow}
        photosLength={photos?.length}
        setIndexArrow={setIndexArrow}
      />
    ),
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 500,
  }

  const carousel = allPhotos.map((photo, index) => (
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
      <Slider key={allPhotos.length} {...settings}>
        {carousel}
      </Slider>
      {error && <ErrorMessage error={error} />}
      {step === 'cropping' && (
        <div>
          <Button onClick={handleClick} variant={'icon-link'}>
            <ImageOutline className={classNames.icon} />
          </Button>
          <input
            accept={'image/*'}
            hidden
            multiple
            onChange={handleFileChange}
            ref={fileInputRef}
            type={'file'}
          />
        </div>
      )}
    </div>
  )
}

type ArrowsProps = {
  callbackFunction?: () => void
  indexArrow: number
  onClick?: () => void
  photosLength?: number
  setIndexArrow: (value: number) => void
}
/** NextArrowComponent - Renders the "next" arrow button for the carousel.*/
export const NextArrowComponent = ({
  callbackFunction,
  indexArrow,
  onClick,
  photosLength,
  setIndexArrow,
}: ArrowsProps) => {
  if (
    indexArrow === (photosLength ? photosLength - 1 : 0) ||
    (photosLength ? photosLength : 0) <= 1
  ) {
    return null
  }
  /**
   * Handles the click event for the "next" arrow, advancing the carousel.
   * Updates the slide index and triggers optional callbacks.
   */
  const handleClick = () => {
    setIndexArrow(indexArrow + 1)
    if (callbackFunction) {
      callbackFunction()
    }
    if (onClick) {
      onClick()
    }
  }

  return (
    <Button className={styles.nextArrow} onClick={handleClick} variant={'icon-link'}>
      <ArrowIosForwardOutline />
    </Button>
  )
}
/** PrevArrowComponent - Renders the "previous" arrow button for the carousel.*/
export const PrevArrowComponent = ({
  callbackFunction,
  indexArrow,
  onClick,
  photosLength,
  setIndexArrow,
}: ArrowsProps) => {
  if (indexArrow === 0 || (photosLength ? photosLength : 0) <= 1) {
    return null
  }
  /**
   * Handles the click event for the "previous" arrow, going back in the carousel.
   * Updates the slide index and triggers optional callbacks.
   */
  const handleClick = () => {
    setIndexArrow(indexArrow - 1)
    if (callbackFunction) {
      callbackFunction()
    }
    if (onClick) {
      onClick()
    }
  }

  return (
    <Button className={styles.prevArrow} onClick={handleClick} variant={'icon-link'}>
      <ArrowIosBackOutline />
    </Button>
  )
}
