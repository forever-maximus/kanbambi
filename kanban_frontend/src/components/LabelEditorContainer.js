import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import LabelEditor from './LabelEditor';

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
        <LabelEditor 
          closeEditor={this.toggleLabelEditorDisplay}
        />
      );
    }
  }

  toggleLabelEditorDisplay = () => this.setState({displayLabelEditor: !this.state.displayLabelEditor});

  setWrapperRef = (node) => this.wrapperRef = node;

  render() {
    return (
      <div>
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