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

export type ImageData = {
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

  // function for applying transformations to an image
  const applyImageTransformations = async (imageData: ImageData) => {
    const img = new window.Image()

    img.src = imageData.src

    await new Promise(resolve => {
      img.onload = resolve
    })

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      return imageData.src
    }

    // calculate scaling
    const scaleX = img.naturalWidth / 100
    const scaleY = img.naturalHeight / 100

    canvas.width = imageData.crop.width * scaleX
    canvas.height = imageData.crop.height * scaleY

    ctx.drawImage(
      img,
      imageData.crop.x * scaleX,
      imageData.crop.y * scaleY,
      imageData.crop.width * scaleX,
      imageData.crop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    )

    return canvas.toDataURL('image/jpeg')
  }

  // update photos with transformed images
  useEffect(() => {
    const updatePhotos = async () => {
      const transformedPhotos = await Promise.all(
        imagesData.map(img => applyImageTransformations(img))
      )

      setPhotos(transformedPhotos)
    }

    updatePhotos()
  }, [imagesData, setPhotos])

  // handle file change
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (!files) {
      return
    }

    const newImages: ImageData[] = []
    let hasError = false

    if (photos.length + newImages.length > MAX_PHOTOS) {
      setError('You can only upload up to 10 photos')

      return
    }

    Array.from(files).forEach(file => {
      if (!ALLOWED_FORMATS.includes(file.type)) {
        setError('The format of the uploaded photo must be PNG or JPEG')
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
      prev.map((img, index) => (index === activeIndex ? { ...img, crop } : img))
    )
  }

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

  return (
    <div className={styles.slider}>
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
