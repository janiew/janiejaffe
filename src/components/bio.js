import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

export const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      {author?.name && (
        <p>
          <strong>{author.name}</strong> {author?.summary || null}
          {` `}
          {/* <a href={`https://twitter.com/${social?.twitter || ``}`}>
            You should follow them on Twitter
          </a> */}
        </p>
      )}
      <p>
        You can reach her at janiejaffe0 <i>(at)</i> gmail <i>(dot)</i> com.
      </p>
      <p>
        <i>Next gig: 9/28 @ Cutelab</i>
      </p>
    </div>
  )
}
