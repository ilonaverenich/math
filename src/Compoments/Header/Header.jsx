import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import {stateThemeAction} from '../../Redux/Reducers/mainReducers'

function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stateTheme = useSelector((store)=>store.data.stateTheme)
    console.log(stateTheme)

  return (
    <div className='header'>
    <img onClick={()=>navigate(-1)} src="https://i.postimg.cc/Bvvf5zQd/icons8-50.png" alt="" />
    <img onClick={()=>dispatch(stateThemeAction(stateTheme))} src={stateTheme?"https://i.postimg.cc/gJ5zLsYv/icons8-50.png":'https://i.postimg.cc/DycQVpnj/icons8-30-1.png'} alt="" />
  </div>
  )
}

export default Header