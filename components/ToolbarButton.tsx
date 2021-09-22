import type { Editor } from "@tiptap/react"
import type { ToolbarItem } from "components/Toolbar"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import * as Icons from "@radix-ui/react-icons"
import styles from "styles/Editor.module.scss"

type ToolbarButtonProps = {
  item: ToolbarItem
  editor: Editor
}

export default function ToolbarButton({ item, editor }: ToolbarButtonProps) {
  const buttonClass = `card ${item.isActive() && editor.isFocused ? styles.active : ""}`

  if (item.children != null) {
    // Dropdown menu
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className={buttonClass}>
          {item.label}
          <Icons.ChevronDownIcon />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          onCloseAutoFocus={(event) => event.preventDefault()}
          className={styles.dropdown}
        >
          {item.children?.map((child) => {
            return (
              <DropdownMenu.Item
                key={child.label.key}
                onSelect={() => child.action(editor.chain().focus()).run()}
                className={`${styles.item} ${child.isActive() ? styles.active : ""}`}
              >
                {child.label}
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )
  } else {
    // Plain button
    return (
      <button
        onClick={() => item.action(editor.chain().focus()).run()}
        className={buttonClass}
      >
        {item.label}
      </button>
    )
  }
}
