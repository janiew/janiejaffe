import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/postlist"
import PostPreview from "../components/postpreview"

const PageIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Homepage" />
      <div className="index-main">
        <Bio />
        <div className="index-sub">
          <PostList />
          <PostPreview />
        </div>
      </div>
    </Layout>
  )
}

export default PageIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
