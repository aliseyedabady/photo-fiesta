import { DetailedPayment } from '@/features'
import { useTranslation } from '@/shared/utils'
import { Card, Typography } from '@photo-fiesta/ui-lib'

import styles from './paymentCard.module.scss'

type PaymentCardProps = {
  payment: DetailedPayment
}

/**
 * The PaymentCard component displays detailed information about a payment in a card format
 * The PaymentCard component is visible only on mobile view
 *
 * @example
 * <PaymentCard payment={detailedPayment}/>
 */
export const PaymentCard = ({ payment }: PaymentCardProps) => {
  const { t } = useTranslation()
  const headers = [
    { key: 'dateOfPayment', label: t.myPayments.dateOfPayment },
    { key: 'endDateOfSubscription', label: t.myPayments.endDateOfPayment },
    { key: 'price', label: t.myPayments.price },
    { key: 'subscriptionType', label: t.myPayments.subscriptionType },
    { key: 'paymentType', label: t.myPayments.paymentType },
  ]

  const classNames = {
    entryContainer: styles.entryContainer,
    root: styles.root,
  } as const

  const entries = headers.map((header, index) => (
    <div className={classNames.entryContainer} key={index}>
      <Typography as={'span'} variant={'text14'}>
        {header.label}:
      </Typography>
      <Typography as={'span'} variant={'text14'}>
        {payment[header.key as keyof typeof payment]}
      </Typography>
    </div>
  ))

  return <Card className={classNames.root}>{entries}</Card>
}
