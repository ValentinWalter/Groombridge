import type { NextPage } from "next"
import styles from "styles/Home.module.scss"
import Editor from "components/Editor"
import { useEffect, useState } from "react"
import SaveDialog from "components/SaveDialog"
import Layout from "components/Layout"
import { Document } from "model/useDocument"

const defaultDocument: Document = { title: "", content: "" }

const isEmpty = (document: Document): boolean => {
  return document.title == "" && (document.content == "" || document.content == "<p></p>")
}

/** Backs up the document to local storage. */
const backup = (document: Document) => {
  if (isEmpty(document)) return

  const roundedDate = new Date()
  roundedDate.setMilliseconds(0)
  roundedDate.setSeconds(0)

  localStorage.setItem(
    document.title ? document.title : roundedDate.toString(),
    document.content
  )
}

/** Backs up the current document to session storage, and removes if empty. */
const backupSession = (document: Document) => {
  if (isEmpty(document)) {
    sessionStorage.removeItem("session_document")
  } else {
    sessionStorage.setItem("session_document", JSON.stringify(document))
  }
}

const Home: NextPage<Partial<Document>> = (document) => {
  // Check if session storage contains anything
  const sessionDocument: Document = JSON.parse(
    sessionStorage.getItem("session_document") ?? JSON.stringify(defaultDocument)
  )

  // Use either props or session document as state
  const [title, setTitle] = useState(document?.title ?? sessionDocument.title)
  const [content, setContent] = useState(document?.content ?? sessionDocument.content)
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  // Backup every second + instant session storage
  useEffect(() => {
    const document = { title, content }

    backupSession(document)

    const autosave = setTimeout(() => {
      backup(document)
    }, 1000)

    return () => {
      clearTimeout(autosave)
    }
  }, [title, content])

  return (
    <Layout
      title={title}
      onTitleChange={setTitle}
      onSave={() => {
        setShowSaveDialog(true)
      }}
    >
      <main className={styles.main}>
        <Editor
          editable={true}
          content={content}
          onUpdate={({ editor }) => setContent(editor.getHTML())}
        />
      </main>

      <SaveDialog
        document={{ title, content }}
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
      />
    </Layout>
  )
}

export default Home
