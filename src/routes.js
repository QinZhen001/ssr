import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Personal from './pages/Personal';


export const routesConfig = [
  {
    path: '/',
    component: Home,
    // 不能 <Home></Home>
    // 只能这么写 因为要去判断component上面的getInitialData
  },
  {
    path: '/personal',
    component: Personal,
  },
];

const RoutesList = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        <li>
          <Link to="/personal">个人中心页</Link>
        </li>
      </ul>
      <Routes>
        {routesConfig.map(item => <Route key={item.path} path={item.path} element={<item.component></item.component>}></Route>)}
      </Routes>
    </div>
  );
};


export default RoutesList;
