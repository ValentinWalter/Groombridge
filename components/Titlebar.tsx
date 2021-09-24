import styles from "styles/Titlebar.module.scss"
import { useState } from "react"

interface TitlebarProps {
  onShare?: () => void
  onSave: (title: string) => void
}

export default function Titlebar({ onShare, onSave }: TitlebarProps) {
  const [title, setTitle] = useState("")

  return (
    <div className={styles.titlebar}>
      <button onClick={onShare} className={styles.share}>
        Share
      </button>
      <div className={styles.branding}>
        {/* <h1>Groombridge</h1>
        <p>Text editor.</p> */}
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Document title..."
          className={styles.textfield}
        />
      </div>
      <button
        onClick={() => onSave(title)}
        disabled={title == ""}
        className={styles.save}
      >
        Save
      </button>
    </div>
  )
}
