import React from 'react';
import moment from 'moment';
import axios from 'axios';

export default class Countdown extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      days:    0,
      hours:   0,
      minutes: 0,
      seconds: 0,
      updates: 0
    };
    this.countdownHandle = setInterval(() => {this.tick()}, 250);
  }

  tick(){
    var d = moment.duration(moment(this.props.event) - moment());
    var remaining = Math.floor(d.asSeconds());
    // send every 10s a request to the server for later logging
    if(this.state.updates != 0 && this.state.updates % 40 == 0){
      this.analytic();
    }
    if(remaining <= 100){
      document.title = 'Syndesi ☄️ '+remaining;
    }
    // reload the page when the countdown is finished
    if(remaining <= 1){
      this.reload();
    }
    // update the internal data so that the UI can be updated
    this.setState({
      days:    String(Math.floor(d.asDays())).padStart(2, '0'),
      hours:   String(d.hours()).padStart(2, '0'),
      minutes: String(d.minutes()).padStart(2, '0'),
      seconds: String(d.seconds()).padStart(2, '0'),
      updates: this.state.updates + 1
    });
  }

  reload(){
    location.reload(true);
  }

  analytic(){
    axios.get('/analytic?screenX='+screen.width+'&screenY='+screen.height)
    .then((res) => {})
    .catch((e) => {});
  }

  render(){
    return (
      <div>
        <div class="content">
          <p class="title">Expected launch in:</p>
          <div class="countdown">
            <div class="timeElement">
              <p>
                <span class="value">{this.state.days}</span><br/>
                <span class="label">D</span>
              </p>
            </div>
            <div class="timeElement">
              <p>
                <span class="value">{this.state.hours}</span><br/>
                <span class="label">H</span>
              </p>
            </div>
            <div class="timeElement">
              <p>
                <span class="value">{this.state.minutes}</span><br/>
                <span class="label">M</span>
              </p>
            </div>
            <div class="timeElement">
              <p>
                <span class="value">{this.state.seconds}</span><br/>
                <span class="label">S</span>
              </p>
            </div>
          </div>
        </div>
        <div class="footer">
          <a target="_blank" href="https://github.com/Syndesi">GitHub</a>
          <a target="_blank" href="mailto:soerenklein98@gmail.com">Contact</a>
        </div>
      </div>
    );
  }
}

Countdown.defaultProps = {
  event: '2019-06-01T00:00:00+01:00'
};