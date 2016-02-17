import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import CodeExample from '../CodeExample';
import styles from './styles.css';

@Cerebral({
  descriptions: 'descriptions.list',
  tooltipTimeout: 'course.tooltip.timeout',
  visibleTooltip: 'course.tooltip.visible'
})
class AssignmentDescription extends React.Component {
  constructor(props) {
    super(props);
  }
  positionTooltipWrapper(e, description) {
    const tooltipWrapper = this.refs[description];
    const marginToDescriptionName = 5;
    const defaultMarginTop = -45;
    tooltipWrapper.style.marginLeft = (e.target.offsetWidth + marginToDescriptionName) + 'px';
    tooltipWrapper.style.marginTop = (-Math.abs(document.getElementById('taskWrapper').scrollTop) + defaultMarginTop) + 'px';
  }
  onTagNameMouseOver(e, description, id) {
    this.positionTooltipWrapper(e, description);
    this.props.signals.course.tagNameMouseOver({
      timeout: setTimeout(() => {
        this.props.signals.course.descriptionHovered({
          tooltip: description + id
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
  replaceTagsWithDescriptions(text, id) {
    let tags = text.match(/\$\{(.*?)\}/g) || [];
    tags = tags.map((tag, index) => {
      return {
        tag: tag,
        id: id + ' ' + index
      };
    });
    let currentTagIndex = 0;

    const textWithReplacedTags = text.replace(/\$\{(.*?)\}/g, () => {
      return '§?§';
    }).split(' ');

    return textWithReplacedTags.map((word, index) => {
      const isReplacedTag = word.indexOf('§?§') >= 0;
      const contentBeforeTag = word.split('§?§')[0];
      const contentAfterTag = word.split('§?§')[1];
      const tag = tags[currentTagIndex] && tags[currentTagIndex].tag;
      const tagId = tags[currentTagIndex] && tags[currentTagIndex].id;

      if (isReplacedTag && tag) {
        const tagContent = tag.substr(2, tag.length - 3);
        const description = this.getDescription(tagContent);
        const isUrl = tagContent.split(':').length > 1;
        currentTagIndex++;

        if (isUrl) {
          return this.renderURL(tagContent, index, contentBeforeTag, contentAfterTag);
        } else if (description) {
          return this.renderDescriptionWord(description, index, tagId, contentBeforeTag, contentAfterTag);
        }
      }

      return ' ' + word + ' ';
    });
  }
  renderDescriptionWord(description, index, id, contentBeforeTag, contentAfterTag) {
    return (
      <span key={index}>
        <span>{contentBeforeTag}</span>
        <span>
          <span ref={description.tagName} className={this.props.visibleTooltip === description.tagName + id ? styles.tooltipWrapper : styles.hide}>
            <b className={styles.tooltipHeader}>{description.tagName}</b>
            <p>{description.description}</p>
            <div className={styles.codeWrapper}>
              <CodeExample description={description}/>
            </div>
          </span>
          <span
            className={styles.tagName}
            onMouseOver={(e) => this.onTagNameMouseOver(e, description.tagName, id)}
            onMouseOut={() => this.onTagNameMouseOut()}>{description.tagName.toLowerCase()}</span>
          </span>
          <span>{contentAfterTag}</span>
      </span>
    );
  }
  renderURL(tagContent, index, contentBeforeTag, contentAfterTag) {
    const url = 'http' + tagContent.split('http')[1]; // Cannot split on ':' due to URL containing ':'
    const text = tagContent.split(':')[1];

    return (
      <span>
        <span>{contentBeforeTag}</span>
        <a className={styles.url} href={url} key={index} target="_blank">{text}</a>
        <span>{contentAfterTag}</span>
      </span>
    );
  }
  render() {
    const description = this.replaceTagsWithDescriptions(this.props.children, this.props.id);

    return (
      <span>{description}</span>
    );
  }
}

export default AssignmentDescription;
