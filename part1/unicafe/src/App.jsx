import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Display = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}</p>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;

  const handleClick = (category) => {
    if (category === "good") setGood(good + 1);
    else if (category === "neutral") setNeutral(neutral + 1)
    else setBad(bad + 1)
  };

  const calculateAverage = (good, bad, total) => {
    return total === 0 ? 0 : (good - bad) / total;
  }
  const calculatePositive = (good, total) => { 
    return total === 0 ? 0 : (good / total) * 100;
  }

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
          bad={bad}
          all={total} 
          average={calculateAverage(good, neutral, bad, total)}
          positive={calculatePositive(good, total)} />
      </div>
    </>
  );
};

export default App;
