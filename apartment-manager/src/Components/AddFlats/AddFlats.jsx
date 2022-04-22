import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { allresident } from '../../Redux/AllResidentList/action'
import { allresident } from '../../Redux/AllResidentList/action'

const AddFlats = () => {

  const [addFlatData, setAddFlatData] = useState({})
  
  const dispatch = useDispatch()
  const allresident_info = useSelector((store) => (store.allresidentInfo.allResidentList)) || []
  // console.log('allresident131:', allresident_info)
  
  useEffect(() => {
    getAllResident()
  },[])
  
  const getAllResident = () => {
    axios.get(`https://safe-woodland-51614.herokuapp.com/resident`).then(({data}) => {
      console.log('data getAllResident',data);
      dispatch(allresident(data))
    })
  }
  
  const addFlats_handleOn_change = (e) => {
    const {name,value} = e.target;
    setAddFlatData({
      ...addFlatData,
      [name]:value
    })
  }
  console.log('addFlatData:', addFlatData)
  
  const addFlats_handleOn_submit = (e) => {
    e.preventDefault();
    
    // console.log('addFlatData:', addFlatData)
    axios.post(`https://safe-woodland-51614.herokuapp.com/flat`,addFlatData).then(() => {
        alert('Flat created Successfully')
    }).catch((e) => {
      console.log('error in addFlats_handleOn_submit:', e)

    })
    
  }

  return (
    <div>
      <div className='w-25 p-3 m-auto'>
        <h1>Add Flats</h1>

        <form onSubmit={addFlats_handleOn_submit} >
          <div className="mb-3 ">
            <label htmlFor="addFlat-ownerType" className="form-label ">Enter Owner Type</label>
            <input type="text" className="form-control" id="addFlat-ownerType" name='ownerType' onChange={addFlats_handleOn_change} placeholder='Owner or Tenant' />

          </div>
          <div className="mb-3 ">
            <label htmlFor="addFlat-Block" className="form-label">Enter Block Type</label>
            <input type="text" className="form-control" id="addFlat-Block" name='Block' onChange={addFlats_handleOn_change} />

          </div>
          <div className="mb-3">
            <label htmlFor="addFlat-BlockNo" className="form-label">Enter Block Number</label>
            <input type="number" className="form-control" id="addFlat-BlockNo" name='BlockNo' onChange={addFlats_handleOn_change} />
          </div>
          <div className="mb-3">
          <select className="form-select"  name='resident_id' onChange={addFlats_handleOn_change}>
            <option value={''}>Enter Resident to add to Flat</option>
            {allresident_info.map((e) => (
              <option key={e._id} value={e._id}>{e.name} ({e.gender})</option>
            ))}
            {/* <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option> */}
          </select>
          </div>

          <input type="submit" className="btn btn-primary" value={'Add FLat to the list'} />
        </form>
      </div>
    </div>
  )
}

export default AddFlats