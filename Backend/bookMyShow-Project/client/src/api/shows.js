import { axiosInstance } from "./index";
//add show
export const AddShow = async (value) => {
  try {
    const response = await axiosInstance.post("api/shows", value);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Delete a show
export const DeleteShow = async (showId) => {
  try {
    const response = await axiosInstance.delete(`/api/shows/${showId}`);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const UpdateShow = async (value, showId) => {
  try {
    console.log("i am caled");
    
    const response = await axiosInstance.put(`/api/shows/${showId}`, value);
    console.log(response);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

//get all theatres by movie and date which has some shows
export const GetTheatreAndShowsByMovieAndDate = async (movie, date) => {
  try {
    const response = await axiosInstance.get(`/api/shows/by-movie-date/${movie}/${date}`);
    console.log(response);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

//get all shows by theatre
export const ShowsByTheatre = async (theatreId) => {
  try {
    const response = await axiosInstance.get(`/api/shows/${theatreId}`);
    console.log(response);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const ShowById = async (showId) => {
  try {
    const response = await axiosInstance.get(`/api/shows/${showId}`);
    console.log(response);
    return response.data;
  } catch (err) {
    return err.message;
  }
};