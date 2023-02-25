import React from 'react'
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  return (
    <div className='page'>
      <div className='icon'>
        <img src="https://i.postimg.cc/gJ5zLsYv/icons8-50.png" alt="" />
        <img src="https://i.postimg.cc/DycQVpnj/icons8-30-1.png" alt="" />
      </div>
      <div className='page__content'>
            <div className='page__content_title'>Математические тренажеры</div>
            <div className='block'>
            <div className='tr' onClick={()=>navigate('/arithmetic')}>Арифметические действия</div>
            <div className='tr'>Перевод единиц измерения в другую</div>
            <div className='tr'>Округление</div>
            <div className='tr'>Таблица умножения</div>
            </div>
      </div> 
    </div>
  )
}

export default Main