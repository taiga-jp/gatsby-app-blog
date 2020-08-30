import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../css/blogpost.css"

const BlogPost = ({ data }) => {
  const { title, thumbnail, body, tags } = data.contentfulBlogPost
  return (
    <Layout>
      <SEO title={title} />
      <div className="blogpost">
        <h1>{title}</h1>
        <img src={thumbnail.file.url} />
        <p className="body-text">{body.body}</p>
        <div className="tags">
          タグ：
          {tags.map(tag => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <Link to="/bloglist/">Back to Blog List</Link>
        <br></br>
        <Link to="/">Back to Home</Link>
      </div>
    </Layout>
  )
}
export default BlogPost
export const pageQuery = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      thumbnail {
        file {
          url
        }
      }
      body {
        body
      }
      tags
    }
  }
`
