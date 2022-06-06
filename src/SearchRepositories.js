import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

const SearchRepositories = (props) => {
  const PER_PAGE = 3

  const [query, setQuery] = useState('')
  const [state, setState] = useState({
    first: PER_PAGE,
    after: null,
    last: null,
    before: null,
    query: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const searchRepositories = (e) => {
    e.preventDefault()
    setState({ ...state, query: query })
  }

  const { loading, error, data } = useQuery(
    gql`
      query searchRepositories($first: Int, $after: String, $last: Int, $before: String, $query: String!) {
        search(first: $first, after: $after, last: $last, before: $before, query: $query, type: REPOSITORY) {
          repositoryCount
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          edges {
            cursor
            node {
              ... on Repository {
                id
                name
                url
                stargazers {
                  totalCount
                }
                viewerHasStarred
              }
            }
          }
        }
      }
    `,
    {
      variables: { ...state },
    },
  )

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const repositoryCount = data.search.repositoryCount
  const repositoryUnit = repositoryCount === 1 ? 'Repository' : 'Repositories'
  const title = `Github Repositories Search - ${repositoryCount} ${repositoryUnit}`

  const nextPage = (search) => {
    setState({
      first: PER_PAGE,
      after: search.pageInfo.endCursor,
      last: null,
      before: null,
      query: query,
    })
  }

  const previousPage = (search) => {
    setState({
      first: null,
      after: null,
      last: PER_PAGE,
      before: search.pageInfo.startCursor,
      query: query,
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
        />
        <button onClick={searchRepositories}>Search</button>
      </form>

      <h2>{title}</h2>
      <ul>
        {data.search.edges.map((edge) => {
          const node = edge.node
          return (
            <li key={node.id}>
              <a href={node.url} target='_blank' rel='noopener noreferrer'>
                {node.name}
              </a>
            </li>
          )
        })}
      </ul>
      {data.search.pageInfo.hasPreviousPage ? (
        <button onClick={() => previousPage(data.search)}>Previous</button>
      ) : null}
      {data.search.pageInfo.hasNextPage ? <button onClick={() => nextPage(data.search)}>Next</button> : null}
    </>
  )
}

export default SearchRepositories
