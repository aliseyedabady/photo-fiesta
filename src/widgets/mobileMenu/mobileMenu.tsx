import { ROUTES } from '@/shared/config'
import { ModalAddPhoto, SidebarElement } from '@/widgets'
import { useSidebar } from '@/widgets/sidebar/useSidebar'
import { MenuMobile } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'

import styles from './mobileMenu.module.scss'

/** Props of MobileMenu component */
type MobileMenuProps = {
  className: string
}

/** MobileMenu component for rendering menu in a mobile view */
export const MobileMenu = ({ className }: MobileMenuProps) => {
  const { handleCloseAddPhotoModal, isActive, modalState, setSelectedImage, sidebarItems } =
    useSidebar()
  const { isCreateModalOpen } = modalState

  const renderSidebarItems = [
    /** to exclude Statics and Favorites, and to move Profile to the end */
    ...sidebarItems.filter(
      item =>
        !item.href.startsWith(ROUTES.STATICS) &&
        !item.href.startsWith(ROUTES.FAVORITES) &&
        !item.href.startsWith(ROUTES.PROFILE)
    ),
    ...sidebarItems.filter(item => item.href.startsWith(ROUTES.PROFILE)),
  ].map(item => (
    <SidebarElement
      href={item.href}
      icon={item.icon}
      isActive={path => isActive(item.isActiveOverride || path)}
      key={item.href}
      onClick={item.onClick}
      text={''}
    />
  ))

  const classNames = {
    mobileMenuContainer: styles.mobileMenuContainer,
    mobileMenuRootContainer: clsx(styles.mobileMenuRootContainer, className),
  } as const

  return (
    <div className={classNames.mobileMenuRootContainer}>
      <MenuMobile className={classNames.mobileMenuContainer}>{renderSidebarItems}</MenuMobile>
      {isCreateModalOpen && (
        <ModalAddPhoto
          handleCloseModal={handleCloseAddPhotoModal}
          isOpen={isCreateModalOpen}
          postPhoto
          setImage={setSelectedImage}
        />
      )}
    </div>
  )
}
