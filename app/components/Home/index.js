import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';

let elements = null;
// let styles = null;
import styles from './styles.css'; // TODO: Remove this;

@Cerebral({
  assignmentsSolved: 'user.assignmentsSolved',
  loginErrorMessage: 'home.loginErrorMessage',
  registerErrorMessage: 'home.registerErrorMessage',
  isLoggingIn: 'home.isLoggingIn',
  isRegistering: 'home.isRegistering'
})
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      canRender: false
    };
  }
  componentDidMount() {
    require.ensure([], (require) => {
      elements = require('common/elements.css');
      // styles = require('./Home.css');
      this.setState({
        canRender: true
      });
    });
  }
  renderErrorMessage(message) {
    return (
      <div className={styles.errorMessage}>
        {message}
      </div>
    );
  }
  onInputChange(form, type, value) {
    this.props.signals.home.inputChange({form: form, type: type, value: value});
  }
  renderButtons() {
    return (
      <div className={styles.columnWrapper}>
        <div className={styles.column}>
          <div className={styles.columnContent}>
            <h2 className={styles.columnTitle}>Utforsk</h2>
            {
              Object.keys(this.props.assignmentsSolved).length ?
                <div>
                  <button className={styles.submitButton} onClick={() => this.props.signals.home.continueCourseClicked()}>Fortsett</button>
                  <button className={styles.submitButton} onClick={() => this.props.signals.home.restartCourseClicked()}>Start på nytt</button>
                </div>
              :
                <div>
                  <div className={styles.tryText}>
                    Du må ikke registrere deg for å prøve Kodeboksen. Trykk på knappen under og alt du gjør blir lagret i én dag.
                  </div>
                  <button className={styles.submitButton} onClick={() => this.props.signals.home.testKodeboksenClicked()}>
                    Prøv tjenesten
                  </button>
                </div>
            }
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.columnContent}>
            <h2 className={styles.columnTitle}>Logg inn</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              this.props.signals.home.loginFormSubmitted();
            }}>
              <input
                className={`${elements.input} ${styles.input}`}
                placeholder="E-post"
                required
                type="email"
                onChange={(e) => this.onInputChange('loginForm', 'email', e.target.value)}/>
              <input
                className={`${elements.input} ${styles.input}`}
                placeholder="Passord"
                required
                type="password"
                onChange={(e) => this.onInputChange('loginForm', 'password', e.target.value)}/>
              <button className={styles.submitButton} type="submit" disabled={this.props.isLoggingIn}>Logg meg inn</button>
            </form>
            {this.props.loginErrorMessage ? this.renderErrorMessage(this.props.loginErrorMessage) : null}
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.columnContent}>
            <h2 className={styles.columnTitle}>Registrer deg</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              this.props.signals.home.registerFormSubmitted();
            }}>
              <input
                className={`${elements.input} ${styles.input}`}
                placeholder="E-post"
                required
                onChange={(e) => this.onInputChange('registerForm', 'email', e.target.value)}/>
              <input
                className={`${elements.input} ${styles.input}`}
                placeholder="Passord"
                required
                type="password"
                onChange={(e) => this.onInputChange('registerForm', 'password', e.target.value)}/>
              <input
                className={`${elements.input} ${styles.input}`}
                placeholder="Gjenta passord"
                required
                type="password"
                onChange={(e) => this.onInputChange('registerForm', 'repeatedPassword', e.target.value)}/>
              <button className={styles.submitButton} type="submit" disabled={this.props.isRegistering}>Registerer meg</button>
            </form>
            {this.props.registerErrorMessage ? this.renderErrorMessage(this.props.registerErrorMessage) : null}
          </div>
        </div>
      </div>
    );
  }
  render() {
    if (this.state.canRender) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.logo}></div>
            <h1>Med kode kan du skape utrolige ting!</h1>
            <div className={styles.descText}>
              Vil du lære hvordan du lager et spill som kan spilles over hele verden?
              <br/>
              Eller hvordan du lager applikasjoner som hjelper andre mennesker?
              <br/>
              Vil du lage din egen hjemmeside?
            </div>
            <div className={styles.showYouHowText}>Med Kodeboksen viser vi deg hvordan!</div>
            {this.renderButtons()}
          </div>
        </div>
      );
    }

    return null;
  }
}

export default Home;
