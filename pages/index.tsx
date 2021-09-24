import type { NextPage } from "next"
import Head from "next/head"
import styles from "styles/Home.module.scss"
import Editor from "components/Editor"
import Titlebar from "components/Titlebar"
import { useState } from "react"
import SaveDialog from "components/SaveDialog"

export interface Document {
  title: string
  content: string
}

const Home: NextPage = () => {
  const [content, setContent] = useState("")
  const [documentTitle, setDocumentTitle] = useState("")
  const [showSaveDialog, setShowSaveDialog] = useState(false)

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

      <nav>
        <Titlebar
          onSave={(title) => {
            setDocumentTitle(title)
            setShowSaveDialog(!showSaveDialog)
          }}
        />
      </nav>

      <main className={styles.main}>
        <Editor onUpdate={({ editor }) => setContent(editor.getHTML())} />
      </main>

      <footer className={styles.footer}>
        <a href="https://valwal.com">By valwal.com</a>
      </footer>

      <SaveDialog
        title={documentTitle}
        content={content}
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
      />
    </div>
  )
}

export default Home
