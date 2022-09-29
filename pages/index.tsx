import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import useSWR from 'swr'
import BeachItem from '../components/BeachItem'
import styles from '../styles/Home.module.css'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Home: NextPage = () => {
  const { data, error } = useSWR('/api/forecast', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const { today, tomorrow } = data
  return (
    <div className={styles.container}>
      <Head>
        <title>Surf spots</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Surf spots
        </h1>

        <p className={styles.description}>
         Hoy
        </p>
        {/* { data.today } */}
        <div style={{ width:'100%', textAlign:'start'}}>

        <div>6 am  <BeachItem data= {today.dawn}/></div>
        <div>9 am <BeachItem data= {today.midMorning}/></div>
        <div>12 pm <BeachItem data= {today.noon}/></div>
        <div> 3 pm <BeachItem data= {today.afternoon}/></div>
        <div>6 pm   <BeachItem data= {today.sunset}/></div>
        </div>
        
        
       
        
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
        <p className={styles.description}>
         Mañana
         
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Gonzalo Gras Cantou
        </a>
      </footer>
    </div>
  )
}

export default Home
