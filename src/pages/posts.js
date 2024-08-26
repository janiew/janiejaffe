import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/postlist"
import AllPosts from "../components/allposts"

const BlogPosts = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>no blog posts found.</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      <div className="index-sub">
        <PostList />
        <AllPosts posts={posts} />
      </div>
    </Layout>
  )
}

export default BlogPosts

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
          image {
            childImageSharp {
              gatsbyImageData(width: 200, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`
