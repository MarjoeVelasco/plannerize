import React, { useEffect, useState, useContext } from "react";
import { getTasks, getTags, deleteTasks } from "../../api";
import { AuthContext } from "../routes/AuthProvider";
import { useNavigate, useLocation, Link } from "react-router-dom";

function TasksContent() {
  const decodedToken = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (decodedToken && decodedToken.userId) {
        try {
          const tasksResponse = await getTasks(decodedToken.userId);
          const tagsResponse = await getTags(decodedToken.userId);
          const tasksWithData = tasksResponse.map((task) => {
            const tag = tagsResponse.find((tag) => tag._id === task.tag_id);
            return {
              ...task,
              tagName: tag ? tag.tag_name : "",
              tagColor: tag ? tag.color : "",
            };
          });
          setData(tasksWithData);
        } catch (error) {
          setError("Error fetching tasks");
        }
      }
    };

    fetchData();
  }, []);

  
  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  }

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await deleteTasks(taskId);
      console.log(response.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter the tasks based on the search term
  const filteredTasks = data.filter((item) =>
    item.task_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="text-gray-800">
      <div className="flex items-center justify-between mb-6">
        <p className="text-2xl font-bold">Tasks</p>
        <Link to="/tasks/create">
          <button className="btn btn-primary">Create New Task</button>
        </Link>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div><span>Search </span>
        <input
          type="text"
          placeholder="Search tasks"
          value={searchTerm}
          onChange={handleSearch}
          className="mb-4 px-4 py-2 border p-5 block bg-gray-200 w-3/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div className="overflow-x-auto">
        {filteredTasks.map((item, index) => (
          <div key={index} className="mt-2">
            <p>{formatDate(item.date)}</p>
            <div className="card bg-blue-200">
              <div className="card-body flex justify-between">
                <h2 className="card-title">
                  {item.task_name}

                  <div className={`badge ${item.status === "pending" ? "badge-secondary" : "badge-primary"}`}>
                    {item.status}
                  </div>

                </h2>
                <p className="text-xs text-gray-600">{item.description}</p>
                <div className="card-actions flex justify-between">
                  <div className="badge badge-outline" style={{ backgroundColor: item.tagColor }}>
                    {item.tagName}
                  </div>
                  <div className="actions">
                    <Link to={`/tasks/${item._id}/edit`}>
                      <div className="badge badge-outline">Edit</div>
                    </Link>
                    <button
                      onClick={() => handleDeleteTask(item._id)}
                      className="badge badge-outline ml-5"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TasksContent;
