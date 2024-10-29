import { useState } from 'react'

import { useProfile } from '@/features'
import { LogOut, MoreHorizontal, SettingsOutline } from '@/shared/assets'
import { ROUTES } from '@/shared/config'
import { PopoverContent, PopoverRoot, PopoverTrigger } from '@/shared/ui'
import { useTranslation } from '@/shared/utils'
import { ConfirmationModal, SidebarElement } from '@/widgets'
import { useSidebar } from '@/widgets/sidebar/useSidebar'

import styles from './mobilePopover.module.scss'

/**
 * MobilePopover component for rendering a popover menu specifically for mobile view,
 * This component provides access to profile settings, statics, favorites and logout functionality.
 */
export const MobilePopover = () => {
  const [openPopover, setOpenPopover] = useState(false)

  const { confirmLogout, handleCloseLogoutModal, handleLogoutClick, modalState, sidebarItems } =
    useSidebar()

  const { isModalOpen } = modalState

  const { t } = useTranslation()

  const { handleProfileSettings } = useProfile()

  const renderProfileSettings = (
    <SidebarElement
      icon={SettingsOutline}
      isActive={() => ''}
      onClick={() => {
        handleProfileSettings()
        setOpenPopover(false)
      }}
      text={t.myProfile.settings}
    />
  )

  const renderRestItems = sidebarItems
    .filter(item => item.href === ROUTES.STATICS || item.href === ROUTES.FAVORITES)
    .map(item => (
      <SidebarElement
        href={item.href}
        icon={item.icon}
        isActive={() => ''}
        key={item.href}
        onClick={() => {
          item.onClick
          setOpenPopover(false)
        }}
        text={item.text}
      />
    ))

  const renderLogOut = (
    <SidebarElement
      icon={LogOut}
      isActive={() => ''}
      onClick={handleLogoutClick}
      text={t.sidebar.logout}
    />
  )

  const classNames = {
    more: styles.more,
    popoverContent: styles.popoverContent,
  } as const

  return (
    <>
      <PopoverRoot onOpenChange={setOpenPopover} open={openPopover}>
        <PopoverTrigger asChild>
          <MoreHorizontal
            className={classNames.more}
            onClick={() => setOpenPopover(!openPopover)}
          />
        </PopoverTrigger>
        <PopoverContent className={classNames.popoverContent}>
          {renderProfileSettings}
          {renderRestItems}
          {renderLogOut}
        </PopoverContent>
      </PopoverRoot>
      {isModalOpen && (
        <ConfirmationModal
          closeModal={handleCloseLogoutModal}
          confirmation={confirmLogout}
          content={t.auth.confirmLogout}
          isOpen={isModalOpen}
          title={t.sidebar.logout}
        />
      )}
    </>
  )
}
