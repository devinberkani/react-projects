import React, { useState } from 'react';
import data from './data';
import List from './List';
function App() {
  //sets const as data from data.js (5 people)
  const [people, setPeople] = useState(data);

  const clickHandler = () => {
    setPeople([]);
  };

  return (
    <main>
      <section className='container'>
        <h3>{people.length} birthdays today</h3>
        <List people={people} />
        <button onClick={clickHandler}>clear all</button>
      </section>
    </main>
  );
}

export default App;
