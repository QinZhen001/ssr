import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchHomeData } from '../store/actions/home';

const Home = () => {
  const dispatch = useDispatch()
  const homeData = useSelector((state) => state.home)


  useEffect(() => {
    // 前端请求:
    // 1.防止后端请求数据出错 前端再次请求
    // 2.前端接管后 前端路由跳转
    dispatch(fetchHomeData);
  }, [])

  const renderHead = () => {
    return (
      <Helmet>
        <title>首页</title>
      </Helmet>
    );
  };
  
  const handleClick = () => {
    console.log('我被点击了！');
  }
}
