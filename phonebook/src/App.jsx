import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.map(p => p.name).includes(newName)) {
      return alert(`${newName} is already added to phonebook`)
    }
    const newPerson = { name: newName }
    setPersons(persons.concat(newPerson))
    setNewName("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p => <div key={p.name}>{p.name}</div>)}
    </div>
  )
}

export default App