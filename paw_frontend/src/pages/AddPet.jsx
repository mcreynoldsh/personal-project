import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import '../App.css'

function AddPet ({user}){
    const [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate()
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target[0].value)
        console.log(event.target[1].value)

        axios.post('/addpet', {
          'name': event.target[0].value,
          'species':event.target[1].value,
          'weight': event.target[2].value,
          'age':event.target[3].value,
          'owner': user.email
        }).then((response) => {
            if(response.data.data == 'success'){
                navigate("/", {replace:true})
                window.location.reload()
            }
            else{
                setErrorMessage(response.data.data)
            }
        })
    
    }


    return (
    <Container>
        <Row className='space justify-content-md-center'>
            <Col md="auto">
                <h2>Add Pet</h2>
            </Col>
        </Row>
        <Row className='space'>
            <Col></Col>
            <Col>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formPetName">
                    <Form.Label>Pet Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter Pet Name" />
                    </Form.Group>
            
                    <Form.Group className="mb-3" controlId="formSpecies">
                    <Form.Label>Species</Form.Label>
                    <Form.Control type="species" placeholder="Dog/Cat/Pig" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPetWeight">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control type="weight" placeholder="Enter Pet Weight" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPetAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="age" placeholder="Enter Pet Age" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        AddPet
                    </Button>
                </Form>
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

export default AddPet