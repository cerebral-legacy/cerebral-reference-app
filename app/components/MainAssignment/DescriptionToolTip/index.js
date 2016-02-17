import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import CodeExample from 'components/CodeExample';
import styles from './styles.css';

@Cerebral({
  descriptions: 'descriptions.list',
  tooltipTimeout: 'course.tooltip.timeout',
  visibleTooltip: 'course.tooltip.visible'
})
class DescriptionToolTip extends React.Component {
  constructor(props) {
    super(props);
  }
  positionTooltipWrapper(e, description) {
    const tooltipWrapper = this.refs[description];
    const marginToDescriptionName = 5;
    const defaultMarginTop = -45;
    tooltipWrapper.style.marginLeft = (e.target.offsetWidth + marginToDescriptionName) + 'px';
    tooltipWrapper.style.marginTop = (-Math.abs(document.getElementById('descriptions').scrollTop) + defaultMarginTop) + 'px';
  }
  onTagNameMouseOver(e, description) {
    this.positionTooltipWrapper(e, description);
    this.props.signals.course.tagNameMouseOver({
      timeout: setTimeout(() => {
        this.props.signals.course.descriptionHovered({
          tooltip: description
        });
      }, 200)
    });
  }
  onTagNameMouseOut() {
    clearTimeout(this.props.tooltipTimeout);
    this.props.signals.course.tagNameMouseOut();
  }
  getDescription(descriptionWord) {
    return this.props.descriptions.find((description) => {
      return description.tagName === descriptionWord;
    });
  }
  renderDescriptionWord(description, index) {
    return (
      <span key={index} className={styles.descriptionWordWrapper}>
        <span ref={description.tagName} className={this.props.visibleTooltip === description.tagName ? styles.tooltipWrapper : styles.hide}>
          <b className={styles.tooltipHeader}>{description.tagName}</b>
          <p>{description.description}</p>
          <div className={styles.codeWrapper}>
            <CodeExample description={description}/>
          </div>
        </span>
        <span
          className={styles.tagName}
          onMouseOver={(e) => this.onTagNameMouseOver(e, description.tagName)}
          onMouseOut={() => this.onTagNameMouseOut()}>{description.tagName}</span>
      </span>
    );
  }
  render() {
    const description = this.renderDescriptionWord(this.props.children);

    return (
      <div className={styles.wrapper}>{description}</div>
    );
  }
}

export default DescriptionToolTip;
