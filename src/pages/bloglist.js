import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SideBar from "../components/sidebar"
import PostCard from "../components/postcard"
import "../css/common.css"
import "../css/bloglist.css"

const Bloglist = ({ data }) => {
  const blogPosts = data.allContentfulBlogPost.edges
  const categories = data.allContentfulCategory.edges
  return (
    <Layout>
      <SEO title="Bloglist" />
      <h1 className="bloglist-title">Blog List</h1>
      <div className="contents">
        <div className="posts contents-main">
          {blogPosts.map(({ node: post }) => (
            <PostCard
              propsSlug={post.slug}
              propsThumb={post.thumbnail.file.url}
              propsTitle={post.title}
              propsCreated={post.createdAt}
              propsBody={post.body.body}
              propsTags={post.tags}
              key={post.slug}
            />
          ))}
        </div>
        <SideBar categories={categories} />
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
    allContentfulCategory {
      edges {
        node {
          name
          slug
        }
      }
    }
  }
`
