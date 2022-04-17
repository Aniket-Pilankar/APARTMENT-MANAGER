import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { flatDetails } from '../../Redux/ResidentInSingleFlat/action';


const SingleFlatDetails = () => {

    let id = useParams();

    const dispatch = useDispatch()
    const resident_list = useSelector((store) => store.residentInfo.resident)
    console.log('resident_list:', resident_list)

    // console.log('id:', id.id)
    let flat_id = id.id
    // console.log('flat_id:',typeof flat_id)

    useEffect(() => {
        getSingleFlatDetails()
    }, [])

    const getSingleFlatDetails = () => {
        axios.get(`http://localhost:4040/flat/${flat_id}`).then(({ data }) => {
            // console.log('data:', data.resident_id)
            const { resident_id } = data
            console.log('resident_id:', resident_id)
            dispatch(flatDetails(resident_id))
        })
    }

    return (
        <div>
            <table className="table m-auto w-50">
                <thead>
                    <tr>
                        <th scope="col">Sr No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Age</th>
                    </tr>
                </thead>
                <tbody>
                    {resident_list.map((e, i) => (

                        <tr key={e._id}>
                            <td>{i + 1}</td>
                            <td>{e.name}</td>
                            <td>{e.gender}</td>
                            <td>{e.age}</td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SingleFlatDetails