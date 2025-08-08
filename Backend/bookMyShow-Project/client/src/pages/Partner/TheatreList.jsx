import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import TheatreFormModal from "./TheatreFormModal";
import DeleteTheatreModal from "./DeleteTheatreModal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { GetAllTheatres } from "../../api/theatres";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../../redux/loaderSlice";

function TheatreList() {
    const TheatreList = () => {
 const { user } = useSelector((state) => state.users);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
 const [isShowModalOpen, setIsShowModalOpen] = useState(false);
 const [selectedTheatre, setSelectedTheatre] = useState(null);
 const [formType, setFormType] = useState("add");
 const [theatres, setTheatres] = useState(null);
 const dispatch = useDispatch();
};

 const getData = async () => {
   dispatch(showLoading());
   // call axios instance function to get all theatres
   const allTheatres = await GetAllTheatres();
   // update the thetare state with the response
   setMovies(allMovies.map(movie => ({...movie, key:`movie${movie._id}`})));
   dispatch(hideLoading());
 };

  return (
    <div>TheatreList</div>
  )
}

export default TheatreList