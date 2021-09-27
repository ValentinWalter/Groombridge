import type { NextPage } from "next"
import styles from "styles/Home.module.scss"
import Editor from "components/Editor"
import { useEffect, useState } from "react"
import SaveDialog from "components/SaveDialog"
import Layout from "components/Layout"
import { Document } from "model/useDocument"

/** Backs up the document to local storage. */
const backup = (document: Document) => {
  const roundedDate = new Date()
  roundedDate.setMilliseconds(0)
  roundedDate.setSeconds(0)

  localStorage.setItem(
    document.title ? document.title : roundedDate.toString(),
    document.content
  )
}

const Home: NextPage<Partial<Document>> = (document) => {
  const [title, setTitle] = useState(document?.title ?? "")
  const [content, setContent] = useState(document?.content ?? "")
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  // Backup
  useEffect(() => {
    const document = { title, content }

    const autosave = setTimeout(() => {
      backup(document)
    }, 3000)

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
          content={document?.content}
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
