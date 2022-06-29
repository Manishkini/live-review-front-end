import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Layout';
import AddReviewForm from './components/Form/add-review';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/:id" element={<AddReviewForm />}></Route>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
