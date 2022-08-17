import axios from 'axios';
import { useEffect, useState } from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import CurrentWeather from './CurrentWeather';

function ProviderDashboard({user, isProvider, logOut,bases}){
    const [connections, setConnections] = useState(null)
    const [walks, setWalks] = useState(null)

    const getConnections = async () => {
        const response = await axios.get('/checkconnections')
        let  checkConnects = response && response.data
        setConnections(checkConnects)
    }

    const getProviderWalks = async () => {
        const checkWalks = await axios.get('/getproviderwalks')
        let upcomingWalks = checkWalks && checkWalks.data
        setWalks(upcomingWalks)   
    }

    useEffect(()=>{
        getConnections().then(getProviderWalks())
    },[])
    return(
        <Container>
            <Row className='space'>
                <Col></Col>
                <Col>
                    {user && <div className='text-center'><h2>{user.first_name}'s Dashboard</h2><a href={`#/user/${user.id}/view`}>View Profile</a></div>}
                </Col>
                <Col>
                    {user && <CurrentWeather user = {user}/>}
                </Col>
            </Row>
            <Row className='space'>
                <Col>
                    <h4>Upcoming Walks:</h4>
                    <hr/>
                    {walks && walks.map((walk)=>(<div><h5>{walk.pets.map((pet)=>(<span>{pet} </span>))}</h5>
                                                <p>Date: {walk.date}</p>
                                                <p>Time: {walk.time}</p>
                                                <Button href={`/#/walk/${walk.id}`} variant="outline-primary" size='sm'>Begin Walk</Button>
                                                <hr/> 
                                                </div>))}
                </Col>
                <Col>
                    <h4>Your Bases:</h4>
                    <hr/>
                    {bases && bases.map((base)=>(<h5>{base}</h5>))}
                    <Button variant="primary" href='/#/addbase'>
                        Connect A Base
                    </Button>
                </Col>
                <Col>
                    <h4>Your Connections:</h4>
                    <hr/>
                    {connections && connections.map((connection)=>(<div><h5>{connection.first_name} {connection.last_name}</h5> <p>Email: {connection.email} | Address: {connection.address}</p> <a className='new-line' href= {`/#/chat/${connection.id}`}>Message</a> <hr/> </div>))}
                </Col>
            </Row>
        </Container>
    )
}

export default ProviderDashboard;