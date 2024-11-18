import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
// import React from 'react';

const AuthLayout = () => {
    return (
      <div className="flex flex-col h-screen">
        <div className="flex flex-1">
  
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <Header />
  
            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-100">
              <Outlet /> 
            </main>
  
            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    );
  };
  
  export default AuthLayout;