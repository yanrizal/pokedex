import { useState, useEffect } from 'react';
import { Row, Col, Layout, Menu, Input, Card, Pagination } from 'antd';
import { getPokeTypes, clearPokeList, getPokeListByTypes } from '../actions';
import { useDispatch, useSelector } from "react-redux";
import { AppstoreOutlined, MailOutlined, SettingOutlined, AudioOutlined  } from '@ant-design/icons';
import {
    useHistory
  } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Home = () => {
    const pokeType = useSelector(({pokeReducer}) => pokeReducer.pokeType);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getPokeTypes())
    }, [])

    const handleClickMenu = e => {
        console.log('click ', e);
        dispatch(clearPokeList())
        let url = e.url.split('https://pokeapi.co/api/v2/type/');
        let index = url[1].replace('/','')
        dispatch(getPokeListByTypes(index))
        history.push("/type/"+index);
        
    };
    



    return (
      <Sider>
        <img onClick={() =>  history.push("/")} width="79" alt="example" 
            style={{cursor:'pointer',marginTop:10,marginBottom:9}} src={`https://assets.pokemon.com/assets/cms2/img/misc/gus/buttons/logo-pokemon-79x45.png`} />
      <Menu
        style={{ width: 200 }}
        mode="inline"
        theme="dark"
      >
        
        <SubMenu key="sub4" icon={<SettingOutlined />} title="Types">
        {pokeType.map((item,index) => {
            return (
                <Menu.Item onClick={() => handleClickMenu(item)} key={index}>{item.name}</Menu.Item>
            )
        })}
          
        </SubMenu>
      </Menu>
      </Sider>
)};
  
export default Home;