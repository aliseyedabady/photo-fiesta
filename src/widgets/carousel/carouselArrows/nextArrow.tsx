import { ArrowIosForwardOutline } from '@/shared/assets'
import { Button } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'

import styles from './carouselArrows.module.scss'

import { ArrowsProps } from './carouselArrows.types'

/** NextArrowComponent - Renders the "next" arrow button for the carousel.*/
export const NextArrow = ({
  callbackFunction,
  indexArrow,
  onClick,
  photosLength,
  setIndexArrow,
}: ArrowsProps) => {
  if (
    indexArrow === (photosLength ? photosLength - 1 : 0) ||
    (photosLength ? photosLength : 0) <= 1
  ) {
    return null
  }
  /**
   * Handles the click event for the "next" arrow, advancing the carousel.
   * Updates the slide index and triggers optional callbacks.
   */
  const handleClick = () => {
    setIndexArrow(indexArrow + 1)
    if (callbackFunction) {
      callbackFunction()
    }
    if (onClick) {
      onClick()
    }
  }
  const classNames = {
    arrow: styles.arrow,
    nextArrow: styles.nextArrow,
    right: styles.right,
    wrapper: styles.wrapper,
  }

  return (
    <div className={clsx(classNames.wrapper, classNames.right)}>
      <Button asChild className={classNames.nextArrow} onClick={handleClick} variant={'icon-link'}>
        <ArrowIosForwardOutline className={classNames.arrow} />
      </Button>
    </div>
  )
}
