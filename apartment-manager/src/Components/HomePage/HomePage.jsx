import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { flatDetails, flatTotalPages } from '../../Redux/2.FlatDetails/action';

const HomePage = () => {
  // console.log('useDispatch:', useDispatch)
  const [page, setpage] = useState(1);
  console.log('page:', page)
  const [size, setsize] = useState(5);

  const [sortFlatNo, setsortFlatNo] = useState(null)
  console.log('sortFlatNo:', sortFlatNo)

  const addpage = (val) => {
    if (page + val > 1 && page + val <= flat_totalPage + 1) {
      setpage(val)
    }
  }




  

  const dispatch = useDispatch()
  const flat_details = useSelector((store) => (store.flatInfo.flatAllDetails)) || []
  console.log('flat_details:', flat_details)
  const flat_totalPage = useSelector((store) => (store.flatInfo.flat_totalPages)) || 0
  console.log('flat_totalPage:', flat_totalPage)


  // const authState_form_store = useSelector((store) => (store.login.authState))

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
    axios.get(`https://safe-woodland-51614.herokuapp.com/flat?page=${page}&size=${size}`).then(({ data }) => {
      console.log('data:', data)
      dispatch(flatDetails(data.flat))
      dispatch(flatTotalPages(data.totalPage))
    })
  }

  const sort_flatNo_handleOnchange = (e) => {
    // setsortFlatNo(e.target.value)
    let sortValue = e.target.value
    console.log('sortValue:', sortValue)
    setpage(1)
    axios.get(`https://safe-woodland-51614.herokuapp.com/flat/sortBy/${sortValue}?page=${page}&size=${size}`).then(({data}) => {
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
            <th scope="col">Add Resident</th>

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
              <td>
                <Link to={`/addresident/${e._id}`}>
                  <button type="button" className="btn btn-info">Add</button>
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