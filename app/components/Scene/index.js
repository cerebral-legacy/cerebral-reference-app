import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import Module from '../Module';
import DurationSlider from '../DurationSlider';
import ToolbarButton from 'common/components/ToolbarButton';
import Toolbar from 'common/components/Toolbar';
import CodeEditor from '../CodeEditor';
import Preview from '../Preview';
import SceneControls from '../SceneControls';
import icons from 'common/icons.css';
import EditAssignment from '../EditAssignment';
import styles from './styles.css';
import currentFile from 'modules/course/computed/currentFile';
import currentScene from 'modules/course/computed/currentScene';
import isAdminMode from 'modules/course/computed/isAdminMode';
import currentAssignmentsSolvedCount from 'modules/course/computed/currentAssignmentsSolvedCount';
import Assignment from '../Assignment';
import CourseHeader from '../CourseHeader';
import ToolbarButtonPopover from 'common/components/ToolbarButtonPopover';
import ConfigureScenes from '../ConfigureScenes';
import AddFile from '../AddFile';
import ModuleFiles from '../ModuleFiles';

@Cerebral({
  isLoading: 'course.isLoading',
  isRecording: 'recorder.isRecording',
  user: 'user',
  recorder: 'recorder',
  courseName: 'course.name',
  courseId: 'course.id',
  currentAssignmentIndex: 'course.currentAssignmentIndex',
  currentAssignmentStatus: 'course.currentAssignmentStatus',
  currentAssignmentsSolvedCount: currentAssignmentsSolvedCount,
  currentFile: currentFile,
  currentScene: currentScene,
  isAdminMode: isAdminMode,
  showScenesList: 'course.showScenesList',
  scenesList: 'course.scenesList',
  showConfigureScenes: 'course.showConfigureScenes',
  showAddFileInput: 'course.showAddFileInput',
  newFileName: 'course.newFileName'
})
class Scene extends React.Component {
  assignmentDescriptionChanged(e) {
    this.props.signals.course.assignmentDescriptionChanged.sync({
      description: e.target.value
    });
  }
  renderAssignment() {
    if (!this.props.currentScene.recording || (this.props.recorder.isPlaying && this.props.currentAssignmentIndex === -1)) {
      return null;
    }

    if (this.props.currentAssignmentIndex === -1) {
      return (
        <div className={styles.finishedHeader}>
          Klar til å lære?
          <div className={styles.finishedSubheader}>Trykk "Play" for å starte kurset</div>
        </div>
      );
    }

    if (currentAssignmentsSolvedCount === this.props.currentScene.assignments.length) {
      return (
        <div className={styles.finishedHeader}>
          Du har fullført alle oppgavene!
          <div className={styles.finishedSubheader}>Trykk "Fortsett" for å lære mer</div>
        </div>
      );
    }

    if (this.props.isAdminMode && !this.props.recorder.isRecording) {
      return (
        <EditAssignment
          currentScene={this.props.currentScene}
          currentAssignmentIndex={this.props.currentAssignmentIndex}
          assignment={this.props.currentScene.assignments[this.props.currentAssignmentIndex]}
          onDescriptionChange={this.props.signals.course.assignmentDescriptionChanged}
          onCodeChange={this.props.signals.course.assignmentCodeChanged}
          currentAssignmentStatus={this.props.currentAssignmentStatus}
          onAssignmentRunClick={this.props.signals.course.runAssignmentClicked}
        />
      );
    }

    return (
      <Assignment
        assignment={this.props.currentScene.assignments[this.props.currentAssignmentIndex]}
        currentAssignmentStatus={this.props.currentAssignmentStatus}
        completed={this.props.currentAssignmentsSolvedCount > this.props.currentAssignmentIndex}
      />
    );
  }
  render() {
    return (
      <div className={styles.modules}>
        <Module className={this.props.isAdminMode ? styles.controlsAndAssignmentsAdmin : styles.controlsAndAssignments} show>
          <Toolbar>
            <ToolbarButton icon={icons.chevronLeft} title="Kursoversikt" onClick={() => this.props.signals.techTree.toggled()}/>
          </Toolbar>
          <CourseHeader
            title={this.props.courseName}
            sceneNameClicked={this.props.signals.course.sceneNameClicked}
            showScenesList={this.props.showScenesList}
            scenes={this.props.scenesList}
            currentScene={this.props.currentScene}
            onSceneItemClick={this.props.signals.course.listSceneNameClicked}/>
          <SceneControls/>
          <DurationSlider/>
          {this.renderAssignment()}
        </Module>
        <Module className={styles.code} show>
          <div className={styles.section}>
            <Toolbar>
              <ModuleFiles
                scene={this.props.currentScene}
                currentFile={this.props.currentFile}
                onFileClick={this.props.signals.course.fileClicked}/>
              <AddFile
                onAddFileClick={this.props.signals.course.addFileClicked}
                onFileNameChange={this.props.signals.course.addFileNameUpdated}
                onFileSubmit={this.props.signals.course.addFileSubmitted}
                onAddFileAborted={this.props.signals.course.addFileAborted}
                showInput={this.props.showAddFileInput}
                placeholder="Filnavn..."
                value={this.props.newFileName}/>
            </Toolbar>
            <CodeEditor/>
          </div>
          <div className={styles.section}>
            <Toolbar>
            {
              this.props.user.isAdmin ?
                <span className={styles.toolbarButtonRight}>
                  <ToolbarButton
                    active={!this.props.isAdminMode}
                    icon={icons.user}
                    onClick={this.props.signals.course.toggleForceUserClicked}/>
                </span>
              :
                null
            }
            {
              this.props.isAdminMode ?
                <span className={styles.toolbarButtonRight}>
                  <ToolbarButtonPopover icon={icons.addCourse}
                                        onClick={(e) => this.props.signals.course.configureScenesClicked(e)}
                                        show={this.props.showConfigureScenes}
                                        side="right">
                    <ConfigureScenes/>
                  </ToolbarButtonPopover>
                </span>
              :
                null
            }
            </Toolbar>
            <Preview show={this.props.showPreview}/>
          </div>
        </Module>
      </div>
    );
  }
}

export default Scene;
