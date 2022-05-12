import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BORN ,ALL_AUTHORS, ALL_BOOKS } from './queries'
import Select from 'react-select'
 
const UpdateBorn = (props) => {


  const {authors} = props
  const options = []

  authors.forEach( author => {
    options.push({value: author.name, label: author.name})
  })

  const [selectedOption, setName] = useState(options[0].value)
  const [setBornTo, setBorn] = useState('')
  
  const [changeBorn, result] = useMutation(EDIT_BORN,{
    refetchQueries: [ {query: ALL_AUTHORS}, {query: ALL_BOOKS} ]
  })

  
  const name = selectedOption.value
  const submit = async (e) => {
    
    e.preventDefault()
    changeBorn({variables: {name, setBornTo}})

    //setName('')
    setBorn('')

  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      //console.log('person not found')
    }
  }, [result.data]) // eslint-disable-line


  return (
    <div>
      <Select 
          defaultValue={selectedOption}
          onChange={selectedOption =>setName(selectedOption)}
          options={options}
        />
     <form onSubmit={submit}>
      
        <div>
          born
          <input
            value={setBornTo}
            onChange={({target}) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  //console.log('Authors props', props);
  
  if (!props.show) {
    return null
  }
  const authors = props.authors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2> Set birthday</h2>
      <UpdateBorn authors={authors}/>
    </div>
  )
}


export default Authors
