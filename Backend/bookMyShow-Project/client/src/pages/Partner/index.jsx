import React from 'react'
import TheatreList from './TheatreList';
import { Tabs } from 'antd';

function Partner() {
  const onChange = key => {
  console.log(key);
};
  const tabItems = [
        {
            key: "1",
            label: "Theatres",
            children: <TheatreList/>
        },
        // {
        //     key: "2",
        //     label: "Theatres",
        //     children: <TheatresTable/>
        // }
    ];
  return (
    <div>
        <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange}/>
    </div>
  )
}

export default Partner