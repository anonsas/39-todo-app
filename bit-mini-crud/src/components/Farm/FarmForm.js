import React, { useContext } from 'react';
import AnimalContext from '../../contexts/AnimalContext';
import { v4 as uuidv4 } from 'uuid';

function FarmForm() {
  const { animal, setAnimal, setAnimalList, isEditing, setIsEditing } =
    useContext(AnimalContext);

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (animal.weight && !isEditing) {
      setAnimalList((prevState) => [...prevState, { id: uuidv4(), ...animal }]);

      setAnimal({
        type: 'sheep',
        weight: '',
      });
    } else if (animal.weight && isEditing) {
      setAnimal((prevState) => ({ ...prevState, animal }));
      setAnimalList((prevState) =>
        prevState.map((anim) => (anim.id === animal.id ? animal : anim))
      );
      setIsEditing(false);
      setAnimal({
        type: 'sheep',
        weight: '',
      });
    } else {
      return alert('Please fill in the weight!');
    }
  };

  const handleInputChange = (e) => {
    setAnimal((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (
    <form className="form" onSubmit={submitFormHandler}>
      <div>
        <label htmlFor="type">Please select animal type:</label>
        <select name="type" id="type" value={animal.type} onChange={handleInputChange}>
          <option value="sheep">Sheep</option>
          <option value="duck">Duck</option>
          <option value="antelope">Antelope</option>
        </select>
      </div>

      <div>
        <label htmlFor="weight">Please write animal's weight:</label>
        <input
          type="text"
          name="weight"
          id="weight"
          value={animal.weight}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit">{isEditing ? 'Edit' : 'Register'}</button>
    </form>
  );
}

export default FarmForm;
