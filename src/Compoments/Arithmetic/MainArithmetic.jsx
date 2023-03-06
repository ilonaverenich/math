import { Radio, Space, Slider,Button  } from 'antd';
import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import {stateSettingNumbersAction,stateSettingMinValue,stateSettingArifmetic,stateSettingMaxValue,stateSettingRandomValue1,stateSettingRandomValue2} from '../../Redux/Reducers/mainReducers'


function MainArithmetic() {
    const dispatch = useDispatch();
    const [range,setRange]= useState([-10,10])
    const [sign,setSign]= useState('')
    const [result,setResult]= useState('')
    const stateTheme = useSelector((store)=>store.data.stateTheme)
    const navigate = useNavigate();
    
    const setting = useSelector((store)=>store.data.setting)
    const value1 = useSelector((store)=>store.data.setting.randomValue1)
    const value2 = useSelector((store)=>store.data.setting.randomValue2)

    let obj={
        sum:'+',
        min:'-',
        mul:'*',
        del:':',
        all:['+','-','*','/']
    }

    function sendOptionApp(){
    /*     navigate('/page') */  
        dispatch(stateSettingRandomValue1(getRandomValue(setting.minValue,setting.maxValue)))
        dispatch(stateSettingRandomValue2(getRandomValue(setting.minValue,setting.maxValue)))
        console.log(setting)
        console.log()
     
        switch (setting.actionArifmetic){
            case 'sum':  setResult(value1+value2);break;
            case 'min': setResult(value1-value2);break;
            case 'mul': setResult(value1*value2);break;
        }
        
    }
    function getValue(e){
        setRange(e);
        dispatch(stateSettingMinValue(e[0]))
        dispatch(stateSettingMaxValue(e[1]))
    }

    function getRandomValue(min,max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
      }
    

  return (
    <div className={stateTheme?'page':'page white'}>
     <Header/>
        <div className='container'>
            <div className='container__title'>Арифметические действия</div>
            <div className='container__content_block'>
            <span>Укажите:</span>
            <Radio.Group defaultValue="integer" onChange={(e)=>dispatch(stateSettingNumbersAction(e.target.value))}>
                <Space direction="vertical">
                    <Radio value='integer'>Целые числа</Radio>
                    <Radio value='real'>Десятичные числа</Radio>
                </Space>
            </Radio.Group>
            <span>Диапазон значений: [{range[0]}, {range[1]} ]</span>
            <Slider
                range
                min={-100}
                max={100}
                step={5}
                defaultValue={[-10, 10]}
                onChange={(e)=>getValue(e)}/>
            <span>Действия:</span>
            <div>
            <Radio.Group onChange={(e)=>dispatch(stateSettingArifmetic(e.target.value))} defaultValue='sum' >
                <Space direction="vertical" >
                    <Radio value='sum'>Сложение</Radio>
                    <Radio value='min'>Вычитание</Radio>
                    <Radio value='mul'>Умножение</Radio>
                    <Radio value='del'>Деление</Radio>
                    <Radio value='all'>Все арифметические действия</Radio>
                </Space>
            </Radio.Group>
            </div>
            <Button className='btn-start' onClick={()=>sendOptionApp()}>Начать</Button>
           <div>
            Результат:
           <div>
           {+value1<=0?`(${value1})`:value1}{obj[setting.actionArifmetic]}{+value2<=0?`(${value2})`:value2} = {result}
           </div>


           </div>
            </div>
        </div>
    </div>
  )
}

export default MainArithmetic