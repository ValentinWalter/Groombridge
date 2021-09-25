import Link from "next/link"
import styles from "styles/Titlebar.module.scss"
import useDocument from "model/useDocument"

interface TitlebarProps {
  title?: string
  onTitleChange?: (title: string) => void
  onShare?: () => void
  onSave?: () => void
}

export default function Titlebar({ title, onTitleChange, onSave }: TitlebarProps) {
  const { document, status } = useDocument()

  if (title !== undefined) {
    return (
      <nav className={styles.titlebar}>
        {/* <button onClick={onShare} className={styles.share}>
        Share
      </button> */}

        <input
          type="text"
          value={title}
          onChange={(event) => {
            if (onTitleChange) onTitleChange(event.target.value)
          }}
          placeholder="Document title..."
          className={styles.title}
        />

        <button onClick={onSave} disabled={title == ""} className={styles.save}>
          Save
        </button>
      </nav>
    )
  } else {
    return (
      <nav className={styles.titlebar}>
        <span className={styles.title}>{document?.title}</span>

        <Link href={`/edit/${status?.cid}`} passHref>
          <button className={styles.save}>Edit</button>
        </Link>
      </nav>
    )
  }
}
