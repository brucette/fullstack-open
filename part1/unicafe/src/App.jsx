import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Display = ({ good, neutral, bad }) => {
  return (
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (category) => {
    if (category === "good") setGood(good + 1);
    else if (category === "neutral") setNeutral(neutral + 1)
    else setBad(bad + 1)
  };

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button onClick={() => handleClick("good")} text="good" />
        <Button onClick={() => handleClick("neutral")} text="neutral" />
        <Button onClick={() => handleClick("bad")} text="bad" />
      </div>
      <div>
        <h1>statistics</h1>
        <Display 
          good={good}
          neutral={neutral}
          bad={bad} />
      </div>
    </>
  );
};

export default App;
