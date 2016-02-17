import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';
import DescriptionToolTip from '../DescriptionToolTip';
import elements from 'common/elements.css';

@Cerebral({
  descriptions: ['descriptions', 'list'],
  googleInput: 'mainAssignment.googleInput'
})
class DescriptionsList extends React.Component {
  constructor() {
    super();
  }
  renderDescriptions() {
    return this.props.descriptions.map((description, index) => {
      return <DescriptionToolTip key={index}>{description}</DescriptionToolTip>;
    });
  }
  onGoogleSearchSubmit(e) {
    e.preventDefault();
    this.props.signals.mainAssignment.googleSearchSubmitted();
  }
  render() {
    return (
      <div className={styles.wrapper} id="descriptions">
        <h1 className={styles.header}>Søk på google</h1>
        <form onSubmit={(e) => this.onGoogleSearchSubmit(e)}>
          <input
            value={this.props.googleInput}
            placeholder="Søketekst"
            className={`${elements.input} ${styles.googleInput}`}
            onChange={(e) => {
              this.props.signals.mainAssignment.googleInputChanged({value: e.target.value});
            }}/>
          <button type="submit" className={`${elements.button} ${styles.googleSearchButton}`}>
            Søk
          </button>
        </form>
        <h1 className={styles.header}>Beskrivelser</h1>
        <div className={styles.descriptionWrapper}>
          {this.renderDescriptions()}
        </div>
      </div>
    );
  }
}

export default DescriptionsList;
