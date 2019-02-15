import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import LabelEditor from './LabelEditor';
import FocusTrap from 'focus-trap-react';

class LabelEditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLabelEditor: false,
    }
  }

  displayLabelEditor = () => {
    if (this.state.displayLabelEditor) {
      return (
        <FocusTrap
          focusTrapOptions={{
            onDeactivate: this.unmountTrap,
            clickOutsideDeactivates: true
          }}
        >
          <LabelEditor 
            closeEditor={this.unmountTrap}
            labels={this.props.labels}
            task={this.props.task}
            updateTaskLabel={this.props.updateTaskLabel}
          />
        </FocusTrap>
      );
    }
  }

  unmountTrap = () => this.setState({displayLabelEditor: false});

  toggleLabelEditorDisplay = () => this.setState({displayLabelEditor: !this.state.displayLabelEditor});

  render() {
    return (
      <div className='add-label-wrapper'>
        <Button 
          className='add-label' 
          icon='add' 
          onClick={this.toggleLabelEditorDisplay}
        />
        { this.displayLabelEditor() }
      </div>
    );
  }
}

export default LabelEditorContainer;