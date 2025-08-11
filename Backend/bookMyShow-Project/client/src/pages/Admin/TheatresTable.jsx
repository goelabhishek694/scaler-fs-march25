import React, { useEffect, useState } from 'react'
import {Table, message, Button} from "antd";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../../redux/loaderSlice';
import { GetAllTheatres, UpdateTheatre } from '../../api/theatres';
function TheatresTable() {
  const dispatch = useDispatch();
  const [theatres, setTheatres] = useState(null);
  const getData = async () => {
    try {
      dispatch(showLoading());
      // call axios instance function to get all theatres
      const response = await GetAllTheatres();
      if (response.success) {
        message.success(response.message);
        const allTheatres = response.data;
        console.log(allTheatres);
        // update the theatre state with the response
        setTheatres(
          allTheatres.map((theatre) => ({
            ...theatre,
            key: `theatre${theatre._id}`,
          }))
        );
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleStatusChange = async(theatre) => {
    try{
      dispatch(showLoading());
      const value = {...theatre, isActive: !theatre.isActive}
      const response = await UpdateTheatre(value, theatre._id);
      if (response.success) {
        message.success(response.message);
        getData();
      }
      else{
        message.error(response.message);
      }
    }catch(err){
      message.error(err.message);
    }finally{
      dispatch(hideLoading());
    }
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Owner",
      dataIndex: "owner",
      render : (text, data) => {
        return data.owner?.name
      }
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, data) => {
        if (data.isActive) {
          return "Approved";
        } else {
          return "Pending/Blocked";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => {
        return (
          <div className='d-flex align-items-center gap-10'>
          {data.isActive ? <Button onClick={() => handleStatusChange(data)}>Block</Button> : <Button onClick={() => handleStatusChange(data)} >Approve</Button> }
          </div>
        )
      }
    }
  ]


  return (
    <>
    {theatres && theatres.length > 0 && <Table dataSource={theatres} columns={columns}/> }
    </>
  )
}

export default TheatresTable