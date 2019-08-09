import React from 'react';

import './ImageGrid.css';

function ImageGrid(props) {
  return (
    <div className="row imageGridRow">
      <div className="col-xs-5 imageLeft">
        <img alt="" src={props.img1} />
      </div>
      <div className="col-xs-5 imageRight">
        <img alt="" src={props.img2} />
      </div>
    </div>
  );
}

export default ImageGrid;
