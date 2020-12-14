import { useState, useEffect } from 'react';
import { Row, Col, Layout, Menu, Input, Card, Statistic, Progress, Tag } from 'antd';
import { getPokeList, getPokeDetail } from '../actions';
import { useDispatch, useSelector } from "react-redux";
import { AppstoreOutlined, MailOutlined, SettingOutlined, AudioOutlined  } from '@ant-design/icons';
import {
    BrowserRouter as Router,
    useParams,
  } from "react-router-dom";

const Home = (props) => {
    const pokeDetail = useSelector(({pokeReducer}) => pokeReducer.pokeDetail);
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        console.log(params)
        dispatch(getPokeDetail(params.id)).then((rr) => {
            console.log('ss', pokeDetail)
        })
    }, [])

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
        <h2 style={{marginBottom:20}}>{pokeDetail.name}</h2>
        <Row>
            <Col span={12}>
                {pokeDetail.id < 10000 &&
                <img width="260" alt="example" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getImgIndex(pokeDetail.id)}.png`} />
                }
                <Row gutter={16}>
                <Col span={12}>
                    <p>HP</p>
                    <p>Attack</p>
                    <p>Defense</p>
                    <p>Special Attack</p>
                    <p>Special Defense</p>
                    <p>Speed</p>
                </Col>
                <Col span={12}>
                    <Progress percent={pokeDetail.stats[0].base_stat} showInfo={false}  style={{marginBottom:13}}/>
                    <Progress percent={pokeDetail.stats[1].base_stat} showInfo={false} style={{marginBottom:13}}/>
                    <Progress percent={pokeDetail.stats[2].base_stat} showInfo={false} style={{marginBottom:13}}/>
                    <Progress percent={pokeDetail.stats[3].base_stat} showInfo={false} style={{marginBottom:13}}/>
                    <Progress percent={pokeDetail.stats[4].base_stat} showInfo={false} style={{marginBottom:13}}/>
                    <Progress percent={pokeDetail.stats[5].base_stat} showInfo={false} style={{marginBottom:13}}/>
                </Col>
                </Row>
            </Col>
            <Col span={12}>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="Height" value={pokeDetail.height}/>
                    <Statistic style={{marginTop:20}} title="Weight" value={pokeDetail.weight} />
                    <div style={{marginTop:20}} class="ant-statistic-title">Type</div>
                    {pokeDetail.types.map((item) =>{
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
                </Col>
                <Col span={12}>
                    
                </Col>
            </Row>
            </Col>
        </Row>
    </div>
)};
  
export default Home;