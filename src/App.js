import client from './client'
import { ApolloProvider } from '@apollo/client'
import Me from './Me'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='App'>test graphQL</div>
      <Me />
    </ApolloProvider>
  )
}

export default App
