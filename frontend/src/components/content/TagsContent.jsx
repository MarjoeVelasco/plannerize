import React, { useEffect, useState, useContext } from "react";
import { getTags, archiveTags } from "../../api";
import { AuthContext } from "../routes/AuthProvider";
import { useNavigate, useLocation, Link } from 'react-router-dom';

function TagsContent() {
  const decodedToken = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState({
    is_active:false
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (decodedToken && decodedToken.userId) {
        try {
          const response = await getTags(decodedToken.userId);
          setData(response);
        } catch (error) {
          setError("Error fetching tags");
        }
      }
    };

    fetchData();
  }, []);

  const handleArchiveTag = async (tag_id) => {
    
    try {
      const response = await archiveTags(tag_id, status);
      console.log(response.message);
      // Navigate to the desired page after archiving the tag
      //navigate('/tags');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="text-gray-800">
      <div className="flex items-center justify-between mb-6">
        <p className="text-2xl font-bold">Tags</p>
        <Link to="/tags/create"><button className="btn btn-primary">Create New Tag</button></Link>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Tag Name</th>
              <th className="px-4 py-2">Color Label</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2"><center>{item.tag_name}</center></td>
                <td className="px-4 py-2 flex items-center justify-center">
                  <div
                    className="h-5 w-12 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                </td>
                <td className="px-4 py-2"><center>
                  <button className="mr-5 badge badge-outline" onClick={() => handleArchiveTag(item._id)}>archive</button>
                  <Link className="badge badge-outline" to={`/tags/${item._id}/edit`}>edit</Link></center>
                  
                  
                  
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TagsContent;
