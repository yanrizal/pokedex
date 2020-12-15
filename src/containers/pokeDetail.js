import { useState, useEffect } from 'react';
import { Row, Col, Statistic, Progress, Tag  } from 'antd';
import { getPokeDetail } from '../actions';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getImgIndex, capitalize } from '../utils';

const PokeDetail = (props) => {
    const pokeDetail = useSelector(({pokeReducer}) => pokeReducer.pokeDetail);
    const dispatch = useDispatch();
    const params = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getPokeDetail(params.id)).then((rr) => {
            setLoading(false)
        })
    }, [])


    return (
    <div style={{minHeight:1000}}>
        
        {!loading &&
        <h2 style={{marginBottom:20}}>{capitalize(pokeDetail.name)}</h2>
        }
        {!loading &&
        <Row>
            <Col span={12}>
                {pokeDetail.id < 10000 &&
                <img width="260" alt="example" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getImgIndex(pokeDetail.id)}.png`} />
                }
                <Row gutter={16}>
                <Col span={12}>
                    {pokeDetail.stats.map((item) => (
                        <p>{capitalize(item.stat.name.replace('-',' '))}</p>
                    ))}
                </Col>
                <Col span={12}>
                    {pokeDetail.stats.map((item) => (
                        <Progress percent={item.base_stat} showInfo={false}  style={{marginBottom:13}}/>
                    ))}
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
                        if (item.type.name === 'fire') {
                            return <Tag color="volcano">{item.type.name}</Tag>
                        }
                        if (item.type.name === 'grass') {
                            return <Tag color="green">{item.type.name}</Tag>
                        }
                        if (item.type.name === 'poison') {
                            return <Tag color="purple">{item.type.name}</Tag>
                        }
                        if (item.type.name === 'water') {
                            return <Tag color="blue">{item.type.name}</Tag>
                        }
                        
                        return (
                            <Tag color="orange">{item.type.name}</Tag>
                        )
                    })}
                    
                </Col>
                <Col span={12}>
                    <div class="ant-statistic-title">Ability</div>
                    {pokeDetail.abilities.map((item) =>(
                    <Tag color="#108ee9">{item.ability.name}</Tag>
                    ))}
                    <div style={{marginTop:20}} class="ant-statistic-title">Forms</div>
                    {pokeDetail.forms.map((item) =>(
                    <Tag color="#87d068">{item.name}</Tag>
                    ))}
                </Col>
            </Row>
            </Col>
        </Row>
        }
    </div>
)};
  
export default PokeDetail;