import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { Profile, useAuthMeQuery } from '@/features'
import Head from 'next/head'
/**
 * it is  responsible for rendering the user's profile page.
 */
const ProfilePage = () => {
  const { data: user, isError, refetch } = useAuthMeQuery()

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load profile. Retrying...')
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError])

  if (isError) {
    return <div>Error loading profile. Please try again later.</div>
  }

  return (
    <>
      <Head>
        <title>Profile: {user?.userName}</title>
        <meta
          content={`Profile of ${user?.userName}. Check out the project on GitHub: https://github.com/NoName-ForTeam`}
          name={'description'}
        />
        <meta content={`profile, ${user?.userName}, GitHub`} name={'keywords'} />
        <meta content={'index, follow'} name={'robots'} />
      </Head>
      <Profile />
    </>
  )
}

export default ProfilePage
