import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';

@Cerebral({
  sessions: 'sessions.sessionsList',
  selectedSession: 'sessions.selectedSession',
  openedSignal: 'sessions.openedSignal',
  user: 'user'
})
class Log extends React.Component {
  constructor() {
    super();
    this.totalSessionTime = 0;
  }
  formatDate(time) {
    const dateObject = new Date(time);
    const minutes = dateObject.getMinutes() >= 10 ? dateObject.getMinutes() : '0' + dateObject.getMinutes();
    const hours = dateObject.getHours() >= 10 ? dateObject.getHours() : '0' + dateObject.getHours();
    const date = dateObject.getDate() >= 10 ? dateObject.getDate() : '0' + dateObject.getDate();
    const month = dateObject.getMonth() + 1 >= 10 ? dateObject.getMonth() + 1 : '0' + (dateObject.getMonth() + 1);
    const year = dateObject.getFullYear();

    return date + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
  }
  renderSessions() {
    return this.props.sessions.map((session, index) => {
      return (
        <option
          key={index}
          value={session.id}>
            {index}: date: {this.formatDate(session.created)} - Signals:{session.signals.length}
        </option>
      );
    });
  }
  renderSignalInputs(inputs) {
    return <pre>{JSON.stringify(inputs, null, 4)}</pre>;
  }
  textToColor(str) {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return '#' + '00000'.substring(0, 6 - c.length) + c;
  }
  renderSignals() {
    let marginTop = 0;
    let previousTimestamp = 0;

    return this.props.selectedSession.signals.map((signal, index) => {
      let timeSinceLastSignal = (signal.timestamp - previousTimestamp) / 1000;
      previousTimestamp = signal.timestamp;

      if (index === 0) {
        timeSinceLastSignal = 0;
      }

      marginTop = timeSinceLastSignal * 10;

      return (
        <div className={styles.timelineEvent} key={index} style={{marginTop: marginTop}}>
          {
            Math.round(timeSinceLastSignal) > 0 ?
              <div>
                <div className={styles.line}></div>
                <div className={styles.timeSinceLastSignal}>
                  {Math.round(timeSinceLastSignal)} sec
                </div>
              </div>
            :
              null
          }

          <div
            className={styles.timelineType}
            style={{backgroundColor: this.textToColor(signal.name)}}>
          </div>
          <div className={styles.timelineName} onClick={(e) => this.toggleSignalInputs(e)} id={index}>
            {signal.name}
            <span className={styles.carret}>&#9660;</span>
            {this.props.openedSignal === index.toString() ? this.renderSignalInputs(signal.input) : null}
          </div>
        </div>
      );
    });
  }
  getTotalSessionTime(signals) {
    const firstTimestamp = signals[0].timestamp;
    const lastTimestamp = signals[signals.length - 1].timestamp;

    return (lastTimestamp - firstTimestamp) / 1000;
  }
  toggleSignalInputs(e) {
    this.props.signals.sessions.sessionSignalClicked({
      index: this.props.openedSignal === e.currentTarget.id ? null : e.currentTarget.id
    });
  }
  renderSelectedSession() {
    return (
      <div>
        <div className={styles.user}>
          <div><b>{this.props.selectedSession.userId}</b></div>
          Total sessiontime: <b>{this.getTotalSessionTime(this.props.selectedSession.signals)} sec</b>
        </div>
        {this.renderSignals()}
      </div>
    );
  }
  changedSession() {
    const selectedIndex = this.refs.sessions.selectedIndex;

    this.props.signals.sessions.sessionSelected({
      session: this.props.sessions[selectedIndex]
    });
  }
  render() {
    return (
      this.props.user.isAdmin ?
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h1>User sessions</h1>
            <select ref="sessions" onChange={() => this.changedSession()}>
              {this.renderSessions()}
            </select>
          </div>
          <div className={styles.timelineWrapper}>
            {this.props.selectedSession ? this.renderSelectedSession() : null}
          </div>

        </div>
      :
        null
    );
  }
}

export default Log;
