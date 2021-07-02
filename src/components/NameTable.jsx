import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Table, Button, Space, Input, Form} from 'antd';
import {getNames,updateName,removeName} from '../redux/actions/nameActions.js';
import {getAllNamesAPI,removeNameAPI,updateNameAPI} from '../api/apiCalls.js';
import moment from 'moment';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'text' ? <Input/> : null;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
                {
                  required: true,
                  message: `Please Input ${title}!`,
                }]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

const NameTable = () => {
    const [form] = Form.useForm();
    const [editable, setEditable] = useState(false);
    const names = useSelector(state => state.allNames.data);
    const [editingKey, setEditingKey] = useState('');

    console.log(editingKey);
    
    const dispatch = useDispatch();
    
    const updateNameOnClick = (record) => {
        form.setFieldsValue({
            nombre: '',
            ...record,
          });
        setEditingKey(record.nombre);
        setEditable(true);
    }

    const isEditing = (record) => record.nombre === editingKey;

    const cancel = () => {
        setEditable(false);
        setEditingKey('');
    }

    const removeNameOnClick = (record) => {
        const {id} = record;
        removeNameAPI(id).then(response => {
            if(response.status === 200) dispatch(removeName(id));
        });   
    };

    const  editName = async(record) => {
      try {
        const {id} = record;
        const rowValue = await form.validateFields();
        const {nombre} = rowValue;
        updateNameAPI(id,{nombre:nombre}).then(response => {
          dispatch(updateName(response));
        });
        setEditingKey('');
        setEditable(false);
      } catch (error) {
        console.log(error);
      }
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
            editable:true
          },
          {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
          },
          {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones',
            render: ((text,record) => {
                return editable ?
            (
            <Space>
            <Button onClick={() => editName(record)}>Save</Button>
            <Button onClick={() =>cancel()}>Cancel</Button>
            </Space>
            ) :
            (
            <Space>
            <Button onClick={() => updateNameOnClick(record)}>Editar</Button>
            <Button onClick={() => removeNameOnClick(record)}>Eliminar</Button>
            </Space>
            )
            })
        }
    ]

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
          return col;
        }
    
        return {
          ...col,
           onCell: (record) => ({
            record,
            inputType: col.dataIndex === 'nombre' ? 'text' : null,
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record)
          }),
        };
      });

    useEffect(() => {
        getAllNamesAPI().then(response => {
            const {data} = response;
            dispatch(getNames(data));
        }); 
    }, [])

    let dataSource =[];
    names.map(name => {
        const {id,nombre,date} = name; 
        const item = {
            id:id,
            nombre:nombre,
            fecha:moment(date).format('ll').toString()
        }
        dataSource.push(item);
    });

    return(
        <Form form={form} component={false}>
        <Table 
        dataSource={dataSource} 
        components={{
            body: {
              cell: EditableCell,
            },
          }}
        columns={mergedColumns}
        bordered
        pagination={{
            onChange: cancel,
        }}
        />
        </Form>
    )
}

export default NameTable;