import UserDashboard from "../components/UserDashboard";
import ProviderDashboard from "../components/ProviderDashboard";
import LoadingSpinner from "../components/LoadingSpinner";


function DashboardPage({ user, isProvider, logOut, pets, bases }) {
    if (!user) {
        return (
            <div>
                <LoadingSpinner />
            </div>
        )

    }
    else if (isProvider) {
        return (
            <div>
                <ProviderDashboard user={user} bases={bases} />
            </div>
        )
    }
    else {
        return (
            <div>
                <UserDashboard user={user} pets={pets} bases={bases} />
            </div>
        )
    }

}

export default DashboardPage;