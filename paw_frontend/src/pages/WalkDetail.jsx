import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'

function WalkDetail() {
    let { walkID } = useParams()
    const [walk, setWalk] = useState(null)

    const getWalkByID = async () => {
        let response = await axios.get(`/getwalk/${walkID}`)
        let check_walk = response && response.data
        setWalk(check_walk)
    }

    useEffect(() => {
        getWalkByID()
    }, [])

    return (
        <Container>
            <Row>
                <Col className="space">
                    <h4>Walk Detail:</h4>
                    <hr />
                    {walk && <div><h5>Pets: {walk.pets.map((pet) => (<span>{pet} </span>))}</h5>
                        <p>Walker: {walk.walker}</p>
                        <p>Date: {walk.date}</p>
                        <p>Time Walked (hrs:mins:secs): {walk.time}</p>
                        <p>Distance Walked: {walk.walk_length}</p>
                        <p>Notes: {walk.notes}</p>
                        <hr />
                    </div>}
                </Col>
            </Row>
            <a href="#/">Go back</a>
        </Container>
    )
}

export default WalkDetail