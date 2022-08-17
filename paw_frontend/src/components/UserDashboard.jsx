import { Container, Row, Col, Button } from 'react-bootstrap'
import { useEffect, useState } from "react";
import axios from 'axios';

function UserDashboard({ user, pets, bases }) {
    const [walker, setWalker] = useState(null)
    const [walks, setWalks] = useState(null)
    const [completedWalks, setCompletedWalks] = useState(null)

    const getWalker = async () => {
        const check_provider = await axios.get('/provider/get')
        let check_walker = check_provider && check_provider.data
        setWalker(check_walker)
    }

    const getPetWalks = async () => {
        const check_walks = await axios.get('/getpetwalks')
        let upcoming_walks = check_walks && check_walks.data
        setWalks(upcoming_walks)
    }

    const getCompletedWalks = async () => {
        const check_walks = await axios.get('/getcompletedwalks')
        let completed_walks = check_walks && check_walks.data
        setCompletedWalks(completed_walks)
    }

    useEffect(() => {
        getWalker().then(getPetWalks()).then(getCompletedWalks)
    }, [])

    return (
        <Container>
            <Row className='space'>
                <Col></Col>
                <Col>
                    {user && <div><h2>{user.first_name}'s Dashboard</h2><a href={`#/user/${user.id}/view`}>View Profile</a></div>}
                </Col>
                <Col></Col>
            </Row>
            <Row className='pt-5'>
                <Col><h4>Your Pets:</h4>
                    <hr />
                    {pets && pets.map((pet) => (<div className='same-line-div'><h5>{pet.species}: {pet.name} -</h5> <a href={`#/pet/${pet.id}/view`}>View Details</a></div>))}
                    <Button variant="primary" href='/#/addpet'>
                        Add Pet
                    </Button>
                </Col>
                <Col>
                    <h4>Your Bases:</h4>
                    <hr />
                    {bases && bases.map((base) => (<h5>{base}</h5>))}
                    <Button variant="primary" href='/#/addbase'>
                        Connect A Base
                    </Button>
                </Col>
                <Col>
                    <h4>Your Pet Pal:</h4>
                    <hr />
                    {walker && <h5>{walker.first_name} {walker.last_name}</h5>}
                    {user && walker && <a className='new-line' href={`/#/chat/${walker.id}`}>Message</a>}
                    {walker && <a className='new-line' href='/#/schedulewalk'>Schedule Walk</a>}
                    <Button variant="primary" href='/#/connectpal'>Connect A PetPal</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr/>
                    <h4>Upcoming Walks:</h4>
                    <hr />
                    {walks && walks.map((walk) => (<div><h5>{walk.pets.map((pet) => (<span>{pet} </span>))}</h5>
                        <p>Date: {walk.date}</p>
                        <p>Time: {walk.time}</p>
                        <p>With {walker.first_name}</p>
                        <hr />
                    </div>))}
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>Completed Walks:</h4>
                    <hr />
                    {completedWalks && completedWalks.map((walk) => (<div><h5>{walk.pets.map((pet) => (<span>{pet} </span>))}</h5>
                        <p>Date: {walk.date}</p>
                        <p>Time Walked (hrs:mins:secs): {walk.time}</p>
                        <p>With {walker.first_name}</p>
                        <a href={`#/walk/${walk.id}/view`}>View Details</a>
                        <hr />
                    </div>))}
                </Col>
            </Row>
        </Container>
    )
}

export default UserDashboard;