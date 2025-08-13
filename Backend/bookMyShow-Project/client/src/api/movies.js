import { axiosInstance } from "./index";
//get all Movies
export const GetAllMovies = async () => {
 try {
   const response = await axiosInstance.get("api/movies");
   return response.data;
 } catch (error) {
   console.error(error);
 }
};

// Add a movie
export const AddMovie = async (value) => {
 try {
   const response = await axiosInstance.post("api/movies", value);
   console.log(response);
   return response.data
 } catch (error) {
   console.error(error);
 }
};

export const UpdateMovie = async (value, movieId) => {
 try {
   const response = await axiosInstance.put(
     `/api/movies/${movieId}`, value
   );
   console.log(response);
   
   return response.data
 } catch (err) {
   return err.message;
 }
};

// Delete a movie
export const DeleteMovie = async (movieId) => {
 try {
   const response = await axiosInstance.delete(
     `/api/movies/${movieId}`
   );
   return response.data
 } catch (err) {
   return err.message;
 }
};