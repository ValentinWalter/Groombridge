import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Toolbar from "components/Toolbar"
import styles from "styles/Editor.module.scss"

export default function EditorView() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
    autofocus: true,
    editorProps: {
      attributes: {
        class: `card ${styles.editor_content}`,
      },
    },
  })

  return (
    <div className={styles.editor}>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
