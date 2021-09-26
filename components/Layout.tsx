import Head from "next/head"
import Footer from "components/Footer"
import styles from "styles/Home.module.scss"
import React from "react"
import Titlebar, { TitlebarProps } from "./Titlebar"

const Layout = ({
  children,
  ...titlebarProps
}: { children: React.ReactNode } & TitlebarProps) => {
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

      <Titlebar {...titlebarProps} />

      {children}

      <Footer />
    </div>
  )
}

export default Layout
