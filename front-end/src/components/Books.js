import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { PORTION_BOOKS,  } from './queries'

const Books = ({show, appBooks,booksGenreArray}) => {
  
  const [genreToSearch, setGenreToSearch] = useState('all genre')
  
  const result = useQuery(
      //skip: !genreToSearch kills useQuery, no execution
      PORTION_BOOKS,
      {variables: {genreToSearch}}
    
    )

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  if (!show) {
    return null
  }

  
  return (
    <div>
      <h2>books</h2>
      <div>in genre <b>{genreToSearch}</b></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          { genreToSearch === 'all genre' ?
          appBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))
          :
          books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
      <div>
      {booksGenreArray.map((a,index) => (<button 
      onClick={() => setGenreToSearch(a)}
      value={a}
      key={index}>{a}</button>))}
      </div>
    </div>
  )
}

export default Books
