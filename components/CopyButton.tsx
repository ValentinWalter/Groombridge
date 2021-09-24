import * as Icons from "@radix-ui/react-icons"
import styles from "styles/CopyButton.module.scss"
import { useState, useEffect } from "react"

interface Props {
  text?: string
  children?: React.ReactNode
}

const CopyButton = ({ text, children }: Props) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 3000)
  }, [copied])

  const Body = () => {
    if (children != null) {
      return <span>{children}</span>
    } else {
      return <span>Copy {text?.slice(0, 12)}...</span>
    }
  }

  return (
    <button
      onClick={() => {
        if (text != undefined) {
          navigator.clipboard.writeText(text)
          setCopied(true)
        }
      }}
      className={styles.copy}
      data-copied={copied}
    >
      <Body />
      <div className={styles.icon}>
        {copied ? <span>Copied!</span> : <Icons.CopyIcon />}
      </div>
    </button>
  )
}

export default CopyButton
