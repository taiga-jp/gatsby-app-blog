import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import MenuLst from "../components/menu"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#fff`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        position: `relative`,
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0, textAlign: 'center', }}>
        <Link
          to="/bloglist/"
          style={{
            color: `#666`,
            fontWeight: `normal`,
            textDecoration: `none`,
          }}
        >
          {/* {siteTitle} */}
          My Blog
        </Link>
      </h1>
      <MenuLst />
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
