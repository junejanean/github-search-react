import React from 'react'

function ListRepos({name, url}) {
  return (
  <a target='_blank' className='repo' href={url}>{name}</a>
  )
}

export default ListRepos;