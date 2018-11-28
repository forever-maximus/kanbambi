import React from 'react';
import { Card } from 'semantic-ui-react';

const Task = (props) => (
  <Card>
    <Card.Content header={props.task.title} />
    <Card.Content description={props.task.description} />
  </Card>
)

export default Task;