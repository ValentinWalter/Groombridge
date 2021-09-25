import type { NextPage } from "next"
import styles from "styles/Home.module.scss"
import Editor from "components/Editor"
import Titlebar from "components/Titlebar"
import useDocument from "model/useDocument"
import Layout from "components/Layout"
import PropagateLoader from "react-spinners/PropagateLoader"
import Home from "pages/index"

const Document: NextPage = () => {
  const { document, isLoading, isError } = useDocument()

  if (isLoading) {
    return (
      <Layout>
        <div className="page-spinner">
          <PropagateLoader color="var(--blue9)" />
        </div>
      </Layout>
    )
  }

  if (isError) {
    return <Home />
  }

  return (
    <Layout>
      <Titlebar />

      <main className={styles.main}>
        <Editor editable={false} content={document?.content} />
      </main>
    </Layout>
  )
}

export default Document
