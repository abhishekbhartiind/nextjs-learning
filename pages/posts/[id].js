import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Post({ post }) {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Pages</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h1 className={styles.title}>
            {post.title}
          </h1>
          <p>{post.body}</p>
        </div>
      </main>

    </div>
  )
}

/**
 * 
 * @param {getInitialProps} ctx 
 * @returns 
 * 
 * getInitialProps: enables server-side rendering in a page and allows you to do initial data population, 
 * it means sending the page with the data already populated from the server. 
 * This is especially useful for SEO.
 */
// Post.getInitialProps = async ({ query }) => {
//     // const res = await fetch('https://api.github.com/repos/vercel/next.js')
//     // const json = await res.json()
//     // return { stars: json.stargazers_count }

//     const { id } = query
//     return { id }
// }
//----------------------------------------------------------------

/**
 * getStaticPaths: Prerender some static paths in server to serve them in offline
 */
export async function getStaticPaths() {
  const paths = ["/posts/1", "/posts/2"];
  /**
   * If there is request for new page => show loading for sometime and call api to get static page and 
   * kept cached
   * for next time rendering 
   */
  return { paths, fallback : true }
}


export async function getStaticProps({ query, params }){
  const { id } = query || params;

  const res = await fetch(`${process.env.API_BASE_URL}/posts/${id}`)
  const post = await res.json()
  return { 
    props: {
      post
    }
  }
}


//----------------------------------------------------------------
/**
 * 
 * @returns If you want to render server side content
 * use "getServerSideProps"
 * 
 * Individual pages generated in runtime while page call
 */
// export async function getServerSideProps({ query }){
//   const { id } = query
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts'+ id)
//   const post = await res.json()
//   return { 
//     props: {
//       post
//     }
//   }
// }