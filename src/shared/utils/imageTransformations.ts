import { ImageData } from '@/widgets'

export const applyImageTransformations = async (imageData: ImageData) => {
  const img = new window.Image()

  img.crossOrigin = 'Anonymous'
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
