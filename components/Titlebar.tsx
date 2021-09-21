import styles from "styles/Titlebar.module.scss"

export default function Titlebar() {
  return (
    <div className={styles.titlebar}>
      <button className={styles.share}>Share</button>
      <div className={styles.branding}>
        {/* <h1>Groombridge</h1>
        <p>Text editor.</p> */}
        <input className={styles.textfield} type="text" placeholder="Document title..." />
      </div>
      <button className={styles.save}>Save</button>
    </div>
  )
}
