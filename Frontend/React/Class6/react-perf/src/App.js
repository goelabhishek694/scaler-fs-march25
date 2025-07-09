import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { lazy, Suspense, useEffect, useState } from 'react';
import Home from "./Components/Home"
import LargeArraySum from './Components/LargeArraySum';
// const Home = lazy(()=> import( './Components/Home')) ;
const About = lazy(()=> import( './Components/About')) ;
const Contact = lazy(()=> import( './Components/Contact')) ;

function App() {
  // const [Home, setHomePage] = useState(null);
  // const [About, setAboutPage] = useState(null);
  // const [Contact, setContactPage] = useState(null);

  // useEffect(() => {
  //   import("./Components/Home").then((module) => setHomePage(() => module.default));
  // }, []);

  // const loadAboutPage = () => {
  //   import("./Components/About").then((module) => setAboutPage(() => module.default));
  // }

  // const loadContactPage = () => {
  //   import("./Components/Contact").then((module) => setContactPage(() => module.default));
  // }

  // const loadHomePage = () => {
  //   import("./Components/Home").then((module) => setHomePage(() => module.default));
  // }

  // return (
  //     <div>
  //       {/* <Navbar/> */}
  //       {/* <nav>
  //       <ul>
  //           <li> <Link onClick={loadHomePage} to="/">Home</Link></li>
  //           <li><Link onClick={loadAboutPage} to="/about">About</Link></li>
  //           <li><Link onClick={loadContactPage} to="/contact">Contact</Link></li>
  //       </ul>
  //       </nav> */}
  //       <Navbar/>
  //       <Suspense fallback={<div>... Loading</div>}>
  //       <Routes>
  //         {/* <Route path='/' element={<Home/>}/>
  //         <Route path='/about' element={<About/>}/>
  //         <Route path='/contact' element={<Contact/>}/> */}

  //         {/* <Route path='/' element={Home ? <Home/> : <div>... Loading</div>}/>
  //         <Route path='/about' element={About ? <About/> : <div>... Loading</div>}/>
  //         <Route path='/contact' element={Contact ? <Contact/> : <div>... Loading</div>}></Route> 
  //         */}

  //         <Route path='/' element={<Home/>}/>
  //         <Route path='/about' element={<About/>}/>
  //         <Route path='/contact' element={<Contact/>}/>
  //       </Routes>
  //       </Suspense>
  //     </div>
  // );

  return (
    <LargeArraySum/>
  )
}

export default App;
