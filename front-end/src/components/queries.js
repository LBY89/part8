import { gql  } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
      born
      bookCount
    }
    published
    id
    genres
  }
`

export const ALL_AUTHORS = gql`
  query  {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query  {
    allBooks{
      title
      author {
        name
        born
        bookCount
      }
      published
      id
      genres
    }
  }
`

export const PORTION_BOOKS = gql`
  query findBooksByGenre($genreToSearch: String!){
    allBooks(genre: $genreToSearch){
     ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ME = gql`
  query  {
    me  {
      username
      favoriteGenre
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook(
      $title: String!
      $author: String!
      $published: Int!
      $genres: [String!]!
  ) {
      addBook(title: $title, author: $author, published: $published, genres: $genres) {
          title
          author {
            name 
            born
            bookCount
          }
          published
          genres
      }
  }

`

export const EDIT_BORN = gql`

  mutation editAuthor($name: String!, $setBornTo: Int!) {
      editAuthor(name: $name, setBornTo: $setBornTo) {
          name
          born
          bookCount
      }
  }

`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
${BOOK_DETAILS}
`


