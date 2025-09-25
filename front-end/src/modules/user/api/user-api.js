import { apiClient } from "../../../shared/services/api-client"

export const loginApiCall = async (formData) => {
  return await apiClient.post("/login", formData);
};

export const registerApiCall = async(formData)=>{
    try{
        const response = await apiClient.post('/register', formData);
        return response;
    }
    catch(err){
        console.log('register API call', err);
        throw err;
    }
}