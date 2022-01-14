import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  const headerClassname = isRootPath
    ? "header-row index-header-nav"
    : "header-row"

  const header = (
    <>
      {isRootPath && <div className="index-header-img" />}
      <div className="index-header">
        <div className={headerClassname}>
          <h1 className="main-heading">
            <Link to="/">{title}</Link>
          </h1>
          <nav>
            <ul>
              <li>
                <Link className="header-nav-link">about</Link>
              </li>
              <li>·</li>
              <li>
                <Link className="header-nav-link">posts</Link>
              </li>
              <li>·</li>
              <li>
                <Link className="header-nav-link">games</Link>
              </li>
              <li>·</li>
              <li>
                <Link className="header-nav-link">contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )

  return (
    <div>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <header className="global-header">{header}</header>
        <main>{children}</main>
        <footer className="footer">
          <div>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </div>
        </footer>
      </div>
      <div className="footer-img" />
    </div>
  )
}

export default Layout
