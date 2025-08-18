import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import MovieForm from "./MovieForm";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";
import { GetAllMovies } from "../../api/movies";
import { useDispatch } from "react-redux";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DeleteMovieModal from "./DeleteMovieModal";


function MovieList() {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [movies, setMovies] = useState([]);
 const [selectedMovie, setSelectedMovie] = useState(null);
 const [formType, setFormType] = useState("add");
 const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
 const dispatch = useDispatch();


 const tableHeadings = [
   {
     title: "Poster",
     dataIndex: "poster",
     render: (text, data) => {
       return (
         <img
           width="75"
           height="115"
           style={{ objectFit: "cover" }}
           src={data.poster}
         />
       );
     },
   },
   {
     title: "Movie Name",
     dataIndex: "title",
   },
   {
     title: "Description",
     dataIndex: "description",
   },
   {
     title: "Duration",
     dataIndex: "duration",
     render: (text) => {
       return `${text} Min`;
     },
   },
   {
     title: "Genre",
     dataIndex: "genre",
   },
   {
     title: "Language",
     dataIndex: "language",
   },
   {
     title: "Release Date",
     dataIndex: "releaseDate",
     render: (text, data) => {
       return moment(data.releaseDate).format("MM-DD-YYYY");
     },
   },
   {
     title: "Action",
     render: (text, data) => {
       return (
         <div>
           <Button
             onClick={() => {
               // set isModalOpen to true
               setIsModalOpen(true);
               // set selected movie
               setSelectedMovie(data);
               // set form type to edit
               setFormType("edit")
             }}
           >
             <EditOutlined />
           </Button>
           <Button
             onClick={() => {
               // set isDeleteModalOpen to true
               setIsDeleteModalOpen(true)
               // set selected movie
               setSelectedMovie(data)
             }}
           >
             <DeleteOutlined />
           </Button>
         </div>
       );
     },
   },
 ];

 const getData = async () => {
   dispatch(showLoading());
   // call axios instance function to get all movies
   const allMovies = await GetAllMovies();
   console.log(allMovies);
   
   // update the movie state with the response
   setMovies(allMovies.data?.map(movie => ({...movie, key:`movie${movie._id}`})));
   dispatch(hideLoading());
 };

 useEffect(() => {
   getData();
 }, []);
 return (
   <>
     <div className="d-flex justify-content-end">
       <Button
         onClick={() => {
           setIsModalOpen(true);
           setFormType("add");
         }}
       >
         Add Movie
       </Button>
     </div>
     <Table dataSource={movies} columns={tableHeadings} />
     
     {isModalOpen && (
       <MovieForm
         isModalOpen={isModalOpen}
         setIsModalOpen={setIsModalOpen}
         selectedMovie={selectedMovie}
         formType={formType}
         setSelectedMovie={setSelectedMovie}
         getData={getData}
       />
     )}


     {isDeleteModalOpen && (
       <DeleteMovieModal
         isDeleteModalOpen={isDeleteModalOpen}
         selectedMovie={selectedMovie}
         setIsDeleteModalOpen={setIsDeleteModalOpen}
         setSelectedMovie={setSelectedMovie}
         getData={getData}
       />
     )}

   </>
 );
}

export default MovieList;
