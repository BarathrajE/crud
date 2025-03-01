import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [users, setUsers] = useState([]);
  const [buttonState ,setButtonState]=useState("add")
  const [userinfo,setUserinfo]=useState({
    id: uuidv4(),
    name:"",
    age: "",
    email:"",
    phone:""
  });


  const handlechange=(e)=>{
    const{name,value} =e.target;
    setUserinfo((currinfo)=>{
      return{
        ...currinfo,[name]:value 
      }
    });

  };

  // add
  const AddData =() =>{
    setUsers((curruser) =>[...curruser,userinfo]);
    setUserinfo({
      id: uuidv4(),
      name:"",
      age: "",
      email:"",
      phone:"",
    });
  };

  //delete

  const deleteData =(id) =>{
    setUsers((curruser) => {
      return curruser.filter((user) => {
        return user.id !== id;
      });
    });
  }; 

  //edit

  const startEditing =(user) =>{
    setUserinfo(user);
    setButtonState("Edit")
  };

  //cancel
  const calceledit=() =>{
    setUserinfo({
      id: uuidv4(),
      name:"",
      age: "",
      email:"",
      phone:"",
    });
    setButtonState("add")
  }
  //update

  const updateData=()=>{
    setUsers((curruser) =>{
      return  curruser.map((user) =>{
        if (user.id === userinfo.id) {
          return userinfo;
        }
        return user;
      });
    });
    calceledit()
    
  }

  return (
    <div className='main'>
      <div className='form'>
        <input type="text" 
         placeholder='Enter Your name '
         name='name'
         value={userinfo.name} 
         onChange={handlechange}
         />
        <br />
        <input type="number"
          placeholder='Enter Your Age '
          name='age'
          value={userinfo.age} 
          onChange={handlechange}
        />
        <br />
        <input type="email"
         placeholder='Enter Your Email '
         name='email'
         value={userinfo.email} 
         onChange={handlechange}
         />
        <br />
        <input type="number"
          placeholder='Enter Your Phone '
          name='phone'
          value={userinfo.phone} 
          onChange={handlechange}
         />
        <br />
        {
         buttonState ==="add"? <button onClick={AddData}>ADD</button>
         :(
         <div className='buttonuc'>
          <button onClick={updateData}>Update</button>
          <button onClick={calceledit}>Cancel</button>
         </div>
        )}
      </div>
      <div className="datatable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(( user,index) => {
              return (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button onClick={()=>startEditing(user)}>Edit</button>
                    <button  onClick={()=>deleteData(user.id)}>Delete</button>
                  </td>
               </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App


