import React from 'react';
import styles from './styles.css';

function ModuleFiles(props) {
  return (
    <div className={styles.wrapper}>
      {props.scene.sandboxFiles.map((file, index) => (
        <div
          key={index}
          className={file.name === props.currentFile.name ? styles.activeFile : styles.file}
          onClick={() => props.onFileClick({index})}>
            {file.name}
        </div>
      ))}
    </div>
  );
}

export default ModuleFiles;
