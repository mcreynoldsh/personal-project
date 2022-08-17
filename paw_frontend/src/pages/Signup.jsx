import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Container, Row, Col} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import '../App.css'

function Signup (){
    const [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate()
    
    
    const handleSubmit = (event) => {
        
        event.preventDefault();
        
        for(let i = 0; i < 6 ; i++){
            if(event.target[i].value == ""){
                setErrorMessage(`Must enter a ${event.target[i].placeholder}!!`)
                return
            }
        }
        
        if(event.target[6].value == "Choose your Role"){
            setErrorMessage('Must choose a Role!!!')
            return
        }

        axios.post('/signup', {
            'email': event.target[0].value,
            'firstName':event.target[1].value,
            'lastName': event.target[2].value,
            'address': event.target[3].value,
            'zip': event.target[4].value,
            'password': event.target[5].value,
            'role': event.target[6].value,
          }).then((response) => {
              if(response.data.data == 'success'){
                navigate("/login", {replace:true})
              }
              else{
                  setErrorMessage(`${response.data.data}`)
              }
          })
      }

      const login = (event) => {
          event.preventDefault()
          navigate("/login", {replace:true})
      }

    return (
        <Container>
        <Row className='space justify-content-md-center'>
            <Col md="auto">
                <h2>Sign Up</h2>
            </Col>
        </Row>
        <Row className='space'>
            <Col></Col>
            <Col>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="Email" placeholder="Email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="First Name" placeholder="First Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="Last Name" placeholder="Last Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="Address" placeholder="Address" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formZip">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control type="Zip Code" placeholder="Zip Code" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Select aria-label="Choose Role">
                        <option>Choose your Role</option>
                        <option value="User">User (I want my pets taken care of)</option>
                        <option value="Pet Care Provider">Pet Care Provider (I want to take care of other's pets)</option>
                    </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Form>
            </Col>
            <Col></Col>
        </Row>
        <Row className='pt-2'>
            <Col></Col>
            <Col>
                <Button variant="secondary" type="submit" onClick={login}>
                        Log In
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

export default Signup