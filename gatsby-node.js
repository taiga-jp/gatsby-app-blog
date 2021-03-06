/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const slash = require(`slash`)
exports.createPages = ({
  graphql,
  actions
}) => {
  const {
    createPage
  } = actions
  return graphql(
      `
      {
        allContentfulBlogPost {
          edges {
            node {
              id
              slug
            }
          }
        }
        allContentfulCategory {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
    )
    .then(result => {
      if (result.errors) {
        console.log("Error retrieving contentful data", result.errors)
      }
      const blogPostTemplate = path.resolve("./src/templates/blogpost.js")
      const categoryPostTemplate = path.resolve("./src/templates/category.js")
      result.data.allContentfulBlogPost.edges.forEach(edge => {
        createPage({
          path: `/bloglist/${edge.node.slug}/`,
          component: slash(blogPostTemplate),
          context: {
            slug: edge.node.slug,
            id: edge.node.id,
          },
        })
      })
      result.data.allContentfulCategory.edges.forEach(edge => {
        createPage({
          path: `/category/${edge.node.slug}/`,
          component: slash(categoryPostTemplate),
          context: {
            slug: edge.node.slug,
          },
        })
      })
    })
    .catch(error => {
      console.log("Error retrieving contentful data", error)
    })
}