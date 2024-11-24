import { MaximizeOutline } from '@/shared/assets'
import { RangeSlider } from '@/shared/ui'
import { Button, PopoverContent, PopoverRoot, PopoverTrigger } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'

import styles from './zoomPhotoButton.module.scss'

type ZoomPhotoButtonProps = {
  onZoomChange: (newZoom: number) => void
  zoom: number
}
export const ZoomPhotoButton = ({ onZoomChange, zoom }: ZoomPhotoButtonProps) => {
  const classNames = {
    buttonBlock: clsx(styles.buttonBlock),
    icon: styles.icon,
    trigger: styles.trigger,
    wrapper: styles.wrapper,
    zoomContent: styles.zoomContent,
    zoomPhoto: styles.zoomPhoto,
  } as const

  return (
    <div className={clsx(classNames.wrapper, classNames.zoomPhoto)}>
      <PopoverRoot>
        <PopoverTrigger asChild className={classNames.trigger}>
          <div className={classNames.buttonBlock}>
            <Button asChild variant={'icon-link'}>
              <MaximizeOutline className={classNames.icon} />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent align={'start'} className={classNames.zoomContent} side={'left'}>
          <RangeSlider
            onValueChange={newZoom => onZoomChange(newZoom[0] / 50)}
            value={[zoom * 50]}
          />
        </PopoverContent>
      </PopoverRoot>
    </div>
  )
}
