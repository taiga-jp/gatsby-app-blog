import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Home</h1>
    <Link to="/bloglist/">View Blog List</Link> <br />
  </Layout>
)

export default IndexPage