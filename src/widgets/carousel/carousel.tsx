import { ChangeEvent, useEffect, useState } from 'react'
import ReactCrop, { Crop } from 'react-image-crop'

import { Step } from '@/features'
import { ALLOWED_FORMATS, MAX_FILE_SIZE_FOR_POST, MAX_PHOTOS } from '@/shared/config'
import { CustomSlider } from '@/shared/ui'
import { ErrorMessage } from '@/widgets'
import Image from 'next/image'

import 'react-image-crop/dist/ReactCrop.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import styles from './carousel.module.scss'

import { NextArrow, PrevArrow } from './carouselArrows'
import { ImageControlButtons } from './imageControlButtons'

type ImageData = {
  aspectRatio: { label: string; value: null | number }
  crop: Crop
  src: string
  zoom: number
}
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
  const [imagesData, setImagesData] = useState<ImageData[]>(
    photos.map(photo => ({
      aspectRatio: { label: 'Original', value: null },
      crop: { height: 100, unit: '%', width: 100, x: 0, y: 0 },
      src: photo,
      zoom: 1,
    }))
  )

  useEffect(() => {
    setPhotos(imagesData.map(img => img.src))
  }, [imagesData, setPhotos])

  useEffect(() => {
    const currentImage = imagesData[activeIndex]

    if (currentImage && currentImage.aspectRatio.value) {
      const { height, width } = currentImage.crop
      const aspect = currentImage.aspectRatio.value
      const newHeight = width / aspect
      const newCrop = {
        ...currentImage.crop,
        aspect: aspect,
        height: newHeight > height ? height : newHeight,
      }

      handleCropChange(newCrop)
    }
  }, [imagesData[activeIndex]?.aspectRatio, activeIndex])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (!files) {
      return
    }

    const newImages: ImageData[] = []
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

      newImages.push({
        aspectRatio: { label: 'Original', value: null },
        crop: { height: 100, unit: '%', width: 100, x: 0, y: 0 },
        src: URL.createObjectURL(file),
        zoom: 1,
      })
    })

    if (!hasError) {
      setError(null)
      setImagesData(prev => [...prev, ...newImages])
      setActiveIndex(imagesData.length + newImages.length - 1)
      setIndexArrow(imagesData.length + newImages.length - 1)

      if (postPhoto) {
        handleCloseModal()
      }
    }

    event.target.value = ''
  }

  const handleZoomChange = (newZoom: number) => {
    setImagesData(prev =>
      prev.map((img, index) => (index === activeIndex ? { ...img, zoom: newZoom } : img))
    )
  }

  const handleAspectRatioChange = (newAspectRatio: { label: string; value: null | number }) => {
    setImagesData(prev =>
      prev.map((img, index) =>
        index === activeIndex
          ? {
              ...img,
              aspectRatio: newAspectRatio,
              crop: { ...img.crop, aspect: newAspectRatio.value ?? undefined },
            }
          : img
      )
    )
  }

  const handleCropChange = (crop: Crop) => {
    setImagesData(prev =>
      prev.map((img, index) =>
        index === activeIndex
          ? { ...img, crop: { ...crop, aspect: img.aspectRatio.value ?? undefined } }
          : img
      )
    )
  }

  const classNames = {
    selectedImage: styles.selectedImage,
    slider: styles.slider,
  } as const

  const carousel = imagesData.map((imageData, index) => (
    <div key={index}>
      <ReactCrop
        aspect={imageData.aspectRatio.value ?? undefined}
        crop={imageData.crop}
        onChange={(_, percentCrop) => handleCropChange(percentCrop)}
      >
        <Image
          alt={`Image ${index + 1}`}
          className={styles.selectedImage}
          height={432}
          src={imageData.src}
          style={{
            transform: `scale(${imageData.zoom})`,
          }}
          width={492}
        />
      </ReactCrop>
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
      {step === 'cropping' && (
        <ImageControlButtons
          currentAspectRatio={imagesData[activeIndex].aspectRatio}
          handleFileChange={handleFileChange}
          onAspectRatioChange={handleAspectRatioChange}
          onZoomChange={handleZoomChange}
          zoom={imagesData[activeIndex].zoom}
        />
      )}
    </div>
  )
}
