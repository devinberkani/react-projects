import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

//GET list to display to storage if a list exists, otherwise display an empty array
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState('');
  //set initial state to local storage function in order to store values locally
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //display alert
      showAlert(true, 'danger', 'please enter value');
    } else if (name && isEditing) {
      //deal with edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            //spreads out to {id: id, title: title} and then the title having the same key/value pair automatically replaces the current title and returns it
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    } else {
      //show alert once item is added
      showAlert(true, 'success', 'item added to the list');
      //create new item
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      };
      setList([...list, newItem]);
      setName('');
    }
  };

  //sets defaults so that when this is called without arguments it will revert back to this state
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  //clear list
  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  };

  //remove item
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    let newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  //edit item
  const editItem = (id) => {
    //targets specific item in list being edited
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    //puts item into input field
    setName(specificItem.title);
  };

  //use local storage to store list items
  //every time list changes, SET new list to storage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {/* used spread because no map needed, just access */}
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          {/* used props because need to map */}
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
