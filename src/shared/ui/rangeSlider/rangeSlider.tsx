import { ComponentPropsWithoutRef, ElementRef, forwardRef, useCallback } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'
import clsx from 'clsx'

import styles from './rangeSlider.module.scss'

export type RangeSliderProps = {
  // [step=1] - The step value of the slider.
  step?: number
  //[value=50] - The current value of the slider.
  value?: number[]
} & ComponentPropsWithoutRef<typeof SliderRadix.Root>

/**
 * A custom Slider component using Radix UI Slider.
 */

//TODO: move to ui library
export const RangeSlider = forwardRef<ElementRef<typeof SliderRadix.Root>, RangeSliderProps>(
  ({ onValueChange, step = 1, value = [150], ...rest }: RangeSliderProps, ref) => {
    const classNames = {
      container: styles.container,
      range: styles.range,
      root: styles.root,
      thumb: styles.thumb,
      track: styles.track,
      value: styles.value,
    } as const

    const handleOnChangeValue = useCallback(
      (values: number[]) => {
        if (onValueChange) {
          onValueChange(values)
        }
      },
      [onValueChange]
    )

    return (
      <div className={clsx(classNames.container)}>
        <SliderRadix.Root
          className={clsx(classNames.root)}
          onValueChange={handleOnChangeValue}
          ref={ref}
          step={step}
          value={value}
          {...rest}
        >
          <SliderRadix.Track className={clsx(classNames.track)}>
            <SliderRadix.Range className={clsx(classNames.range)} />
          </SliderRadix.Track>
          <SliderRadix.Thumb className={clsx(classNames.thumb)} />
        </SliderRadix.Root>
      </div>
    )
  }
)
