import { ExpandOutline, ImageOutline } from '@/shared/assets'
import {
  Button,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  Typography,
} from '@photo-fiesta/ui-lib'
import clsx from 'clsx'

import styles from './expandPhotoButton.module.scss'

export const ExpandPhotoButton = () => {
  const classNames = {
    active: styles.active,
    buttonBlock: styles.buttonBlock,
    expandPhoto: styles.expandPhoto,
    extendContent: styles.extendContent,
    extendElement: styles.extendElement,
    extendIcon: styles.extendIcon,
    extendSquare: styles.extendSquare,
    five: styles.five,
    icon: styles.icon,
    nine: styles.nine,
    trigger: styles.trigger,
    wrapper: styles.wrapper,
  } as const

  return (
    <div className={clsx(classNames.wrapper, classNames.expandPhoto)}>
      <PopoverRoot>
        <PopoverTrigger asChild className={classNames.trigger}>
          <div className={classNames.buttonBlock}>
            <Button asChild variant={'icon-link'}>
              <ExpandOutline className={classNames.icon} />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent align={'start'} className={classNames.extendContent} side={'left'}>
          <div className={clsx(classNames.extendElement, classNames.active)}>
            <Typography variant={'h3'}>Original</Typography>
            <ImageOutline className={classNames.extendIcon} />
          </div>
          <div className={classNames.extendElement}>
            <Typography variant={'text16'}>1:1</Typography>
            <div className={classNames.extendSquare}></div>
          </div>
          <div className={classNames.extendElement}>
            <Typography variant={'text16'}>4:5</Typography>
            <div className={clsx(classNames.extendSquare, classNames.five)}></div>
          </div>
          <div className={classNames.extendElement}>
            <Typography variant={'text16'}>16:9</Typography>
            <div className={clsx(classNames.extendSquare, classNames.nine)}></div>
          </div>
        </PopoverContent>
      </PopoverRoot>
    </div>
  )
}
