import { useState, useEffect } from 'react';
import { Row, Col, Progress, Tag } from 'antd';
import { getImgIndex, capitalize } from '../utils';

const PokeCompareDetail = (props) => {
    const poke1Detail = props.poke1Detail;
    const poke2Detail = props.poke2Detail;

    const winPrediction = (id) => {
      // point get prediction hp = 1, atk = 2, def = 2, spAtk = 3, spDef = 3, spd = 1.5
      let poke1Point = 0
      let poke2Point = 0
      const poke1 = {
        hp: poke1Detail.stats[0].base_stat,
        atk: poke1Detail.stats[1].base_stat,
        def: poke1Detail.stats[2].base_stat,
        spAtk: poke1Detail.stats[3].base_stat,
        spDef: poke1Detail.stats[4].base_stat,
        spd: poke1Detail.stats[5].base_stat,
      }
      const poke2 = {
        hp: poke2Detail.stats[0].base_stat,
        atk: poke2Detail.stats[1].base_stat,
        def: poke2Detail.stats[2].base_stat,
        spAtk: poke2Detail.stats[3].base_stat,
        spDef: poke2Detail.stats[4].base_stat,
        spd: poke2Detail.stats[5].base_stat,
      }
      const HpDiff = poke1.hp - poke2.hp;
      const atkDiff = poke1.atk - poke2.atk;
      const defDiff = poke1.def - poke2.def;
      const spAtkDiff = poke1.spAtk - poke2.spAtk;
      const spDefDiff = poke1.spDef - poke2.spDef;
      const spdDiff = poke1.spd - poke2.spd;
      poke1Point = (HpDiff > 0) ? (poke1Point + Math.abs(HpDiff)) : poke1Point;
      poke2Point = (HpDiff < 0) ? (poke2Point + Math.abs(HpDiff)) : poke2Point;
      poke1Point = (atkDiff > 0) ? (poke1Point + 2*(Math.abs(atkDiff))) : poke1Point;
      poke2Point = (atkDiff < 0) ? (poke2Point + 2*(Math.abs(atkDiff))) : poke2Point;
      poke1Point = (defDiff > 0) ? (poke1Point + 2*(Math.abs(defDiff))) : poke1Point;
      poke2Point = (defDiff < 0) ? (poke2Point + 2*(Math.abs(defDiff))) : poke2Point;
      poke1Point = (spAtkDiff > 0) ? (poke1Point + 3*(Math.abs(spAtkDiff))) : poke1Point;
      poke2Point = (spAtkDiff < 0) ? (poke2Point + 3*(Math.abs(spAtkDiff))) : poke2Point;
      poke1Point = (spDefDiff > 0) ? (poke1Point + 3*(Math.abs(spDefDiff))) : poke1Point;
      poke2Point = (spDefDiff < 0) ? (poke2Point + 3*(Math.abs(spDefDiff))) : poke2Point;
      poke1Point = (spdDiff > 0) ? (poke1Point + 1.5*(Math.abs(spdDiff))) : poke1Point;
      poke2Point = (spdDiff < 0) ? (poke2Point + 1.5*(Math.abs(spdDiff))) : poke2Point;
      if (id == 1) {
        return Math.round(poke1Point/(poke1Point + poke2Point) * 100);
      }
      return Math.round(poke2Point/(poke1Point + poke2Point) * 100);
    }


    return (
          <div >
          <Row>
            <Col span={12} >
              
              {poke1Detail &&
              <div>
                <h2 style={{marginBottom:20}}>{capitalize(poke1Detail.name)}</h2>
                {poke1Detail.id < 10000 &&
                <img width="260" alt="example" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getImgIndex(poke1Detail.id)}.png`} />
                }
              
              <Row gutter={16}>
                <Col span={12}>
                    {poke1Detail.stats.map((item) => (
                        <p>{capitalize(item.stat.name.replace('-',' '))}</p>
                    ))}
                    <p>Height:</p>
                    <p>Weight:</p>
                </Col>
                <Col span={10}>
                  {poke1Detail.stats.map((item) => (
                        <Progress percent={item.base_stat} showInfo={false}  style={{marginBottom:13}}/>
                    ))}
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
              {poke1Detail && poke2Detail &&
                <h3 style={{color:'#fa541c',fontSize:15,marginTop:10}}>Win Rate Prediction: {winPrediction(1)}%</h3>
              }
            </div>
            }
            </Col>
            <Col span={12}>
            {poke2Detail &&
              <div>
                <h2 style={{marginBottom:20}}>{capitalize(poke2Detail.name)}</h2>
                {poke2Detail.id < 10000 &&
                <img width="260" alt="example" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getImgIndex(poke2Detail.id)}.png`} />
                }
              
              <Row gutter={16}>
                <Col span={12}>
                  {poke2Detail.stats.map((item) => (
                        <p>{capitalize(item.stat.name.replace('-',' '))}</p>
                    ))}
                    <p>Height:</p>
                    <p>Weight:</p>
                </Col>
                <Col span={10}>
                  {poke2Detail.stats.map((item) => (
                        <Progress percent={item.base_stat} showInfo={false}  style={{marginBottom:13}}/>
                    ))}
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
            {poke1Detail && poke2Detail &&
                <h3 style={{color:'#1890ff',fontSize:15,marginTop:10}}>Win Rate Prediction: {winPrediction(2)}%</h3>
              }
            </div>
            }
            </Col>
          </Row>
          
          </div>
)};
  
export default PokeCompareDetail;