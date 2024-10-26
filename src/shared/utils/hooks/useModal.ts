import { useState } from 'react'

type ModalType = '' | 'Error' | 'Success'

/**
 * This hook provides functionality to control the visibility of a modal
 * and manage its title, as well as handle confirmation actions.
 */
export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState<ModalType>('')
  const handleModalClose = () => setIsModalOpen(false)

  return {
    handleModalClose,
    isModalOpen,
    modalTitle,
    setIsModalOpen,
    setModalTitle,
  }
}
