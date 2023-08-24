import { useEffect, useState } from "react";
import { GlobalStyled } from "./globalStyled";
import { InputPhonebook } from "./InputPhoneboock/inputPhonebook";
import { FilterContacts } from './FilterContacts/filterContacts'
import { BookContacts } from "./BookContacts/bookContacts";
import initialContacts from './contacts.json'


export const App = () => {
  const [contacts, setContacts] =  useState(initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const saveContacts = localStorage.getItem('save-contacts');
    if (saveContacts !== null){
      try {
       setContacts(JSON.parse(saveContacts))
      } catch (error) {
        console.error('Ошибка при чтении контактов из localStorage:', error);
      }
    }
  }, [])

  useEffect(() => {
    if(initialContacts !== contacts) {
      
      try{
        localStorage.setItem('save-contacts', JSON.stringify(contacts))
      }catch(error) {
        console.error("OPPPS! Помилка при збереженні данних в LocalStorage", error)
      }
    }
  }, [contacts])

  // Contacts
  const addContacts= (addNewContacts) => {
    const existingContactNames = contacts.map(contact => contact.name);

    if (existingContactNames.includes(addNewContacts.name)) {
      alert('Такий контакт вже існує в вашому списку!');
      return;
    }
    setContacts(prevContacts => [...prevContacts, addNewContacts])
  }

  // Filter
  const changeFilter = newName => {
    setFilter(newName)
    }
  const visible = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));

  // Delete Contacts
  const deleteContacts = (id) => {
    const updateContacts = contacts.filter(contact => contact.id !== id)
    setContacts(updateContacts)
      try {
        localStorage.setItem('save-contacts', JSON.stringify(updateContacts));
      } catch (error) {
        console.error("OPPPS! Помилка при збереженні данних в LocalStorage", error);
      }
  }

  return(
    <div className="wrapper-container">
<InputPhonebook title="Phonebook" onSearchContacts={addContacts}/>
<FilterContacts value={filter} onChange={changeFilter}/>
<BookContacts title="Contacts" contacts={visible} onDeleteContact={deleteContacts}/>
<GlobalStyled/>
    </div>
  )
};
