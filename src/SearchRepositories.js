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
  console.log(data)
  return <div>{}</div>
}

export default SearchRepositories
