import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NoteList from './pages/NoteList';
import NoteForm from './pages/NoteForm';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<NoteList />} />
        <Route path='/create' element={<NoteForm />} />
        <Route path='/edit/:noteId' element={<NoteForm />} />
      </Routes>
    </Router>
  );
}

export default App;
