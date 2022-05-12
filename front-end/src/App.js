import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './components/queries'
import { useQuery, useApolloClient, useMutation, useSubscription } from '@apollo/client'



const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("library-user-token") ||null)
  const client = useApolloClient()
  //console.log('page', page);
  
  const result = useQuery(ALL_AUTHORS)

  useSubscription(BOOK_ADDED, {
    
    onSubscriptionData: ({subscriptionData}) => {
      console.log('inside useSub');
      
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      //without updateQuery apollo plugin has recent added Book data. WHY?
      client.cache.updateQuery({query: ALL_BOOKS}, ({allBooks}) => {
        return {
          allBooks: allBooks.concat(addedBook)
        }
      })
    }
  })

  const bookResult = useQuery(ALL_BOOKS)

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

 

  if (result.loading || bookResult.loading) {
    return <div>loading...</div>
  }

  const books = bookResult.data.allBooks

  

  const booksGenre = new Set()
  books.forEach( book => {
    if (book.genres.length === 1 ) {
      booksGenre.add(book.genres.toString())
    }
    if (book.genres.length===2) {
      booksGenre.add(book.genres[0].toString())
      booksGenre.add(book.genres[1].toString())
    }
    return booksGenre
  })
  
  const booksGenreArray  = [...booksGenre].concat('all genre')

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token &&<button onClick={() => setPage("add")}>add book</button>}
        {!token &&<button onClick={() => setPage('login')}>login</button>}
        {token &&<button onClick={() => setPage('recommend')}>recommand</button>}
        {token &&<button onClick={logout}>logout</button>}
      </div>
      <Notify errorMessage={errorMessage} />
      <LoginForm show={page === "login"}
        setError={notify} 
        setToken={setToken}
        setPage={setPage}
        />
      <Authors authors={result.data.allAuthors} show={page === 'authors'} />
      <Books appBooks={books} booksGenreArray={booksGenreArray} show={page === 'books'} />
      
      {token && <NewBook show={page === 'add'} setError={notify} />}
      {token && <Recommend 
      show={page === 'recommend'} 
      setError={notify}
      books={bookResult.data.allBooks}
       />}
      
    </div>
  )
}


export default App
