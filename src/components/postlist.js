import * as React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

const PostList = () => {
  const data = useStaticQuery(graphql`
    query PostListQuery {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MM·DD·YY")
            title
          }
        }
      }
    }
  `)

  const posts = data.allMarkdownRemark.nodes
  const postLinks = posts.length ? (
    <ul>
      {posts.map(post => {
        const title = post.frontmatter.title || post.fields.slug
        return (
          <li key={post.fields.slug} className="postlist-link">
            <Link to={post.fields.slug} itemProp="url">
              <span className="postlist-title">{title}</span>
            </Link>
            <span className="postlist-date">{post.frontmatter?.date}</span>
          </li>
        )
      })}
    </ul>
  ) : (
    <p>no posts found</p>
  )

  return (
    <div className="postlist">
      <h5>Posts</h5>
      {postLinks}
    </div>
  )
}

export default PostList
