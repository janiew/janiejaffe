import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const PostPreview = () => {
  const data = useStaticQuery(graphql`
    query PreviewQuery {
      allMarkdownRemark(
        filter: { frontmatter: { contenttype: { eq: "post" } } }
        sort: { fields: frontmatter___date, order: DESC }
        limit: 1
      ) {
        nodes {
          excerpt(pruneLength: 160)
          frontmatter {
            date(formatString: "MM·DD·YY")
            description
            title
            image {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
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
        <Link to={post.fields.slug} itemProp="url">
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
        </Link>
        <p>{post.frontmatter.date}</p>
        <GatsbyImage image={post.frontmatter.image} />
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
