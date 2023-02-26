import { Radio, Space, Slider,Button  } from 'antd';
import { useNavigate } from "react-router-dom";
import {useState} from 'react'
import {stateThemeAction} from '../../Redux/Reducers/mainReducers'
import {useSelector, useDispatch} from 'react-redux';

function MainArithmetic() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [valueMinMaxArray, setValueMinMaxArray] = useState([-10,10]);
    const stateTheme = useSelector((store)=>store.data.stateTheme)
    console.log(stateTheme)

  return (
    <div className='page'>
        <div className='home'>
        <img onClick={()=>navigate(-1)} src="https://i.postimg.cc/Bvvf5zQd/icons8-50.png" alt="" />
        <img onClick={()=>dispatch(stateThemeAction(stateTheme))} src={stateTheme?"https://i.postimg.cc/gJ5zLsYv/icons8-50.png":'https://i.postimg.cc/DycQVpnj/icons8-30-1.png'} alt="" />
      </div>
        <div className='page__content'>
            <div className='page__content_title'>Арифметические действия</div>
            <div className='page__content-content'>
            <div>Укажите:</div>
            <Radio.Group >
                <Space direction="vertical">
                    <Radio value={1}>Целые числа</Radio>
                    <Radio value={2}>Десятичные числа</Radio>
                </Space>
            </Radio.Group>
            <div>Диапазон значений: [{valueMinMaxArray[0]}, {valueMinMaxArray[1]} ]
            <Slider
                range
                min={-100}
                max={100}
                step={5}
                defaultValue={[-10, 10]}
               
                onChange={(e)=>setValueMinMaxArray(e)} 
                /* onAfterChange={onAfterChange} *//>
            </div>
          
            <div>Действия:</div>
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