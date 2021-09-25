import { useEditor, EditorContent } from "@tiptap/react"
import type { Editor } from "@tiptap/core"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Toolbar from "components/Toolbar"
import styles from "styles/Editor.module.scss"

interface EditorProps {
  editable: boolean
  content?: string
  onUpdate?: (props: { editor: Editor }) => void
}

export default function EditorView(props: EditorProps) {
  const placeholder = Placeholder.configure({ placeholder: "Type something…" })

  const editor = useEditor({
    extensions: [StarterKit, placeholder],
    content: props.content,
    autofocus: true,
    onCreate: props.onUpdate ?? (() => {}),
    onUpdate: props.onUpdate ?? (() => {}),
    editable: props.editable,
    editorProps: {
      attributes: {
        class: `card ${styles.editor_content}`,
      },
    },
  })

  return (
    <div className={styles.editor}>
      {props.editable && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  )
}
