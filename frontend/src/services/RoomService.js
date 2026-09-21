import { httpclint } from "../config/Axioshelper"

export const createroombybackend=async(roomDetail)=>{
    const res=await httpclint.post('/api/v1/rooms',roomDetail,{
        headers:{
            "Content-Type":"text/plain"
        }
    })
    return res.data;

}

export const joinchatbybackend=async(roomId)=>{
    const res= await httpclint.get(`/api/v1/rooms/${roomId}`)
    return res.data
}

export const getMessagess = async (roomId) => {
    const res = await httpclint.get(`/api/v1/rooms/${roomId}/messages`)
    return res.data
}