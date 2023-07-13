import React, { useEffect, useState, useContext } from "react";
import { getTasksToday, getTags, deleteTasks, markTasks } from "../../api";
import { AuthContext } from "../routes/AuthProvider";
import { useNavigate, useLocation, Link } from "react-router-dom";

function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

function DashboardContent() {
  const decodedToken = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [check, setCheck] = useState(false);
  const currentDate = getCurrentDate();

  useEffect(() => {
    const fetchData = async () => {
      if (decodedToken && decodedToken.userId) {
        try {
          const tasksResponse = await getTasksToday(decodedToken.userId, currentDate);
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
  }, [check]);

  const handleCheckboxChange = async (event, id,) => {
    if (event.target.checked) {
    
      try {
        const response = await markTasks(id, 'completed');
        setCheck(true);
        console.log(response.message);
        } catch (error) {
        console.error('Error:', error);
      }

      console.log("Checkbox checked");
    } else {

      try {
        const response = await markTasks(id, 'pending');
        setCheck(false);
        console.log(response.message);
        } catch (error) {
        console.error('Error:', error);
      }
      // Checkbox is unchecked
      // Execute your function or perform any action
      console.log("Checkbox unchecked");
    }
  };

  

  return (
    <div className="text-gray-800 text-xl w-full grid grid-cols-2 gap-6">
      <div>
        <div className="mb-3">
          <h2 className="text-2xl font-bold">Todo</h2>
          <p className="text-sm">Today: {currentDate}</p>
        </div>

        {data.filter((item) => item.status === "pending").map((item, index) => (
          <div key={index} className="mt-2">
            <div className="collapse bg-blue-200">
              <input type="checkbox" className="hidden" id={`toggleCollapse${index}`} />
              <div className="form-control">
                <label className="label cursor-pointer"></label>
              </div>

              <label htmlFor={`toggleCollapse${index}`} className="collapse-title text-sm font-medium cursor-pointer">
                <div className="flex justify-between">
                  <div>
                    <input type="checkbox" className="checkbox checkbox-primary" onChange={(event) => handleCheckboxChange(event, item._id)}/>
                  </div>
                  <div>
                    <span className="ml-2 text-base">{item.task_name}</span>
                  </div>
                  <div className="badge badge-outline" style={{ backgroundColor: item.tagColor }}>
                    {item.tagName}
                  </div>
                </div>
              </label>

              <div className="collapse-content text-sm text-gray-600">
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="mb-3">
          <h2 className="text-2xl font-bold">Completed</h2>
          <p className="text-sm">Accomplishments as of: {currentDate}</p>
        </div>

      
        {data.filter((item) => item.status === "completed").map((item, index) => (
          <div key={index} className="mt-2">
            <div className="collapse bg-emerald-400">
              <input type="checkbox" className="hidden" id={`toggleCollapseCompleted${index}`} />
              <div className="form-control">
                <label className="label cursor-pointer"></label>
              </div>

              <label htmlFor={`toggleCollapseCompleted${index}`} className="collapse-title text-sm font-medium cursor-pointer">
                <div className="flex justify-between">
                  <div>
                    <input type="checkbox" checked={item.status === "completed"} className="checkbox checkbox-secondary" onChange={(event) => handleCheckboxChange(event, item._id)}/>
                  </div>
                  <div>
                    <span className="ml-2 text-base">{item.task_name}</span>
                  </div>
                  <div className="badge badge-outline" style={{ backgroundColor: item.tagColor }}>
                    {item.tagName}
                  </div>
                </div>
              </label>

              <div className="collapse-content text-sm text-gray-600">
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default DashboardContent;
