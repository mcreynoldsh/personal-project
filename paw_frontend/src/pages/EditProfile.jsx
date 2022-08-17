import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'

function EditProfile(props) {
    const [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        let rate = ""
        for (let i = 0; i < 5; i++) {
            if (event.target[i].value == "") {
                setErrorMessage(`Must enter a ${event.target[i].type}!!`)
                return
            }
        }

        if (props.user.is_provider) {
            rate = event.target[6].value
        }

        axios.put(`/user/${props.user.id}`, {
            'email': event.target[0].value,
            'firstName': event.target[1].value,
            'lastName': event.target[2].value,
            'address': event.target[3].value,
            'zip':event.target[4].value,
            'bio': event.target[5].value,
            'rate': rate

        }).then((response) => {
            if (response.data == 'success') {
                navigate("/", { replace: true })
                window.location.reload()
            }
            else {
                setErrorMessage(response.data)
            }
        })

    }

    return (
        <Container>
            <Row className='space justify-content-md-center'>
                <Col md="auto">
                    <h2>Edit Profile:</h2>
                </Col>
            </Row>
            <Row className='space'>
                <Col></Col>
                <Col>
                    {props.user && <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="Email" defaultValue={props.user.email} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="First Name" defaultValue={props.user.first_name} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="Last Name" defaultValue={props.user.last_name} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="Address" defaultValue={props.user.address} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formZip">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control type="Zip Code" placeholder="Zip Code" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBio">
                            <Form.Label>Bio:</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue={props.user.bio} />
                        </Form.Group>
                        {props.user && props.user.is_provider && <Form.Group className="mb-3" controlId="formRate">
                            <Form.Label>Rate per walk:</Form.Label>
                            <Form.Control type="Rate" defaultValue={props.user.rate} />
                        </Form.Group>}
                        <Button variant="primary" type="submit">
                            Submit changes
                        </Button>
                    </Form>}
                </Col>
                <Col></Col>
            </Row>
            <Row className='pt-2'>
                <Col></Col>
                <Col>
                    <Button variant="primary" href='/'>
                        Dashboard
                    </Button>
                </Col>
                <Col></Col>
            </Row>
            <Row className='pt-2'>
                <Col></Col>
                <Col>
                    <div id='messageDiv'>
                        {errorMessage}
                    </div>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}

export default EditProfile