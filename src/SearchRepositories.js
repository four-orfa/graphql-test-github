import { gql, useQuery } from '@apollo/client'

const SearchRepositories = (props) => {
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
      variables: { ...props.variables },
    },
  )

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const repositoryCount = data.search.repositoryCount
  const repositoryUnit = repositoryCount === 1 ? 'Repository' : 'Repositories'
  const title = `Github Repositories Search - ${repositoryCount} ${repositoryUnit}`
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {data.search.edges.map((edge) => {
          const node = edge.node
          return (
            <li key={node.id}>
              <a href={node.url}>{node.name}</a>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default SearchRepositories
