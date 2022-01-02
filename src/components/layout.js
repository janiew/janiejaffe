import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let headTitle

  if (isRootPath) {
    headTitle = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    headTitle = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  const header = (
    <div className="header-row">
      {headTitle}
      <nav>
        <ul>
          <li>
            <Link className="header-nav-link">posts</Link>
          </li>
          <li>·</li>
          <li>
            <Link className="header-nav-link">games</Link>
          </li>
          <li>·</li>
          <li>
            <Link className="header-nav-link">about</Link>
          </li>
          <li>·</li>
          <li>
            <Link className="header-nav-link">contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  )

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
