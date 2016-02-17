import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import ToolbarButton from 'common/components/ToolbarButton';
import classNames from 'classnames';
import styles from './styles.css';

@Cerebral()
class ToolbarButtonPopover extends React.Component {
  onArrowBoxClick(e) {
    e.stopPropagation();
    this.props.signals.course.buttonPopoverClicked({
      mousePositionX: e.clientX,
      mousePositionY: e.clientY
    });
  }
  renderBox() {
    return (
      <div
        className={this.props.side === 'right' ? styles.arrowBoxRight : styles.arrowBox}
        onClick={(e) => this.onArrowBoxClick(e)}>
        <div className={styles.contentBox}>
          {this.props.children}
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className={classNames(styles.wrapper, {[this.props.className]: this.props.className})}>
        <ToolbarButton
          active={this.props.show}
          icon={this.props.icon}
          title={this.props.title}
          onClick={this.props.onClick}/>
        {this.props.show ? this.renderBox() : null}
      </div>
    );
  }
}

export default ToolbarButtonPopover;
