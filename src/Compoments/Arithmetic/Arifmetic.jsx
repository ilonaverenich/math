import { Radio, Space, Slider,Button,message, Input  } from 'antd';
import Header from '../Header/Header'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {stateSettingNumbersAction,stateSettingMinValue,stateSettingArifmetic,stateSettingMaxValue,stateSettingRandomValue1,stateSettingRandomValue2} from '../../Redux/Reducers/mainReducers'

function Arifmetic() {
  const dispatch = useDispatch();
  const [real,setReal]= useState()
  const value1 = useSelector((store)=>store.data.setting.randomValue1)
  const value2 = useSelector((store)=>store.data.setting.randomValue2)
  const setting = useSelector((store)=>store.data.setting)
  const [state, setState] = useState(false)
  const [sumbol,setSumbol]= useState('')
  const [result,setResult]= useState('')
  const [success, setSuccess] = useState(0)
  const [error, setError] = useState(0)
  const [userValueInput,setUserInputValue]= useState('')
  let obj={
    sum:'+',
    min:'-',
    mul:'*',
   
}

    useEffect(()=>{
      switch (setting.actionArifmetic){
          case 'sum': setResult(value1  + value2);break;
          case 'min': setResult(value1  - value2);break;
          case 'mul': setResult(value1 * value2);break;
          case 'all': {
              switch (sumbol){
                  case 'sum': setResult(value1  + value2);break;
                  case 'min': setResult(value1  - value2);break;
                  case 'mul': setResult(value1 * value2);break;
              }
          };break;
      }
    },[value1,value2])

    useEffect(()=>{
      if (setting.numbers == 'integer'){
            
        dispatch(stateSettingRandomValue1(getRandomValue(setting.minValue,setting.maxValue)))
        dispatch(stateSettingRandomValue2(getRandomValue(setting.minValue,setting.maxValue)))
    }  else {
        dispatch(stateSettingRandomValue1(getRandomValueReal(setting.minValue,setting.maxValue)))
        dispatch(stateSettingRandomValue2(getRandomValueReal(setting.minValue,setting.maxValue)))
    }
      setUserInputValue('')
  
    },[])
/*   let  arr = ['sum','min','mul']
    function arrayRandElement(arr) {
        var rand = Math.floor(Math.random() * arr.length);
        setSumbol(arr[rand])
      } */
      function getRandomValue(min,max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
   
      }
      function getRandomValueReal(min,max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return +(rand.toFixed(2));
    
      }
function handleCalc(){
  setState(false)

   
  if(userValueInput==Math.round(result * 100000) / 100000){
     setSuccess(success+1)
      message.success('Верно')
      if (setting.numbers == 'integer'){
            
        dispatch(stateSettingRandomValue1(getRandomValue(setting.minValue,setting.maxValue)))
        dispatch(stateSettingRandomValue2(getRandomValue(setting.minValue,setting.maxValue)))
    }  else {
        dispatch(stateSettingRandomValue1(getRandomValueReal(setting.minValue,setting.maxValue)))
        dispatch(stateSettingRandomValue2(getRandomValueReal(setting.minValue,setting.maxValue)))
    }
      setUserInputValue('')
  }
  else{
      setError(error+1)
      message.error('Не верно! Попробуй еще раз!')
  }
}
  return (
    <div className='page'>
      <Header/>
      <div className='container'>
        <div>
         <div className='container__subtitle'> Вычислите:</div> 
          <div className='container__calc'>
            <span className='value'> {value1} {obj[setting.actionArifmetic] || obj[sumbol]} {value2<0?'('+value2+')':value2} = </span> <Input className='input' value={userValueInput} onChange={(e)=>setUserInputValue(e.target.value)}/>
          
           
          </div>
          <div className='container__btn'>
          <Button className='btn-check' onClick={()=>handleCalc()}>Проверить</Button>
          <Button className='btn-result' onClick={()=>setState(true)}>Подвести итог</Button>
          </div>
         
          </div>
         
          <div>
          <div>
          Правильные ответы: {success}
          </div>
          <div>
          Неправильные ответы: {error}
          </div>
          {state? <div className='mark'>Оценка: {Math.round(success/(success+error)*10)}</div>:''}
          </div>
      </div>
        
        

    </div>
  )
}

export default Arifmetic