import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { createroombybackend } from '../services/RoomService'

const JoinCreateChat = () => {
  const [detail, setdetail] = useState({
    userName:"",
    RoomId:""
  })

  function handelforminputchange(event){
    setdetail({
      ...detail,
      [event.target.name]:event.target.value,
    })
  }

  function validate(){
    if(detail.RoomId==="" || detail.userName===""){
      toast.error("Invalid Inputs")
      return false;
    }else return true;
  }

  function joinchat(){
    if(validate()){

    }
  }
  async function createroom(){
    if(validate()){
      console.log(detail);
      //call api to create room
      try{
        const res= await createroombybackend(detail.RoomId)
        console.log(res);
        toast.success("Room Created")
        joinchat()
      }catch(error){
        console.log(error);
        if(error.status==400){
          toast.error("Room already exist")
        }else{
          console.log("Error in creating room");
        }
        
      }
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center'>

        <div className='p-10 dark:border-gray-700 border  w-full flex flex-col gap-5 max-w-md rounded dark:bg-gray-900 shadow'>

          <h1 className='text-2xl font-semibold text-center'>Join Room / Create Room..</h1>

          {/* name div */}
          <div className='font-medium mb-2 block'>
            <label htmlFor="name">Your Name</label>
            <input 
            onChange={handelforminputchange}
            value={detail.userName}
            type="text" id='name' name='userName'
            placeholder='Enter the name' className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-full 
            focus:ring-2 focus:ring-blue-500' />
          </div>

        {/* room id div */}
          <div className='font-medium mb-2 block'>
            <label htmlFor="name">Room Id</label>
            <input 
            onChange={handelforminputchange}
            value={detail.RoomId}
            type="text" id='name' name='RoomId'
            placeholder='Enter the RoomID' className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-full 
            focus:ring-2 focus:ring-blue-500' />
          </div>

        {/* buttons */}
        <div className='flex items-center justify-between'>
          <button 
          onClick={joinchat}
          className='px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 cursor-pointer rounded-full'>Join Room</button>
          <button 
          onClick={createroom}
          className='px-3 py-2 dark:bg-orange-500 hover:dark:bg-orange-800 cursor-pointer rounded-full'>Create Room</button>
        </div>
 




          </div>




    </div>
  )
}

export default JoinCreateChat
