import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { ALLOWED_FORMATS, MAX_FILE_SIZE } from '@/shared/config'

type UseModalAddPhotoProps = {
  handleCloseModal: () => void
  isOpen?: boolean
  postPhoto?: boolean
  setImage?: (image: null | string) => void
  setImages?: React.Dispatch<React.SetStateAction<string[]>>
}

export const useModalAddPhoto = ({
  handleCloseModal,
  isOpen,
  postPhoto = false,
  setImage,
  setImages,
}: UseModalAddPhotoProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<null | string>(null)
  const [selectedImage, setSelectedImage] = useState<null | string>(null)
  const [selectedImages, setSelectedImages] = useState<null | string[]>(null)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setSelectedImage(null)
      setSelectedImages([])
      setError(null)
      setIsSaved(false)
    }
  }, [isOpen])

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

    Array.from(files).forEach(file => {
      if (!ALLOWED_FORMATS.includes(file.type)) {
        setError('The format of the uploaded photo must be PNG and JPEG')
        hasError = true

        return
      }

      if (file.size > MAX_FILE_SIZE) {
        setError('Photo size must be less than 10 MB!')
        hasError = true

        return
      }

      const reader = new FileReader()

      reader.onload = e => {
        const image = e.target?.result as string

        newImages.push(image)

        if (setImage) {
          setSelectedImage(image)

          postPhoto && setImage(image)
        } else if (setImages) {
          setSelectedImages(prev => [...(prev || []), image])
          setImages(prev => [...prev, image])
        }

        if (postPhoto) {
          setIsSaved(true)
          handleCloseModal()
        }
      }
      reader.readAsDataURL(file)
    })

    if (!hasError) {
      setError(null)
    }

    event.target.value = ''
  }

  const handleSave = () => {
    if (setImage && selectedImage) {
      setImage(selectedImage)
      setIsSaved(true)
      handleCloseModal()
    } else if (setImages && selectedImages && selectedImages?.length > 0) {
      setImages(selectedImages)
      setIsSaved(true)
      handleCloseModal()
    }
    setError(null)
  }

  return {
    error,
    fileInputRef,
    handleClick,
    handleFileChange,
    handleSave,
    isSaved,
    selectedImage,
  }
}
