import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AddFlats from '../AddFlats/AddFlats'
import { authState,loginToken } from '../../Redux/LoginSignUp/action'

const Navbar = () => {

    const authState_from_store = useSelector((store) => store.login.token)
    // console.log('authState_from_storeNavbar:', authState_from_store)
    const dispatch = useDispatch()


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light " >
                <div className="container-fluid">
                    <Link to={'/'} className="navbar-brand">APARTMENT MANAGER</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={'/'} className="nav-link active" aria-current="page" >Home</Link>
                            </li>
                            {authState_from_store ? (
                                <>
                                    {/* <li className="nav-item"> */}
                                        {/* <Link to={'/signUp'} className="nav-link" >SignUp</Link> */}
                                        <button type="button " className="btn btn-secondary p-1" onClick={() => {
                                            dispatch(loginToken(null))
                                            dispatch(authState(false))
                                        }}>Log Out</button>
                                    {/* </li> */}
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link to={'/signUp'} className="nav-link" >SignUp</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/Login'} className="nav-link" >Login</Link>
                                    </li>
                                </>
                            )
                            }
                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider"></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li> */}
                        </ul>
                    </div>
                    {/* <button className="btn btn-outline-success" onClick={() => {

                        dispatch(authState(false))
                        dispatch(loginToken(null))

                    }}>Log Out</button> */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {authState_from_store ? (
                            <li className="nav-item">
                                <Link to={'/addFlats'} className="nav-link">Add Flats</Link>
                            </li>
                        ) : (
                            <li className="nav-item">
                                {/* <Link to={'/addFlats'} className="nav-link">Add Flats</Link> */}
                                Register Yourself To Add Flats
                            </li>)
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar