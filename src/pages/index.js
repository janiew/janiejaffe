import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/postlist"
import PostPreview from "../components/postpreview"
import AllPosts from "../components/allposts"

const PageIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const [tags, setTags] = React.useState([])

  const posts = tags.length
    ? data.allMarkdownRemark.nodes.filter(n => {
        console.log(n)
        console.log(tags)
        return n.frontmatter.tags?.some(t => tags.includes(t))
      })
    : data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Homepage" />
      <div className="index-main">
        <Bio />
        <hr />
        <div className="index-sub">
          <PostList activeTags={tags} setTags={setTags} />
          <AllPosts posts={posts} tags={tags} />
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
    allMarkdownRemark(
      filter: { frontmatter: { contenttype: { eq: "post" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
          image {
            childImageSharp {
              gatsbyImageData(width: 500, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`
