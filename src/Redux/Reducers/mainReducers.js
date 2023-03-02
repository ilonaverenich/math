import {createReducer, createAction} from '@reduxjs/toolkit';

const initialValue={
    stateTheme:false,
    setting:{
        numbers:'integer',
        minValue: -10,
        maxValue: 10,
        actionArifmetic: 'sum',
        randomValue1: 0,
        randomValue2:0
    }
}

export const stateThemeAction = createAction('STATE_THEME_ACTION');

export const stateSettingNumbersAction = createAction('STATE_SETTING_NUMBER_ACTION');
export const stateSettingMinValue = createAction('STATE_SETTING_MINVALUE_ACTION');
export const stateSettingMaxValue = createAction('STATE_SETTING_MAXVALUE_ACTION');
export const stateSettingArifmetic = createAction('STATE_SETTING_ARIFMETIC_ACTION');

export const stateSettingRandomValue1 = createAction('STATE_SETTING_RANDOMVALUE1_ACTION');
export const stateSettingRandomValue2 = createAction('STATE_SETTING_RANDOMVALUE2_ACTION');


export default createReducer(initialValue,{
    [stateThemeAction]:function(state,action){
        state.stateTheme = !action.payload;
    },
    [stateSettingNumbersAction]:function(state,action){
        state.setting.numbers = action.payload;
    },
    [stateSettingMinValue]:function(state,action){
        state.setting.minValue = action.payload;
    },
    [stateSettingMaxValue]:function(state,action){
        state.setting.maxValue = action.payload;
    },
    [stateSettingArifmetic]:function(state,action){
        state.setting.actionArifmetic = action.payload;
    },
    [stateSettingRandomValue1]:function(state,action){
        state.setting.randomValue1 = action.payload;
    },
    [stateSettingRandomValue2]:function(state,action){
        state.setting.randomValue2 = action.payload;
    },
})