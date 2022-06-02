import React, { useState } from 'react'
import client from './client'
import { ApolloProvider } from '@apollo/client'
import Me from './Me'
import SearchRepositories from './SearchRepositories'

const App = () => {
  const [state, setState] = useState({
    first: 3,
    after: null,
    last: null,
    before: null,
    query: '',
  })

  return (
    <ApolloProvider client={client}>
      <form>
        <input
          value={state.query}
          onChange={(e) => {
            setState({ ...state, query: e.target.value })
          }}
        />
      </form>
      <Me />
      <SearchRepositories variables={state} />
    </ApolloProvider>
  )
}

export default App
