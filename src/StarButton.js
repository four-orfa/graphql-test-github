import React from 'react'

const StarButton = (props) => {
  const starCount = props.node.stargazers.totalCount
  const title = starCount === 1 ? `1 star` : `${starCount} stars`
  return <button>{title}</button>
}

export default StarButton
