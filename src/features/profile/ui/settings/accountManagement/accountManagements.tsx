/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  AccountType,
  useCreateSubscriptionMutation,
  useGetCurrentPaymentQuery,
  useGetProfileQuery,
} from '@/features'
import { ErrorResponse } from '@/shared/api'
import { LOADING_DELAY } from '@/shared/config'
import { Loader } from '@/shared/ui'
import {
  checkErrorMessages,
  computeSubscriptionDates,
  getBaseUrl,
  useDelayedLoading,
  useModal,
} from '@/shared/utils'
import { ConfirmationModal } from '@/widgets'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

import styles from './accountManagement.module.scss'

import { AccountTypes } from './accountTypes'
import { CurrentSubscription } from './currentSubscription'
import { PaymentMethodSelector } from './paymentMethodSelector'
import { SubscriptionCosts } from './subscriptionCosts'

const formSchema = z.object({
  amount: z.number(),
  autoRenewal: z.boolean(),
  baseUrl: z.string(),
  paymentType: z.enum(['STRIPE', 'PAYPAL']),
  typeSubscription: z.enum(['MONTHLY', 'DAY', 'WEEKLY']),
})

export type FormData = z.infer<typeof formSchema>

/**
 * AccountManagements component for managing user account settings
 */

export const AccountManagements = memo(() => {
  const router = useRouter()

  const { handleModalClose, isModalOpen, modalTitle, setIsModalOpen, setModalTitle } = useModal()

  const { isLoading: isFetchingProfile } = useGetProfileQuery()
  const [postSubscription, { isLoading }] = useCreateSubscriptionMutation()
  const {
    data: currentPaymentData,
    isLoading: isFetchingCurrentPayment,
    refetch: refetchCurrentPayment,
  } = useGetCurrentPaymentQuery()
  const [autoRenewalEnabled, setAutoRenewalEnabled] = useState(
    currentPaymentData?.hasAutoRenewal || false
  )

  const currentPayments = currentPaymentData?.data || []
  const { isSubscriptionActive } = computeSubscriptionDates(currentPayments)
  const [accountType, setAccountType] = useState<AccountType>(
    isSubscriptionActive ? 'business' : 'personal'
  )

  useEffect(() => {
    if (accountType === 'business') {
      refetchCurrentPayment()
    }
  }, [accountType, refetchCurrentPayment])

  //when true we see loading component and the delay avoids picture jerkiness
  const showLoading = useDelayedLoading(isLoading, LOADING_DELAY)

  const { control, handleSubmit, setError, setValue } = useForm<FormData>({
    defaultValues: {
      amount: 10,
      autoRenewal: autoRenewalEnabled,
      baseUrl: getBaseUrl(),
      paymentType: 'STRIPE',
      typeSubscription: 'DAY',
    },
    resolver: zodResolver(formSchema),
  })

  //* Payment handling
  const onSubmit = async (data: FormData) => {
    if (isLoading) {
      return
    }
    //put in autoRenewal actual state of checkbox
    const updatedData = {
      ...data,
      autoRenewal: autoRenewalEnabled, // use current state of checkbox
    }

    try {
      const response = await postSubscription(updatedData).unwrap()

      router.push(response.url)
    } catch (error) {
      setModalTitle('Error')
      setIsModalOpen(true)
      checkErrorMessages(error as ErrorResponse, setError)
    }
  }

  //* Modal handling
  const handleConfirmation = () => {
    setModalTitle('')
    handleModalClose()
  }

  const handleSuccessfulPayment = useCallback(() => {
    setModalTitle('Success')
    setIsModalOpen(true)
  }, [])

  // Effect for handling successful payment redirect
  useEffect(() => {
    const { success } = router.query

    if (isSubscriptionActive) {
      setAccountType('business')
    } else {
      setAccountType('personal')
    }

    if (success === 'true') {
      handleSuccessfulPayment()
      //change current url removing query params success
      router.replace(router.pathname, undefined, { shallow: true })
    }
    if (success === 'false') {
      setModalTitle('Error')
      setIsModalOpen(true)
      router.replace(router.pathname, undefined, { shallow: true })
    }
  }, [router.query.success, isSubscriptionActive])

  const classNames = {
    form: styles.form,
  } as const

  const buttonTitleModal = modalTitle === 'Success' ? 'Ok' : 'Back to payment'
  const contentModal =
    modalTitle === 'Success'
      ? 'Payment was successful'
      : 'Transaction failed.Please,write to support'

  if (showLoading || isFetchingProfile || isFetchingCurrentPayment) {
    return <Loader />
  }

  return (
    <form className={classNames.form} onSubmit={handleSubmit(onSubmit)}>
      <CurrentSubscription
        accountType={accountType}
        autoRenewalEnabled={autoRenewalEnabled}
        control={control}
        currentPaymentData={currentPaymentData}
        setAutoRenewalEnabled={setAutoRenewalEnabled}
      />
      <AccountTypes accountType={accountType} setAccountType={setAccountType} />
      {accountType == 'business' && (
        <>
          <SubscriptionCosts control={control} setValue={setValue} />
          <PaymentMethodSelector
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            onSubmit={onSubmit}
            setValue={setValue}
          />
        </>
      )}
      {isModalOpen && (
        <ConfirmationModal
          buttonTitle={buttonTitleModal}
          closeModal={handleModalClose}
          content={contentModal}
          handleConfirmation={handleConfirmation}
          isOpen={isModalOpen}
          isTwoButtons={false}
          title={modalTitle}
        />
      )}
    </form>
  )
})
