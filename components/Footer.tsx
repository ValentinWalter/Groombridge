import useDocument from "model/useDocument"
import { useRouter } from "next/router"
import React, { Fragment } from "react"
import Link from "next/link"
import styles from "styles/Footer.module.scss"

export default function Footer() {
  const { asPath } = useRouter()
  const { status } = useDocument()

  const Status = () => {
    if (status && !asPath.includes("edit")) {
      return (
        <section>
          <h3>Meta</h3>
          <Item>
            <span>Created at</span>
            <span>{new Date(status.created).toDateString()}</span>
          </Item>
          <Item>
            <span>CID</span>
            <span>{status.cid}</span>
          </Item>
          <Item>
            <span>Size</span>
            <span>{status.dagSize} B</span>
          </Item>
          <Item>
            <span>IPFS Pins</span>
            <span>{status.pins.length}</span>
          </Item>
          <Item>
            <span>Storage Providers</span>
            <span>
              {status.deals.length > 0
                ? status.deals.map((deal, i) => {
                    return (
                      <Fragment key={deal.dealId}>
                        <a href={`https://filfox.info/en/deal/${deal.dealId}`}>
                          {deal.storageProvider}
                        </a>
                        {i < status.deals.length - 1 && <span>, </span>}
                      </Fragment>
                    )
                  })
                : "(None yet)"}
            </span>
          </Item>
        </section>
      )
    } else return null
  }

  return (
    <footer className={styles.footer}>
      {/* <div className={styles.branding}>
        <h1>Groombridge</h1>
        <p>Text editor.</p>
      </div> */}

      <Status />

      <section>
        <h3>About</h3>

        <Item>
          <span>Groombridge</span>
          <span></span>
          <Link
            href={`/view?cid=bafybeibrbqdz5dlfmczdumov4auwoafbfqgzeuymhq2ttf5ddalfcmn3su`}
          >
            <a>Example document &rarr;</a>
          </Link>
        </Item>

        <Item>
          <span>What is this?</span>
          <span>
            This is a side project I keep to experiment with technologies such as IPFS,
            Filecoin, Nextjs, React and more.
          </span>
        </Item>

        <Item>
          <span>Built with</span>
          <span>
            <a href="https://tiptap.dev">tiptap</a>
            <span>, </span>
            <a href="https://web3.storage">Web3.Storage</a>
            <span>, </span>
            <a href="https://www.radix-ui.com">Radix</a>
            <span>, </span>
            <a href="https://nextjs.org">Next.js</a>
          </span>
        </Item>

        <Item>
          <a href="https://valwal.com">By valwal.com</a>
        </Item>
      </section>
    </footer>
  )
}

const Item = (props: { children: React.ReactNode }) => {
  return <div className={styles.item}>{props.children}</div>
}
