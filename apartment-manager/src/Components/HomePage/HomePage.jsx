import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { flatDetails } from '../../Redux/2.FlatDetails/action';

const HomePage = () => {
  // console.log('useDispatch:', useDispatch)

  const id = useParams()

  const dispatch = useDispatch()
  const flat_details = useSelector((store) => (store.flatInfo.flatAllDetails)) || []
  console.log('flat_details:', flat_details)



  // const authState_form_store = useSelector((store) => (store.login.authState))

  // if(!authState_form_store){
  //   return <Navigate to={'/login'}/>
  // }

  useEffect(() => {
    // flatdetails that we got from backend
    gotAllFlatDetails()
  }, [])

  const gotAllFlatDetails = () => {
    axios.get(`http://localhost:4040/flat`).then(({ data }) => {
      console.log('data:', data)
      dispatch(flatDetails(data))
    })
  }


  return (
    <div>
      <h2>Flat Details</h2>
      {/* table-striped table-hover */}
      <table className="table  w-50 m-auto" >
        <thead>
          <tr>
            <th scope="col">Sr no</th>
            <th scope="col">Type</th>
            <th scope="col">Block</th>
            <th scope="col">Block No</th>
            <th scope="col">Number of Resident</th>
            <th scope="col">Button</th>

          </tr>
        </thead>
        <tbody>

          {flat_details.map((e, i) => (

            <tr key={e._id}>
              <td>{i + 1}</td>
              <td>{e.ownerType}</td>
              <td>{e.Block}</td>
              <td>{e.BlockNo}</td>
              <td>{e.resident_id.length}</td>
              <td>
                <Link to={`/flatDetails/${e._id}`}>
                <button type="button" className="btn btn-info">Info</button>
                </Link>
              </td>
            </tr>

          ))}

        </tbody>
      </table>
    </div>
  )
}

export default HomePage