import React, { useEffect, useState } from "react";
import { BiDownArrow, BiRightArrow } from "react-icons/bi";
import { FcOpenedFolder } from "react-icons/fc";
import { HiPlusSm } from "react-icons/hi";
import { MdDeleteForever,  } from "react-icons/md";
import SmallCard from "../SmallCard/SmallCard";

interface ComponentBProps {
    f: any;
    key:any;
    setNewFolder: React.Dispatch<React.SetStateAction<boolean>>;
    newFolder: boolean;
    
  }

const Card: React.FC<ComponentBProps> = ( {f, setNewFolder, newFolder}  ) => {
    
  const [newFolder2, setnewFolder2] = useState(false);
  
  const [toggle, settoggle] = useState<boolean>(false);
  const [user, setUser] = useState("");
  const [folder, setFolder] = useState<String[]>([]);
  const [spinnerNew ,setSpinnerNew] = useState<boolean>(false)

// Single create folder data load using useEffect
  useEffect(() => {
    fetch(`http://localhost:5000/todosnew/${f?._id}`)
      .then((res) => res.json())
      .then((datavalues) => {
       
        setFolder(datavalues?.data)
    });
  }, [f?._id, newFolder2]);
  

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };

  // handleSubmit function
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();
    const newData = {
      title: user,
      folderId: f?._id,
    };
     // API Fetch post Data Backend
    fetch("http://localhost:5000/todosnew", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((result) => {
        
        if (result) {
          
          setSpinnerNew(!spinnerNew)
          setnewFolder2(!newFolder2);
          
        }
      })
      .catch((error) => {
        
        console.log(error);
        
      });
  };
  // folder Delete function
  
  const handleDelete = (id: any) => {
    console.log(id);
    //API fetch Data Delete Backend
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        setNewFolder(!newFolder)
        
      })
      .catch((error) => {
        
        console.log(error);
        
      });
  };

  

  if(!folder){
    return <div>Loading.......</div>
  }
  return (
    <>
      <div className="root-control-child">
        <div onClick={() => settoggle(!toggle)} className="icon-flex">
          {toggle ? <BiDownArrow></BiDownArrow> : <BiRightArrow></BiRightArrow>}
          <FcOpenedFolder></FcOpenedFolder>
          <h4>{f?.title}</h4>
          <MdDeleteForever
            onClick={() => handleDelete(f?._id)}
            className="icon-size"
          ></MdDeleteForever>
        </div>

        <div className="new-folder">
          {  spinnerNew ? (
            <form onSubmit={handleSubmit}>
              <input
                style={{ width: 100 }}
                type="text"
                id="name"
                className="input-field1"
                name="name"
                value={user}
                onChange={handleNameChange}
                required
              />
            </form>
          ) : (
            <div>
              <div
                onClick={() => setSpinnerNew(!spinnerNew)}
                className="icon-flex-new"
              >
                <HiPlusSm></HiPlusSm>
                <h4>New</h4>
              </div>
            </div>
          )}
        </div>
      </div>

      {toggle ? (
        <>
          {folder?.map((fr:any) => <SmallCard newFolder2={newFolder2} setnewFolder2={setnewFolder2} fr={fr} key={fr?._id}></SmallCard>)}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Card;
