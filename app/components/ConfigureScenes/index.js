import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';
import elements from 'common/elements.css';

@Cerebral()
class ConfigureScenes extends React.Component {
  onNewSceneSubmit(e) {
    e.preventDefault();
    this.props.signals.course.addSceneSubmitted();
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <h4 className={styles.title}>Add scene</h4>
        <form onSubmit={(e) => this.onNewSceneSubmit(e)}>
          <input
            className={elements.input}
            onChange={(e) => this.props.signals.course.newSceneNameChanged({value: e.target.value})}
            placeholder="Type scenename..."/>
        </form>
      </div>
    );
  }
}

export default ConfigureScenes;
