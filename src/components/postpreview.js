import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const PostPreview = () => {
  const data = useStaticQuery(graphql`
    query PreviewQuery {
      allMarkdownRemark(
        sort: { fields: frontmatter___date, order: DESC }
        limit: 1
      ) {
        nodes {
          excerpt(pruneLength: 160)
          frontmatter {
            date
            description
            title
          }
          fields {
            slug
          }
          html
          id
        }
      }
    }
  `)

  const posts = data.allMarkdownRemark.nodes
  if (!posts.length) {
    return (
      <div>
        <p>oops no post was found</p>
      </div>
    )
  }

  const post = posts[0]
  return (
    <article
      className="blog-post"
      itemScope
      itemType="http://schema.org/Article"
    >
      <header>
        <h1 itemProp="headline">{post.frontmatter.title}</h1>
        <p>{post.frontmatter.date}</p>
      </header>
      <section
        dangerouslySetInnerHTML={{ __html: post.html }}
        itemProp="articleBody"
      />
      <hr />
    </article>
  )
}

export default PostPreview
