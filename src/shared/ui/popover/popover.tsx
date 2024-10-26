import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import clsx from 'clsx'

import styles from './popover.module.scss'

/**
 * PopoverComponent that displays a popover with a trigger and content.
 *
 * @component
 * @example
 * <PopoverRoot>
 *    <PopoverTrigger>
 *      <button>Open Popover</button>
 *    </PopoverTrigger>
 *    <PopoverContent>
 *       <div>
 *         <p>This is the content of popover.</p>
 *       </div>
 *     </PopoverContent>
 * </PopoverRoot>
 */

export const Popover = PopoverPrimitive.Root

/* PopoverTrigger component that serves as the button or element to open the popover */

export const PopoverTrigger = forwardRef<
  ElementRef<typeof PopoverPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>(({ children, className, ...rest }) => {
  const classNames = {
    trigger: clsx(styles.trigger, className),
  } as const

  return (
    <PopoverPrimitive.Trigger asChild className={classNames.trigger} {...rest}>
      {children}
    </PopoverPrimitive.Trigger>
  )
})

/* PopoverContent component that contains the content to be displayed in the popover */

export const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ children, className, ...rest }, ref) => {
  const classNames = {
    content: clsx(styles.content, className),
  } as const

  return (
    <PopoverPrimitive.Content className={classNames.content} sideOffset={5} {...rest} ref={ref}>
      {children}
    </PopoverPrimitive.Content>
  )
})

Popover.displayName = PopoverPrimitive.Root.displayName
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName
PopoverContent.displayName = PopoverPrimitive.Content.displayName
