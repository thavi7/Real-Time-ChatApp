import { httpclint } from "../config/Axioshelper"

export const createroombybackend=async(roomDetail)=>{
    const res=await httpclint.post('/api/v1/rooms',roomDetail,{
        headers:{
            "Content-Type":"text/plain"
        }
    })
    return res.data;

}