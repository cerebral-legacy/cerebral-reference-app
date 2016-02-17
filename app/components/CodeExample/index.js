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
  }
  componentDidMount() {
    this.codemirror = CodeMirror(this.refs.code, {
      value: this.getCode(),
      mode: this.getMode(),
      theme: 'learncode',
      lineNumbers: false,
      tabSize: 2,
      readOnly: true
    });
  }
  componentDidUpdate() {
    const doc = this.codemirror.getDoc();
    const code = this.getCode();
    doc.setValue(code);
  }
  getCode() {
    return this.props.description.example || '';
  }
  getMode() {
    const modes = {
      'HTML': 'htmlmixed',
      'JavaScript': 'javascript',
      'CSS': 'css'
    };

    return modes[this.props.description.exampleType];
  }
  render() {
    return (
      <div ref="code" className={styles.editor}/>
    );
  }
}

export default CodeExample;
