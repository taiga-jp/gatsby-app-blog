import React from 'react'
import { Link } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../css/bloglist.css"

const Bloglist = ({ data }) => {
  const blogPosts = data.allContentfulBlogPost.edges;
  const textSlice = (target) => {
    var text = target;
    var slicetext = text.length > 20 ? text.slice(0, 120) + "…" : text
    return slicetext;
  }
  return (
    <Layout>
      <SEO title="Bloglist" />
      <h1>Blog List</h1>
      <p>ブログ一覧</p>
      <h2 className="posts-title">Post List</h2>
      <div className="posts">
        {blogPosts.map(({ node: post }) => (
          <Link to={`/bloglist/${post.slug}`} className="post" key={post.slug}>
            <img src={post.thumbnail.file.url} className="post-thumb" />
            <div className="post-content">
              <div className="post-text">
                <p className="post-title">{post.title}</p>
                <p className="post-date">{post.createdAt}</p>
                <p className="post-body">{textSlice(post.body.body)}</p>
              </div>
              <div className="post-tags">
                {post.tags.map(tag => (
                  <span className="post-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link to="/">Back to Home</Link>
    </Layout>
  )
}

export default Bloglist
export const pageQuery = graphql`
  query {
    allContentfulBlogPost(sort: { fields: createdAt, order: DESC }) {
      edges {
        node {
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
          createdAt(formatString: "YYYY.MM.DD")
        }
      }
    }
  }
`