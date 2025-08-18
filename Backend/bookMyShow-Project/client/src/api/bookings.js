import { axiosInstance } from ".";


export const MakePayment = async (value) => {
 try {  
   const response = await axiosInstance.post("/api/booking/make-payment", value);
   console.log(response);
   return response.data;
 } catch (err) {
   return err.response;
 }
};


export const bookShow = async (payload) => {
 try {
   const response = await axiosInstance.post(
     "/api/booking/book-show",
     payload
   );
   console.log(response.data);
   return response.data;
 } catch (err) {
   return err.response;
 }
};


export const GetAllBookings = async (payload) => {
 try {
   const response = await axiosInstance.get(
     `/api/booking/${payload.userId}`
   );
   return response.data;
 } catch (err) {
   return err.response;
 }
};