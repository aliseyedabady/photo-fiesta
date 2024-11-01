import { ArrowBackOutline } from '@/shared/assets'
import { ROUTES } from '@/shared/config'
import { useTranslation } from '@/shared/utils'
import { Button, Typography } from '@photo-fiesta/ui-lib'
import Link from 'next/link'

import styles from './termsOfService.module.scss'

import { TermsList } from './termsList'

export const TermsOfService = () => {
  const { t } = useTranslation()
  const classNames = {
    container: styles.container,
    link: styles.link,
    signUp: styles.signUp,
    svg: styles.svg,
    terms: styles.terms,
    text: styles.text,
    title: styles.title,
    wrapper: styles.wrapper,
  }

  /**
   * Page with terms of service
   * @component
   * @example
   * <TermsOfService/>
   */

  return (
    <div className={classNames.container}>
      <div className={classNames.wrapper}>
        <Button asChild className={classNames.link} variant={'link'}>
          <Link href={ROUTES.SIGN_UP}>
            <ArrowBackOutline className={classNames.svg} />
            <Typography className={classNames.signUp} variant={'text14'}>
              {t.auth.backToSignUp}
            </Typography>
          </Link>
        </Button>
        <Typography className={classNames.title} variant={'h1'}>
          {t.auth.termsOfService}{' '}
        </Typography>
      </div>
      <div className={classNames.terms}>
        <TermsList />
      </div>
    </div>
  )
}
