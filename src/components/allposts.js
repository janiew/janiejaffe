import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Masonry } from "masonic"

const AllPosts = ({ posts, tags }) => {
  const key = !!tags ? tags.reduce((t, n) => t + n, "") : "allposts"
  return (
    <Masonry
      key={key}
      className="all-posts"
      render={PostDisplay}
      items={posts}
      columnWidth={400}
      columnGutter={16}
    />
  )
}

const PostDisplay = ({ index, data, width }) => {
  const title = data.frontmatter.title || data.fields.slug
  const image = getImage(data.frontmatter.image)
  if (!image) console.log("no image for post " + title)
  return (
    <article
      className="post-list-item"
      itemScope
      itemType="http://schema.org/Article"
      key={data.fields.slug}
    >
      <Link to={data.fields.slug} itemProp="url">
        <header>
          <h2>
            <span itemProp="headline">{title}</span>
          </h2>
          <small>{data.frontmatter.date}</small>
        </header>
        <section>
          <GatsbyImage image={image} />
          <p
            dangerouslySetInnerHTML={{
              __html: data.frontmatter.description || data.excerpt,
            }}
            itemProp="description"
          />
        </section>
      </Link>
    </article>
  )
}

export default AllPosts
