import styles from "styles/SaveDialog.module.scss"
import { useState } from "react"
import { CIDString } from "web3.storage"
import * as Dialog from "@radix-ui/react-dialog"
import storage from "model/storage"
import { Document } from "model/useDocument"
import PropagateLoader from "react-spinners/PropagateLoader"
import CopyButton from "components/CopyButton"
import Link from "next/link"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  document: Document
}

export default function SaveDialog(props: Props) {
  const [cid, setCID] = useState<CIDString | undefined>()
  const [uploadComplete, setUploadComplete] = useState(false)
  const [userUnderstands, setUserUnderstands] = useState(false)

  const _onOpenChange = (open: boolean) => {
    if (!open) {
      // Reset state when closed
      setCID(undefined)
      setUploadComplete(false)
      setUserUnderstands(false)
    }
    props.onOpenChange(open)
  }

  const handleSave = async () => {
    const file = new File([props.document.content], props.document.title, {
      type: "text/html",
    })
    const cid = await storage.put([file], {
      name: props.document.title,
      onRootCidReady: setCID,
    })

    console.log(cid)
    setCID(cid)
    setUploadComplete(true)
  }

  const Body = () => {
    if (cid != undefined) {
      return (
        <div className={styles.result}>
          <div className={styles.statusMessage} data-uploadcomplete={uploadComplete}>
            <PropagateLoader loading={!uploadComplete} color={"var(--mauve11)"} />
            <span>
              {uploadComplete ? "Success!" : "Uploading document to IPFS and Filecoin…"}
            </span>
          </div>
          <p>
            This document is being saved to IPFS and Filecoin. Documents are regularly
            purged. Copy the CID below to pin the file to your node.
          </p>
          <CopyButton text={cid}>Copy CID ({cid?.slice(0, 8)}...)</CopyButton>
          <span className={styles.entireCID}>{cid}</span>
        </div>
      )
    } else {
      return (
        <div>
          <div className={styles.warning}>
            <ol>
              <li>
                Documents are not encrypted and accessible to anyone with the CID (url).
              </li>
              <li>
                Documents are stored in HTML and pinned to 3 geographically distributed
                IPFS nodes. Additionally, multiple Filecoin deals of 18 months are
                brokered.{" "}
                <a href="https://web3.storage/about/#terms-of-service">
                  Refer to the Web3.Storage TOS.
                </a>
              </li>
              <li>
                This is a personal side project. Documents may be deleted at any time. If
                you want to keep one, pin the file (CID) to your IPFS node.
              </li>
            </ol>
          </div>

          <label>
            <input
              type="checkbox"
              name="I Understand"
              checked={userUnderstands}
              onChange={(event) => setUserUnderstands(event.target.checked)}
            />
            <span>I understand</span>
          </label>
        </div>
      )
    }
  }

  return (
    <Dialog.Root open={props.open} onOpenChange={_onOpenChange}>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content className={styles.dialog}>
        <Dialog.Title>{`"${props.document.title}"`}</Dialog.Title>
        <p className={styles.autosaveinfo}>
          Documents are auto-saved every second to your browser&apos;s local storage.
        </p>

        <Body />

        <div className={styles.buttons}>
          <Dialog.Close className={styles.cancel}>Cancel</Dialog.Close>
          {cid != undefined ? (
            <Link href={`/view?cid=${cid}`} passHref>
              <button disabled={!uploadComplete} className={styles.save}>
                View
              </button>
            </Link>
          ) : (
            <button
              onClick={handleSave}
              disabled={!userUnderstands || cid != null}
              className={styles.save}
            >
              Save
            </button>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
