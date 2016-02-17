import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';
import isAdminMode from 'modules/course/computed/isAdminMode';
import classNames from 'classnames';

@Cerebral({
  url: 'course.previewUrl',
  isAdminMode: isAdminMode
})
class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.onSandboxMessage = this.onSandboxMessage.bind(this);
  }
  componentDidMount() {
    console.log(this.props.url);
    this.refs.preview.src = this.props.url;
    window.addEventListener('message', this.onSandboxMessage);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.refs.preview.src = this.props.url;
    }
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.onSandboxMessage);
  }
  onSandboxMessage(event) {
    if (event.data.signal) {
      this.props.signals.course[event.data.signal](event.data.payload);
    }
  }
  render() {
    return (
      <div className={classNames(styles.wrapper, {[styles.fullSize]: this.props.fullSize})}>
        <iframe id="previewIframe" ref="preview" className={styles.preview} src="about:blank"/>
      </div>
    );
  }
}

export default Preview;
