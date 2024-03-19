import React from "react";
import { Icon } from "@iconify/react";
import { useAuth, useDetails } from "./Login";
import { useState, useEffect } from "react";
import axios from "axios";



const Header = () => {
  const { name } = useDetails();
  const { empid } = useDetails();
  const { token } = useAuth();
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogo = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'http://localhost:5500/employee/personal/get-upload',
          {
            params: { EmployeeId: empid },
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        const data = response.data;
        console.log('Image Data', data);
        setPreviewImage(`http://localhost:5500/employee-photo/${data.EmployeePhoto}`);
      } catch (error) {
        console.error('Error fetching image:', error);
        setError('Error fetching image');
      } finally {
        setLoading(false);
      }
    };
    fetchLogo();
  }, [empid, token]);


  return (
    <nav className="top-0 w-full bg-blue-900 p-2 border-b-2 z-20 h-15 mb-2">
      <div className="flex justify-end sticky ">
        <p className="p-2 flex items-center gap-2">
         {previewImage && (
           <img
           src='systechlogo.png'
           alt="Photo"
           className="rounded-full w-8 h-auto"
         />
         )}
          <p className="text-white">{name}</p>
        </p>
        <div className="mr-10 flex items-center">
          {/* <Icon
            className="w-6 h-6 mx-2"
            icon="carbon:notification"
            color="white"
          />
          <Icon
            className="w-6 h-6 mx-2 cursor-pointer"
            icon="carbon:settings"
            color="white"
          /> */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
