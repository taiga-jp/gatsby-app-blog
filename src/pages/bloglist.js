import React from 'react'
import { Link } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../css/bloglist.css"

const Bloglist = ({ data }) => {
  const blogPosts = data.allContentfulBlogPost.edges;
  return (
    <Layout>
      <SEO title="Bloglist" />
      <h1>Blog List</h1>
      <p>Welcome to Blog List</p>
      <h2 className="posts-title">Post List</h2>
      <div className="posts">
        {blogPosts.map(({ node: post }) => (
            <Link
              to={`/bloglist/${post.slug}`}
              className="post"
              key={post.slug}
            >
              <img src={post.thumbnail.file.url} />
              <p>{post.title}</p>
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
        }
      }
    }
  }
`