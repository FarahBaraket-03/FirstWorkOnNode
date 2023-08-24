import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

function App() {
  const [lastname,setlastname]=useState('');
    const [name,setName]=useState('');
    const [editUser,setEditUser]=useState('');
    const [age,setage]=useState(null);
  const [allUsers,setAllUsers]=useState([])

  const updateUser=(e)=>{
    e.preventDefault();
    axios.put(`http://localhost:4000/user/update/${editUser._id}`,
    {
      "name":name.length===0? editUser.name : name,
      "lastname":lastname.length===0? editUser.lastname : lastname,
      "age":age===null? editUser.age : age
    }).
    then((res)=>{
      console.log(res);
      setName('');
      setlastname("");
      setage(null);

    })
    .catch((error)=>{
      console.log(error)
    })
    document.getElementById('user').reset()
  }

  const deleteUser=(id)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:4000/user/delete/${id}`).
        then((res)=>{
        console.log(res.data)})
      .catch((error)=>{
        console.log(error)});
        setAllUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        Swal.fire(
          'Deleted!',
          'User has been deleted.',
          'success'
        )
      }
    })

  }
  const getAllUsers=()=>{
    axios.get("http://localhost:4000/user").
      then((res)=>{
        console.log(res.data)
        setAllUsers(res.data)
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  useEffect(()=>{getAllUsers()},[allUsers])
  return (
    <div className="App m-5">
      <h1>HELLO</h1>
      {allUsers && allUsers.length ===0 ? <h1>loading</h1> :(
      <table className="table ">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">LastName</th>
          <th scope="col">ages</th>
          <th scope="col">Delete</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody>
       {allUsers && allUsers.map((item,index)=>(
        <tr key={index}>
          <td>{item._id}</td>
          <td>{item.name}</td>
          <td>{item.lastname}</td>
          <td>{item.age}</td>
          <td><button type="button" onClick={()=>deleteUser(item._id)} className="btn btn-danger">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg></button></td>
            <td>
              <button type="button" onClick={()=>{setEditUser(item)}}  className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal" >
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
</svg>
                </button>
                </td>
        </tr>
       ))}
      </tbody>
    </table>)
      } 
    {/* Button trigger modal */}

<div>

  {/* Modal */}
  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Edit User Id:{editUser._id}</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
        <form id='user'>
  {/* Name input */}
  <div className="form-outline mb-4">
    <input type="text" id="form5Example1" placeholder= {editUser.name} onChange={(e)=>{setName(e.target.value)}} className="form-control" />
    <label className="form-label" htmlFor="form5Example1">Name</label>
  </div>
  {/* Email input */}
  <div className="form-outline mb-4">
    <input type="text" id="form5Example2" placeholder= {editUser.lastname} onChange={(e)=>{setlastname(e.target.value)}} className="form-control" />
    <label className="form-label" htmlFor="form5Example2">Last Name</label>
  </div>
   {/* PASSWORD input */}
   <div className="form-outline mb-4">
    <input type="number" id="form5Example3" placeholder= {editUser.age} onChange={(e)=>{setage(e.target.value)}} className="form-control" />
    <label className="form-label" htmlFor="form5Example2">Age</label>
  </div>
  {/* Submit button */}
  
</form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary" onClick={updateUser}>Save changes</button>
        </div>
      </div>
    </div>
  </div>
</div>



{/* Modal */}




      <Link to="/Login" >Add Login</Link> <span> / </span>
      <Link to="/User" >Add User</Link>
    </div>
  );
}

export default App;
