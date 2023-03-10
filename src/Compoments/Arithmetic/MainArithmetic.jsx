import { Radio, Space, Slider,Button,message  } from 'antd';
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import {stateSettingNumbersAction,stateSettingMinValue,stateSettingArifmetic,stateSettingMaxValue,stateSettingRandomValue1,stateSettingRandomValue2} from '../../Redux/Reducers/mainReducers'


function MainArithmetic() {
    const dispatch = useDispatch();
    const [range,setRange]= useState([-10,10])
    const [sign,setSign]= useState('')
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
            case 'sum': setResult(value1+value2);break;
            case 'min': setResult(value1-value2);break;
            case 'mul': setResult(value1*value2);break;
            case 'del': {
               
            /* value1%value2!==0? setResult(value1/value2): console.log('hhh') */
            };break;
            case 'all': arrayRandElement(arr);break;
        }
    },[value1,value2])

    function sendOptionApp(){
       
    /*     navigate('/page') */  
          dispatch(stateSettingRandomValue1(getRandomValue(setting.minValue,setting.maxValue)))
         dispatch(stateSettingRandomValue2(getRandomValue(setting.minValue,setting.maxValue)))
       
        
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
      function handleCalc(){
       
        if(userValueInput==result){
           
            message.success('??????????')
            sendOptionApp()
            setUserInputValue('')
        }
        else{
            message.error('???? ??????????! ???????????????? ?????? ??????!')
        }
      }
  
    

  return (
    <div className={stateTheme?'page':'page white'}>
     <Header/>
        <div className='container'>
            <div className='container__title'>???????????????????????????? ????????????????</div>
            <div className='container__content_block'>
            <span>??????????????:</span>
            <Radio.Group defaultValue="integer" onChange={(e)=>dispatch(stateSettingNumbersAction(e.target.value))}>
                <Space direction="vertical">
                    <Radio value='integer'>?????????? ??????????</Radio>
                    <Radio value='real'>???????????????????? ??????????</Radio>
                </Space>
            </Radio.Group>
            <span>???????????????? ????????????????: [{range[0]}, {range[1]} ]</span>
            <Slider
                range
                min={-100}
                max={100}
                step={5}
                defaultValue={[-10, 10]}
                onChange={(e)=>getValue(e)}/>
            <span>????????????????:</span>
            <div>
            <Radio.Group onChange={(e)=>dispatch(stateSettingArifmetic(e.target.value))} defaultValue='sum' >
                <Space direction="vertical" >
                    <Radio value='sum'>????????????????</Radio>
                    <Radio value='min'>??????????????????</Radio>
                    <Radio value='mul'>??????????????????</Radio>
                    <Radio value='del'>??????????????</Radio>
                    <Radio value='all'>?????? ???????????????????????????? ????????????????</Radio>
                </Space>
            </Radio.Group>
            </div>
            <Button className='btn-start' onClick={()=>sendOptionApp()}>????????????</Button>
           <div className='result'>
            ??????????????????:
           <div>
           {+value1<=0?`(${value1})`:value1}{obj[setting.actionArifmetic]}{+value2<=0?`(${value2})`:value2} = <input value={userValueInput} onChange={(e)=>setUserInputValue(e.target.value)}/><button onClick={()=>handleCalc()}>??????????????????</button> 
           <div>
          {/*  ?????? ????????????????: {userValueInput}  */}
           </div>
           <div>
            ??????????: {result} 
           </div>
           </div>

                </div>
           </div>
            
        </div>
    </div>
  )
}

export default MainArithmetic