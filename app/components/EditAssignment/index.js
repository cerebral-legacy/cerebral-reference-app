import React from 'react';
import styles from './styles.css';
import elements from 'common/elements.css';
import CodeMirror from 'codemirror';
import '!style!css!./../../../node_modules/codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';
import '!style!css!common/CodeEditorStyle.css';

class EditAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullEditor: false
    };
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  componentDidMount() {
    this.codemirror = CodeMirror(this.refs.code, {
      value: this.getCode(),
      mode: 'javascript',
      theme: 'learncode',
      lineNumbers: true,
      tabSize: 2
    });
    this.codemirror.on('change', this.onEditorChange);
    this.codemirror.on('focus', this.onFocus);
    this.codemirror.on('blur', this.onBlur);
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.currentAssignmentIndex !== this.props.currentAssignmentIndex ||
      prevProps.currentScene.index !== this.props.currentScene.index
    ) {
      this.updateAllCode();
    }
  }
  updateAllCode() {
    const doc = this.codemirror.getDoc();
    const code = this.getCode();
    doc.setValue(code);
  }
  onEditorChange() {
    this.props.onCodeChange({code: this.codemirror.getDoc().getValue()});
  }
  onFocus() {
    this.setState({
      showFullEditor: true
    });
  }
  onBlur() {
    this.setState({
      showFullEditor: false
    });
  }
  getCode() {
    return this.props.assignment.code;
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <textarea
          placeholder="Oppgavebeskrivelse..."
          value={this.props.assignment.description}
          className={`${elements.textarea} ${styles.textarea}`}
          onChange={(event) => this.props.onDescriptionChange({description: event.target.value})}/>
        <div className={this.state.showFullEditor ? styles.fullEditor : styles.editor} ref="code"></div>
      </div>

    );
  }
}

export default EditAssignment;
