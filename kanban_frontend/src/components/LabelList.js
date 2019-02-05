import React from 'react';

const LabelList = (props) => (
  <div className='label-wrapper'>
    {
      props.task.labels.map((labelId, key) => {
        return (
          <div key={key} className='task-label' style={{backgroundColor: props.labels[labelId].colour}}>
            {props.labels[labelId].name}
          </div>
        );
      })
    }
  </div>
);

export default LabelList;