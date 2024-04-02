import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [shownPersons, setShownPersons] = useState(persons)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.map(p => p.name).includes(newName)) {
      return alert(`${newName} is already added to phonebook`)
    }
    const newPerson = { name: newName, number: newNumber }
    setPersons(persons.concat(newPerson))
    setNewName("")
    setNewNumber("")
  }

  const handleFilter = (event) => {
    const f = event.target.value
    setFilter(f)
    setShownPersons(persons.filter(p => p.name.toLowerCase().includes(`${f}`)))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      Filter names: <input value={filter} onChange={handleFilter}/>
      <h2>Add new:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          <br></br>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {shownPersons.map(p => <div key={p.name}>{p.name} {p.number}</div>)}
    </div>
  )
}

export default App