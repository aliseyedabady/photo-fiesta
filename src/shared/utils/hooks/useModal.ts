import { useState } from 'react'

type ModalType = '' | 'Error' | 'Success'
type CloseModalType = '' | 'ConfirmClose' | 'ConfirmDelete'

/**
 * This hook provides functionality to control the visibility of a modal
 * and manage its title, as well as handle confirmation actions.
 */
export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState<ModalType>('')
  const [closeModalType, setCloseModalType] = useState<CloseModalType>('')

  const openModal = (type: CloseModalType) => {
    setCloseModalType(type)
    setIsModalOpen(true)
  }

  const handleModalClose = () => setIsModalOpen(false)
  const closeModal = () => {
    setCloseModalType('')
    setIsModalOpen(false)
  }

  return {
    closeModal,
    closeModalType,
    handleModalClose,
    isModalOpen,
    modalTitle,
    openModal,
    setIsModalOpen,
    setModalTitle,
  }
}
