import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { flatDetails, flatTotalPages } from '../../Redux/2.FlatDetails/action';

const HomePage = () => {

  let srCount = 1

  const [page, setpage] = useState(1);
  // console.log('page:', page)
  const [size, setsize] = useState(5);

  const [sortFlatNo, setsortFlatNo] = useState(null)
  // console.log('sortFlatNo:', sortFlatNo)

  const addpage = (val) => {
    if (page + val > 1 && page + val <= flat_totalPage + 2) {
      setpage(val)
    }
  }






  const dispatch = useDispatch()
  const flat_details = useSelector((store) => (store.flatInfo.flatAllDetails)) || []
  // console.log('flat_details:', flat_details)
  const flat_totalPage = useSelector((store) => (store.flatInfo.flat_totalPages)) || 0
  // console.log('flat_totalPage:', flat_totalPage)


  const authState_form_store = useSelector((store) => (store.login.authState))
  // console.log('authState_form_store:', authState_form_store)
  const token_form_store = useSelector((store) => (store.login.token))
  // console.log('token_form_store:', token_form_store)

  // if(!authState_form_store){
  //   return <Navigate to={'/login'}/>
  // }

  useEffect(() => {
    // flatdetails that we got from backend
    gotAllFlatDetails()
  }, [page])

  const gotAllFlatDetails = () => {
    // axios.get(`http://localhost:4040/flat`).then(({ data }) => {
    // axios.get(`https://safe-woodland-51614.herokuapp.com/flat`).then(({ data }) => {
    axios.get(`https://appartment-manager-backend.onrender.com/flat?page=${page}&size=${size}`).then(({ data }) => {
      console.log('data:', data)
      dispatch(flatDetails(data.flat))
      dispatch(flatTotalPages(data.totalPage))
    })
  }

  const sort_flatNo_handleOnchange = (e) => {
    // setsortFlatNo(e.target.value)
    let sortValue = e.target.value
    // console.log('sortValue:', sortValue)
    setpage(1)
    axios.get(`https://appartment-manager-backend.onrender.com/flat/sortBy/${sortValue}?page=${page}&size=${size}`).then(({ data }) => {
      console.log('pageaftersort:', page)
      console.log('data sorted:', data)
      dispatch(flatDetails(data.flat))
      dispatch(flatTotalPages(data.totalPage))
    })
  }


  return (
    <div>
      <h2>Flat Details</h2>
      {/* table-striped table-hover */}
      <div className=' mx-auto w-50 d-flex justify-content-between'>
        <nav aria-label="Page navigation example m-auto">
          <ul className="pagination">
            <li className="page-item"><Link to={'/'} className="page-link" onClick={() => { addpage(page - 1) }}>Previous</Link></li>
            <li className="page-item"><Link to={'/'} className="page-link" onClick={() => { addpage(page + 1) }}>Next</Link></li>
          </ul>
        </nav>

        <form action=""  >
          {/* <select className="form-select" aria-label="Default select example" onChange={(e) => {console.log("value",e.target.value)}}> */}
          <select className="form-select" aria-label="Default select example" onChange={sort_flatNo_handleOnchange}>
            {/* <option value={''}>Sort Flat Number</option> */}
            <option value="1">Ascending</option>
            <option value="-1">Descending</option>
          </select>

        </form>

        <nav aria-label="Page navigation example m-auto">
          <ul className="pagination">
            <li className="page-item page-link">Total Pages</li>
            <li className="page-item page-link">{flat_totalPage}</li>
          </ul>
        </nav>
        {/* <div className="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" className="btn btn-outline-primary ">Total Pages</button>
          <button type="button" className="btn btn-primary ">{flat_totalPage}</button>
          
        </div> */}
      </div>
      <table className="table  w-50 m-auto table-striped table-hover" >
        <thead>
          <tr>
            <th scope="col">Sr no</th>
            <th scope="col">Type</th>
            <th scope="col">Block</th>
            <th scope="col">Flat No</th>
            <th scope="col">Number of Resident</th>
            <th scope="col">Resident Details</th>
            {authState_form_store ? <th scope="col">Add Resident</th> : null}

          </tr>
        </thead>
        <tbody>

          {flat_details.map((e, i) => (

            <tr key={e._id}>
              <td>{i + 1}</td>
              {/* <td>{srCount++}</td> */}
              <td>{e.ownerType}</td>
              <td>{e.Block}</td>
              <td>{e.BlockNo}</td>
              <td>{e.resident_id.length}</td>
              <td>
                <Link to={`/flatDetails/${e._id}`}>
                  <button type="button" className="btn btn-info">Info</button>
                </Link>
              </td>
              {/* <td>
                <Link to={`/addresident/${e._id}`}>
                  <button type="button" className="btn btn-info">Add</button>
                </Link>
              </td> */}
              {authState_form_store ?
                (
                  <td>
                    <Link to={`/addresident/${e._id}`}>
                      <button type="button" className="btn btn-warning">Add</button>
                    </Link>
                  </td>
                ) : null}
            </tr>

          ))}

        </tbody>
      </table>

    </div>
  )
}

export default HomePage