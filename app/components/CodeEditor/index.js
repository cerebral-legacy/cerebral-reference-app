import '!style!css!./../../../node_modules/codemirror/lib/codemirror.css';
import '!style!css!./lint.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/addon/edit/matchtags.js';
import 'codemirror/addon/edit/closetag.js';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/lint/html-lint.js';
import '!style!css!common/CodeEditorStyle.css';

import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import CodeMirror from 'codemirror';
import path from 'path';
import styles from './styles.css';
import icons from 'common/icons.css';
import currentScene from 'modules/course/computed/currentScene';
import currentFile from 'modules/course/computed/currentFile';
import currentAssignmentsSolvedCount from 'modules/course/computed/currentAssignmentsSolvedCount';
import RemoveFile from '../RemoveFile';
import AssignmentResult from '../AssignmentResult';
import AssignmentSuccess from '../AssignmentSuccess';
import isAdminMode from 'modules/course/computed/isAdminMode';
import htmlHint from './htmlHint';

@Cerebral({
  recorder: 'recorder',
  currentSceneIndex: 'course.currentSceneIndex',
  codeSelection: 'course.codeSelection',
  currentScene: currentScene,
  currentFile: currentFile,
  newFileName: 'course.newFileName',
  courseId: 'course.courseId',
  showAddFileInput: 'course.showAddFileInput',
  currentAssignmentStatus: 'course.currentAssignmentStatus',
  currentAssignmentIndex: 'course.currentAssignmentIndex',
  currentAssignmentsSolvedCount: currentAssignmentsSolvedCount,
  verifyingCode: 'course.verifyingCode',
  isAdminMode: isAdminMode
})
class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onCursorActivity = this.onCursorActivity.bind(this);
    this.onUpdateLinting = this.onUpdateLinting.bind(this);
    this.widgets = [];
  }
  componentDidMount() {
    this.codemirror = CodeMirror(this.refs.code, {
      value: this.getCode(),
      mode: this.getMode(),
      theme: 'learncode',
      matchTags: {bothTags: true},
      autoCloseTags: true,
      gutters: ['CodeMirror-lint-markers'],
      lineNumbers: true,
      lint: {
        getAnnotations: htmlHint(CodeMirror),
        onUpdateLinting: this.onUpdateLinting
      },
      indentUnit: 2,
      extraKeys: {
        Tab(cm) {
          const spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
          cm.replaceSelection(spaces);
        }
      }
    });
    this.codemirror.on('change', this.onEditorChange);
    this.codemirror.on('cursorActivity', this.onCursorActivity);
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.recorder.isPlaying ||
      this.props.recorder.started !== prevProps.recorder.started ||
      this.props.currentScene.currentFileIndex !== prevProps.currentScene.currentFileIndex ||
      this.props.currentSceneIndex !== prevProps.currentSceneIndex ||
      this.props.recorder.currentSeek !== prevProps.recorder.currentSeek
    ) {
      this.updateAllCode();
    }

    if (this.props.recorder.isPlaying && !prevProps.recorder.isPlaying) {
      this.codemirror.setOption('readOnly', 'nocursor');
    } else if (!this.props.recorder.isPlaying && prevProps.recorder.isPlaying) {
      this.codemirror.setOption('readOnly', false);
    }

    if (this.props.recorder.isPlaying) {
      this.codemirror.getDoc().setSelection(this.props.codeSelection.anchor, this.props.codeSelection.head);
    }
  }
  onUpdateLinting(errors) {
    if (this.props.recorder.isPlaying) {
      return;
    }

    this.props.signals.course.codeVerified({
      hasError: Boolean(errors.length)
    });
  }
  onCursorActivity() {
    if (this.props.recorder.isPlaying) {
      return;
    }

    const range = this.codemirror.getDoc().listSelections()[0];

    this.props.signals.course.codeCursorChanged({
      anchor: range.anchor,
      head: range.head
    });
  }
  getCode() {
    return this.props.currentFile.code || '';
  }
  updateAllCode() {
    const doc = this.codemirror.getDoc();
    const code = this.getCode();
    this.codemirror.setOption('mode', this.getMode());
    this.isMutatingCode = true;
    doc.setValue(code);
    this.isMutatingCode = false;

    if (!this.props.recorder.isPlaying) {
      this.codemirror.focus();
      this.codemirror.setCursor(this.codemirror.lineCount(), 0);
    }
  }
  getMode() {
    const modes = {
      '.html': 'htmlmixed',
      '.js': 'javascript',
      '.css': 'css'
    };

    const extension = path.extname(this.props.currentScene.sandboxFiles[this.props.currentScene.currentFileIndex].name);

    return modes[extension] || 'xml';
  }
  onEditorChange(instance, event) {
    if (!this.isMutatingCode) {
      if (event.text.length === 2) {
        event.text = ['\n'];
      }

      this.props.signals.course.codeChanged({
        from: event.from,
        to: event.to,
        text: event.text
      });
    }
  }
  onRunCodeClick() {
    if (this.props.sandboxMode) {
      this.props.signals.mainAssignment.saveMainAssignmentClicked();
    } else {
      this.props.signals.course.runAssignmentClicked({
        hasError: Boolean(this.refs.code.querySelectorAll('.cm-error').length)
      });
    }
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <RemoveFile show={this.props.currentScene.currentFileIndex !== 0} onClick={() => this.props.signals.course.removeFileClicked()}/>
        <div ref="code" className={styles.editor}/>
        <AssignmentResult/>
        <AssignmentSuccess/>
        {
          this.props.currentAssignmentStatus.result === true && !this.props.currentAssignmentStatus.isLoading ?
            null
          :
            <button
              className={styles.run}
              disabled={
                !this.props.sandboxMode &&
                (this.props.isAdminMode ||
                this.props.recorder.isPlaying ||
                this.props.currentAssignmentStatus.isLoading ||
                this.props.currentAssignmentsSolvedCount > this.props.currentAssignmentIndex) ||
                this.props.verifyingCode}
              onClick={() => this.onRunCodeClick()}>
                <i className={`${icons.play} ${styles.playIcon}`}></i>
                <span className={styles.buttonText}>Kjør kode</span>
            </button>
        }
      </div>
    );
  }
}

export default CodeEditor;
