import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';

@Cerebral()
class ToolbarButton extends React.Component {
  constructor() {
    super();
  }
  onClick(e) {
    if (this.props.stopPropagation || this.props.stopPropagation === undefined) {
      e.stopPropagation();
    }

    this.props.signals.course.buttonPopoverClicked({
      mousePositionX: e.clientX,
      mousePositionY: e.clientY
    });

    this.props.onClick && this.props.onClick();
  }
  renderTextButton() {
    return (
      <span className={styles.title}>
        {this.props.title}
        <span className={this.props.active ? styles.activeCaret : styles.caret}>&#8250;</span>
      </span>
    );
  }
  renderIconTextButton() {
    return (
      <div className={styles.iconTitleWrapper}>
        {this.renderIconButton()}
        <div className={styles.iconTitle}>{this.props.title}</div>
      </div>
    );
  }
  renderIconButton() {
    return (
      <div className={this.props.active ? styles.activeIcon : this.props.disabled ? styles.disabledIcon : styles.icon}>
        <div className={this.props.icon}></div>
      </div>
    );
  }
  render() {
    return (
      <button className={styles.button} onClick={(e) => this.onClick(e)} disabled={this.props.disabled}>
        { this.props.title && !this.props.icon ? this.renderTextButton() : null }
        { this.props.title && this.props.icon ? this.renderIconTextButton() : null }
        { !this.props.title && this.props.icon ? this.renderIconButton() : null }
      </button>
    );
  }
}

export default ToolbarButton;
