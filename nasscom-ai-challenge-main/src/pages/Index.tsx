
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle, Settings, Users, FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-700 text-white">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              Startup Registration Portal
            </h1>
            <p className="text-xl mb-8">
              Register your startup for the Grand Challenge Program and get access to mentorship, funding, and networking opportunities.
            </p>
            <Link to="/form/page1">
              <Button size="lg" className="font-semibold">
                Register Now <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Why Register?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center mb-4">
              <Settings className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Access to Resources</h3>
            <p className="text-gray-600">
              Get exclusive access to tools, infrastructure, and technical resources to accelerate your startup growth.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-green-100 text-green-700 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Mentorship Network</h3>
            <p className="text-gray-600">
              Connect with industry experts who can guide you through challenges and help refine your business model.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center mb-4">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Funding Opportunities</h3>
            <p className="text-gray-600">
              Showcase your startup to potential investors and access government grants designed for innovative ventures.
            </p>
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Registration Process</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="flex mb-6">
              <div className="flex-shrink-0 mr-4">
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Complete Basic Information</h3>
                <p className="text-gray-600">
                  Fill in your contact details and basic organization information
                </p>
              </div>
            </div>
            
            <div className="flex mb-6">
              <div className="flex-shrink-0 mr-4">
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Provide Company Details</h3>
                <p className="text-gray-600">
                  Add legal information, incorporation details, and upload required documents
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Receive Confirmation</h3>
                <p className="text-gray-600">
                  Get confirmation of your registration and wait for further communication
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/form/page1">
              <Button size="lg" className="font-semibold">
                Start Registration <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-bold text-xl mb-4">Startup Registration Portal</h3>
            <p className="mb-4">© 2025 Grand Challenge Program. All rights reserved.</p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
