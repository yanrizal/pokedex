import { useState, useEffect } from 'react';
import { Row, Col, Layout, Menu, Input, Card, Pagination } from 'antd';
import { getPokeListByTypes } from '../actions';
import { useDispatch, useSelector } from "react-redux";
import {
    useHistory,
    useParams,
  } from "react-router-dom";

const { Meta } = Card;

const Home = () => {
    const pokeListByType = useSelector(({pokeReducer}) => pokeReducer.pokeListByType);
    const count = useSelector(({pokeReducer}) => pokeReducer.count);
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


    return (
        <div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                
                {pokeListByType.map((item) => {
                let imgIndex = item.pokemon.url.split('https://pokeapi.co/api/v2/pokemon/')
                imgIndex = imgIndex[1].replace('/','')
                return (
                    <Col key={item.pokemon.name} className="gutter-row" span={6} style={{marginBottom:20}}>
                    <Card
                        onClick={() => handleClickDetail(item)}
                        hoverable
                        style={{ width: 240 }}
                        cover={(imgIndex> 10000)?null:
                        <img alt="example" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getImgIndex(imgIndex)}.png`} />
                        }
                    >
                        <Meta title={item.pokemon.name} />
                    </Card>
                    
                </Col>
                )})
                }
            </Row>
           
    </div>      
)};
  
export default Home;