import { AuthContext } from "../routes/AuthProvider";
import { useNavigate, useLocation, Link} from 'react-router-dom';
import React, { useEffect, useState, useContext } from "react";
import { createTags } from '../../api';

function TagsCreateForm(){
  const decodedToken = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tag_name: '',
    color: '#000000', // Set a default color value
    user_id: decodedToken.userId,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateTag = async (event) => {
    event.preventDefault();
  
    try {
      const response = await createTags(formData);
      console.log(response.message);
      setFormData({
        tag_name: '',
        color: '#000000', // Reset the color value after successful submission
      });
      navigate('/tags');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="text-gray-800">
      <div className="flex items-center justify-between mb-6">
        <p className="text-1xl font-bold">CREATE NEW TAG</p>
        <Link to="/tags"><button className="btn btn-primary">GO BACK</button></Link>
      </div>

      <form onSubmit={handleCreateTag}>
        <div>
        <label>Tag Name</label>
        <input className="p-5 block bg-gray-200 w-3/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" name="tag_name" value={formData.tag_name} onChange={handleInputChange}/>
        </div>

        <div className="mt-5">
        <label>Tag Color</label>
        <input className=" shadow-sm block w-1/4 rounded-md" type="color" name="color" value={formData.color} onChange={handleInputChange}/>
        </div>

        <div className="mt-5">
        <button className="btn btn-success" type="submit">Create</button>
        </div>

      </form>

    </div>
  );
}

export default TagsCreateForm;