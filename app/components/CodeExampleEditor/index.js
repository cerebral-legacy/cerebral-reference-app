import '!style!css!./../../../node_modules/codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import '!style!css!common/CodeEditorStyle.css';

import React from 'react';
import CodeMirror from 'codemirror';
import styles from './styles.css';

class CodeExample extends React.Component {
  constructor(props) {
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
  }
  componentDidMount() {
    this.codemirror = CodeMirror(this.refs.code, {
      value: this.getCode(),
      mode: this.getMode(),
      theme: 'learncode',
      lineNumbers: true,
      tabSize: 2
    });
    this.codemirror.on('change', this.onEditorChange);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.currentDescription !==  this.props.currentDescription) {
      this.updateAllCode();
    }
    this.updateMode();
  }
  updateAllCode() {
    const doc = this.codemirror.getDoc();
    const code = this.getCode();
    doc.setValue(code);
  }
  updateMode() {
    this.codemirror.setOption('mode', this.getMode());
  }
  getCode() {
    return this.props.code || '';
  }
  getMode() {
    const modes = {
      'HTML': 'htmlmixed',
      'JavaScript': 'javascript',
      'CSS': 'css'
    };

    return modes[this.props.codeType];
  }
  onEditorChange() {
    this.props.onCodeChange(this.codemirror.getDoc().getValue());
  }
  render() {
    return (
      <div ref="code" className={styles.editor}/>
    );
  }
}

export default CodeExample;
