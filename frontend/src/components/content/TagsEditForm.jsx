import { useParams } from 'react-router-dom';
import { AuthContext } from "../routes/AuthProvider";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import React, { useEffect, useState, useContext } from "react";
import { editTags, updateTags } from '../../api';

function TagsEditForm() {
  
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    tag_name: '',
    color: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await editTags(id);
        setFormData(response[0]);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateTag = async (event) => {
    event.preventDefault();
  
    try {
      const response = await updateTags(id, formData);
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

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='text-gray-800'>
      <h2 className="text-2xl font-bold mb-4">Edit Tags</h2>
      <form onSubmit={handleUpdateTag}>
        <div>
        <label>Tag Name</label>
        <input className="p-5 block bg-gray-200 w-3/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" name="tag_name" value={formData.tag_name} onChange={handleInputChange} />
        </div>

        <div className='mt-5'>
        <label>Tag Color</label>
        <input className=" shadow-sm block w-1/4 rounded-md" type="color" name="color" value={formData.color} onChange={handleInputChange} />
        </div>

        <button className="btn btn-success mt-5" type="submit">Update</button>
      </form>
    </div>
  );
}

export default TagsEditForm;
