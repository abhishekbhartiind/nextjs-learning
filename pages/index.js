import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Learning Next
        </h1>
        <div className={styles.grid}>
          <Link href="/posts">
            <a className={styles.card}>
              <h3>Posts</h3>
            </a>
          </Link>
          <Link href="/store">
            <a className={styles.card}>
              <h3>Store</h3>
            </a>
          </Link>
          <Link href="/contact-us">
            <a className={styles.card}>
              <h3>Contacts Us</h3>
            </a>
          </Link>
          <Link href="/">
            <a className={styles.card}>
              <h3>Home</h3>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        footer
      </footer>
    </div>
  )
}
