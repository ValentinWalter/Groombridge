import Head from "next/head"
import Footer from "components/Footer"
import styles from "styles/Home.module.scss"
import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Groombridge</title>
        <meta
          name="description"
          content="Lightweight shareable text editor in the browser."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}

      <Footer />
    </div>
  )
}

export default Layout
