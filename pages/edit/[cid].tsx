import type { NextPage } from "next"
import useDocument from "model/useDocument"
import Home from "pages"

const Edit: NextPage = () => {
  const { document } = useDocument()
  return <Home title={document?.title} content={document?.content} />
}

export default Edit
