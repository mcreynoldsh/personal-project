import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function ProfilePage(props) {

    return (
        <Container>
            <Row>
                <Col className="space">
                    <h4>User Profile:</h4>
                    <hr />
                    {props.user && <div><p>Name: {props.user.first_name} {props.user.last_name}</p>
                        <p>Email: {props.user.email}</p>
                        <p>Address: {props.user.address}</p>
                        <p>Zip Code: {props.user.zip_code}</p>
                        <p>Bio: {props.user.bio}</p>
                        {props.user.is_provider && <p>Rate: {props.user.rate} per walk</p>}
                        <hr />
                        <a href={`#/user/${props.user.id}/edit`}>Edit Profile</a>
                    </div>}
                </Col>
            </Row>
            <a href="/">Go back</a>
        </Container>
    )
}

export default ProfilePage