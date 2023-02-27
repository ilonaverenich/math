import { Radio, Space, Slider,Button  } from 'antd';
import { useNavigate } from "react-router-dom";
import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import Header from '../Header/Header';

function MainArithmetic() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [valueMinMaxArray, setValueMinMaxArray] = useState([-10,10]);
    const stateTheme = useSelector((store)=>store.data.stateTheme)

  return (
    <div className={stateTheme?'page':'page white'}>
     <Header/>
        <div className='container'>
            <div className='container__title'>Арифметические действия</div>
            <div className='container__content_block'>
            <span>Укажите:</span>
            <Radio.Group >
                <Space direction="vertical">
                    <Radio value={1}>Целые числа</Radio>
                    <Radio value={2}>Десятичные числа</Radio>
                </Space>
            </Radio.Group>
            <span>Диапазон значений: [{valueMinMaxArray[0]}, {valueMinMaxArray[1]} ]  </span>
            <Slider
                range
                min={-100}
                max={100}
                step={5}
                defaultValue={[-10, 10]}
               
                onChange={(e)=>setValueMinMaxArray(e)} 
                /* onAfterChange={onAfterChange} *//>

            <span>Действия:</span>
            <div>
            <Radio.Group >
                <Space direction="vertical">
                    <Radio value={3}>Сложение</Radio>
                    <Radio value={4}>Вычитание</Radio>
                    <Radio value={5}>Умножение</Radio>
                    <Radio value={6}>Деление</Radio>
                    <Radio value={7}>Все арифметические действия</Radio>
                </Space>
            </Radio.Group>
            </div>
                <Button className='btn-start'>Начать</Button>
            </div>
   
        </div>
        

    </div>
  )
}

export default MainArithmetic