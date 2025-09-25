import React from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useRegister } from "../hooks/register-hook";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { doSubmit, register, handleSubmit, errors } = useRegister();
  const navigate = useNavigate();

  return (
    <Box className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl">
        {/* Header */}
        <Box className="text-center mb-8">
          <Box className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Text size="6" className="text-white font-bold">
              R
            </Text>
          </Box>
          <Heading size="7" className="font-bold text-gray-900 mb-2">
            Create Account
          </Heading>
          <Text size="3" className="text-gray-600">
            Join us today and get started
          </Text>
        </Box>

        {/* Form */}
        <form onSubmit={handleSubmit(doSubmit)} className="space-y-6">
          {/* Email Field */}
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
              placeholder="Enter your Email"
              className="w-full mb-3 px-4 py-3 bg-gray-50/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {errors.email && (
              <Text color="red" size="2" className="mt-1 block">
                {errors.email.message}
              </Text>
            )}
          </Box>

          {/* Password Field */}
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

          {/* Name Field */}
          <Box>
            <Text
              as="label"
              size="3"
              weight="medium"
              className="text-gray-700 mb-2 block"
            >
              Full Name
            </Text>

            <input
              {...register("name")}
              type="text"
              placeholder="Enter Name"
              className="w-full mb-3 px-4 py-3 bg-gray-50/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {errors.name && (
              <Text color="red" size="2" className="mt-1 block">
                {errors.name.message}
              </Text>
            )}
          </Box>

          {/* Buttons */}
          <Flex gap="3" className="pt-4">
            <Button
              type="submit"
              size="3"
              className="flex-1 py-3 font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 rounded-xl"
            >
              Create Account
            </Button>
            <Button
              variant="soft"
              type="button"
              size="3"
              className="px-6 py-3 rounded-xl"
              color="gray"
            >
              Clear
            </Button>
          </Flex>

          {/* Login Link */}
          <Text size="2" className="text-center text-gray-600 pt-4">
            Already have an account?{" "}
            <Text
              className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
              onClick={() => navigate("/login")}
            >
              Sign in here
            </Text>
          </Text>
        </form>
      </Card>
    </Box>
  );
};

export default Register;
