import { Link } from "gatsby"
import React from "react"
import "../css/category.css"

function CategoryList(props) {
  return (
    <div className="category">
      {props.categories.map(({ node: category }) => (
        <Link
          to={`/category/${category.name}`}
          className="category-name"
          key={category.slug}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}

export default CategoryList
