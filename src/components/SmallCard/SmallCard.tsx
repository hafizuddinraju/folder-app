import React, {useEffect, useState} from 'react';
import { BiDownArrow, BiRightArrow } from 'react-icons/bi';
import { FcOpenedFolder } from 'react-icons/fc';
import { HiPlusSm } from 'react-icons/hi';
import { MdDeleteForever, MdOutlineCreateNewFolder } from 'react-icons/md';

interface ComponentBProps {
    fr: any;
    key:any;
    setnewFolder2: React.Dispatch<React.SetStateAction<boolean>>;
    newFolder2: boolean;
    
  }

const SmallCard: React.FC<ComponentBProps> = ( {fr, setnewFolder2, newFolder2}  ) => {
    const [newFolder1, setnewFolder1] = useState(false);
    const [user, setUser] = useState("");
    const [toggle, settoggle] = useState<boolean>(false);
    const [folder, setFolder] = useState<String[]>([]);

    //  create folder data load using useEffect
  useEffect(() => {
    fetch(`http://localhost:5000/todosnew/${fr?._id}`)
      .then((res) => res.json())
      .then((datavalues) => {
       
        setFolder(datavalues?.data)
    });
  }, [fr?._id, newFolder2]);


    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value);
      };

      // Handle Submit function
      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    
        event.preventDefault();
        const newData = {
          title: user,
          folderId: fr?._id,
        };
        //API fetch Data POST Backend
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
              
              setnewFolder2(!newFolder2)
              setnewFolder1(!newFolder1);
              
            }
          })
          .catch((error) => {
            
            console.log(error);
            
          });
      };
      // folder Delete function
  const handleDelete = (id: any) => {
    //API fetch Data Delete Backend
    fetch(`http://localhost:5000/todosnew/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        setnewFolder2(!newFolder2)
        
      });
  };
    return (
        <>
        <div  className="root-control-child-1">
        <div onClick={() => settoggle(!toggle)} className="icon-flex">
          {toggle ? <BiDownArrow></BiDownArrow> : <BiRightArrow></BiRightArrow>}
          <FcOpenedFolder></FcOpenedFolder>
          <h4>{fr?.title}</h4>
          <MdDeleteForever
            onClick={() => handleDelete(fr._id)}
            className="icon-size"
          ></MdDeleteForever>
        </div>
                <div className="new-folder">
          {  newFolder1 ? (
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
                onClick={() => setnewFolder1(!newFolder1)}
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

export default SmallCard;