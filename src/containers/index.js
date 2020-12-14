import { useState, useEffect } from 'react';
import { Row, Col, Layout, Menu, Input, Modal, Button, Progress, Tag } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getPokeDetail } from '../actions';
import PokeDetail from './pokeDetail';
import PokeList from './pokeList';
import PokeListByType from './pokeListByType';
import Sidebar from './sidebar';
import {
    Switch,
    Route,
    useHistory,
  } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

const Home = () => {
    const dispatch = useDispatch();
    const comparePoke1 = useSelector(({pokeReducer}) => pokeReducer.comparePoke1);
    const comparePoke2 = useSelector(({pokeReducer}) => pokeReducer.comparePoke2);
    const poke1Detail = useSelector(({pokeReducer}) => pokeReducer.poke1Detail);
    const poke2Detail = useSelector(({pokeReducer}) => pokeReducer.poke2Detail);
    const [poke1, setPoke1] = useState(null);
    const [poke2, setPoke2] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);


    useEffect(() => {
        console.log(comparePoke1)
        setPoke1(comparePoke1)
    }, [comparePoke1])

    useEffect(() => {
      console.log(comparePoke2)
      setPoke2(comparePoke2)
  }, [comparePoke2])

    const handleClick = e => {
        console.log('click ', e);
      };
    

    const handleClickCompare = e => {
      dispatch(getPokeDetail(poke1.name,'poke1'))
      dispatch(getPokeDetail(poke2.name,'poke2'))
      setIsModalVisible(true)
    }

    const handleClickReset = e => {

    }

    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const getImgIndex = (idx) => {
      if (idx < 10) {
          return '00' + idx
      }
      if (idx < 100) {
          return '0' + idx
      }
      return idx
  }


    return (
    <Layout>
      <Sidebar/>
      <Layout>
        <Header style={{textAlign:'left'}}>
            <h1 style={{display:'inline-block',color:'#FFF',marginRight:40}}>Pokedex</h1>
            {poke1 &&
            <span style={{color:'#FFF'}}>{poke1.name}</span>
            }
            {poke2 &&
            <span style={{color:'#FFF'}}> vs {poke2.name}</span>
            }
            {poke1 && poke2 &&
            <Button onClick={handleClickCompare} style={{marginLeft:20}} type="primary">Compare</Button>
            }
            {poke1 && poke2 &&
            <Button onClick={handleClickReset} style={{marginLeft:20}} type="primary">Reset</Button>
            }
        </Header>
        <Content style={{padding:20}}>
        <Switch>
            <Route exact path={'/'}>
                 <PokeList/>
            </Route>
            <Route path={`/pokemon/:id`}>
                <PokeDetail/>
            </Route>
            <Route path={`/type/:id`}>
                <PokeListByType/>
            </Route>
        </Switch>
        </Content>
        <Footer></Footer>
        <Modal
          title="Pokemon Versus"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
        >
          <div >
          <Row>
            <Col span={12} >
              
              {poke1Detail &&
              <div>
                <h2 style={{marginBottom:20}}>{poke1Detail.name}</h2>
                {poke1Detail.id < 10000 &&
                <img width="260" alt="example" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getImgIndex(poke1Detail.id)}.png`} />
                }
              
              <Row gutter={16}>
                <Col span={12}>
                    <p>HP</p>
                    <p>Attack</p>
                    <p>Defense</p>
                    <p>Special Attack</p>
                    <p>Special Defense</p>
                    <p>Speed</p>
                    <p>Height:</p>
                    <p>Weight:</p>
                </Col>
                <Col span={10}>
                    <Progress percent={poke1Detail.stats[0].base_stat} showInfo={false}  style={{marginBottom:13}}/>
                    <Progress percent={poke1Detail.stats[1].base_stat} showInfo={false} style={{marginBottom:13}}/>
                    <Progress percent={poke1Detail.stats[2].base_stat} showInfo={false} style={{marginBottom:13}}/>
                    <Progress percent={poke1Detail.stats[3].base_stat} showInfo={false} style={{marginBottom:13}}/>
                    <Progress percent={poke1Detail.stats[4].base_stat} showInfo={false} style={{marginBottom:13}}/>
                    <Progress percent={poke1Detail.stats[5].base_stat} showInfo={false} style={{marginBottom:13}}/>
                    <p> {poke1Detail.height}</p>
                    <p> {poke1Detail.weight}</p>
                </Col>
            </Row>
            <div style={{marginTop:20}} class="ant-statistic-title">Type</div>
            {poke1Detail.types.map((item) =>{
                if (item.type.name == 'fire') {
                    return <Tag color="volcano">{item.type.name}</Tag>
                }
                if (item.type.name == 'grass') {
                    return <Tag color="green">{item.type.name}</Tag>
                }
                if (item.type.name == 'poison') {
                    return <Tag color="purple">{item.type.name}</Tag>
                }
                if (item.type.name == 'water') {
                    return <Tag color="blue">{item.type.name}</Tag>
                }
                
                return (
                    <Tag color="orange">{item.type.name}</Tag>
                )
            })}
            </div>
            }
            </Col>
            <Col span={12}>
            {poke2Detail &&
              <div>
                <h2 style={{marginBottom:20}}>{poke2Detail.name}</h2>
                {poke2Detail.id < 10000 &&
                <img width="260" alt="example" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getImgIndex(poke2Detail.id)}.png`} />
                }
              
              <Row gutter={16}>
                <Col span={12}>
                    <p>HP</p>
                    <p>Attack</p>
                    <p>Defense</p>
                    <p>Special Attack</p>
                    <p>Special Defense</p>
                    <p>Speed</p>
                    <p>Height:</p>
                    <p>Weight:</p>
                </Col>
                <Col span={10}>
                    <Progress percent={poke2Detail.stats[0].base_stat} showInfo={false}  style={{marginBottom:13}}/>
                    <Progress percent={poke2Detail.stats[1].base_stat} showInfo={false} style={{marginBottom:13}}/>
                    <Progress percent={poke2Detail.stats[2].base_stat} showInfo={false} style={{marginBottom:13}}/>
                    <Progress percent={poke2Detail.stats[3].base_stat} showInfo={false} style={{marginBottom:13}}/>
                    <Progress percent={poke2Detail.stats[4].base_stat} showInfo={false} style={{marginBottom:13}}/>
                    <Progress percent={poke2Detail.stats[5].base_stat} showInfo={false} style={{marginBottom:13}}/>
                    <p> {poke2Detail.height}</p>
                    <p> {poke2Detail.weight}</p>
                </Col>
            </Row>
            <div style={{marginTop:20}} class="ant-statistic-title">Type</div>
            {poke2Detail.types.map((item) =>{
                if (item.type.name == 'fire') {
                    return <Tag color="volcano">{item.type.name}</Tag>
                }
                if (item.type.name == 'grass') {
                    return <Tag color="green">{item.type.name}</Tag>
                }
                if (item.type.name == 'poison') {
                    return <Tag color="purple">{item.type.name}</Tag>
                }
                if (item.type.name == 'water') {
                    return <Tag color="blue">{item.type.name}</Tag>
                }
                
                return (
                    <Tag color="orange">{item.type.name}</Tag>
                )
            })}
            </div>
            }
            </Col>
          </Row>
          </div>
        </Modal>
      </Layout>
    </Layout>
)};
  
export default Home;