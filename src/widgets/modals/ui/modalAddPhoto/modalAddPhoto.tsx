import { CloseOutline, ImageOutline } from '@/shared/assets'
import { ErrorMessage } from '@/widgets/errorMessage'
import {
  Button,
  Modal,
  ModalClose,
  ModalContent,
  ModalHeader,
  Typography,
} from '@photo-fiesta/ui-lib'
import Image from 'next/image'

import styles from './modalAddPhoto.module.scss'

import { useModalAddPhoto } from './useModalAddPhoto'

type ModalAddPhotoProps = {
  handleAddPhoto?: (photo: string) => void
  handleCloseModal: () => void
  isOpen: boolean
  postPhoto?: boolean
  setImage?: (image: null | string) => void
}

/**
 * ModalAddPhoto component for adding or changing  photo from the user's computer
 * @example
 *     <ModalAddPhoto
 *       handleCloseModal={() => setIsModalOpen(false)}
 *       isOpen={isModalOpen}
 *       setImage={(newImage) => {
 *         setProfileImage(newImage);
 *         setIsModalOpen(false);
 *       }}
 *     />
 */
//TODO: add translations
export const ModalAddPhoto = ({
  handleAddPhoto,
  handleCloseModal,
  isOpen,
  postPhoto,
  setImage,
}: ModalAddPhotoProps) => {
  const { error, fileInputRef, handleClick, handleFileChange, handleSave, isSaved, selectedImage } =
    useModalAddPhoto({ handleAddPhoto, handleCloseModal, isOpen, postPhoto, setImage })

  const classNames = {
    block: styles.block,
    close: styles.close,
    content: styles.content,
    error: styles.error,
    header: styles.header,
    main: styles.main,
    photoPreview: styles.photoPreview,
    save: styles.save,
    visible: styles.visible,
  } as const

  return (
    <Modal open={isOpen}>
      <ModalContent className={classNames.content}>
        <ModalHeader className={classNames.header}>
          <Typography variant={'h1'}>Add a Profile Photo</Typography>
          <ModalClose>
            <CloseOutline className={classNames.close} onClick={handleCloseModal} />
          </ModalClose>
        </ModalHeader>
        <div className={classNames.main}>
          {error && <ErrorMessage error={error} />}
          <div className={classNames.block}>
            <PhotoPreview image={selectedImage} preview={classNames.photoPreview} size={228} />
            <input
              accept={'image/*'}
              hidden
              onChange={handleFileChange}
              ref={fileInputRef}
              type={'file'}
            />
            {!selectedImage && !isSaved && (
              <Button fullWidth onClick={handleClick}>
                Select from Computer
              </Button>
            )}
            {selectedImage && !error && !isSaved && (
              <Button className={classNames.save} onClick={handleSave}>
                Save
              </Button>
            )}
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

type PhotoPreviewProps = {
  image: null | string
  preview: string
  size: number
}

const PhotoPreview = ({ image, preview, size }: PhotoPreviewProps) => {
  const classNames = {
    icon: styles.icon,
    imageWrapper: styles.imageWrapper,
    placeholder: styles.placeholder,
  } as const

  return (
    <div className={preview}>
      {image ? (
        <div className={classNames.imageWrapper}>
          <Image alt={'Uploaded'} height={size} src={image} width={size} />
        </div>
      ) : (
        <span className={classNames.placeholder}>
          <ImageOutline className={classNames.icon} />
        </span>
      )}
    </div>
  )
}
