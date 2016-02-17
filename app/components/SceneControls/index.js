import React from 'react';
import PlayButton from '../PlayButton';
import RecordButton from '../RecordButton';
import UploadButton from '../UploadButton';
import styles from './styles.css';
import {Mixin} from 'cerebral-view-react';
import Recorder from 'chrome-recorder';
import debounce from 'debounce';
import currentScene from 'modules/course/computed/currentScene';
import isAdminMode from 'modules/course/computed/isAdminMode';
import currentAssignmentsSolvedCount from 'modules/course/computed/currentAssignmentsSolvedCount';

// Need access to Cerebral controller, so using normal
// constructor
const SceneControls = React.createClass({
  contextTypes: {
    controller: React.PropTypes.object
  },
  mixins: [Mixin],
  getInitialState() {
    return {
      isExecutingSignal: this.context.controller.isExecuting()
    }
  },
  componentWillMount() {
    this.context.controller.on('signalEnd', this.updateExecutingSignal);
  },
  componentDidMount() {
    this.recorder = new Recorder(this.refs.video, {
      audio: {
        sampleRate: process.env.NODE_ENV === 'production' ? 44000 : 48000
      }
    });

    if (this.state.currentScene.recording) {
      this.loadAudioAndVideo();
    }
  },
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentScene.name !== this.state.currentScene.name) {
      this.loadAudioAndVideo();

      return;
    }

    const isSameDuration = parseInt(prevState.recorder.currentSeek[0], 10) === parseInt(this.state.recorder.currentSeek[0], 10);
    const hasChangedPlayMode = prevState.recorder.isPlaying !== this.state.recorder.isPlaying;

    if (
    !this.state.recorder.isRecording &&
    !this.state.recorder.isEnded &&
    !hasChangedPlayMode &&
    prevState.recorder.currentSeek !== this.state.recorder.currentSeek) {
      requestAnimationFrame(() => {
        this.seek(isSameDuration);
      });
    }

    if (!this.state.recorder.isRecording && prevState.recorder.isPlaying && !this.state.recorder.isPlaying) {
      this.refs.video.pause();
      this.refs.audio.pause();
    }

    if (!this.state.recorder.isRecording && !prevState.recorder.isPlaying && this.state.recorder.isPlaying) {
      this.refs.video.play();
      this.refs.audio.play();
    }
  },
  componentWillUnmount() {
    this.context.controller.removeListener('signalEnd', this.updateExecutingSignal);
  },
  recorder: null,
  isUploadReady: false,
  isRecording: false,
  getStatePaths() {
    return {
      recorder: ['recorder'],
      course: ['course'],
      currentScene: currentScene,
      isAdminMode: isAdminMode,
      user: ['user'],
      assignmentsPositions: ['course', 'assignmentsPositions'],
      assignmentsSolvedCount: currentAssignmentsSolvedCount
    };
  },
  updateExecutingSignal() {
    if (this.state.isExecutingSignal !== this.context.controller.isExecuting()) {
      this.setState({
        isExecutingSignal: this.context.controller.isExecuting()
      });
    }
  },
  seek: debounce(function (isSame) {
    const seek = this.state.recorder.currentSeek[0];
    const continuePlaying = this.state.recorder.isPlaying;
    const self = this;
    const bufferState = {
      video: false,
      audio: false
    };

    if (isSame && continuePlaying) {
      this.refs.video.play();
      this.refs.audio.play();

      return;
    }

    this.refs.video.pause();
    this.refs.audio.pause();

    // this.refs.video.removeEventListener('waiting', this.onWaiting);
    // this.refs.video.removeEventListener('canplaythrough', this.onCanPlayThrough);

    this.signals.course.videoStartedBuffering({}, {
      isRecorded: true
    });

    this.refs.video.addEventListener('canplaythrough', function startPlaying() {
      bufferState.video = true;
      self.refs.video.removeEventListener('canplaythrough', startPlaying);

      if (bufferState.audio) {
        self.refs.video.currentTime = seek / 1000;
        self.refs.audio.currentTime = (seek / 1000) - (seek / 1000 / 2);
        setTimeout(() => {
          self.signals.course.videoBuffered({
            continuePlaying: continuePlaying
          }, {
            isRecorded: true
          });

          if (continuePlaying) {
            self.refs.audio.play();
            self.refs.video.play();
          }
        }, 500);
      }
    });

    this.refs.audio.addEventListener('canplaythrough', function startPlaying() {
      bufferState.audio = true;
      self.refs.audio.removeEventListener('canplaythrough', startPlaying);

      if (bufferState.video) {
        self.refs.video.currentTime = seek / 1000;
        self.refs.audio.currentTime = (seek / 1000) - (seek / 1000 / 2);
        setTimeout(() => {
          self.signals.course.videoBuffered({
            continuePlaying: continuePlaying
          }, {
            isRecorded: true
          });

          if (continuePlaying) {
            self.refs.audio.play();
            self.refs.video.play();
          }
        }, 500);
      }
    });

    this.refs.video.currentTime = seek / 1000;
    this.refs.audio.currentTime = (seek / 1000) - (seek / 1000 / 2);
  }, 500),
  createMediaRequest(url) {
    return new Promise((resolve) => {
      const req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.responseType = 'blob';

      req.onload = () => {
        resolve(req.response);
      };

      req.send();
    });
  },
  loadAudioAndVideo() {
    const self = this;
    const bufferState = {
      video: false,
      audio: false
    };
    this.refs.video.addEventListener('canplaythrough', function canStartPlaying() {
      bufferState.video = true;
      self.refs.video.removeEventListener('canplaythrough', canStartPlaying);

      if (bufferState.audio) {
        self.onCanPlayThrough();
      }
    });
    this.refs.audio.addEventListener('canplaythrough', function canStartPlaying() {
      bufferState.audio = true;
      self.refs.audio.removeEventListener('canplaythrough', canStartPlaying);

      if (bufferState.video) {
        self.onCanPlayThrough();
      }
    });
    // this.refs.video.addEventListener('error', this.onError);
    this.refs.video.src = `/API/courses/${this.state.course.id}/scenes/${this.state.course.currentSceneIndex}/video`;
    this.refs.audio.src = `/API/courses/${this.state.course.id}/scenes/${this.state.course.currentSceneIndex}/audio`;
  },
  onCanPlayThrough() {
    this.signals.course.mediaLoaded({
      seek: 0
    });
    this.refs.video.removeEventListener('canplaythrough', this.onCanPlayThrough);
    this.refs.audio.removeEventListener('canplaythrough', this.onCanPlayThrough);
  },
  onWaiting() {
    this.refs.audio.pause();

    this.refs.video.addEventListener('playing', function onPlaying() {
      this.onPlaying();
      this.refs.video.removeEventListener('playing', onPlaying);
    }.bind(this));

    this.signals.course.videoStartedBuffering({}, {
      isRecorded: true
    });
  },
  onPlaying() {
    this.refs.audio.play();
    this.signals.course.playClicked({
      seek: this.state.recorder.currentSeek[0]
    });
  },
  onError() {
    this.refs.video.pause();
    this.refs.audio.pause();
    this.signals.course.videoFailed({}, {
      isRecorded: true
    });
  },
  onRecordClick() {
    // this.refs.video.removeEventListener('canplaythrough', this.onCanPlayThrough);
    // this.refs.video.removeEventListener('waiting', this.onWaiting);
    this.isRecording = true;
    this.recorder.record(() => this.signals.course.recordClicked());
  },
  onStopClick() {
    this.isUploadReady = this.isRecording;
    this.isRecording = false;
    this.signals.course.stopClicked({
      seek: this.refs.video.currentTime * 1000
    });
    setTimeout(() => {
      this.recorder.stop();
      const blobs = this.recorder.getBlobs();
      this.refs.video.src = window.URL.createObjectURL(blobs.video);
      this.refs.audio.src = window.URL.createObjectURL(blobs.audio);
    }, 250);
  },
  canPlay() {
    if (!this.refs.video) {
      return false;
    }

    const seek = this.refs.video.currentTime * 1000;
    const assignmentsPassed = this.state.assignmentsPositions.filter((point) => {
      return point < seek;
    });

    return this.state.assignmentsSolvedCount >= assignmentsPassed.length;
  },
  onPlayClick() {
    const seek = this.refs.video.currentTime * 1000;

    this.signals.course.playClicked({
      seek: this.state.recorder.isEnded ? 0 : seek
    });
  },
  onPauseClick() {
    this.signals.course.pauseClicked({
      seek: this.refs.video.currentTime * 1000
    }, {
      isRecorded: true
    });
  },
  readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const fileInfo = {
        name: file.name,
        type: file.type,
        size: file.size,
        file: null
      };
      reader.onload = () => {
        fileInfo.file = new Uint8Array(reader.result);
        resolve(fileInfo);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsArrayBuffer(file);
    });
  },
  onUploadClick() {
    const blobs = this.recorder.getBlobs();
    this.signals.course.uploadClicked();
    Promise.all([
      this.readFile(blobs.audio),
      this.readFile(blobs.video)
    ])
    .then((files) => {
      const audio = files[0];
      const video = files[1];

      return Promise.all([
        fetch(`/API/courses/${this.state.course.id}/scenes/${this.state.course.currentSceneIndex}/audio`, {
          method: 'post',
          headers: {
            'Content-Type': audio.type,
            'Content-Length': audio.size
          },
          credentials: 'same-origin',
          body: audio.file
        }),
        fetch(`/API/courses/${this.state.course.id}/scenes/${this.state.course.currentSceneIndex}/video`, {
          method: 'post',
          headers: {
            'Content-Type': video.type,
            'Content-Length': video.size
          },
          credentials: 'same-origin',
          body: video.file
        })
      ])
      .catch(() => {
        this.signals.course.uploadFailed();
      });
    })
    .then((responses) => {
      // Have to force update due to uploadFinished might
      // not result in an actual state change
      this.isUploadReady = false;
      this.forceUpdate();

      if (responses[0].status === 200 && responses[1].status === 200) {
        this.signals.course.uploadFinished();
      } else {
        throw new Error('Upload failed');
      }
    })
    .catch(() => {
      this.signals.course.uploadFailed();
    });
  },
  render() {
    const isDisabled = this.state.recorder.isBuffering || this.state.isExecutingSignal || this.state.course.isLoadingMedia;

    return (
      <div className={styles.wrapper}>
        {
          this.state.isAdminMode ?
            <span>
              <UploadButton
                disabled={isDisabled || !this.isUploadReady}
                isUploadReady={this.isUploadReady}
                recorder={this.state.recorder}
                onClick={() => this.onUploadClick()}
              />
              <RecordButton
                disabled={isDisabled}
                recorder={this.state.recorder}
                onRecordClick={() => this.onRecordClick()}
                onStopClick={() => this.onStopClick()}/>
            </span>
          :
            null
        }
        {
          (!this.state.isAdminMode && this.canPlay()) || this.state.recorder.isRecording ?
            <PlayButton
              disabled={isDisabled || (this.state.isAdminMode && !this.state.recorder.isRecording)}
              recorder={this.state.recorder}
              onPlayClick={() => this.onPlayClick()}
              onPauseClick={() => this.onPauseClick()}/>
            :
          null
        }
        <div className={this.state.recorder.isBuffering ? styles.loadingFrame : styles.frame}>
          <video ref="video" className={styles.video}></video>
          <div className={styles.videoShadow}></div>
        </div>
        <audio ref="audio"></audio>
      </div>
    );
  }
});

export default SceneControls;
