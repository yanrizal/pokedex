import { useState, useEffect } from 'react';
import { Layout, Modal, Button} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getPokeDetail, resetPokeCompare } from '../actions';
import PokeDetail from './pokeDetail';
import PokeList from './pokeList';
import PokeListByType from './pokeListByType';
import PokeCompareDetail from '../components/pokeCompareDetail';
import Sidebar from './sidebar';
import { Switch, Route } from "react-router-dom";
import { capitalize } from '../utils';

const { Header, Footer, Content } = Layout;

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
        setPoke1(comparePoke1)
    }, [comparePoke1])

    useEffect(() => {
      setPoke2(comparePoke2)
  }, [comparePoke2])
    

    const handleClickCompare = e => {
      dispatch(getPokeDetail(poke1.name,'poke1'))
      dispatch(getPokeDetail(poke2.name,'poke2'))
      setIsModalVisible(true)
    }

    const handleClickReset = e => {
      dispatch(resetPokeCompare())
    }

    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };


    return (
    <Layout>
      <Sidebar/>
      <Layout>
        <Header style={{textAlign:'left'}}>
            <h1 style={{display:'inline-block',color:'#FFF',marginRight:40}}>Pokedex</h1>
            {poke1 &&
            <span style={{color:'#FFF'}}>{capitalize(poke1.name)}</span>
            }
            {poke2 &&
            <span style={{color:'#FFF'}}> vs {capitalize(poke2.name)}</span>
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
          footer={[
            <Button key="submit" type="primary" onClick={handleOk}>
              Ok
            </Button>
          ]}
        >
          <PokeCompareDetail poke1Detail={poke1Detail} poke2Detail={poke2Detail}/>
        </Modal>
      </Layout>
    </Layout>
)};
  
export default Home;