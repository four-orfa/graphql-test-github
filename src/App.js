import React, { useState } from 'react'
import client from './client'
import { ApolloProvider } from '@apollo/client'
import SearchRepositories from './SearchRepositories'

const App = () => {
  const [query, setQuery] = useState('')
  const [state, setState] = useState({
    first: 3,
    after: null,
    last: null,
    before: null,
    query: '',
  })

  const searchRepositories = () => {
    setState({ ...state, query: query })
  }

  return (
    <ApolloProvider client={client}>
      <form>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
        />
        <button type='button' onClick={searchRepositories}>
          Search
        </button>
      </form>
      <SearchRepositories variables={state} />
    </ApolloProvider>
  )
}

export default App
