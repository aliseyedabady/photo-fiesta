import ReactCrop, { Crop } from 'react-image-crop'

import Image from 'next/image'

import styles from './imageRenderer.module.scss'

import { ImageData } from '../carousel'

type ImageRendererProps = {
  imageData: ImageData
  index: number
  onCropChange: (crop: Crop) => void
  step: string | undefined
}

/**
 * Renders an image with optional cropping capabilities.
 */
export const ImageRenderer = ({ imageData, index, onCropChange, step }: ImageRendererProps) => {
  const commonProps = {
    alt: `Image ${index + 1}`,
    className: styles.selectedImage,
    height: 432,
    src: imageData.src,
    style: {
      transform: `scale(${imageData.zoom})`,
    },
    width: 492,
  }

  if (step === 'cropping') {
    return (
      <ReactCrop
        aspect={imageData.aspectRatio.value ?? undefined}
        crop={imageData.crop}
        onChange={(_, percentCrop) => onCropChange(percentCrop)}
      >
        <Image {...commonProps} />
      </ReactCrop>
    )
  }

  return <Image {...commonProps} />
}
