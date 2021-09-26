import type { NextPage } from "next"
import useDocument from "model/useDocument"
import Home from "pages"
import Layout from "components/Layout"
import { PropagateLoader } from "react-spinners"

const Edit: NextPage = () => {
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

  return <Home title={document?.title} content={document?.content} />
}

export default Edit
