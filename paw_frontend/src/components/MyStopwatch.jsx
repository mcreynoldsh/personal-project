import React from 'react';
import { useStopwatch } from 'react-timer-hook';
import { Button } from 'react-bootstrap'

function MyStopwatch(props) {
  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
  } = useStopwatch({ autoStart: false });

  const endWalk = (event) => {
    event.preventDefault()
    pause()
    props.setTime(`${hours}:${minutes}:${seconds}`)
    props.setEnd(true)
  }

  const beginWalk = (event) => {
    event.preventDefault()
    start()
    props.setEnd(false)
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <p>Walk Timer</p>
      <div style={{ fontSize: '100px' }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Walking' : 'Walking Paused'}</p>
      <Button variant='primary' size='sm' onClick={beginWalk}>Begin Walk</Button>
      <Button variant='secondary' size='sm' onClick={pause}>Pause Walk</Button>
      <Button variant='danger' size='sm' onClick={endWalk}>End Walk</Button>
    </div>
  );
}

export default MyStopwatch;