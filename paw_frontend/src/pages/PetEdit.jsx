import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'

function PetEdit() {
    let { petID } = useParams()
    const [pet, setPet] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate()

    const getPetByID = async () => {
        let response = await axios.get(`/pet/${petID}`)
        let check_pet = response && response.data
        setPet(check_pet)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        for (let i = 0; i < 4; i++) {
            if (event.target[i].value == "") {
                setErrorMessage(`Must enter a ${event.target[i].type}!!`)
                return
            }
        }

        axios.put(`/pet/${petID}`, {
            'name': event.target[0].value,
            'species': event.target[1].value,
            'weight': event.target[2].value,
            'age': event.target[3].value,
            'id': petID
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

    useEffect(() => {
        getPetByID()
    }, [])

    return (
        <Container>
            <Row className='space justify-content-md-center'>
                <Col md="auto">
                    <h2>Edit Pet:</h2>
                </Col>
            </Row>
            <Row className='space'>
                <Col></Col>
                <Col>
                    {pet && <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formPetName">
                            <Form.Label>Pet Name</Form.Label>
                            <Form.Control type="name" defaultValue={pet.name} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formSpecies">
                            <Form.Label>Species</Form.Label>
                            <Form.Control type="species" defaultValue={pet.species} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPetWeight">
                            <Form.Label>Weight</Form.Label>
                            <Form.Control type="weight" defaultValue={pet.weight} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPetAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="age" defaultValue={pet.age} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update Pet
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


export default PetEdit