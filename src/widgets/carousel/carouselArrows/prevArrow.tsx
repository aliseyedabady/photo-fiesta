import { ArrowIosBackOutline } from '@/shared/assets'
import { Button } from '@photo-fiesta/ui-lib'

import styles from './carouselArrows.module.scss'

import { ArrowsProps } from './carouselArrows.types'

/** PrevArrowComponent - Renders the "previous" arrow button for the carousel.*/
export const PrevArrow = ({
  callbackFunction,
  indexArrow,
  onClick,
  photosLength,
  setIndexArrow,
}: ArrowsProps) => {
  if (indexArrow === 0 || (photosLength ? photosLength : 0) <= 1) {
    return null
  }
  /**
   * Handles the click event for the "previous" arrow, going back in the carousel.
   * Updates the slide index and triggers optional callbacks.
   */
  const handleClick = () => {
    setIndexArrow(indexArrow - 1)
    if (callbackFunction) {
      callbackFunction()
    }
    if (onClick) {
      onClick()
    }
  }
  const classNames = {
    arrow: styles.arrow,
    prevArrow: styles.prevArrow,
    wrapper: styles.wrapper,
  } as const

  return (
    <div className={classNames.wrapper}>
      <Button asChild className={classNames.prevArrow} onClick={handleClick} variant={'icon-link'}>
        <ArrowIosBackOutline className={classNames.arrow} />
      </Button>
    </div>
  )
}
