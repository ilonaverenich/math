import {createReducer, createAction} from '@reduxjs/toolkit';

const initialValue={
    stateTheme:false
}

export const stateThemeAction = createAction('STATE_THEME_ACTION');


export default createReducer(initialValue,{
    [stateThemeAction]:function(state,action){
        state.stateTheme = !action.payload;
    }
})