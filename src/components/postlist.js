import * as React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import classNames from "classnames"

const PostList = ({ activeTags, setTags }) => {
  const data = useStaticQuery(graphql`
    query PostListQuery {
      allMarkdownRemark(
        filter: { frontmatter: { contenttype: { eq: "post" } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MM·DD·YY")
            title
            tags
          }
        }
      }
    }
  `)

  const posts = data.allMarkdownRemark.nodes
  const tags = []
  const postLinks = posts.length ? (
    <ul>
      {posts.map(post => {
        console.log(post)
        const title = post.frontmatter.title || post.fields.slug
        if (post.frontmatter.tags && post.frontmatter.tags.length) {
          tags.push(...post.frontmatter.tags)
        }
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

  const tagset = new Set(tags)
  const tagLinks = (
    <div className="taglist">
      {[...tagset].map(tag => (
        <Link
          className={classNames("tag", { active: activeTags.includes(tag) })}
          to={`/tags/${tag}/`}
        >
          {tag}
        </Link>
      ))}
    </div>
  )

  return (
    <div className="postlist">
      <h5>Tags</h5>
      {tagLinks}
      <h5>Posts</h5>
      {postLinks}
    </div>
  )
}

export default PostList
