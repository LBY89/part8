//import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ME } from './queries'

const Recommend = ({show, books}) => {

    const result = useQuery(ME)
    //console.log('result from recommend', result);
    
    if (result.loading) {
        return <div>loading...</div>
      }

    const favGenre = result.data.me.favoriteGenre

    const favBooks = books.filter(book => book.genres.includes(favGenre) ? book : null)
    //console.log('favBooks from recommend', favBooks);
    
    if(!show){
        return null
    }

    return(
        <div>
            <h2>recommendations</h2>
            <div>books in your favorite genre <b>{favGenre}</b></div>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {favBooks.map((a) => (
                    <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            
        </div>
    )
}

export default Recommend