import { axiosInstance } from "./index";
//get all theatres
export const GetAllTheatres = async () => {
 try {
   const response = await axiosInstance.get("api/theatres/all");
   return response.data;
 } catch (error) {
   console.error(error);
 }
};

//get theatre by owner 
export const GetAllTheatresOfPartner = async (ownerId) => {
 try {
   const response = await axiosInstance.get(
     `/api/theatres/owner/${ownerId}`
   );
   return response.data;
 } catch (err) {
   return err.response;
 }
};

// Add a theatre
export const AddTheatre = async (value) => {
 try {
   const response = await axiosInstance.post("api/theatres", value);
   console.log(response);
   return response.data
 } catch (error) {
   console.error(error);
 }
};

export const UpdateTheatre = async (value, theatreId) => {
 try {
   const response = await axiosInstance.put(
     `/api/theatres/${theatreId}`, value
   );
   console.log(response);
   
   return response.data
 } catch (err) {
   return err.message;
 }
};

// Delete a theatre
export const DeleteTheatre = async (theatreId) => {
 try {
   const response = await axiosInstance.delete(
     `/api/theatres/${theatreId}`
   );
   return response.data
 } catch (err) {
   return err.message;
 }
};