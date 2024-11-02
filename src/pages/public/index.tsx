import {Public} from "@/features";
import Head from "next/head";


/**
 * It serves as the main page to display public content or features of the application.
 */

const PublicPage = () => {

    return (
        <>
         <Head>
          <title>Public Page</title>
          <meta
            content={`Public page of Photo Fiesta. Check out the project on GitHub: https://github.com/NoName-ForTeam`}
            name={'description'}
          />
          <meta content={`public, photo, fiesta, github`} name={'keywords'} />
          <meta content={'index, follow'} name={'robots'} />
          </Head>
         <Public/>
        </>

    )
}

export default PublicPage
