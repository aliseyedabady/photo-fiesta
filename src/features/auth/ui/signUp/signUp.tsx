import { AuthCard, SentEmail } from '@/features'
import { ROUTES } from '@/shared/config'
import { Trans } from '@/shared/ui'
import { useTranslation } from '@/shared/utils'
import { Button, FormCheckbox, FormInput, Typography } from '@photo-fiesta/ui-lib'
import Link from 'next/link'

import styles from './signUp.module.scss'

import { useSignUpForm } from './useSignUpForm'

export const SignUp = () => {
  const { t } = useTranslation()
  const { control, errors, isOpen, onCloseModalHandler, onSubmit, userEmail } = useSignUpForm()

  const classNames = {
    checkbox: styles.checkbox,
    form: styles.form,
    icon: styles.icon,
    iconsBox: styles.iconsBox,
    input: styles.input,
    inputWrapper: styles.inputWrapper,
    signIn: styles.signIn,
    submitBtn: styles.submitBtn,
  }

  return (
    <>
      <AuthCard
        footerLinkHref={ROUTES.SIGN_IN}
        footerLinkText={t.auth.signIn}
        footerText={t.auth.haveAccount}
        title={t.auth.signUp}
      >
        <form className={classNames.form} onSubmit={onSubmit}>
          <div className={classNames.inputWrapper}>
            <FormInput
              className={classNames.input}
              control={control}
              errorMessage={errors.userName?.message}
              label={t.auth.userName}
              name={'userName'}
              placeholder={'Epam11'}
              type={'username'}
            />
          </div>
          <div className={classNames.inputWrapper}>
            <FormInput
              className={classNames.input}
              control={control}
              errorMessage={errors.email?.message}
              label={t.auth.email}
              name={'email'}
              placeholder={'Epam@epam.com'}
              type={'email'}
            />
          </div>
          <div className={classNames.inputWrapper}>
            <FormInput
              className={classNames.input}
              control={control}
              errorMessage={errors.password?.message}
              label={t.auth.password}
              name={'password'}
              placeholder={'jk34!@#GF'}
              variant={'password'}
            />
          </div>
          <div className={classNames.inputWrapper}>
            <FormInput
              className={classNames.input}
              control={control}
              errorMessage={errors.confirmPassword?.message}
              label={t.auth.confirmPassword}
              name={'confirmPassword'}
              placeholder={t.auth.confirm}
              variant={'password'}
            />
          </div>
          <div className={classNames.checkbox}>
            <FormCheckbox control={control} name={'agreeWithTerms'} />
            <Typography variant={'textSmall'}>
              <Trans
                tags={{
                  1: () => (
                    <Typography
                      as={Link}
                      color={'var(--accent-500)'}
                      href={ROUTES.TERMS_OF_SERVICE}
                      variant={'linkSmall'}
                    >
                      {t.auth.termsOfService}
                    </Typography>
                  ),
                  2: () => (
                    <Typography
                      as={Link}
                      color={'var(--accent-500)'}
                      href={ROUTES.PRIVACY_POLICY}
                      variant={'linkSmall'}
                    >
                      {t.auth.privacyPolicy}
                    </Typography>
                  ),
                }}
                text={t.auth.registrationAgree}
              />
            </Typography>
          </div>
          <Button className={classNames.submitBtn} fullWidth type={'submit'}>
            {t.auth.signUp}
          </Button>
        </form>
      </AuthCard>
      {userEmail && <SentEmail closeModal={onCloseModalHandler} email={userEmail} open={isOpen} />}
    </>
  )
}
