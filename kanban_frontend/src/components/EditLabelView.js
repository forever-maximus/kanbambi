import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';
import './EditLabelView.css';

class EditLabelView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelName: ''
    }
  }

  componentDidMount() {
    if (this.props.labels[this.props.labelId].name !== null) {
      this.setState({labelName: this.props.labels[this.props.labelId].name});
    }
  }

  handleChange = (ev, { name, value }) => this.setState({ [name]: value });

  updateLabel = () => {
    if (this.state.labelName !== this.props.labels[this.props.labelId].name) {
      const data = {
        clientId: this.props.clientId,
        boardId: this.props.boardId,
        label: {
          id: this.props.labelId,
          name: this.state.labelName
        }
      }
      this.props.updateLabel(data);
    }
    this.props.backButton();
  }

  render() {
    return (
      <div className='edit-view-wrapper'>
        <Input 
          value={this.state.labelName}
          placeholder='Label name'
          autoComplete='off'
          name='labelName'
          onChange={this.handleChange}
        />
        <Button 
          color='green' 
          content='Save' 
          onClick={this.updateLabel} 
        />
      </div>
    );
  }
}

export default EditLabelView;