import { Typography } from '@photo-fiesta/ui-lib'
import Head from 'next/head'

//TODO: change to home page
const HomePage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          content={`Home page of Photo Fiesta. Check out the project on GitHub: https://github.com/NoName-ForTeam`}
          name={'description'}
        />
        <meta content={`home, photo, fiesta, github`} name={'keywords'} />
        <meta content={'index, follow'} name={'robots'} />
      </Head>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
        <Typography variant={'textLarge'}>Home page: should be changed in future</Typography>
      </div>
    </>
  )
}

export default HomePage
