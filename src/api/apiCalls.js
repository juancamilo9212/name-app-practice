import {BASE_URL} from './constants';

export async function getAllNamesAPI(){
    const url = `${BASE_URL}getAll`;
    return await fetch(url).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}

export async function updateNameAPI(id,name){
    const url = `${BASE_URL}updateName/${id}`;
    const params = {
        method:'PUT',
        body:JSON.stringify(name),
        headers:{
            'Content-Type':'application/json'
        }
    }
    return await fetch(url,params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}

export async function removeNameAPI(id){
    const url = `${BASE_URL}remove/${id}`;
    const params = {
        method:'DELETE'
    }
    return await fetch(url,params).then(response => {
        return response;
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}

export async function createNameAPI(name){
    const url = `${BASE_URL}insert`;
    const params = {
        method:'POST',
        body:JSON.stringify(name),
        headers:{
            'Content-Type':'application/json'
        }
    }
    return await fetch(url,params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}