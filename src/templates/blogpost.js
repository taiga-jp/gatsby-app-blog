import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../css/blogpost.css"
import marked from "marked";

const BlogPost = ({ data }) => {
  const { title, thumbnail, body, tags } = data.contentfulBlogPost;
  const bodyText = marked(body.body);

  return (
    <Layout>
      <SEO title={title} />
      <div className="blogpost">
        <h1>{title}</h1>
        <img className="thumb" src={thumbnail.file.url} alt="" />
        <div className="body-text">
          <span dangerouslySetInnerHTML={{ __html: marked(bodyText)}}/>
        </div>
        <div className="tags">
          タグ：
          {tags.map(tag => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
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
