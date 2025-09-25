import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { registerSchema } from '../validation/register-schema';
import { registerApiCall } from '../api/user-api';
export const useRegister = ()=>{
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver : zodResolver(registerSchema),
        defaultValues:{
            email:'sample@example.com',
            password:'',
            name:''
        }
    }
    );
    const doSubmit = async (formData)=>{
        console.log('Register Form Submit ', formData);
        try{
        const response = await registerApiCall(formData);
        console.log('response is ' , response);
        if(response.data.id){
            alert("Register SuccessFully");
        }
        else{
            alert("Register Fails...");
        }
    }
    catch(err){
         alert("Register Fails...");
         console.log('Error ', err);
    }
    }
    return {doSubmit, register, handleSubmit, errors};
}