import React from 'react'

const StarButton = (props) => {
  const starCount = props.node.stargazers.totalCount
  const viewerHasStarred = props.node.viewerHasStarred
  const title = starCount === 1 ? `1 star` : `${starCount} stars`
  const isStarred = viewerHasStarred ? 'starred' : '-'
  return (
    <>
      <button>{title + ' | ' + isStarred}</button>
    </>
  )
}

export default StarButton
