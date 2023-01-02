
import './App.css';

import React, { useState } from 'react';


function App() {

  const [dataArray, setDataArray] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('result is: ', JSON.stringify(result, null, 4));
      setDataArray(result);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = () => {
    setIsLoading(true);
    fetch('http://localhost:3000/posts')
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setDataArray(result);
        setIsLoading(false);
      });
  }
  return (
    <>
      {!isLoading && <button className='fetch-button' onClick={fetchData}>Fetch</button>}
      {isLoading && <h2>Requesting...</h2>}
      <ul>
        {dataArray.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
