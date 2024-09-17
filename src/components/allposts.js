import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const AllPosts = ({ posts }) => {
  return (
    <div className="all-posts">
      {posts.map(post => {
        const title = post.frontmatter.title || post.fields.slug
        const image = getImage(post.frontmatter.image)
        if (!image) console.log("no image for post " + title)

        return (
          <article
            className="post-list-item"
            itemScope
            itemType="http://schema.org/Article"
            key={post.fields.slug}
          >
            <header>
              <h2>
                <Link to={post.fields.slug} itemProp="url">
                  <span itemProp="headline">{title}</span>
                </Link>
              </h2>
              <small>{post.frontmatter.date}</small>
            </header>
            <section>
              <GatsbyImage image={image} />
              <p
                dangerouslySetInnerHTML={{
                  __html: post.frontmatter.description || post.excerpt,
                }}
                itemProp="description"
              />
            </section>
          </article>
        )
      })}
    </div>
  )
}

export default AllPosts
