import { CloseOutline } from '@/shared/assets'
import {
  Button,
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Typography,
} from '@photo-fiesta/ui-lib'

import styles from './confirmationModal.module.scss'

type ModalProps = {
  buttonTitle?: string
  closeModal: () => void
  content: string
  handleConfirmation: () => void
  isOpen: boolean
  //*  show only one button if false, default true
  isTwoButtons?: boolean
  pushNo?: () => void
  title: null | string
}
//TODO: add translations
export const ConfirmationModal = ({
  buttonTitle = 'Ok',
  closeModal,
  content,
  handleConfirmation,
  isOpen,
  isTwoButtons = true,
  pushNo,
  title,
}: ModalProps) => {
  const classNames = {
    container: styles.container,
    content: styles.content,
    description: styles.description,
    footer: styles.footer,
    header: styles.header,
    icon: styles.icon,
    one: styles.one,
  } as const

  return (
    <Modal onOpenChange={closeModal} open={isOpen}>
      <ModalContent className={classNames.content}>
        <ModalHeader className={classNames.header}>
          <ModalTitle>
            <Typography variant={'h1'}>{title}</Typography>
          </ModalTitle>
          <ModalClose onClick={closeModal}>
            <CloseOutline className={classNames.icon} />
          </ModalClose>
        </ModalHeader>
        <div className={classNames.container}>
          <Typography className={classNames.description} variant={'text16'}>
            {content}
          </Typography>
          <ModalFooter className={classNames.footer}>
            {isTwoButtons && (
              // TODO: create names in buttons by props
              <>
                <Button onClick={pushNo ? pushNo : closeModal} variant={'secondary'}>
                  No
                </Button>
                <Button onClick={handleConfirmation} variant={'primary'}>
                  Yes
                </Button>
              </>
            )}
            {!isTwoButtons && (
              <Button
                className={classNames.one}
                fullWidth
                onClick={handleConfirmation}
                variant={'primary'}
              >
                {buttonTitle}
              </Button>
            )}
          </ModalFooter>
        </div>
      </ModalContent>
    </Modal>
  )
}
