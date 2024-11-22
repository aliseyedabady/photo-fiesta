import { ROUTES } from '@/shared/config'
import { ModalAddPhoto, SidebarElement, useSidebar } from '@/widgets'
import { MenuMobile } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import styles from './mobileMenu.module.scss'

type MobileMenuProps = {
  className: string
}

/** MobileMenu component for rendering the menu in a mobile view (360px width) */
export const MobileMenu = ({ className }: MobileMenuProps) => {
  const { handleCloseAddPhotoModal, isActive, modalState, setPhotos, sidebarItems } = useSidebar()
  const { isCreateModalOpen } = modalState

  const router = useRouter()
  const isProfileSettingsPage = router.pathname === ROUTES.SETTINGS

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
      key={`${item.href}-${item.text}`}
      onClick={item.onClick}
      text={''}
    />
  ))

  const classNames = {
    container: styles.container,
    root: clsx(styles.root, isProfileSettingsPage && styles.hideOnMobile, className),
  } as const

  //TODO: change adding photos
  return (
    <div className={classNames.root}>
      <MenuMobile className={classNames.container}>{renderSidebarItems}</MenuMobile>
      {isCreateModalOpen && (
        <ModalAddPhoto
          handleAddPhoto={(image: string) => setPhotos(prevPhotos => [...prevPhotos, image])}
          handleCloseModal={handleCloseAddPhotoModal}
          isOpen={isCreateModalOpen}
          postPhoto
        />
      )}
    </div>
  )
}
