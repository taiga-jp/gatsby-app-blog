import { Link } from "gatsby"
import React from "react"
import "../css/postcard.css"

function PostCard(props) {
  const {
    propsSlug,
    propsThumb,
    propsTitle,
    propsCreated,
    propsBody,
    propsTags,
  } = props
  const textSlice = target => {
    var text = target
    var slicetext = text.length > 20 ? text.slice(0, 80) + "…" : text
    return slicetext
  }
  return (
    <Link to={`/bloglist/${propsSlug}`} className="postcard" key={propsSlug}>
      <img src={propsThumb} className="postcard-thumb" alt="" />
      <div className="postcard-content">
        <div className="postcard-text">
          <p className="postcard-title">{propsTitle}</p>
          <p className="postcard-date">{propsCreated}</p>
          <p className="postcard-body">{textSlice(propsBody)}</p>
        </div>
        <div className="postcard-tags">
          {propsTags.map(tag => (
            <span className="postcard-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default PostCard
