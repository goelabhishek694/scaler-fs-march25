import React, { Children } from 'react'
import MovieList from './MovieList'
import TheatresTable from './TheatresTable'
import { Tabs } from 'antd';
const onChange = key => {
  console.log(key);
};
function Admin() {
    const tabItems = [
        {
            key: "1",
            label: "Movies",
            children: <MovieList/>
        },
        {
            key: "2",
            label: "Theatres",
            children: <TheatresTable/>
        }
    ];
  return (
    <div>
        <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange}/>
    </div>
  )
}

export default Admin