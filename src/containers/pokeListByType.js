import { useState, useEffect } from 'react';
import { Row, Col, Layout, Menu, message, Card, Popover } from 'antd';
import { getPokeListByTypes, addComparePoke1, addComparePoke2 } from '../actions';
import { useDispatch, useSelector } from "react-redux";
import {
    useHistory,
    useParams,
  } from "react-router-dom";

const { Meta } = Card;

const Home = () => {
    const pokeListByType = useSelector(({pokeReducer}) => pokeReducer.pokeListByType);
    const count = useSelector(({pokeReducer}) => pokeReducer.count);
    const comparePoke1 = useSelector(({pokeReducer}) => pokeReducer.comparePoke1);
    const comparePoke2 = useSelector(({pokeReducer}) => pokeReducer.comparePoke2);
    const dispatch = useDispatch();
    const history = useHistory();
    const itemsPerPage = 20
    const params = useParams();

    useEffect(() => {
        dispatch(getPokeListByTypes(params.id))
    }, [])
    
    const handleClickDetail = e => {
        history.push("/pokemon/"+e.pokemon.name);
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

    const handleClickCompare = e => {
        if (comparePoke1 == null) {
            dispatch(addComparePoke1(e.pokemon))
        } else {
            dispatch(addComparePoke2(e.pokemon))
        }
        message.success(`compare ${e.pokemon.name}`);
        window.scrollTo({top: 0, behavior: 'smooth'});

    }

    const content = (item) => (
        <div>
          <a onClick={() => handleClickDetail(item)}>Detail</a><br/>
          <a onClick={() => handleClickCompare(item)}>Compare</a>
        </div>
      );


    return (
        <div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                
                {pokeListByType.map((item) => {
                let imgIndex = item.pokemon.url.split('https://pokeapi.co/api/v2/pokemon/')
                imgIndex = imgIndex[1].replace('/','')
                return (
                    <Col key={item.pokemon.name} className="gutter-row" span={6} style={{marginBottom:20}}>
                        <Popover content={() => content(item)} title={item.pokemon.name} trigger="click">
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={(imgIndex> 10000)?null:
                                <img alt="example" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getImgIndex(imgIndex)}.png`} />
                                }
                            >
                                <Meta title={item.pokemon.name} />
                            </Card>
                    </Popover>
                </Col>
                )})
                }
            </Row>
           
    </div>      
)};
  
export default Home;