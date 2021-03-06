import Header from "./Header"
import { Button } from 'react-bootstrap';
import { useState } from "react";
const Form =()=>{
    const [data,setData]=useState({
        name:'',
        error:'',
        listArray:[],
        isUpdateBtn:false,
        oldValue:'',
        searchValue:'',
        searchDataArr :[],
    })

    const handleOnchange =(e)=>{
        setData(state =>({
            ...state,
            name: e.target.value,
            error:''
        }))
    }
    const handleOnclick =()=>{
        let name = '';
        let error ='';
        let listArray = data.listArray;
        if(data.name===''){
            error ='Please enter details';
        }else{
            listArray.push(data.name);
            name = '';
        }
        setData((state)=>({
           ...state,
           name,
           error,
           listArray,
           searchDataArr:listArray
        }))
    }
    const handleOnDelete =()=>{
        setData({
            listArray:[],
        })
    }

    const handleOnEdit =(i)=>{
        const editValue = data.listArray[i];
        setData((state)=>({
            ...state,
            name:editValue,
            isUpdateBtn:true,
            oldValue:editValue
        }))
    }

    const handleOnRemove =(i)=>{
        const dataArray = [...data.listArray];
        dataArray.splice(i,1);
        
        setData((state)=>({
            ...state,
            listArray:dataArray
        }))
    }

    const handleUpdate = () => {
        const {name,oldValue,listArray} = data;
        const dataArray = [...listArray];
        const index = dataArray.indexOf(oldValue);
        dataArray[index] = name;
        setData((state)=>({
            ...state,
            listArray:dataArray,
            name:'',
            isUpdateBtn:false
        }))

    }

    const handleOnSearch =({target})=>{
        const {value} = target;
        const searchData = data.searchDataArr.filter(e=>e.toLowerCase().includes(value.toLowerCase()));
        setData((state)=>({ 
            ...state,
            listArray:searchData
        }))
    }

    return(
        <>
        <Header handleOnSearch={handleOnSearch}/>
        <div className='container main'>
            <div>
                <h2 style={{textAlign:'center'}}>Welcome To Crud Operation</h2>
            </div>
            <div className="row wrapper p-5  bg-white">
                <div className="col-12 d-flex text-center justify-content-center">
                    <input className='form-control mr-1' type='text' placeholder='Enter Details' 
                    onChange={handleOnchange} value={data.name} name='name' />
                    {
                        data.isUpdateBtn 
                            ? <Button className='btn btn-success mr-1' onClick={handleUpdate}>Update</Button>
                            : <Button className='btn btn-success mr-1 ' onClick={handleOnclick}>Add</Button>
                    }                    
                    <Button className='btn btn-danger mr-1 ' onClick={handleOnDelete}>Delete</Button>
                </div>
                <span style={{color:'red',margin:'auto'}}>{data.error}</span>
                    <table className="table table-striped mt-4">
                        <tbody>
                            {data.listArray.map((l,i) =>{
                                return(
                                    <tr key ={i}>
                                        <td>{l}</td>
                                        <td style={{textAlign:'right'}}>
                                           <Button className='btn btn-primary mr-1' onClick={()=>handleOnEdit(i)}>Edit</Button>
                                           <Button className='btn btn-danger mr-1' onClick={()=>handleOnRemove(i)} >Remove</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                   </table>
            </div>
        </div>
        </>
    )
}
export default Form;