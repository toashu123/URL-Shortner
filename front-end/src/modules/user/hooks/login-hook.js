import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/login-schema"; // 👈 define schema like register
import { loginApiCall } from "../api/user-api"; // 👈 create API call function

export const useLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "sample@example.com",
      password: ""
    }
  });

  const doSubmit = async (formData) => {
    console.log("login form submit", formData);
    try {
      const response = await loginApiCall(formData);
      console.log("response is", response);

      if (response.data.token && response.data.email) {
        // Save token in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);
        alert("Login successful 🎉");
        window.location.href = "/dashboard"; // redirect to Home
      } else {
        alert("Login failed ❌");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return { doSubmit, register, handleSubmit, errors };
};
