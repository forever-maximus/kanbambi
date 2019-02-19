import React, { Component } from 'react';
import { Divider, Icon, Button } from 'semantic-ui-react';
import EditLabelView from './EditLabelView';
import './LabelEditor.css';

class LabelEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'select',
      editingLabelId: ''
    }
  }

  getLabelEditorContent = () => {
    if (this.state.mode === 'select') {
      return this.labelSelectView();
    } else if (this.state.mode === 'edit') {
      return (
        <EditLabelView 
          labels={this.props.labels} 
          labelId={this.state.editingLabelId}
          backButton={this.backButton}
          updateLabel={this.props.updateLabel}
          clientId={this.props.clientId}
          boardId={this.props.boardId}
        />
      );
    }
  }

  labelSelectView = () => {
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
          <Button 
            className='edit' 
            size='mini' 
            icon='pencil' 
            onClick={ () => this.startEditingLabel(key) }
          />
        </div>
      );
    });

    return labelRows;
  }

  startEditingLabel = (labelId) => this.setState({mode: 'edit', editingLabelId: labelId});

  backButton = () => this.setState({mode: 'select', editingLabelId: ''});

  checkTaskHasLabel = (id) => {
    if (this.props.task.labels.includes(id)) {
      return <Icon name='checkmark' />
    }
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup-header'>
          <span>{this.state.mode === 'select' ? 'Labels' : 'Change Label'}</span>
          <Icon circular name='close' tabIndex='1' className='close-button' onClick={this.props.closeEditor} />
          {
            this.state.mode !== 'select' 
            ? <Icon circular name='arrow left' className='back-button' onClick={this.backButton}/> : ''
          }
        </div>
        <Divider />
        <div>
          { this.getLabelEditorContent() }
        </div>
      </div>
    );
  }
}

export default LabelEditor;