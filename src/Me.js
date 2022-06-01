import { gql, useQuery } from '@apollo/client'

const Me = () => {
  const { loading, error, data } = useQuery(gql`
    query me {
      user(login: "four-orfa") {
        name
      }
    }
  `)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return <div>{data.user.name}</div>
}

export default Me
