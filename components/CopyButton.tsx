import * as Icons from "@radix-ui/react-icons"
import styles from "styles/CopyButton.module.scss"
import { useState } from "react"

interface Props {
  text?: string
}

const CopyButton = ({ text }: Props) => {
  const [copied, setCopied] = useState(false)

  return (
    <button
      onClick={() => {
        if (text != undefined) {
          navigator.clipboard.writeText(text)
          setCopied(true)
        }
      }}
      className={styles.copy}
    >
      <span>{text?.slice(0, 10)}</span>
      <div className={styles.icon}>
        {copied ? <span>Copied!</span> : <Icons.CopyIcon />}
      </div>
    </button>
  )
}

export default CopyButton
