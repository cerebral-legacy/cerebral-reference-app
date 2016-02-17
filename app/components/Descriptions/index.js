import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import icons from 'common/icons.css';
import styles from './styles.css';
import elements from 'common/elements.css';
import CodeExampleEditor from '../CodeExampleEditor';

@Cerebral({
  isSavingDescription: 'courses.isSavingDescription',
  descriptions: 'courses.descriptions',
  selectedDescription: 'courses.selectedDescription',
  updatedDescription: 'courses.updatedDescription',
  newDescription: 'courses.newDescription'
})
class Descriptions extends React.Component {
  onSaveDescriptionSubmit(e) {
    e.preventDefault();
    this.props.signals.courses.onSaveDescriptionSubmit();
  }
  onTagnameClick(e) {
    this.props.signals.courses.tagNameClicked({
      description: this.getDescription(e.target.id) || {
        tagName: '',
        description: '',
        exampleType: 'HTML',
        example: ''
      }
    });
  }
  renderDescriptions(descriptions) {
    return descriptions.map((description, index) => {
      return (
        <div
          id={description.tagName}
          className={`${styles.description} ${this.props.selectedDescription === description.tagName ? styles.active : null}`}
          onClick={(e) => this.onTagnameClick(e)}
          key={index + 1}>
          {description.tagName}
        </div>
      );
    });
  }
  getDescription(tagName) {
    return this.props.descriptions.find((description) => {
      return description.tagName === tagName;
    });
  }
  renderCreateDescription() {
    return (
      <div className={styles.column}>
        <form onSubmit={(e) => this.onSaveDescriptionSubmit(e)}>
          <input
            className={`${elements.input} ${styles.input}`}
            value={this.props.newDescription.tagName}
            onChange={(e) => this.props.signals.courses.newDescriptionUpdated.sync({field: 'tagName', value: e.target.value})}
            placeholder="Tag //Eksempel: DIV"
            disabled={this.props.isSavingDescription}
            autoFocus
            required/>
          <textarea
            value={this.props.newDescription.description}
            className={`${elements.textarea} ${styles.descriptionField}`}
            onChange={(e) => this.props.signals.courses.newDescriptionUpdated.sync({field: 'description', value: e.target.value})}
            placeholder="Beskrivelse"
            disabled={this.props.isSavingDescription}
            required></textarea>
          <div className={styles.radioButtonWrapper}>
            <span className={styles.inputHeader}>Eksempel</span>
            <input className={styles.radioButton} type="radio" value="HTML"
              checked={this.props.newDescription.exampleType === 'HTML'}
              onChange={(e) => this.props.signals.courses.radioButtonClicked({field: 'newDescription', value: e.target.value})}/>
            <span className={styles.radioButtonValue}>HTML</span>
            <input className={styles.radioButton} type="radio" value="CSS"
              checked={this.props.newDescription.exampleType === 'CSS'}
              onChange={(e) => this.props.signals.courses.radioButtonClicked({field: 'newDescription', value: e.target.value})}/>
            <span className={styles.radioButtonValue}>CSS</span>
            <input className={styles.radioButton} type="radio" value="JavaScript"
              checked={this.props.newDescription.exampleType === 'JavaScript'}
              onChange={(e) => this.props.signals.courses.radioButtonClicked({field: 'newDescription', value: e.target.value})}/>
            <span className={styles.radioButtonValue}>JavaScript</span>
          </div>
          <CodeExampleEditor
            code={this.props.newDescription.example}
            codeType={this.props.newDescription.exampleType}
            currentDescription={this.props.selectedDescription}
            onCodeChange={(code) => this.props.signals.courses.newDescriptionUpdated.sync({field: 'example', value: code})}/>
          <button
            type="submit"
            className={elements.button}
            disabled={this.props.isSavingDescription}>
            {this.props.isSavingDescription ? <span className={styles.savingIcon + ' ' + icons.loading}></span> : 'Opprett beskrivelse'}
          </button>
        </form>
      </div>
    );
  }
  renderUpdateDescription() {
    return (
      <div className={styles.column}>
        <form onSubmit={(e) => this.onSaveDescriptionSubmit(e)}>
          <div className={styles.tagNameTitle}>{this.props.updatedDescription.tagName}</div>
          <div
            className={`${styles.delete} ${icons.delete}`}
            onClick={() => this.props.signals.courses.deleteDescriptionClicked({tagName: this.props.updatedDescription.tagName})}>
            </div>
          <textarea
            value={this.props.updatedDescription.description}
            className={`${elements.textarea} ${styles.descriptionField}`}
            onChange={(e) => this.props.signals.courses.descriptionUpdated.sync({field: 'description', value: e.target.value})}
            placeholder="Beskrivelse"
            disabled={this.props.isSavingDescription}
            required></textarea>
            <div className={styles.radioButtonWrapper}>
              <span className={styles.inputHeader}>Eksempel</span>
              <input className={styles.radioButton} type="radio" value="HTML"
                checked={this.props.updatedDescription.exampleType === 'HTML'}
                onChange={(e) => this.props.signals.courses.radioButtonClicked({field: 'updatedDescription', value: e.target.value})}/>
              <span className={styles.radioButtonValue}>HTML</span>
              <input className={styles.radioButton} type="radio" value="CSS"
                checked={this.props.updatedDescription.exampleType === 'CSS'}
                onChange={(e) => this.props.signals.courses.radioButtonClicked({field: 'updatedDescription', value: e.target.value})}/>
              <span className={styles.radioButtonValue}>CSS</span>
              <input className={styles.radioButton} type="radio" value="JavaScript"
                checked={this.props.updatedDescription.exampleType === 'JavaScript'}
                onChange={(e) => this.props.signals.courses.radioButtonClicked({field: 'updatedDescription', value: e.target.value})}/>
              <span className={styles.radioButtonValue}>JavaScript</span>
            </div>
            <CodeExampleEditor
              code={this.props.updatedDescription.example}
              codeType={this.props.updatedDescription.exampleType}
              currentDescription={this.props.selectedDescription}
              onCodeChange={(code) => this.props.signals.courses.descriptionUpdated.sync({field: 'example', value: code})}/>
          <button
            type="submit"
            className={elements.button}
            disabled={this.props.isSavingDescription}>
            {this.props.isSavingDescription ? <span className={styles.savingIcon + ' ' + icons.loading}></span> : 'Oppdater beskrivelse'}
          </button>
        </form>
      </div>
    );
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <div id={styles.descriptionsListColumn} className={styles.column}>
          <div
            className={`${styles.description} ${this.props.selectedDescription ? null : styles.active}`}
            onClick={(e) => this.onTagnameClick(e)}
            key="0">
            Ny beskrivelse
          </div>
          {this.renderDescriptions(this.props.descriptions)}
        </div>
        {
          this.props.selectedDescription ?
            this.renderUpdateDescription()
          :
            this.renderCreateDescription()
        }
      </div>
    );
  }
}

export default Descriptions;
