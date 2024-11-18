// CustomSlider.tsx
import React, { ReactNode } from 'react'
import Slider, { Settings } from 'react-slick'

import clsx from 'clsx'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import styles from './slider.module.scss'

//TODO: move to widgets/carousel...
type ArrowsProps = {
  callbackFunction?: () => void
  indexArrow: number
  onClick?: () => void
  photosLength?: number
  setIndexArrow: (value: number) => void
}

type CustomSliderProps = {
  NextArrow: React.ComponentType<ArrowsProps>
  PrevArrow: React.ComponentType<ArrowsProps>
  /**
   * The index of the currently active slide in the slider.
   */
  activeIndex: number
  children: ReactNode
  /**
   * The index of the arrow that is currently active in the slider.
   */
  indexArrow: number
  photosLength: number
  setActiveIndex: (index: number) => void
  setIndexArrow: (index: number) => void
}

/**
 * CustomSlider component for creating a customizable image slider.
 *
 * @example
 * ```jsx
 * <CustomSlider
 *   NextArrow={NextArrow}
 *   PrevArrow={PrevArrow}
 *   activeIndex={0}
 *   indexArrow={0}
 *   photosLength={5}
 *   setActiveIndex={(index) => console.log('Active index:', index)}
 *   setIndexArrow={(index) => console.log('Arrow index:', index)}
 * >
 *   <img src="image1.jpg" alt="Slide 1" />
 *   <img src="image2.jpg" alt="Slide 2" />
 *   <img src="image3.jpg" alt="Slide 3" />
 * </CustomSlider>
 * ```
 */

export const CustomSlider = ({
  NextArrow,
  PrevArrow,
  activeIndex,
  children,
  indexArrow,
  photosLength,
  setActiveIndex,
  setIndexArrow,
}: CustomSliderProps) => {
  const classNames = {
    dotsItem: styles.dotsItem,
    dotsItemActive: styles.dotsItemActive,
  }

  const settings: Settings = {
    adaptiveHeight: true,
    arrows: photosLength > 1,
    beforeChange: (current: number, next: number) => {
      setActiveIndex(next)
      setIndexArrow(next)
    },
    customPaging: (index: number) => (
      <div
        className={clsx(classNames.dotsItem, {
          [classNames.dotsItemActive]: index === activeIndex,
        })}
      ></div>
    ),
    dots: photosLength > 1,
    infinite: photosLength > 1,
    initialSlide: activeIndex,
    nextArrow: (
      <NextArrow
        indexArrow={indexArrow}
        photosLength={photosLength}
        setIndexArrow={setIndexArrow}
      />
    ),
    prevArrow: (
      <PrevArrow
        indexArrow={indexArrow}
        photosLength={photosLength}
        setIndexArrow={setIndexArrow}
      />
    ),
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 500,
  }

  return (
    <Slider key={photosLength} {...settings}>
      {children}
    </Slider>
  )
}
