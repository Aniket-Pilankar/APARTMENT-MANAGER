import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './AddResident.css'

const AddResident = () => {
    const [create_newResident, setCreate_newResident] = useState({})

    const [residentId, setresidentId] = useState([])
    
    useEffect(()=> {
        getFlat()
    },[])
    
    const getFlat = () => {
        axios.get(`https://safe-woodland-51614.herokuapp.com/flat/${flatID}`).then(({data})=> {
            console.log('data:', data)
            let abc = data.resident_id
            console.log('abc:', abc)
            // setresidentId([...data.resident_id])
            let arr = []
            for(let i = 0; i < abc.length; i ++){
                arr.push(abc[i]._id)
                // setresidentId([...residentId,abc[i]._id])
            }
            setresidentId([...residentId,...arr])
        })
    }
    console.log('residentId:', residentId)

    
    const flatId = useParams()
    // console.log('flatId:', flatId.flatId)
    const [flatID, setflatID] = useState(flatId.flatId || 0)
    console.log('flatID:', flatID)
    
    const addResident_handleOn_submit = (e) => {
        e.preventDefault()
        console.log('create_newResident:', create_newResident)
        axios.post(`https://safe-woodland-51614.herokuapp.com/resident`, create_newResident).then(({data}) => {
            console.log('data:', data._id)
            
            setresidentId([...residentId,data._id])
            console.log('residentId80:', residentId)
            
            // showAlert()
            alert('New resident Added')
            
            let obj = {resident_id:residentId}
    
            
            axios.patch(`https://safe-woodland-51614.herokuapp.com/flat/${flatID}`,obj).then((res) => {
            // axios.patch(`http://localhost:4040/flat/${flatID}`,obj).then((res) => {
                console.log('reso90:', res)
                // console.log('flat897:', data._id)
            }).catch((error)=>{
                console.log('error in addResident_handleOn_submit', error.message);
            })
            console.log('residentId:', residentId)
            // getFlat()
        }).catch((error) => {
            console.log('error in addResident_handleOn_submit', error.message);
        })
        

        // let res = fetch(`https://safe-woodland-51614.herokuapp.com/flat/${flatId}`,{
        //     method:'PATCH',
        //     body:JSON.stringify(obj),
        //     header:{
        //         'Content-Type':'application/json'
        //     }
        // })
        
    }



    const showAlert = () => {
        return (

            <div class="alert alert-primary" role="alert">
                A simple primary alert—check it out!
            </div>
        )
    }

    const addResident_handleOn_change = (e) => {
        const { value, name } = e.target
        setCreate_newResident({
            ...create_newResident,
            [name]: value
        })
    }

    return (
        <div>
            <div className='w-25 p-3 m-auto'>
                <h1>Add Resident</h1>


                <form onSubmit={addResident_handleOn_submit} >
                    <div className="mb-3 ">
                        <label htmlFor="addFlat-name" className="form-label ">Enter Resident Name</label>
                        <input type="text" className="form-control" id="addFlat-name" name='name' onChange={addResident_handleOn_change} />

                    </div>
                    {/* <div className="mb-3 ">
                        <label htmlFor="addFlat-gender" className="form-label">Enter Resident Gender</label>
                        <input type="text" className="form-control" id="addFlat-gender" name='gender' onChange={addResident_handleOn_change} />

                    </div> */}
                    <select className="addFlat-gender mb-3" name='gender' onChange={addResident_handleOn_change}>
                        <option value={''}>Choose Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <div className="mb-3">
                        <label htmlFor="addFlat-age" className="form-label">Enter Resident Age</label>
                        <input type="number" className="form-control" id="addFlat-age" name='age' onChange={addResident_handleOn_change} />
                    </div>

                    <input type="submit" className="btn btn-primary" value={'Add Resident to the Flat list'} />
                </form>
            </div>

        </div>
    )
}

export default AddResident