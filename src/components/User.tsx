

import { FcOpenedFolder } from "react-icons/fc";
import { BiRightArrow , BiDownArrow} from "react-icons/bi";
import { HiPlusSm } from "react-icons/hi";
import { MdDeleteForever, MdOutlineCreateNewFolder } from "react-icons/md";
import React, {useState, useEffect} from 'react';
import "./User.css";
import Card from "./Card/Card";



const User = () => {
     const [toggle, settoggle] = useState<boolean>(false)
     const [newFolder, setNewFolder] = useState(false)
     const [folder, setFolder] = useState<String[]>([])
     const [user, setUser] = useState('');
     const [spinner ,setSpinner] = useState<boolean>(false)
     const [spinnerNew ,setSpinnerNew] = useState<boolean>(false)
     
    
    
    // Root create folder data load using useEffect
     useEffect(()=>{
        fetch("http://localhost:5000/todos")
        .then(res => res.json())
        .then(data => 
            {
             setSpinner(spinner)   
            setFolder(data?.data)
        })

     },[spinner,newFolder, setSpinner])
     
// Handle Change function
     const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        setUser(event.target.value);
      };
 // handle submit function
     const handleSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const newData = {
            title:user
        }
        // API Fetch post Data Backend
        fetch('http://localhost:5000/todos', {
            method: 'POST',
            headers: {
                'content-type': 'application/json', 
                
            },
            body: JSON.stringify(newData)
        })
        .then(res => res.json())
                .then(result =>{
                    
                    if(result){
                        setSpinner(!spinner)
                        setSpinnerNew(!spinnerNew)
                        
                    }
                    
                    
                })
                .catch(error =>{
                    setSpinner(false)
                    console.log(error)
                    
                })
      

     }
     
    

    if(!folder){
        return <div>Loading.......</div>
    }
  return (
    <div>
      <h1 className="headline-text">Folder Structure</h1>
      <div>
        <div className="root-control">
          <div onClick={()=> settoggle(!toggle
            )} className="icon-flex">
            {
                toggle?
                <BiDownArrow></BiDownArrow>
                :
                
                <BiRightArrow></BiRightArrow>

            }
            <FcOpenedFolder></FcOpenedFolder>
            <h4>Root</h4>
          </div>
          {
            spinnerNew?
            <form onSubmit={handleSubmit}>
                
            
              <input
              style={{width:100}}
                type="text"
                id="name"
                className="input-field"
                name="name"
                value={user}
                onChange={handleNameChange}
                required
              />
            
          
                
            </form>
          :
           <div>
            <div onClick={()=> setSpinnerNew(!spinnerNew)} className="icon-flex-new">
              <HiPlusSm></HiPlusSm>
              <h4>New</h4>
            </div>
          </div>

          }
          
        </div>
        {
            toggle?
            <>
            <div className="child-folder-control">
                {
                 folder?.map((f:any) =>{
                    return(
                        <>
                        <Card newFolder={newFolder} setNewFolder={setNewFolder} key={f._id} f={f}></Card>
                        </>

                    )
                    
                 })
                }
        
        </div>
         
            </>
            :
            ""

        }
        
        
      </div>

    </div>
  );
};

export default User;
