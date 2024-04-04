// Write your code here

import {Component} from 'react'
import './index.css'

const initialState = {
  elapsedTimerSeconds: 0,
  initialTimerMinutes: 25,
  isTimerIsRunning: false,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount = () => {
    this.clearIntervalTimer()
  }

  clearIntervalTimer = () => clearInterval(this.intervalId)

  incrementTimeElapsed = () => {
    const {elapsedTimerSeconds, initialTimerMinutes} = this.state

    const isTimerEnd = elapsedTimerSeconds === initialTimerMinutes * 60

    if (isTimerEnd) {
      this.clearIntervalTimer()
      this.setState({elapsedTimerSeconds: 0})
    } else {
      this.setState(prevState => ({
        elapsedTimerSeconds: prevState.elapsedTimerSeconds + 1,
      }))
    }
  }

  OnResetOrPause = () => {
    const {isTimerIsRunning, elapsedTimerSeconds, initialTimerMinutes} =
      this.state

    const isTimerCompleted = elapsedTimerSeconds === initialTimerMinutes * 60

    if (isTimerCompleted) {
      this.setState({elapsedTimerSeconds: 0})
    }
    if (isTimerIsRunning) {
      this.clearIntervalTimer()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsed, 1000)
    }
    this.setState(prevState => ({
      isTimerIsRunning: !prevState.isTimerIsRunning,
    }))
  }

  resetTimer = () => {
    this.setState({elapsedTimerSeconds: 0})
  }

  getTimerResetButtons = () => {
    const {isTimerIsRunning} = this.state

    const timerToggledImg = isTimerIsRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const imgAltText = isTimerIsRunning ? 'pause icon' : 'play icon'
    const text = isTimerIsRunning ? 'Pause' : 'Start'

    return (
      <div className="toggleTimer">
        <div className="button-label-container">
          <button
            type="button"
            className="button"
            onClick={this.OnResetOrPause}
          >
            <img src={timerToggledImg} alt={imgAltText} className="icon" />
          </button>
          <p className="text">{text}</p>
        </div>
        <div className="button-label-container">
          <button type="button" className="button" onClick={this.resetTimer}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              alt="reset icon"
              className="icon"
            />
          </button>
          <p className="text">Reset</p>
        </div>
      </div>
    )
  }

  getElapsedTimerInSeconds = () => {
    const {elapsedTimerSeconds, initialTimerMinutes} = this.state
    const totalTimeInSec = initialTimerMinutes * 60 - elapsedTimerSeconds
    const minutes = Math.floor(totalTimeInSec / 60)
    const seconds = Math.floor(totalTimeInSec % 60)

    const minResult = minutes > 9 ? minutes : `0${minutes}`
    const secResult = seconds > 9 ? seconds : `0${seconds}`

    return `${minResult}:${secResult}`
  }

  decrementTimer = () => {
    const {initialTimerMinutes} = this.state

    if (initialTimerMinutes > 1) {
      this.setState(prevState => ({
        initialTimerMinutes: prevState.initialTimerMinutes - 1,
      }))
    }
  }

  incrementTimer = () => {
    const {elapsedTimerSeconds, initialTimerMinutes} = this.state

    const isTrue = elapsedTimerSeconds === initialTimerMinutes * 60

    if (isTrue) {
      this.clearIntervalTimer()
      this.setState({isTimerIsRunning: false})
    } else {
      this.setState(prevState => ({
        initialTimerMinutes: prevState.initialTimerMinutes + 1,
      }))
    }
  }

  getsetTimerButton = () => {
    const {initialTimerMinutes} = this.state

    return (
      <div className="set-limit-container">
        <p>Set Timer Limit</p>
        <div className="increment-container">
          <button
            type="button"
            className="increment"
            onClick={this.decrementTimer}
          >
            -
          </button>
          <p className="set-timer">{initialTimerMinutes}</p>
          <button
            type="button"
            className="increment"
            onClick={this.incrementTimer}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {isTimerIsRunning} = this.state
    const textLabel = isTimerIsRunning ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <h1 className="title">Digital Timer</h1>
        <div className="content-container">
          <div className="timer-container">
            <div className="timer-sec-container">
              <h1 className="sec-title">{this.getElapsedTimerInSeconds()}</h1>
              <p className="sec-label">{textLabel}</p>
            </div>
          </div>
          <div className="timer-reset-container">
            {this.getTimerResetButtons()}
            {this.getsetTimerButton()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
