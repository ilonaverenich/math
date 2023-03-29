import { Radio, Space, Slider,Button,message, Input  } from 'antd';
import Header from '../Header/Header'
import {useState, useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {stateSettingNumbersAction,stateSettingMinValue,stateSettingArifmetic,stateSettingMaxValue,stateSettingRandomValue1,stateSettingRandomValue2} from '../../Redux/Reducers/mainReducers'
import emailjs from '@emailjs/browser';

function Arifmetic() {

var formData = new FormData();
  formData.append("message", "Groucho")

const [email,setEmail] = useState('')
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    
    emailjs.send('service_vyrw4lf', 'template_ea5t73w', templateParams,'5dc8crz-UKPrP6gfp').then((result) => {
      console.log('Всё гуд со стороны обьекта:'+ result.text);
  }, (error) => {
      console.log('Ошибка со стороны обьекта:'+ error.text);
  });
    
  };


  
  const inputEl = useRef(null);
  const dispatch = useDispatch();
  const value1 = useSelector((store)=>store.data.setting.randomValue1)
  const value2 = useSelector((store)=>store.data.setting.randomValue2)
  const setting = useSelector((store)=>store.data.setting)
  const [state, setState] = useState(false)
  const [grade, setGrade] = useState(0)
  const [sumbol,setSumbol]= useState('')
  const [result,setResult]= useState('')
  const [messages,setMessages] = useState('')
  const [success, setSuccess] = useState(0)
  const [error, setError] = useState(0)
  const [userValueInput,setUserInputValue]= useState('')

  
  let templateParams = {
    grade: grade,
    success: success,
    error:error,
    result: []
  } 

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

    function handleRes(){
      setState(true);
      setGrade(Math.round(success/(success+error)*10))
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
  setState(false)

  inputEl.current.focus();
   
  if(userValueInput==Math.round(result * 100000) / 100000){
     setSuccess(success+1)
     /*  message.success('Верно') */
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
      setMessage(` ${value1}${obj[setting.actionArifmetic] || obj[sumbol]} ${value2} = ${result},  а вы ответили ${userValueInput}`)
      templateParams.result.push(message)
      console.log(message)
      /* message.error('Не верно! Попробуй еще раз!') */
  }
}

  return (
    <div className='page'>
      <Header/>
      <div className='container'>
        <div className='container__arifmetic'>
         <div className='container__subtitle'> Вычислите:</div> 
          <div className='container__calc'>
            <span className='value'> {value1} {obj[setting.actionArifmetic] || obj[sumbol]} {value2<0?'('+value2+')':value2} = </span> <Input  onKeyDown={(e)=>(e.which===13)?handleCalc():''} ref={inputEl} className='input' value={userValueInput} onChange={(e)=>setUserInputValue(e.target.value)}/>
          
           
          </div>
          {/* ФОРМА */}
        
          <div className='container__btn'>
          <Button className='btn-check' onClick={()=>handleCalc()}>Проверить</Button>
          <Button className='btn-result' onClick={()=>handleRes()}>Подвести итог</Button>
          </div>
          {state? <div className='mark'>
            Оценка: 
          {(success==0 && error==0)?'0':grade}</div>:''}
          

          {state?<form className='form-submit'  ref={form}  onSubmit={sendEmail}>
          <p>Результаты можем отправить на вашу почту:</p>
          <label> Введите email </label>
          <Input type="email" onChange={(e)=>setEmail(e.target.value)} name="user_email" />
   
          <Input type="submit" value="Send" />
        
          </form>:''} 

          </div>
          
         
        {!state?  <div className='status__block'>
         
         <div>
         Правильные ответы: <span className='mark-value'>{success}</span>
         </div>
         <div>
         Неправильные ответы: <span className='mark-value'>{error}</span> 
         </div>
        
         </div>:''}

   
      </div>
        
        

    </div>
  )
}

export default Arifmetic