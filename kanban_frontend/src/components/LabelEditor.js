import React, { Component } from 'react';
import { Divider, Icon, Button } from 'semantic-ui-react';
import './LabelEditor.css';

class LabelEditor extends Component {
  
  getLabelRows = () => {
    const labelRows = [];

    Object.entries(this.props.labels).forEach(([key, label]) => {
      labelRows.push(
        <div key={key} className='label-selector-wrapper'>
          <div 
            style={{backgroundColor: label.colour}} 
            className='label-display-selector' 
            onClick={() => this.props.updateTaskLabel(Number(key))}
          >
            <div className='name'>
              {label.name}
            </div>
            {this.checkTaskHasLabel(label.id)}
          </div>
          <Button className='edit' size='mini' icon='pencil' />
        </div>
      );
    });

    return labelRows;
  }

  checkTaskHasLabel = (id) => {
    console.log(this.props.task.labels);
    if (this.props.task.labels.includes(id)) {
      return <Icon name='checkmark' />
    }
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup-header'>
          <span>Labels</span>
          <Icon circular name='close' tabIndex='1' className='close-button' onClick={this.props.closeEditor} />
        </div>
        <Divider />
        <div>
          { this.getLabelRows() }
        </div>
      </div>
    );
  }
}

export default LabelEditor;