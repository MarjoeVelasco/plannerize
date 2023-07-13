import { AuthContext } from "../routes/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { createTasks, getActiveTags } from "../../api";

function TasksCreateForm() {
  const decodedToken = useContext(AuthContext);
  const navigate = useNavigate();

  const [tags, setTags] = useState([]);
  const [formData, setFormData] = useState({
    task_name: "",
    description: "",
    date: "",
    tag_id: "",
    user_id: decodedToken.userId,
  });

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
        const response = await getActiveTags();
        setTags(response);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateTasks = async (event) => {
    event.preventDefault();

    try {
      const response = await createTasks(formData);
      console.log(response.message);
      setFormData({
        task_name: "",
        description: "",
        date: "",
        tag_id: "",
      });
      navigate("/tasks");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="text-gray-800">
      <h2 className="text-2xl font-bold mb-4">New Task</h2>

      <form onSubmit={handleCreateTasks} className="grid gap-4">
        <div>
          <label className="text-lg">Date</label>
          <input
            type="date"
            value={formData.date}
            name="date"
            onChange={handleInputChange}
            className="form-input p-5 block bg-gray-200 w-3/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <label className="text-lg">Task Name</label>
          <input
            type="text"
            value={formData.task_name}
            name="task_name"
            onChange={handleInputChange}
            className="form-input p-5 block bg-gray-200 w-3/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <label className="text-lg">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-textarea p-5 block bg-gray-200 w-3/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>

        <div>
          <label className="text-lg">Tag</label>
          <select
            name="tag_id"
            value={formData.tag_id}
            onChange={handleInputChange}
            className="form-select p-5 block bg-gray-200 w-3/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Select Tag</option>
            {tags.map((item) => (
              <option key={item._id} value={item._id}>
                {item.tag_name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="mt-4 btn btn-success w-3/5">
          Create
        </button>
      </form>
    </div>
  );
}

export default TasksCreateForm;
