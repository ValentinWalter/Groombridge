import { Web3Storage } from "web3.storage"

const storage = new Web3Storage({
  token: process.env.NEXT_PUBLIC_WEB3STORAGE_API_TOKEN ?? "",
})

export default storage
