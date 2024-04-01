const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Total = ({parts}) => {
  return (
    <div>
      <p><strong>Total number of exercises: {parts.map(part => part.exercises).reduce((a, b) => a + b, 0)}</strong></p>
    </div>
  )
}

const Course = ({course}) => (
  <div>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course