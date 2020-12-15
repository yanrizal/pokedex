import { useState, useEffect } from 'react';
import { Row, Col, message, Card, Pagination, Popover } from 'antd';
import { getPokeList, clearPokeList, addComparePoke1, addComparePoke2 } from '../actions';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getImgIndex, capitalize } from '../utils';

const { Meta } = Card;

const PokeList = () => {
    const pokeList = useSelector(({pokeReducer}) => pokeReducer.pokeList);
    const count = useSelector(({pokeReducer}) => pokeReducer.count);
    const comparePoke1 = useSelector(({pokeReducer}) => pokeReducer.comparePoke1);
    const comparePoke2 = useSelector(({pokeReducer}) => pokeReducer.comparePoke2);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    const itemsPerPage = 20

    useEffect(() => {
        dispatch(clearPokeList())
        dispatch(getPokeList()).then(() => {
            setLoading(false)
        })
    }, [])
    
    const handleClickDetail = e => {
        history.push("/pokemon/"+e.name);
    };

    const handlePageChange = e => {
      setLoading(true)
      dispatch(getPokeList({
        limit: itemsPerPage,
        offset: (e - 1) * itemsPerPage
      })).then(() => {
          setLoading(false)
      })
    }

    const handleClickCompare = e => {
        if (comparePoke1 == null) {
            dispatch(addComparePoke1(e))
        } else {
            dispatch(addComparePoke2(e))
        }
        message.success(`compare ${e.name}`);
        window.scrollTo({top: 0, behavior: 'smooth'});

    }

    const content = (item) => (
        <div>
          <a onClick={() => handleClickDetail(item)}>Detail</a><br/>
          <a onClick={() => handleClickCompare(item)}>Compare</a>
        </div>
      );


    return (
        <div style={{minHeight:1000}}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                
                {pokeList.map((item) => {
                let imgIndex = item.url.split('https://pokeapi.co/api/v2/pokemon/')
                imgIndex = imgIndex[1].replace('/','')
                return (
                    <Col key={item.name} className="gutter-row" span={6} style={{marginBottom:20}}>
                    <Popover content={() => content(item)} title={capitalize(item.name)} trigger="click">
                    <Card
                        loading={loading}
                        hoverable
                        style={{ width: 240 }}
                        cover={(imgIndex > 10000)?null:
                        (!loading)?<img alt="example" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getImgIndex(imgIndex)}.png`} />:null
                        }
                    >
                        <Meta title={capitalize(item.name)} />
                    </Card>
                    </Popover>
                    
                </Col>
                )})
                }
            </Row>
            <Pagination onChange={handlePageChange} defaultCurrent={1} defaultPageSize={20} showSizeChanger={false} total={count} />
    </div>      
)};
  
export default PokeList;