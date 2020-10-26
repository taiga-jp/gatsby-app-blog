import { Link } from "gatsby"
import React from "react"
import "../css/sidebar.css"

function SideBar(props) {
  return (
    <div className="sidebar">
      <p className="sidebar-title">カテゴリ一覧</p>
      {props.categories.map(({ node: category }) => (
        <Link
          to={`/category/${category.name}`}
          className="sidebar-category"
          key={category.slug}
        >
          {category.name}
        </Link>
      ))}
      <Link to="/contact">CONTACT</Link>
    </div>
  )
}

export default SideBar
