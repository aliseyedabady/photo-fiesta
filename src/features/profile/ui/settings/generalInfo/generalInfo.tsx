import { ComponentPropsWithoutRef } from 'react'

import { ConfirmationModal, ModalAddPhoto } from '@/features'
import { CloseOutline, ImageOutline } from '@/shared/assets'
import { City, Country, cities, countries } from '@/shared/config'
import { FormDatePicker } from '@/shared/ui'
import { Button, FormInput, FormSelect, FormTextArea, SelectItem } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'
import Image from 'next/image'

import styles from './generalInfo.module.scss'

import { useGeneralInfo, usePhotoPreview } from './hooks'

export type GeneralInfoProps = ComponentPropsWithoutRef<'div'>
/**
 * GeneralInfo component for displaying and editing user information
 * @example
 * <GeneralInfo className="custom-class" />
 */

//TODO: add translations
export const GeneralInfo = ({ className }: GeneralInfoProps) => {
  const {
    control,
    errors,
    handleCloseModal,
    handleDeletePhoto,
    handleOpenModal,
    image,
    isLoading,
    isOpen,
    isSubmitting,
    onSubmit,
    setImage,
  } = useGeneralInfo()

  const classNames = {
    container: styles.container,
    datePicker: styles.datePicker,
    form: styles.form,
    line: styles.line,
    root: styles.root,
    select: styles.select,
    selectBlock: styles.selectBlock,
    submit: styles.submit,
    textarea: styles.textarea,
    uploadButton: styles.uploadButton,
  } as const

  const renderCountryOptions = (countries: Country[]) => {
    return countries.map(country => (
      <SelectItem key={country.id} value={country.countryEn}>
        {country.countryEn}
      </SelectItem>
    ))
  }

  const renderCityOptions = (cities: City[]) => {
    return cities.map(city => (
      <SelectItem key={city.id} value={city.cityEn}>
        {city.cityEn}
      </SelectItem>
    ))
  }

  //TODO: add custom loading component
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={clsx(classNames.root, className)}>
      <div className={classNames.container}>
        <PhotoPreview
          image={image}
          onDeletePhoto={handleDeletePhoto}
          preview={styles.imagePreview}
          size={192}
        />
        <Button className={classNames.uploadButton} onClick={handleOpenModal} variant={'outlined'}>
          Add a Profile Photo
        </Button>
      </div>
      <form className={classNames.form} onSubmit={onSubmit}>
        <FormInput
          control={control}
          errorMessage={errors.userName?.message}
          label={'Username*'}
          name={'userName'}
          placeholder={'Enter your username'}
          type={'text'}
        />
        <FormInput
          control={control}
          errorMessage={errors.firstName?.message}
          label={'First name*'}
          name={'firstName'}
          placeholder={'Enter your first name'}
          type={'text'}
        />
        <FormInput
          control={control}
          errorMessage={errors.lastName?.message}
          label={'Last name*'}
          name={'lastName'}
          placeholder={'Enter your last name'}
          type={'text'}
        />

        <FormDatePicker
          className={classNames.datePicker}
          control={control}
          errorMessage={errors.dateOfBirth?.message}
          label={'Date of birth*'}
          name={'dateOfBirth'}
          placeholder={'00.00.0000'}
          rules={{ required: 'Date is required' }}
        />
        <div className={classNames.selectBlock}>
          <FormSelect
            className={classNames.select}
            control={control}
            defaultValue={String(countries[0].id)}
            label={'Select your country'}
            name={'country'}
          >
            {renderCountryOptions(countries)}
          </FormSelect>
          <FormSelect
            className={classNames.select}
            control={control}
            defaultValue={String(cities[0].id)}
            label={'Select your city'}
            name={'city'}
          >
            {renderCityOptions(cities)}
          </FormSelect>
        </div>
        <FormTextArea
          className={classNames.textarea}
          control={control}
          label={'About me'}
          name={'aboutMe'}
        />
        <div className={classNames.line}></div>
        <Button className={classNames.submit} disabled={isSubmitting}>
          Save Changes
        </Button>
      </form>
      <ModalAddPhoto handleCloseModal={handleCloseModal} isOpen={isOpen} setImage={setImage} />
    </div>
  )
}

//PHOTO PREVIEW

type PhotoPreviewProps = {
  image: null | string
  onDeletePhoto: () => void
  preview: string
  size: number
}
/**
 * PhotoPreview component for displaying a user's profile photo or placeholder
 * <PhotoPreview image="https://example.com/photo.jpg" preview="previewClass" size={192} />
 */
export const PhotoPreview = ({ image, onDeletePhoto, preview, size }: PhotoPreviewProps) => {
  const { handleCloseModal, handleConfirmation, handleOpenModal, isOpen } =
    usePhotoPreview(onDeletePhoto)

  const classNames = {
    close: styles.close,
    icon: styles.icon,
    imageWrapper: styles.imageWrapper,
    placeholder: styles.placeholder,
    preview,
    wrapper: styles.wrapper,
  } as const

  return (
    <div className={classNames.wrapper}>
      <div className={classNames.preview}>
        {image ? (
          <div className={classNames.imageWrapper}>
            {/** *width and height are required for the image to be displayed in next */}
            <Image alt={'Uploaded'} height={size} src={image} width={size} />
          </div>
        ) : (
          <span className={classNames.placeholder}>
            <ImageOutline className={classNames.icon} />
          </span>
        )}
        {isOpen && (
          <ConfirmationModal
            closeModal={handleCloseModal}
            confirmation={handleConfirmation}
            content={'Are you sure you want to delete the photo?'}
            isOpen={isOpen}
            title={'Delete Photo'}
          />
        )}
      </div>
      {image && <CloseOutline className={classNames.close} onClick={handleOpenModal} />}
    </div>
  )
}
