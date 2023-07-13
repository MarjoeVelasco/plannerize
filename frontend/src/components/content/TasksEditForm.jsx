import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { editTasks, getTags, updateTasks } from '../../api';

function TasksEditForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    task_name: "",
    description: "",
    date: "",
    tag_id: "",
  });
  const [tags, setTags] = useState([]);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await editTasks(id);
        console.log(response);
        setFormData(response[0]);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchTags = async (id) => {
      try {
        const response = await getTags(id);
        setTags(response);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTags(formData.tag_id);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

  
    try {
      const response = await updateTasks(id, formData);
      console.log(response.message);
      setFormData({
        task_name: "",
        description: "",
        date: "",
        tag_id: "",
      });
      navigate('/tasks');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  

  return (
    <>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="text-lg">Date</label>
          <input
            type="date"
            value={formatDate(formData.date)}
            name="date"
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div>
          <label className="text-lg">Task Name</label>
          <input
            type="text"
            value={formData.task_name}
            name="task_name"
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div>
          <label className="text-lg">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-textarea"
          ></textarea>
        </div>

        <div>
          <label className="text-lg">Tag</label>
          <select
            name="tag_id"
            value={formData.tag_id}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="">Select Tag</option>
            {tags.map((item) => (
              <option key={item._id} value={item._id}>
                {item.tag_name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </>
  );
}

export default TasksEditForm;
