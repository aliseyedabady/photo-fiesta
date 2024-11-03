import { ArrowBackOutline } from '@/shared/assets'
import { ROUTES } from '@/shared/config'
import { useTranslation } from '@/shared/utils'
import { useSidebar } from '@/widgets'
import { Tabs, TabsContent, TabsList, TabsTrigger, Typography } from '@photo-fiesta/ui-lib'
import Link from 'next/link'

import styles from './settings.module.scss'

import { useSettingsTabs } from './useSettingsTabs'

/**
 * The Settings component renders a tabbed interface for managing user profile settings.
 * It uses the `@photo-fiesta/ui-lib` Tabs component to switch between different settings pages.
 *
 */
export const Settings = () => {
  const { TABS_CONFIG, currentTab, setCurrentTab } = useSettingsTabs()
  const { t } = useTranslation()
  const { sidebarItems } = useSidebar()

  const myProfileRoute = sidebarItems.find(item => item.href.startsWith(ROUTES.PROFILE))?.href || ''

  const classNames = {
    linkMyProfileRoute: styles.linkMyProfileRoute,
    profileSettings: styles.profileSettings,
    settingsContainer: styles.settingsContainer,
    tabsContainer: styles.tabsContainer,
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
      <Link className={classNames.linkMyProfileRoute} href={myProfileRoute}>
        <ArrowBackOutline height={24} width={24} />
      </Link>
      <Typography className={classNames.profileSettings} variant={'h2'}>
        {t.myProfile.settings}
      </Typography>
      <Tabs className={classNames.tabsContainer} onValueChange={setCurrentTab} value={currentTab}>
        <TabsList className={classNames.tabsList}>{tabTriggers}</TabsList>
        {tabContents}
      </Tabs>
    </div>
  )
}
