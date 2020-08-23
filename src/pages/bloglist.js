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
          <div className="post-title" key={post.slug}>
            <Link to={`/blogpost/${post.slug}`}>{post.title}</Link>
          </div>
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
          body {
            body
          }
          tags
        }
      }
    }
  }
`