import type { NextPage } from "next"
import styles from "styles/Home.module.scss"
import Editor from "components/Editor"
import Titlebar from "components/Titlebar"
import { useState } from "react"
import SaveDialog from "components/SaveDialog"
import Layout from "components/Layout"
import { Document } from "model/useDocument"

const Home: NextPage<Partial<Document>> = (document) => {
  const [content, setContent] = useState(document?.content ?? "")
  const [title, setTitle] = useState(document?.title ?? "")
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  return (
    <Layout>
      <Titlebar
        title={title}
        onTitleChange={setTitle}
        onSave={() => {
          setShowSaveDialog(!showSaveDialog)
        }}
      />

      <main className={styles.main}>
        <Editor
          editable={true}
          content={document?.content}
          onUpdate={({ editor }) => setContent(editor.getHTML())}
        />
      </main>

      <SaveDialog
        title={title}
        content={content}
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
      />
    </Layout>
  )
}

export default Home
