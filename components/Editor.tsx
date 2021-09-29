import { useEditor, EditorContent } from "@tiptap/react"
import type { Editor } from "@tiptap/core"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Toolbar from "components/Toolbar"
import styles from "styles/Editor.module.scss"
import { useEffect } from "react"

const placeholder = Placeholder.configure({ placeholder: "Type something…" })

interface EditorProps {
  editable?: boolean
  initialContent?: string
  onUpdate?: (editor: Editor) => void
}

export default function EditorView(props: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, placeholder],
    content: props.initialContent,
    autofocus: true,
    editable: props.editable,
    onCreate: ({ editor }) => props.onUpdate && props.onUpdate(editor),
    onUpdate: ({ editor }) => props.onUpdate && props.onUpdate(editor),
    editorProps: {
      attributes: {
        class: `card ${styles.editor_content}`,
      },
    },
  })

  // Update editor when initialContent changes
  useEffect(() => {
    editor
      ?.chain()
      .setContent(props.initialContent ?? "")
      .run()
  }, [props.initialContent, editor])

  return (
    <div className={styles.editor}>
      {props.editable && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  )
}
