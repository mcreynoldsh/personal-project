import {Link , useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
 


function HomePage ({user}){
    let navigate = useNavigate()
    if(!user){
        navigate('/login', {replace:true})
    }

    return (
        <div>
            <h1>HomePage</h1>
            <Link className='nav-link' to={'/signup'}>sign up</Link>
            <Link className='nav-link' to={'/login'}>log in</Link>
            <Link className='nav-link' to={'/dashboard'}>dashboard</Link>
        </div>
    )
}

export default HomePage