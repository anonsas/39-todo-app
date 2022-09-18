import React, { useContext } from 'react';
import AnimalContext from '../../contexts/AnimalContext';

function FarmList() {
  const { setAnimal, animalList, setAnimalList, isEditing, setIsEditing } =
    useContext(AnimalContext);

  const deleteAnimal = (id) => {
    if (!isEditing)
      setAnimalList((prevState) => prevState.filter((animal) => animal.id !== id));
  };

  const editAnimal = (animal) => {
    setIsEditing(true);
    setAnimal(animal);
  };

  return (
    <div className="list-container">
      <h3>Registered Animal List:</h3>

      <ul className="list">
        {animalList?.map((animal) => (
          <li className="list__item" key={animal.id}>
            <div className="list__item-content">
              <p>{animal.type}</p>
              <p>{animal.weight}kg</p>
            </div>

            <div className="list__item-actions">
              <button type="button" onClick={() => editAnimal(animal)}>
                Edit
              </button>
              <button type="button" onClick={() => deleteAnimal(animal.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FarmList;
