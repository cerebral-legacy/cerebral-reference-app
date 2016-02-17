import React from 'react';
import styles from './styles.css';
import icons from 'common/icons.css';
import ToolbarButton from 'common/components/ToolbarButton';

const renderScenes = (scenes, activeSceneIndex, onSceneItemClick) => {
  return scenes.map((scene, index) => {
    return (
      <div
        key={index}
        className={index === activeSceneIndex ? styles.activeScene : styles.scene}
        onClick={() => onSceneItemClick({sceneIndex: index})}>
        <span>{index + 1}. {scene.name}</span>
        {/* TODO: When scenes have been watched, add this:
          <span className={`${styles.checked} ${icons.checked}`}></span>
        */}
      </div>
    );
  });
};

function CourseHeader(props) {
  return (
    <div className={styles.wrapper} onClick={(e) => {e.stopPropagation(); props.sceneNameClicked();}}>
      <div className={styles.iconWrapper}>
        <div className={`${styles.icon} ${icons.school}`}></div>
      </div>
      <div className={styles.courseWrapper}>
        <div className={styles.title}>{props.title}</div>
          <ToolbarButton
            title={(props.currentScene.index + 1) + '. ' + props.currentScene.name}
            active={props.showScenesList}
            stopPropagation={false}/>
          {
            props.showScenesList ?
              <div className={styles.scenesList}>{renderScenes(props.scenes, props.currentScene.index, props.onSceneItemClick)}</div>
            :
              null
          }
      </div>
    </div>
  );
}

export default CourseHeader;
