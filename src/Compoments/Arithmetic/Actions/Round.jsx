import {useState, useEffect, useRef} from 'react'
import {stateSettingRandomValue1} from '../../../Redux/Reducers/mainReducers'
import Header from '../../Header/Header'
import {Input,Button} from 'antd'
import {useSelector, useDispatch} from 'react-redux';

function Round() {
    const range = [1,100];
    const [roundValue, setRoundValue] = '';
    const dispatch = useDispatch();
    const value1 = useSelector((store)=>store.data.setting.randomValue1)

   
    function getRandomValueReal(min,max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return rand.toFixed( Math.floor(Math.random() *6));
      }

  return (
    <div className='page'>
        <Header/>
        <div className='container'>
        <div className='container__subtitle'> Округлите до <span className='round'>десятых</span>:</div> 
            <div className='container__calc'>
                <span className='value'>{value1}</span> <span className='sing-round'>≈ </span><Input className='input'/>
            </div>
            <div className='container__btn'>
            <Button onClick={()=> dispatch(stateSettingRandomValue1(getRandomValueReal(range[0],range[1])))}>Изменить число</Button>
            <Button onClick={()=>console.log(roundValue)}>Изменить задание</Button>
            <Button className='btn-check' >Проверить</Button>
            <Button className='btn-result' >Подвести итог</Button>

          </div>
        </div>
        
    </div>
  )
}

export default Round