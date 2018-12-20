import React from 'react';
import { Card, TextArea, Form, Button, Icon } from 'semantic-ui-react';
import './NewTask.css';

const NewTask = (props) => (
  <div className='new-task-wrapper'>
    <Card fluid>
      <Card.Content>
        <Form autoComplete='off'>
          <Form.Field>
            <label>Title</label>
            <input 
              placeholder='title...' 
              name='title' 
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <TextArea 
              autoHeight
              placeholder='description...' 
              name='description' 
            />
          </Form.Field>
        </Form>
      </Card.Content>
    </Card>
    <div className='submit-wrapper'>
      <Button content='Add Task' color='green' />
      <Icon name='close' className='close-btn' onClick={props.cancelNewTask} />
    </div>
  </div>
);

export default NewTask;