import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
  
export default function Posts({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pages</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Pages</a>
        </h1>
        <ul>
            {
                posts.map((post) => {
                    return (
                        <li key={post.id}>
                            <h3>
                                {/* 
                                <Link href={`/posts/${product.id}`}>
                                    {product.name}
                                </Link> 
                                
                                Use for normal navigation between pages and below used for dyamic pages
                                */}
                                <Link href={`/posts/[id]`} as={`/posts/${post.id}`}>
                                    <a>{post.title}</a>
                                </Link> 
                            </h3>
                            <p>Price: {post.body}</p>
                        </li>
                    )
                })
            }
        </ul>
      </main>

    </div>
  )
}

export async function getStaticProps(){
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await res.json()
    return { 
      props: {
        posts
      }
    }
}

/**
 * 
 * @returns If you want to render server side content
 * use "getServerSideProps"
 */
// export async function getServerSideProps(){
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts')
//   const posts = await res.json()
//   return { 
//     props: {
//       posts
//     }
//   }
// }