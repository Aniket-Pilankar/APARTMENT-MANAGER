import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { flatDetails } from '../../Redux/ResidentInSingleFlat/action';


const SingleFlatDetails = () => {

    let id = useParams();


    const dispatch = useDispatch()
    const resident_list = useSelector((store) => store.residentInfo.resident)
    // console.log('resident_list:', resident_list)
    const authState_form_store = useSelector((store) => (store.login.authState))
    // console.log('authState_form_store:', authState_form_store)

    const [all_resident_id, setallResident_id] = useState([])
    console.log('all_resident_id000:', all_resident_id)



    // console.log('id:', id.id)
    let flat_id = id.id
    // console.log('flat_id:',flat_id)
    // console.log('flat_id:',typeof flat_id)

    useEffect(() => {
        getSingleFlatDetails()
    }, [])

    const getSingleFlatDetails = () => {
        // axios.get(`http://localhost:4040/flat/${flat_id}`).then(({ data }) => {
        axios.get(`https://appartment-manager-backend.onrender.com/flat/${flat_id}`).then(({ data }) => {
            // console.log('data:', data.resident_id)
            const { resident_id } = data
            // console.log('resident_id:', resident_id)
            dispatch(flatDetails(resident_id))
            let arr = [];
            for (let i = 0; i < resident_id.length; i++) {
                arr.push(resident_id[i]._id)
            }
            setallResident_id(arr)
        })
    }

    const resident_handleDelete = async (residentId) => {
        // console.log('residentId:', residentId)

        let new_list = all_resident_id.filter((e) => {
            return e !== residentId
        })
        console.log(new_list)
        // setallResident_id(new_list)++
        // all_resident_id.splice(0,1)
        // console.log('all_resident_id123:', all_resident_id)
        // do_patch()++
        do_patch(new_list)
        console.log("1");
    }

    const do_patch = async (new_list) => {
        // let obj = {resident_id:all_resident_id}
        // axios.patch(`http://localhost:4040/flat/${flat_id}`,obj).then((res) => {
        //     console.log('res:', res)

        // }).then(() => {
        //     getSingleFlatDetails()
        // })
        // let res = await fetch(`https://safe-woodland-51614.herokuapp.com/flat/${flat_id}`, {
        let res = await fetch(`https://appartment-manager-backend.onrender.com/flat/${flat_id}`, {
            method: "PATCH",
            body: JSON.stringify({ resident_id: new_list }),
            headers: {
                "content-type": "application/json"
            }
        })

        let response = await res.json()
        console.log('response:', response)
        console.log("2");
        getSingleFlatDetails()

        // const {resident_id} = response

        // dispatch(flatDetails(resident_id))
    }
    // console.log('all_resident_id123:', all_resident_id)

    if (resident_list.length === 0) {
        return <h1>Nothing to show</h1>
    } else {


        return (
            // <div>
            //     <h2>Resident Details</h2>
            //     <table className="table m-auto w-50">
            //         <thead>
            //             <tr>
            //                 <th scope="col">Sr No</th>
            //                 <th scope="col">Resident Name</th>
            //                 <th scope="col">Gender</th>
            //                 <th scope="col">Age</th>
            //             </tr>
            //         </thead>
            //         <tbody>
            //             {resident_list.map((e, i) => (

            //                 <tr key={e._id}>
            //                     <td>{i + 1}</td>
            //                     <td>{e.name}</td>
            //                     <td>{e.gender}</td>
            //                     <td>{e.age}</td>
            //                 </tr>

            //             ))}
            //         </tbody>
            //     </table>
            // </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="people-nearby">

                            {resident_list.map((e) => (
                                <div className="nearby-user" key={e._id}>
                                    <div className="row">
                                        <div className="col-md-2 col-sm-2">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user" className="profile-photo-lg" />
                                        </div>
                                        <div className="col-md-7 col-sm-7">
                                            <h5>Name: {e.name}</h5>
                                            <p>Gender: {e.gender}</p>
                                            <p className="text-muted">Age: {e.age}</p>
                                        </div>
                                        {authState_form_store ? (
                                            <div className="col-md-3 col-sm-3">
                                                <button className="btn btn-danger pull-right" onClick={() => { resident_handleDelete(e._id) }}>Remove</button>
                                            </div>
                                        ) : null}

                                    </div>
                                </div>
                            ))}
                            {/* 
              <div className="nearby-user">
                <div className="row">
                  <div className="col-md-2 col-sm-2">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user" className="profile-photo-lg"/>
                  </div>
                  <div className="col-md-7 col-sm-7">
                    <h5><a href="#" className="profile-link">Sophia Page</a></h5>
                    <p>Software Engineer</p>
                    <p className="text-muted">500m away</p>
                  </div>
                  <div className="col-md-3 col-sm-3">
                    <button className="btn btn-primary pull-right">Add Friend</button>
                  </div>
                </div>
              </div> */}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleFlatDetails