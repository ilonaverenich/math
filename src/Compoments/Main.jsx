import React from 'react'
import { useNavigate } from "react-router-dom";
import Header from './Header/Header';


function Main() {
  const navigate = useNavigate();

  return (
    <div className='page'>
     <Header/>
      <section className='container'>
            <div className='container__title'>Математические тренажеры</div>
            <div className='container__block'>
                <div className='container__block_item' onClick={()=>navigate('/arithmetic')}>Арифметические действия</div>
                <div className='container__block_item'> <a href='https://ilonaverenich.github.io/react-app-math/'>Перевод единиц измерения в другую</a> </div>
                <div className='container__block_item' onClick={()=>navigate('/round')}>Округление</div>
                <div className='container__block_item' onClick={()=>navigate('/prime')}>Простые числа</div>
            
            </div>
      </section> 
    </div>
  )
}

export default Main