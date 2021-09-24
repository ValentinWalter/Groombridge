import styles from "styles/SaveDialog.module.scss"
import { useState, useEffect } from "react"
import { CIDString } from "web3.storage"
import * as Dialog from "@radix-ui/react-dialog"
import { Web3Storage } from "web3.storage"
import { Document } from "pages/index"
import PropagateLoader from "react-spinners/PropagateLoader"
import CopyButton from "components/CopyButton"
import Link from "next/link"

const storage = new Web3Storage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhCYTg2OTg2RDcyNDM3MDJiOGNlNUE2RmRlMDgzOEYzODJBNTYwM2QiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzIzMDkyODYwNTUsIm5hbWUiOiJHcm9vbWJyaWRnZSJ9.V__oHO_nj3W84mGG1S-OYOtlE_NBTtHfyXhRkawJpww",
})

type Props = Document & {
  cid?: CIDString
  uploadComplete: boolean
}

export default function Titlebar({
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
      wrapWithDirectory: false,
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

    // setProps({
    //   ...document,
    //   cid: "bafkreiawvbfbrcipuqd3kelxzevdotue4ewzeyg3oa2np7yxpvu3bvs3ja",
    //   uploadComplete: false,
    // })

    // setTimeout(
    //   () =>
    //     setProps({
    //       ...document,
    //       cid: "bafkreiawvbfbrcipuqd3kelxzevdotue4ewzeyg3oa2np7yxpvu3bvs3ja",
    //       uploadComplete: true,
    //     }),
    //   5000
    // )

    // setTimeout(() => handleSave(), 10000)
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
                Documents are stored in HTML and pinned to two geographically distributed
                IPFS nodes. Additionally, a Filecoin deal of 18 months is brokered.{" "}
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
