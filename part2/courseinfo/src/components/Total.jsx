const Total = ({ parts }) => {
  const numOfExercises = parts.reduce(
    (sum, part) => sum + part.exercises, 0
  );

  return (
    <p style={{ fontWeight: "bold"}}>total of {numOfExercises} exercises</p>
  )
}

export default Total