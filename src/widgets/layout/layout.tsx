import { ReactNode, useEffect, useState } from 'react'

import { useLazyAuthMeQuery } from '@/features'
import { Storage } from '@/shared/utils'
import { Header, MobileMenu, Sidebar } from '@/widgets'

import style from './layout.module.scss'

/**
 * `Layout` is a layout component that wraps around pages that require authentication.
 * It includes a header with user-specific options and provides a consistent layout
 * for authentication-related pages.
 *
 * @component
 * @param {PropsWithChildren} props - The props object containing child components.
 * @returns {JSX.Element} The `Layout` component containing a header and the child content.
 *
 * @example
 * return (
 *   <Layout>
 *     <SignInPage />
 *   </Layout>
 * )
 */

export const Layout = ({ children }: { children: ReactNode }) => {
  const [authData, { isSuccess }] = useLazyAuthMeQuery()
  const [token, setToken] = useState<null | string>(null)

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(Storage.getToken())
    }

    // initialize token in client side
    handleStorageChange()

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  useEffect(() => {
    if (token) {
      authData()
    }
  }, [authData, token])

  const isAuthenticated = isSuccess && !!token
  const classNames = {
    main: style.main,
    menu: style.menu,
    sidebar: style.sidebar,
    wrapper: style.wrapper,
  } as const

  return (
    <>
      <Header isAuth={isAuthenticated} />
      <div className={classNames.wrapper}>
        {isAuthenticated && (
          <>
            <Sidebar className={classNames.sidebar} />
            <MobileMenu className={classNames.menu} />
          </>
        )}
        <main className={classNames.main}>{children}</main>
      </div>
    </>
  )
}
