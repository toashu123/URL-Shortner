import React from "react";
import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import AppRoutes from "./shared/services/routes/AppRoutes";
import { useNavigate, useLocation } from "react-router-dom";
import { UrlShort } from "./modules/url-shortener/pages/UrlShort";


function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Navigation */}
      <Box className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <Flex justify="between" align="center" className="max-w-6xl mx-auto px-6 py-4">
          <Heading size="6" className=" bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
            AuthApp
          </Heading>
          
          <Flex gap="3">
            <Button 
              onClick={() => navigate('/register')}
              className="px-6 py-2 font-medium transition-all hover:scale-105"
              size="3"
              variant={location.pathname === '/register' ? 'solid' : 'outline'}
              color="blue"
            >
              Register
            </Button>
            <Button 
              onClick={() => navigate('/login')}
              className="px-6 py-2 font-medium transition-all hover:scale-105"
              size="3" 
              variant={location.pathname === '/login' ? 'solid' : 'outline'}
              color="purple"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate('/')}
              className="ml-autopx-6 py-2 font-medium transition-all hover:scale-105 "
              size="3" 
              variant={location.pathname === '/' ? 'solid' : 'outline'}
              color="purple"
            > 
              Home
            </Button>
          </Flex>
        </Flex>
      </Box>

      {/* Main Content */}
      <AppRoutes />
    </Box>
  );
}

export default App;
