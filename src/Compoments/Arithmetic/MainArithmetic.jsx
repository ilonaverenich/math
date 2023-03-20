import { Radio, Space, Slider,Button,message  } from 'antd';
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import {stateSettingNumbersAction,stateSettingMinValue,stateSettingArifmetic,stateSettingMaxValue,stateSettingRandomValue1,stateSettingRandomValue2} from '../../Redux/Reducers/mainReducers'


function MainArithmetic() {
    const dispatch = useDispatch();
    const [range,setRange]= useState([-10,10])
    const [real,setReal]= useState()
    const [result,setResult]= useState('')


    const [userValueInput,setUserInputValue]= useState('')

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
       
    }
    let  arr = ['sum','min','mul','del']
    function arrayRandElement(arr) {
        var rand = Math.floor(Math.random() * arr.length);
        dispatch(stateSettingArifmetic(arr[rand]))
    }
    useEffect(()=>{
        switch (setting.actionArifmetic){
            case 'sum': setResult((value1 + Number.EPSILON) +(value2+ Number.EPSILON));break;
            case 'min': setResult(value1 + Number.EPSILON -value2+ Number.EPSILON);break;
            case 'mul': setResult(value1*value2);break;
            case 'del': {     
            /* value1%value2!==0? setResult(value1/value2): console.log('hhh') */
            };break;
            case 'all': arrayRandElement(arr);break;
        }
    },[value1,value2])

    function sendOptionApp(){
        let a = getRandomValueReal(10,50)
        console.log( typeof a)
        console.log(a[a.length-1] == 0 ? (+a).toFixed(1):a) //десятичные дроби
    /*     navigate('/page') */
        console.log(setting.numbers)
        if (setting.numbers == 'integer'){
            dispatch(stateSettingRandomValue1(getRandomValue(setting.minValue,setting.maxValue)))
            dispatch(stateSettingRandomValue2(getRandomValue(setting.minValue,setting.maxValue)))
        }  else {
            dispatch(stateSettingRandomValue1(getRandomValueReal(setting.minValue,setting.maxValue)))
            dispatch(stateSettingRandomValue2(getRandomValueReal(setting.minValue,setting.maxValue)))
        }
    

         
         setReal(getRandomValue(setting.minValue,setting.maxValue))
         console.log(real)
         console.log(setting)
        
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

      function getRandomValueReal(min,max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
   
        return +(rand.toFixed(2));
    
      }

      function handleCalc(){
       
        if(userValueInput==result){
           
            message.success('Верно')
            sendOptionApp()
            setUserInputValue('')
        }
        else{
            message.error('Не верно! Попробуй еще раз!')
        }
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
           <div className='result'>
            Результат:
           <div>
           {+value1 <=0?`(${value1})`:value1}{obj[setting.actionArifmetic]}{+value2<=0?`(${value2})`:value2} = <input value={userValueInput} onChange={(e)=>setUserInputValue(e.target.value)}/>
           
           <button onClick={()=>handleCalc()}>Проверить</button> 
           <div>
          {/*  Мое значение: {userValueInput}  */}
           </div>
           <div>
            Ответ: {setting.numbers == 'integer'?(+result).toFixed(0):parseFloat((+result + Number.EPSILON))}
     
           </div>
           </div>

                </div>
           </div>
            
        </div>
    </div>
  )
}

export default MainArithmetic