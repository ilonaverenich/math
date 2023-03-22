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
                <div className='container__block_item'>Перевод единиц измерения в другую</div>
                <div className='container__block_item'>Округление</div>
            
            </div>
      </section> 
    </div>
  )
}

export default Main