import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { createroombybackend, joinchatbybackend } from '../services/RoomService'
import { useNavigate } from 'react-router'
import useChatContext from '../context/ChatContext'

const JoinCreateChat = () => {
  const [detail, setdetail] = useState({
    userName:"",
    RoomId:""
  })
  const { roomid, curruser, setroomid, setcurruser,connected, setconnected }=useChatContext()
  const nav=useNavigate();


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

  async function joinchat(){
    if(validate()){
        try {
      const room = await joinchatbybackend(detail.RoomId)
      toast.success("Room Joined..")
       setcurruser(detail.userName)
            setroomid(room.roomId);
            setconnected(true);
            nav("/chat");
        } catch (error) {
          console.log("ERROR:", error);
            if(error.status == 400){
                toast.error("Room doesnt exist");
            }else{
                console.log("Error in joining room");
            }
        }
    }
  }
 async function createroom(){
    if(validate()){
        console.log("1. validation passed");

        try{
            const res = await createroombybackend(detail.RoomId);
            toast.success("Room Created");
            setcurruser(detail.userName)
            setroomid(res.roomId);
            setconnected(true);
            nav("/chat");

        }catch(error){
            console.log("ERROR:", error);
            if(error.status == 400){
                toast.error("Room already exist");
            }else{
                console.log("Error in creating room");
            }
        }
    }
}
return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="rounded-lg bg-[#171923] px-8 py-10 shadow-2xl">

          <div className="mb-7 text-center">
            <h1 className="text-2xl font-bold text-white">
              Welcome back!
            </h1>

            <p className="mt-2 text-sm text-[#b5bac1]">
              We're so excited to see you again!
            </p>
          </div>

          <div className="space-y-5">

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-bold uppercase text-[#b5bac1]"
              >
                Display Name
                <span className="ml-1 text-[#ed4245]">*</span>
              </label>

              <input
                onChange={handelforminputchange}
                value={detail.userName}
                type="text"
                id="name"
                name="userName"
                placeholder="Enter your name"
                className="w-full rounded-[3px] border-none bg-[#1e1f22] px-3 py-3 text-sm text-white outline-none transition-all placeholder:text-[#72767d] focus:ring-2 focus:ring-[#5865f2]"
              />
            </div>

            <div>
              <label
                htmlFor="roomId"
                className="mb-2 block text-xs font-bold uppercase text-[#b5bac1]"
              >
                Room ID
                <span className="ml-1 text-[#ed4245]">*</span>
              </label>

              <input
                onChange={handelforminputchange}
                value={detail.RoomId}
                type="text"
                id="roomId"
                name="RoomId"
                placeholder="Enter the room ID"
                className="w-full rounded-[3px] border-none bg-[#1e1f22] px-3 py-3 text-sm text-white outline-none transition-all placeholder:text-[#72767d] focus:ring-2 focus:ring-[#5865f2]"
              />
            </div>

            <div className="flex gap-3 pt-2">

              <button
                onClick={joinchat}
                className="flex-1 rounded-[12px] cursor-pointer bg-[#5865f2] px-4 py-3 text-sm font-medium text-white transition-all hover:bg-[#4752c4] active:scale-[0.98]"
              >
                Join Room
              </button>

              <button
                onClick={createroom}
                className="flex-1 rounded-[12px] cursor-pointer bg-[#3ba55d] px-4 py-3 text-sm font-medium text-white transition-all hover:bg-[#2d7d46] active:scale-[0.98]"
              >
                Create Room
              </button>

            </div>

          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#72767d]">
            <span className="h-2 w-2 rounded-full bg-[#3ba55d]"></span>
            Real-time chat
          </div>

        </div>

      </div>

    </div>
  );
};

export default JoinCreateChat
