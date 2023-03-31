import {useState, useEffect, useRef} from 'react'
import {stateSettingRandomValue1,stateSettingRandomValue2} from '../../../Redux/Reducers/mainReducers'
import Header from '../../Header/Header'
import {Input,Button, message} from 'antd'
import {useSelector, useDispatch} from 'react-redux';
import Email from './Email';


function Round() {


    const dispatch = useDispatch();
    const value1 = useSelector((store)=>store.data.setting.randomValue1)
    const value2 = useSelector((store)=>store.data.setting.randomValue2)
    const [grade, setGrade] = useState(0)
    const [result, setResult] = useState('')
    const [userValue, setUserValue] = useState('')
    const [success, setSuccess] = useState(0)
    const [error, setError] = useState(0)
    const [state, setState] = useState(false)
    const inputEl = useRef(null);

    let templateParams = {
      grade: grade,
      success: success,
      error:error,
      result: []
    } 

    
    useEffect(()=>{
      inputEl.current.focus();
      dispatch(stateSettingRandomValue1(getRandomValueReal()))
      dispatch(stateSettingRandomValue2(getRandomValueRound()))
    },[])
    useEffect(()=>{
      switch (value2){
        case 'единиц': setResult(Math.round(value1)); break;
        case 'десяток': setResult(Math.round(value1/10)*10); break;
        case 'сотен': setResult(Math.round(value1/100)*100); break;
        case 'десятых': setResult(value1.toFixed(1)); break;
        case 'сотых' : setResult(value1.toFixed(2)); break;
        case 'тысячных' : setResult(value1.toFixed(3)); break;

      } 
      
    
    },[value2])

    function handleRes(){
      setGrade(Math.round(success/(success+error)*10))
      setState(true)
    }

    function getRandomValueReal() {
        let rand =  0.5 + Math.random() * (999 - 10 + 1);
        return +rand.toFixed(4)
      }
      function getRandomValueRound(){
       /*  const arrayRound = ['tenth','hundredths','thousandths'] */
        const arrayRound = ['единиц','десяток','сотен','десятых','сотых','тысячных']
        return arrayRound[Math.floor(Math.random() * arrayRound.length)];
      }
      
      function handleChange(){
        inputEl.current.focus();
        setState(false)
        console.log(result)

        if (result == userValue){
          setSuccess(success+1)
          message.success('Верно')
          dispatch(stateSettingRandomValue1(getRandomValueReal()))
          dispatch(stateSettingRandomValue2(getRandomValueRound()))
          setUserValue('')
 
        }
        else{
          setError(error+1)
          message.error('Ошибка! Попробуйте еще раз!')
        }

      }
   
  return (
    <div className='page'>
        <Header/>
        <div className='container'>
        <div className='container__subtitle'> Округлите до <span className='round'>{value2}</span>:</div> 
            <div className='container__calc'>
                <span className='value'>{value1}</span> <span className='sing-round'>≈ </span><Input className='input' ref={inputEl} value={userValue} onChange={(e)=>setUserValue(e.target.value)} onKeyDown={(e)=>(e.which===13)?handleChange():''}/>
            </div>
            <div className='container__btn'>
   
            <Button className='btn-check' onClick={()=>handleChange()}>Проверить</Button>
            <Button className='btn-result' onClick={()=> handleRes()}>Подвести итог</Button>

          </div>
          {state?<div className='mark'>Оценка:  
          {(success==0 && error==0)?<span className='grade'>{0}</span>:<span className='grade'>{grade}</span>}</div>:''}
          {state?<Email templateParams={templateParams}/>:''} 
          {!state?<div className='status__block'>
          <div> Количество правильных ответов: {success} </div>
          <div>Количество неправильных ответов: {error} </div>
          </div>:''}
       
        </div>
        
    </div>
  )
}

export default Round