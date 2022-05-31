import client from './client'
import { ApolloProvider, gql, useQuery } from '@apollo/client'

const ME = gql`
  query me {
    user(login: "four-orfa") {
      name
    }
  }
`
const Me = () => {
  const { loading, error, data } = useQuery(ME)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return <div>{data.user.name}</div>
}

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='App'>test graphQL</div>
      <Me />
    </ApolloProvider>
  )
}

export default App
