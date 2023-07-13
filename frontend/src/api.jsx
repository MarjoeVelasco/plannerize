import axios from 'axios';

//users
export const registerUser = async (formData) => {
  try {
    const response = await axios.post('http://127.0.0.1:3000/auth/register', formData);
    return response.data; // Return the response data to the caller if necessary
  } catch (error) {
    console.error('Error:', error);
    throw error; // Throw the error to the caller if necessary
  }
};


export const loginUser = async (formData) => {
  try {
    const response = await axios.post('http://127.0.0.1:3000/auth/login', formData);
    return response.data; // Return the response data to the caller if necessary
  } catch (error) {
    console.error('Error:', error);
    throw error; // Throw the error to the caller if necessary
  }
};

//tags
export const getTags = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:3000/tags/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

//get active tagas
export const getActiveTags = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:3000/tags/`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

//tags create
export const createTags = async (formData) => {
  try {
    const response = await axios.post(`http://127.0.0.1:3000/tags/`, formData);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

//tags edit
export const editTags = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:3000/tags/${id}/edit`);
    //console.log(response.data[0].color);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

//tags update
export const updateTags = async (id, formData) => {
  try {
    const response = await axios.put(`http://127.0.0.1:3000/tags/${id}`,formData);
    //console.log(response.data[0].color);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


//tags archive
export const archiveTags = async (id, formData) => {
  try {
    const response = await axios.put(`http://127.0.0.1:3000/tags/${id}/archive`,formData);
    //console.log(response.data[0].color);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


//get tasks
export const getTasks = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:3000/tasks/${id}`);
    //console.log(response.data[0].color);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

//get tasks
export const getTasksToday = async (id, date) => {
  try {
    const response = await axios.get(`http://127.0.0.1:3000/tasks/${id}/${date}`);
    //console.log(response.data[0].color);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

//edit tasks
export const editTasks = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:3000/tasks/${id}/edit`);
    //console.log(response.data[0].color);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

//create tasks
export const createTasks = async (formData) => {
  try {
    const response = await axios.post(`http://127.0.0.1:3000/tasks/`,formData);
    //console.log(response.data[0].color);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

//tasks update
export const updateTasks = async (id, formData) => {
  try {
    const response = await axios.put(`http://127.0.0.1:3000/tasks/${id}`,formData);
    //console.log(response.data[0].color);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

//tasks update
export const markTasks = async (id, status) => {
  try {
    const response = await axios.put(`http://127.0.0.1:3000/tasks/${id}/${status}`);
    //console.log(response.data[0].color);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

//tags update
export const deleteTasks = async (id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:3000/tasks/${id}`);
    //console.log(response.data[0].color);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};