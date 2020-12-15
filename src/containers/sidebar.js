import { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { getPokeTypes, clearPokeList, getPokeListByTypes } from '../actions';
import { useDispatch, useSelector } from "react-redux";
import { SettingOutlined } from '@ant-design/icons';
import { useHistory, useRouteMatch } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
    const pokeType = useSelector(({pokeReducer}) => pokeReducer.pokeType);
    const dispatch = useDispatch();
    const history = useHistory();
    const { path, url } = useRouteMatch();
    const [current, setCurrent] = useState('');

    useEffect(() => {
        dispatch(getPokeTypes())
    }, [])

    useEffect(() => {
      if (window.location.pathname == '/') {
        setCurrent('')
      }
  }, [window.location.href])

    const handleClickMenu = (e,idx) => {
        console.log('click ', e, idx);
        dispatch(clearPokeList())
        let url = e.url.split('https://pokeapi.co/api/v2/type/');
        let index = url[1].replace('/','')
        dispatch(getPokeListByTypes(index))
        history.push("/type/"+index);
        setCurrent([String(idx)])
    };

    return (
      <Sider>
        <img onClick={() =>  history.push("/")} width="79" alt="example" 
            style={{cursor:'pointer',marginTop:10,marginBottom:9}} src={`https://assets.pokemon.com/assets/cms2/img/misc/gus/buttons/logo-pokemon-79x45.png`} />
      <Menu
        style={{ width: 200 }}
        mode="inline"
        theme="dark"
        selectedKeys={current}
      >
        <SubMenu key="sub4" icon={<SettingOutlined />} title="Types">
        {pokeType.map((item,index) => {
            return (
                <Menu.Item onClick={() => handleClickMenu(item, index)} key={index}>{item.name}</Menu.Item>
            )
        })}
        </SubMenu>
      </Menu>
      </Sider>
)};
  
export default Sidebar;