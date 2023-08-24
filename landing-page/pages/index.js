import Head from 'next/head'
import styles from '../styles/Home.module.css'
import BB8 from '../components/BB8'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Test next app</title>
        <meta name="description" content="Generated by create next app" />

      </Head>

      <main >
        <h1>Welcome to main</h1>
      </main>

    </div>
  )
}
