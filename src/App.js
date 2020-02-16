import React from 'react';
import logo from './logo.svg';
import Customer from './components/Customer'
import './App.css';

const customers = [
  {
    'id': 1,
    'image': 'http://placeimg.com/64/64/1',
    'name': '일일일',
    'birthday': '123456',
    'gender': '남자',
    'job':'중학생'  
  },
  {
    'id': 2,
    'image': 'http://placeimg.com/64/64/2',
    'name': '이이이',
    'birthday': '123456',
    'gender': '남자',
    'job':'고등학생'  
  },
  {
    'id': 1,
    'image': 'http://placeimg.com/64/64/3',
    'name': '삼삼삼',
    'birthday': '123456',
    'gender': '여자',
    'job':'대학생'  
  }      
]

function App() {
  return (
    <div> 
      {
        customers.map(c => {
          return (
            <Customer
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
              />  
          );
      })
    }
    </div>
  );
}

export default App;
