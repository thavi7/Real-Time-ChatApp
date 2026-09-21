import Axios from 'axios'
export const baseURL = 'https://real-time-chatapp-pwr9.onrender.com'
export const httpclint = Axios.create({
    baseURL: baseURL,
})