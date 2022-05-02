import React from 'react'
import { useNavigate } from 'react-router-dom'
import image_notFound from './notFoundImage.jpg'

const NotFound = () => {

    const navigate = useNavigate()

    return (
        <div>
            {/* <h1>Error Page Not Found</h1> */}
            {/* <img src="https://kicksdigitalmarketing.com/wp-content/uploads/2019/09/iStock-1142986365.jpg" alt="Error Page Not Found" width={'50%'} /> */}
            <img src={image_notFound} alt="Error Page Not Found" width={'50%'} /><br/><br />
            <button type="button" class="btn btn-primary" onClick={() => {
                navigate('/')
            }}>Go To Home Page</button>
        </div>
    )
}

export default NotFound