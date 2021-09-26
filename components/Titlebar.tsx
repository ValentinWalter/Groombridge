import Link from "next/link"
import * as Icons from "@radix-ui/react-icons"
import styles from "styles/Titlebar.module.scss"
import useDocument from "model/useDocument"

export interface TitlebarProps {
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

        <span className={styles.title}>
          <Icons.Pencil1Icon className={styles.icon} />
          <input
            type="text"
            value={title}
            onChange={(event) => {
              if (onTitleChange) onTitleChange(event.target.value)
            }}
            placeholder="Document title..."
            style={{ transform: "translateY(-5px)" }}
          />
        </span>

        <button onClick={onSave} disabled={title == ""} className={styles.save}>
          Save
        </button>
      </nav>
    )
  } else {
    return (
      <nav className={styles.titlebar}>
        <span className={styles.title}>
          <Icons.LockClosedIcon
            className={styles.icon}
            style={{ transform: "translateY(2px)" }}
          />
          {document?.title}
        </span>

        <Link href={`/edit?cid=${status?.cid}`} passHref>
          <button className={styles.save}>Edit</button>
        </Link>

        <Link href={`/`} passHref>
          <button className={styles.share}>New</button>
        </Link>
      </nav>
    )
  }
}
