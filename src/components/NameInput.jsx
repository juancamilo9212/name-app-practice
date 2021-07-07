import React from 'react';
import {Input,notification} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import {createNameAPI} from '../api/apiCalls.js';
import {createName} from '../redux/actions/nameActions.js';
import {useDispatch} from 'react-redux';
import {fieldValidation} from '../utils/utils.js';

const NameInput = () => {
    
    const {Search} = Input;
    const dispatch = useDispatch();
    
    const createNameOnClick = (value) => {
        const isValid = fieldValidation(value);
        if(isValid){
            const body = {nombre:value};
            createNameAPI(body).then(response => {
            dispatch(createName(response));
        });
        }else{
            notification.error({
                message:'Debes ingresar un nombre válido'
            });
        }
    };

    return(
        <div>
        <h1>Registro de Nombres</h1>
        <Search
        id="nuevo-nombre"
        placeholder="Por favor ingrese un nuevo nombre"
        allowClear
        enterButton={<PlusOutlined/>}
        size="large"
        onSearch={createNameOnClick}
        />
        </div>
    )
}
    
export default NameInput;
    
