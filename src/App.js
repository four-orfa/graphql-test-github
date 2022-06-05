import React from 'react'
import client from './client'
import { ApolloProvider } from '@apollo/client'
import SearchRepositories from './SearchRepositories'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <SearchRepositories />
    </ApolloProvider>
  )
}

export default App
