import { useRouter } from "next/router"
import useSWR from "swr"
import storage from "model/storage"
import { CIDString, Status } from "web3.storage"

export type Document = {
  title: string
  content: string
}

interface Data {
  document: Document
  status: Status
}

const fetcher: (cid: CIDString) => Promise<Data> = async (cid) => {
  const res = await storage.get(cid)
  const files = await res?.files()
  // Assumption: always just one file at CID
  const file = files?.flatMap((file) => file)[0]

  const status = await storage.status(cid)

  const title = file?.name
  const content = await file?.text()

  if (title && content && status)
    return {
      document: {
        title: title,
        content: content,
      },
      status: status,
    }
  else throw "Error"
}

export default function useDocument() {
  const router = useRouter()
  const cid = router.query.cid?.toString() ?? ""
  const { data, error } = useSWR(cid, fetcher)

  return {
    document: data?.document,
    status: data?.status,
    isLoading: !data && !error,
    isError: error,
  }
}
