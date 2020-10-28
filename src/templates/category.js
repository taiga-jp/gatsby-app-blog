import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import CategoryList from "../components/categoryList"
import PostCard from "../components/postcard"
import "../css/common.css"
import "../css/bloglist.css"

const Category = ({ data }) => {
  const blogPosts = data.allContentfulBlogPost.edges
  const categories = data.allContentfulCategory.edges
  const isCategory = data.contentfulCategory
  return (
    <Layout>
      <SEO title="Bloglist" />
      <CategoryList categories={categories} />
      <h1 className="bloglist-title">{isCategory.name}</h1>
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
      </div>
    </Layout>
  )
}

export default Category
export const pageQuery = graphql`
  query($slug: String!) {
    allContentfulBlogPost(
      filter: { category: { elemMatch: { name: { eq: $slug } } } }
    ) {
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
    contentfulCategory(slug: { eq: $slug }) {
      name
    }
  }
`
