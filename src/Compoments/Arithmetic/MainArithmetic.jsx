import {useState} from 'react'
import Header from '../Header/Header';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Radio, Space, Slider,Button} from 'antd';
import {stateSettingNumbersAction,stateSettingMinValue,stateSettingArifmetic,stateSettingMaxValue} from '../../Redux/Reducers/mainReducers'


function MainArithmetic() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [range,setRange]= useState([-10,10])
    const setting = useSelector((store)=>store.data.setting)

    function sendOptionApp(){
        console.log(setting)
        navigate('/page') 
    }

    function getValue(e){
        setRange(e);
        dispatch(stateSettingMinValue(e[0]))
        dispatch(stateSettingMaxValue(e[1]))
    }

    
  return (
    <div className='page'>
     <Header/>
        <div className='container'>
            <div className='container__title'>Арифметические действия</div>
            <div className='container__content_block'>
            <div className='container__content_block_subtitle'>Укажите:</div>
            <Radio.Group defaultValue="integer" onChange={(e)=>dispatch(stateSettingNumbersAction(e.target.value))}>
                <Space direction="vertical">
                    <Radio value='integer' >Целые числа</Radio>
                    <Radio value='real'>Десятичные числа</Radio>
                </Space>
            </Radio.Group>
            <div className='container__content_block_subtitle'>Диапазон значений: <span className='range'>[{range[0]}, {range[1]} ]</span></div>
            <Slider
                range
                min={-100}
                max={100}
                step={5}
                defaultValue={[-10, 10]}
                onChange={(e)=>getValue(e)}/>
            <div className='container__content_block_subtitle'>Действия:</div>
            <div>
            <Radio.Group onChange={(e)=>dispatch(stateSettingArifmetic(e.target.value))} defaultValue='sum' >
                <Space direction="vertical" >
                    <Radio value='sum'>Сложение</Radio>
                    <Radio value='min'>Вычитание</Radio>
                    <Radio value='mul'>Умножение</Radio>
                    <Radio value='all'>Все арифметические действия</Radio>
                </Space>
            </Radio.Group>
            </div>
            <Button className='btn-start' onClick={()=>sendOptionApp()}>Начать</Button>
          
           </div>
            
        </div>
    </div>
  )
}

export default MainArithmetic




/* Результат:
<div>

{+value1 <=0?`(${value1})`:value1}{obj[setting.actionArifmetic] || obj[sumbol]}{+value2<=0?`(${value2})`:value2} = <input value={userValueInput} onChange={(e)=>setUserInputValue(e.target.value)}/>

<button onClick={()=>handleCalc()}>Проверить</button> 
<div>

</div>
<div>

Ответ: {`${Math.round(result * 100000) / 100000 }`}

</div>
<div>
<div>
Правильные ответы: {success}
</div>
<div>
Неправильные ответы: {error}
</div>
<Button onClick={console.log(Math.round((success/(success+error))*10))}>Подвести итог</Button>
</div>
</div>
 */
