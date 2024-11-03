import { Tabs, TabsContent, TabsList, TabsTrigger } from '@photo-fiesta/ui-lib'

import styles from './settings.module.scss'

import { useSettingsTabs } from './useSettingsTabs'

/**
 * The Settings component renders a tabbed interface for managing user profile settings.
 * It uses the `@photo-fiesta/ui-lib` Tabs component to switch between different settings pages.
 *
 */
export const Settings = () => {
  const { TABS_CONFIG, currentTab, setCurrentTab } = useSettingsTabs()
  // const { t } = useTranslation()
  // const { handleCloseAddPhotoModal, isActive, modalState, setSelectedImage, sidebarItems } =
  //   useSidebar()
  //
  // const goToProfile = sidebarItems.find(item => item.href.startsWith(ROUTES.PROFILE))?.href

  const classNames = {
    profileSettings: styles.profileSettings,
    settingsContainer: styles.settingsContainer,
    tabsContent: styles.tabsContent,
    tabsList: styles.tabsList,
    tabsTrigger: styles.tabsTrigger,
  } as const

  const tabTriggers = TABS_CONFIG.map(tab => (
    <TabsTrigger className={classNames.tabsTrigger} key={tab.value} value={tab.value}>
      {tab.label}
    </TabsTrigger>
  ))

  const tabContents = TABS_CONFIG.map(tab => (
    <TabsContent className={classNames.tabsContent} key={tab.value} value={tab.value}>
      {tab.content}
    </TabsContent>
  ))

  return (
    <div className={classNames.settingsContainer}>
      {/*<Link href={goToProfile || ''}>*/}
      {/*  <ArrowIosBackOutline width={16} height={16} onClick={goToProfile} />*/}
      {/*</Link>*/}

      {/*<Typography className={classNames.profileSettings} variant={'h2'}>*/}
      {/*  {t.myProfile.settings}*/}
      {/*</Typography>*/}
      <Tabs onValueChange={setCurrentTab} value={currentTab}>
        <TabsList className={classNames.tabsList}>{tabTriggers}</TabsList>
        {tabContents}
      </Tabs>
    </div>
  )
}
