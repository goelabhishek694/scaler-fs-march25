import { useDispatch } from "react-redux"
import { showLoading, hideLoading } from "../../../redux/loaderSlice";
import { GetAllMovies } from "../../api/movies";
import { useEffect, useState } from "react";
import { message, Row, Col, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment"

const Home = () => {
  const [movies,setMovies] = useState(null);
  const [searchText,setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getData = async() => {
    try{
      dispatch(showLoading());
      const resp = await GetAllMovies();
      if(resp.success){
        setMovies(resp.data);
      }else{
        message.error(resp.message);
      }
    }catch(err){
      message.error(err.message);
    }
    finally{
      dispatch(hideLoading());
    }
  }

  useEffect(() => getData(), []);

const handleSearch = () => {

}
return (
   <>
     <Row className="justify-content-center w-100">
       <Col xs={{ span: 24 }} lg={{ span: 12 }}>
         <Input
           placeholder="Type here to search for movies"
           onChange={handleSearch}
           prefix={<SearchOutlined />}
         />
         <br />
         <br />
         <br />
       </Col>
     </Row>
     <Row
       className="justify-content-center"
       gutter={{
         xs: 8,
         sm: 16,
         md: 24,
         lg: 32,
       }}
     >
       {movies &&
         movies
           .filter((movie) =>
             movie.title.toLowerCase().includes(searchText.toLowerCase())
           )
           .map((movie) => (
             <Col
               className="gutter-row mb-5"
               key={movie._id}
               span={{
                 xs: 24,
                 sm: 24,
                 md: 12,
                 lg: 10,
               }}
             >
               <div className="text-center">
                 <img
                   onClick={() => {
                     navigate(
                       `/movie/${movie._id}?date=${moment().format(
                         "YYYY-MM-DD"
                       )}`
                     );
                   }}
                   className="cursor-pointer"
                   src={movie.poster}
                   alt="Movie Poster"
                   width={200}
                   style={{ borderRadius: "8px" }}
                 />
                 <h3
                   onClick={() => {
                     navigate(
                       `/movie/${movie._id}?date=${moment().format(
                         "YYYY-MM-DD"
                       )}`
                     );
                   }}
                   className="cursor-pointer"
                 >
                   {movie.title}
                 </h3>
               </div>
             </Col>
           ))}
     </Row>
   </>
 );
};

export default Home;