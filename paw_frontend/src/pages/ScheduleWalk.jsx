import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import { subDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

function ScheduleWalk(props) {
    const [startDate, setStartDate] = useState(null);
    const [walker, setWalker] = useState(null)
    const navigate = useNavigate()

    const getWalker = async () => {
        const check_provider = await axios.get('/provider/get')
        let check_walker = check_provider && check_provider.data
        console.log(check_walker)
        setWalker(check_walker)
    }
    const handleSubmit = (event) => { 
        event.preventDefault();
        let petChoice = []
        let date = startDate.toLocaleDateString()
        let time = startDate.toLocaleTimeString()
        console.log(date, time)
        for(let i = 0; i<event.target.length-1;i++){
            if(event.target[i].checked){
                petChoice.push(event.target[i].id)
            }
        }
       axios.post('/schedulewalk',{
           'pets': petChoice,
           'date': date,
           'walker': walker,
           'time':time
       }).then((response) => {
        if(response.data == 'okay'){
            navigate("/")
            window.location.reload()
        }
        else{
            console.log(response)
        }
        })
    }

    useEffect(() => {
        getWalker()
    }, [])
    return (
        <Container>
            <Row className='space justify-content-md-center'>
                <Col md="auto">
                    {walker && <h2>Schedule Walk with {walker.first_name}</h2>}
                </Col>
            </Row>
            <Row className='space justify-content-md-center'>
                <Col md="auto">
                    <p>Choose a Date and Time:</p>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={subDays(new Date(), 0)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Click here to choose"
                    />
                </Col>
            </Row>
            <Row className='justify-content-md-center pt-3'>
                <Col md="auto">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formSelectPets">
                            <Form.Label>Chose Pets: </Form.Label>
                            {props.pets && props.pets.map((pet) => (<Form.Check type="checkbox" label={`${pet.name}`} id={`${pet.id}`} />))}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Schedule
                        </Button>
                    </Form>
                </Col>
            </Row>

        </Container>
    )
}

export default ScheduleWalk