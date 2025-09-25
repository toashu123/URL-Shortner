import React from "react";
import { Box, Button, Card, Heading, Text, TextField } from "@radix-ui/themes";
import { useLogin } from "../hooks/login-hook.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { doSubmit, register, handleSubmit, errors } = useLogin();
  const navigate = useNavigate();

  return (
    <Box className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl">
        {/* Header */}
        <Box className="text-center mb-8">
          <Box className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Text size="6" className="text-white font-bold">
              L
            </Text>
          </Box>
          <Heading size="7" className="font-bold text-gray-900 mb-2">
            Login
          </Heading>
          <Text size="3" className="text-gray-600">
            Sign in to your account to continue
          </Text>
        </Box>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(doSubmit)}>
          {/* Email */}
          <Box>
            <Text
              as="label"
              size="3"
              weight="medium"
              className="text-gray-700 mb-2 block"
            >
              Email Address
            </Text>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter Url Here"
              className="w-full mb-3 px-4 py-3 bg-gray-50/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {errors.email && (
              <Text color="red" size="2" className="mt-1 block">
                {errors.email.message}
              </Text>
            )}
          </Box>

          {/* Password */}
          <Box>
            <Text
              as="label"
              size="3"
              weight="medium"
              className="text-gray-700 mb-2 block"
            >
              Password
            </Text>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter password"
              className="w-full mb-3 px-4 py-3 bg-gray-50/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {errors.password && (
              <Text color="red" size="2" className="mt-1 block">
                {errors.password.message}
              </Text>
            )}
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-3 font-medium bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transition-all duration-200 rounded-xl"
            size="3"
          >
            Login
          </Button>

          {/* Register Link */}
          <Text size="2" className="text-center text-gray-600 pt-4">
            Don't have an account?{" "}
            <Text
              className="text-purple-600 hover:text-purple-700 cursor-pointer font-medium"
              onClick={() => navigate("/register")}
            >
              Create one here
            </Text>
          </Text>
        </form>
      </Card>
    </Box>
  );
};

export default Login;
