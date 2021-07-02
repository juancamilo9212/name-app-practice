import React from 'react';
import {Input} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {createNameAPI} from '../api/apiCalls.js';
import {createName} from '../redux/actions/nameActions.js';
import {useDispatch} from 'react-redux';


const NameInput = () => {
    const {Search} = Input;
    const dispatch = useDispatch();
    
    const createNameOnClick = (value) => {
        const body = {nombre:value};
        createNameAPI(body).then(response => {
            dispatch(createName(response));
        });
    };

    return(
        <div>
        <h1>Ingrese Nombre</h1>
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
    
