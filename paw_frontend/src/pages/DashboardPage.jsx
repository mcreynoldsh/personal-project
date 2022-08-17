import UserDashboard from "../components/UserDashboard";
import ProviderDashboard from "../components/ProviderDashboard";
import {Link , useNavigate} from 'react-router-dom'


function DashboardPage({user, isProvider, logOut, pets, bases}){
    let navigate = useNavigate()
    if(!user){
        navigate('/login', {replace:true})
    }

    else if(isProvider){
        return(
            <div>
                <ProviderDashboard user = {user} isProvider = {isProvider} logout= {logOut} bases = {bases}/>
            </div>
        )
    }
    else{
        return(
            <div>
                <UserDashboard user = {user} isProvider = {isProvider} logout= {logOut} pets= {pets} bases = {bases}/>
            </div>
        )
    }
    
}

export default DashboardPage;