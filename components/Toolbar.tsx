import type { Editor, ChainedCommands } from "@tiptap/react"
import * as Icons from "@radix-ui/react-icons"
import ToolbarButton from "components/ToolbarButton"
import styles from "styles/Editor.module.scss"

export type ToolbarItem = {
  label: JSX.Element
  action: (arg0: ChainedCommands) => ChainedCommands
  isActive: () => boolean
  children?: Array<ToolbarItem>
}

type ToolbarProps = {
  editor: Editor | null
}

export default function Toolbar({ editor }: ToolbarProps) {
  if (editor === null) return null

  const toggle = (
    commands: ChainedCommands,
    item: string,
    type: "mark" | "node",
    attributes?: Record<string, unknown>
  ) => {
    switch (type) {
      case "mark": {
        const selection = editor.state.selection
        const range = selection.to - selection.from
        if (range > 0) {
          return commands.toggleMark(item, attributes)
        }
        break
      }
      case "node": {
        const toggleTo = editor.isActive(item, attributes) ? "paragraph" : item
        return commands.toggleNode(item, toggleTo, attributes)
      }
    }
    return commands
  }

  const items: Array<ToolbarItem> = [
    {
      label: <Icons.HeadingIcon key="heading" />,
      action: (commands) => commands,
      isActive: () => false,
      children: [1, 2, 3, 4, 5, 6].map((level) => {
        return {
          label: <span key={level}>{level == 1 ? "Title" : `Heading ${level}`}</span>,
          action: (commands) => toggle(commands, "heading", "node", { level: level }),
          isActive: () => editor.isActive("heading", { level: level }),
        }
      }),
    },
    {
      label: <Icons.ListBulletIcon />,
      action: (commands) => commands,
      isActive: () => false,
      children: [
        {
          label: <span key="bullet">Bullet List</span>,
          action: (commands) => commands.toggleBulletList(),
          isActive: () => editor.isActive("bulletList"),
        },
        {
          label: <span key="ordered">Ordered List</span>,
          action: (commands) => commands.toggleOrderedList(),
          isActive: () => editor.isActive("orderedList"),
        },
        {
          label: <span key="todo">Todo List (soon)</span>,
          action: (commands) => commands,
          isActive: () => false,
        },
      ],
    },
    {
      label: <Icons.FontBoldIcon key="bold" />,
      action: (commands) => commands.toggleBold(),
      isActive: () => editor.isActive("bold"),
    },
    {
      label: <Icons.FontItalicIcon key="italic" />,
      action: (commands) => commands.toggleItalic(),
      isActive: () => editor.isActive("italic"),
    },
    {
      label: <Icons.StrikethroughIcon key="strike" />,
      action: (commands) => commands.toggleStrike(),
      isActive: () => editor.isActive("strike"),
    },
    {
      label: <Icons.CodeIcon key="code" />,
      action: (commands) => commands.toggleCode(),
      isActive: () => editor.isActive("code"),
    },
    {
      label: <Icons.QuoteIcon key="quote" />,
      action: (commands) => commands.toggleBlockquote(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      label: <Icons.DividerHorizontalIcon key="divider" />,
      action: (commands) => commands.setHorizontalRule(),
      isActive: () => editor.isActive("horizontalRule"),
    },
  ]

  return (
    <div className={styles.toolbar}>
      {items.map((item) => {
        return <ToolbarButton key={item.label.key} item={item} editor={editor} />
      })}
    </div>
  )
}
