import Header from "../../Header/Header"
import { useState , useEffect} from "react";
import { Button } from "antd"
import Email from "./Email";

function Prime() {
    const [value,setValue] = useState(0)
    const [result,setResult] = useState(false)
    const [success,setSuccess] = useState(0)
    const [error,setError] = useState(0)
    const [grade, setGrade] = useState(0)
    const [state, setState] = useState(false)

    function getRandomValue() {
        let rand =  0.5 + Math.random() * (200 - 10 + 1);
        return +Math.round(rand)
      }

      let templateParams = {
        grade: grade,
        success: success,
        error:error,
        result: []
      }  
useEffect(()=>{
    setValue(getRandomValue())
    setResult(isPrime(value))
    console.log(isPrime(value))
},[success,error])

function isPrime( num ) 
{
  if( num <= 1 )
    return false;

  for( let i = 2; i*i <= num; i++)
  { 
      if( num % i == 0 ) 
        return false;
  }
  return true;
}
  

  return (
    <div className='page'>
        <Header/>
        <div className="container">
        
        <div className='container__subtitle container__subtitle-prime'> 
             Верно ли, что число {value} является простым?
        </div>
        <div className="btn-content">
            <Button className="btn" onClick={()=>result?setSuccess(success+1):setError(error+1)}>ДА</Button>
            <Button className="btn" onClick={()=>!result?setSuccess(success+1):setError(error+1)}>НЕТ</Button>
            <Button className="btn btn-check" onClick={()=>setState(true)}>Подвести итог</Button>
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

export default Prime