import { useState } from 'react'

const Filter = ({filter, handleFilter}) =>
  <div>
    Filter names: <input value={filter} onChange={handleFilter}/>
  </div>

const PersonForm = ({name, number, handleSubmit, handleNameChange, handleNumberChange}) =>
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={name} onChange={handleNameChange}/>
      <br></br>
      number: <input value={number} onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const Persons = ({persons}) => 
  <div>
    {persons.map(p => <div key={p.name}>{p.name} {p.number}</div>)}
  </div>


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
    const newPersons = persons.concat({ name: newName, number: newNumber })
    setPersons(newPersons)
    setNewName("")
    setNewNumber("")
    setShownPersons(newPersons.filter(p => p.name.toLowerCase().includes(`${filter}`)))
  }

  const handleFilter = (event) => {
    const f = event.target.value // This is added in order to filter properly (setFilter is asynchronous)
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
      <Filter filter={filter} handleFilter={handleFilter}/>    
      <h2>Add new:</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} />     
    </div>
  )
}

export default App