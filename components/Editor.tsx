import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Toolbar from "components/Toolbar"
import styles from "styles/Editor.module.scss"

export default function EditorView() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
				<h2>
          Hi there,
        </h2>
        <p>
          this is a <em>basic</em> example of <strong>Groombridge</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
        </p>
        <ul>
          <li>
            That’s a bullet list with one …
          </li>
          <li>
            … or two list items.
          </li>
        </ul>
        <p>
          Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
        </p>
        <pre><code class="language-css">body {\n  display: none;\n}</code></pre>
        <p>
          I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
        </p>
        <blockquote>
					“A room without books is like a body without a soul.” 
          <br />
          — Marcus Tullius Cicero
        </blockquote>
				`,
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
