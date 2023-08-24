import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";


function User() {
    const [lastname,setlastname]=useState('');
    const [name,setName]=useState('');
    const [age,setage]=useState(5);
    const addlogin=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:4000/user/add",{
            "name":name,
            "lastname":lastname,
            "age":age
        }).
      then((res)=>{
        console.log(res.data);
        Swal.fire({
            title: 'perfect',
            text: "the user has been added!",
            icon: 'success',
            
          })
      })
      .catch((error)=>{
        console.log(error)
      });

      document.getElementById('user').reset(); 
    }

  return (
    <div>
    <div className='container m-5'>
      <h1>Add User</h1>
<form id='user'>
  {/* Name input */}
  <div className="form-outline mb-4">
    <input type="text" id="form5Example1" onChange={(e)=>{setName(e.target.value)}} className="form-control" />
    <label className="form-label" htmlFor="form5Example1">Name</label>
  </div>
  {/* Email input */}
  <div className="form-outline mb-4">
    <input type="text" id="form5Example2" onChange={(e)=>{setlastname(e.target.value)}} className="form-control" />
    <label className="form-label" htmlFor="form5Example2">Last Name</label>
  </div>
   {/* PASSWORD input */}
   <div className="form-outline mb-4">
    <input type="number" id="form5Example3" onChange={(e)=>{setage(e.target.value)}} className="form-control" />
    <label className="form-label" htmlFor="form5Example2">Age</label>
  </div>
  {/* Submit button */}
  <button type="submit" onClick={(e)=>{addlogin(e)}} className="btn btn-outline-primary btn-block mb-4">Add User</button>
</form>

<Link to="/" > Back to Home Page </Link>

    </div>  
    </div>
  )
}

export default User
