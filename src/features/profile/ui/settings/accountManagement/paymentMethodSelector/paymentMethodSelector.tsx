import { memo, useCallback } from 'react'
import { UseFormHandleSubmit, UseFormSetValue } from 'react-hook-form'

import { FormData } from '@/features'
import { PaypalSvgrepoCom4, StripeSvgrepoCom4 } from '@/shared/assets'
import { Button, Typography } from '@photo-fiesta/ui-lib'

import styles from './paymentMethodSelector.module.scss'

type PaymentMethodSelectorProps = {
  handleSubmit: UseFormHandleSubmit<FormData>
  isLoading: boolean
  onSubmit: (data: FormData) => Promise<void>
  setValue: UseFormSetValue<FormData>
}

export const PaymentMethodSelector = memo(
  ({ handleSubmit, isLoading, onSubmit, setValue }: PaymentMethodSelectorProps) => {
    const classNames = {
      buttons: styles.buttons,
      icon: styles.icon,
    }

    const handlePaymentSubmit = useCallback(
      (paymentType: FormData['paymentType']) => {
        setValue('paymentType', paymentType)
        handleSubmit(onSubmit)()
      },
      [setValue, handleSubmit, onSubmit]
    )

    return (
      <div className={classNames.buttons}>
        <Button
          disabled={isLoading}
          onClick={() => handlePaymentSubmit('PAYPAL')}
          variant={'icon-link'}
        >
          <PaypalSvgrepoCom4 className={classNames.icon} />
        </Button>
        <Typography variant={'text14'}>Or</Typography>
        <Button
          disabled={isLoading}
          onClick={() => handlePaymentSubmit('STRIPE')}
          variant={'icon-link'}
        >
          <StripeSvgrepoCom4 className={classNames.icon} />
        </Button>
      </div>
    )
  }
)
