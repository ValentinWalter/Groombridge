import styles from "styles/SaveDialog.module.scss"
import { useState, useEffect } from "react"
import { CIDString } from "web3.storage"
import * as Dialog from "@radix-ui/react-dialog"
import storage from "model/storage"
import { Document } from "model/useDocument"
import PropagateLoader from "react-spinners/PropagateLoader"
import CopyButton from "components/CopyButton"
import Link from "next/link"

type Props = Document & {
  cid?: CIDString
  uploadComplete: boolean
}

export default function SaveDialog({
  open,
  onOpenChange,
  ...document
}: Document & { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [props, setProps] = useState<Props>({
    ...document,
    cid: undefined,
    uploadComplete: false,
  })
  const [userUnderstands, setUserUnderstands] = useState(false)

  useEffect(() => {
    if (open) {
      setProps({
        ...props,
        ...document,
      })
    } else {
      // Reset state when closed
      setProps({
        ...document,
        cid: undefined,
        uploadComplete: false,
      })
      setUserUnderstands(false)
    }
  }, [open])

  const handleSave = async () => {
    const file = new File([props.content], props.title, { type: "text/html" })
    const cid = await storage.put([file], {
      name: props.title,
      onRootCidReady: (cid) => {
        setProps({
          ...document,
          cid: cid,
          uploadComplete: false,
        })
      },
    })
    console.log(cid)

    setProps({
      ...document,
      cid: cid,
      uploadComplete: true,
    })
  }

  const Body = () => {
    if (props.cid != undefined) {
      return (
        <div className={styles.result}>
          <div
            className={styles.statusMessage}
            data-uploadcomplete={props.uploadComplete}
          >
            <PropagateLoader loading={!props.uploadComplete} color={"var(--mauve11)"} />
            <span>
              {props.uploadComplete
                ? "Success!"
                : "Uploading document to IPFS and Filecoin…"}
            </span>
          </div>
          <p>
            This document is being saved to IPFS and Filecoin. Documents are regularly
            purged. Copy the CID below to pin the file to your node.
          </p>
          <CopyButton text={props.cid}>Copy CID ({props.cid.slice(0, 8)}...)</CopyButton>
          <span className={styles.entireCID}>{props.cid}</span>
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
                IPFS nodes. Additionally, two Filecoin deals of 18 months are brokered.{" "}
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
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content className={styles.dialog}>
        <Dialog.Title>{`"${props.title}"`}</Dialog.Title>

        <Body />

        <div className={styles.buttons}>
          <Dialog.Close className={styles.cancel}>Cancel</Dialog.Close>
          {props.cid != undefined ? (
            <Link href={`/${props.cid}`} passHref>
              <button disabled={!props.uploadComplete} className={styles.save}>
                View
              </button>
            </Link>
          ) : (
            <button
              onClick={handleSave}
              disabled={!userUnderstands || props.cid != null}
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
