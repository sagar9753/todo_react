import React, { useEffect, useState } from 'react'
import './style.css'


// geting from local storage
  const getlocaldata = () =>{
    const list = localStorage.getItem("mynote");
    if(list){
      return JSON.parse(list);
    }
    else{
      return [];
    }
  }

function Todo() {
  const [input,setinput] = useState("");
  // console.log(input);
  const [notes,setnotes] = useState(getlocaldata);
  console.log(notes);
  const [editbtn,seteditbtn] = useState(false);
  const [editid,seteditid] = useState("");

// adding note in notelist
  const addnote = ()=>{
    if(!input){
      alert("enter")
    }
    else if(input && editbtn){
      setnotes(
        notes.map((ele)=>{
          if(ele.id === editid){
            return{...ele,name:input}
          }
          return ele
        })
      )
      setinput("")
      seteditbtn(false)
    }
    else{
      const newinput = {
        id : new Date().getTime().toString(),
        name : input
      }
      setnotes([...notes,newinput]);
      setinput(""); 
    }
  }

// deleting note
  const deletenote = (id)=>{
    const updatenotes = notes.filter((ele) =>{
      return ele.id !== id
    });
    setnotes(updatenotes)
  }

// editing note
  const editnote = (ele)=>{
    seteditbtn(true);
    setinput(ele.name)
    seteditid(ele.id)
  }

// clear all note
  const clear = ()=>{
    setnotes([]);
  }
// adding in local storage
  useEffect(()=>{
    localStorage.setItem("mynote" , JSON.stringify(notes));
  },[notes])

  return (
    <>
        <div className="container">
          <div className="card">
            <div className="icon">
              <img src="./images/noteIcon.png" alt="" />
              <h1>Add Your Note..</h1>
            </div>
            <div className="addnote">
              <input type="text" placeholder='Add item' 
                                value={input}
                                onChange={(e) => setinput(e.target.value)}/>
              {
                editbtn ?
                (<i className="far fa-edit unique" onClick={addnote}></i>)
                :
                (<i className="fa fa-plus unique" onClick={addnote}></i>)
              }
            </div>
            <div className="notes">
              {
                notes.map((ele) => {
                  return(
                    <div className="eachnote" key={ele.id}>
                      <h3>{ele.name}</h3>
                      <div className="eachbtn">
                        <i className="far fa-edit"
                           onClick={()=>editnote(ele)}></i>
                        <i className="far fa-trash-alt" 
                           onClick={()=>deletenote(ele.id)}></i>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className="notes">
              <button className="btn" onClick={clear}>
                Remove All
              </button>
            </div>
          </div>
        </div>
    </>
  )
}

export default Todo