import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function WalkForm(props) {
    let walkTime = props.time
    let navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        for (let i = 0; i < 2; i++) {
            if (event.target[i].value == "") {
                props.setErrorMessage(`Must enter a ${event.target[i].placeholder}!!`)
                return
            }
        }

        axios.put('/completewalk', {
            'walk_id': props.walkID,
            'walk_length': event.target[0].value,
            'notes': event.target[1].value,
            'walk_time': event.target[2].placeholder,
        }).then((response) => {
            if (response.data == 'success') {
                navigate("/", { replace: true })
            }
            else {
                props.setErrorMessage(`${response.data}`)
            }
        })
    }

    return (
        <Form className = "space" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formWalkLength">
                <Form.Label>Walk Length:</Form.Label>
                <Form.Control type="Walk Length" placeholder="Walk Length" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNotes">
                <Form.Label>Notes:</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Walk Time:</Form.Label>
                <Form.Control type="text" placeholder={`${walkTime}`} readOnly />
            </Form.Group>
            <Button className = "m-2" variant="primary" type="submit">
                Submit Walk
            </Button>
        </Form>
    )
}

export default WalkForm;