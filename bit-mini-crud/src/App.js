import { useState, useEffect } from 'react';
import './App.scss';
import FarmForm from './components/Farm/FarmForm';
import FarmList from './components/Farm/FarmList';
import AnimalContext from './contexts/AnimalContext';

function App() {
  const [animal, setAnimal] = useState({
    type: 'sheep',
    weight: '',
  });

  const [animalList, setAnimalList] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (animalList === null) {
      const animalList = localStorage.getItem('animalList');
      animalList === null ? setAnimalList([]) : setAnimalList(JSON.parse(animalList));
    } else {
      localStorage.setItem('animalList', JSON.stringify(animalList));
    }
  }, [animalList]);

  return (
    <AnimalContext.Provider
      value={{ animal, setAnimal, animalList, setAnimalList, isEditing, setIsEditing }}
    >
      <main className="main">
        <h2>Animal Registration Form</h2>
        <FarmForm />
        <FarmList />
      </main>
    </AnimalContext.Provider>
  );
}

export default App;
