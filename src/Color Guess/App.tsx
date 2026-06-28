import { useState } from 'react'
import './App.css'

const randomHex = () => '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0').toUpperCase();

function shuffle(array) {
  let currentIndex: number = array.length;

  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

function App() {
  const [hex, setHex] = useState(randomHex);
  const [streak, setStreak] = useState(0);
  const [verdict, setVerdict] = useState(null);

  const options = [hex];
  while (options.length != 3) {
    const newHex = randomHex();
    if (!options.includes(newHex))
      options.push(newHex)
  }

  shuffle(options);

  const handleClick = (event) => {
    const guess = event.target.value;

    if (guess == hex) {
      setStreak(streak => streak + 1);
      setVerdict(true);
    } else {
      setStreak(0);
      setVerdict(false);
    }

    setHex(randomHex())
  }

  const verdictText = verdict ? 'correct' : 'wrong';
  const className = verdict ? 'guess-correct' : 'guess-wrong';

  return (
    <div>
      <div style={{ backgroundColor: `${hex}`, width: '500px', height: '500px' }}></div>
      <li>
        {options.map(item => (
          <button value={item} onClick={handleClick} key={item}>{item}</button>
        ))}
      </li>
      <p>Streak: {streak} </p>
      {verdict == null ? <></> : <p className={className}> Answer is {verdictText} </p>}
    </div>
  )
}

export default App
