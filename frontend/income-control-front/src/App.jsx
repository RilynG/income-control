import { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(res => res.text())
      .then(data => console.log('Backend says:', data))
      .catch(err => console.error('Error connecting to backend:', err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-blue-600">Income Control App</h1>
    </div>
  );
}

export default App;