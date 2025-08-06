import { axiosInstance } from "./index";
//get all Movies
export const GetAllMovies = async () => {
 try {
   const response = await axiosInstance.get("api/movies");
   return response.data?.data;
 } catch (error) {
   console.error(error);
 }
};

// Add a movie
export const addMovie = async (value) => {
 try {
   const response = await axiosInstance.post("api/movies", value);
   return response.data?.data
 } catch (error) {
   console.error(error);
 }
};

export const updateMovie = async (movieId) => {
 try {
   const response = await axiosInstance.put(
     `/api/movies/${movieId}`,
   );
   return response.data?.data
 } catch (err) {
   return err.message;
 }
};

// Delete a movie
export const deleteMovie = async (movieId) => {
 try {
   const response = await axiosInstance.put(
     `/api/movies/${movieId}`
   );
   return response.data?.data
 } catch (err) {
   return err.message;
 }
};