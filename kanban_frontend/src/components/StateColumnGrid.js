import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import StateColumn from './StateColumn';
import './StateColumnGrid.css';

class StateColumnGrid extends Component {

  onDragStart = (ev, task) => {
    ev.dataTransfer.setData("task", JSON.stringify(task));
  }

  onDragOver = (ev) => {
    ev.preventDefault();
  }

  onDrop = (ev, stateColumnId) => {
    const task = JSON.parse(ev.dataTransfer.getData('task'));

    if (task.stateColumnId !== stateColumnId) {
      // Need to call redux action to update state of task to new state column
      const prevStateColumnId = task.stateColumnId;
      task.stateColumnId = stateColumnId;
      this.props.updateTask(task, prevStateColumnId);
    }
  }

  displayStateColumns = () => {
    const stateColumns = this.props.stateColumns;
    if (Object.keys(stateColumns).length === 0) {
      // Empty - therefore still loading
      return "loading";
    }

    return (
      <Grid columns={Object.keys(stateColumns).length}>
          <Grid.Row>
            {Object.values(stateColumns).map((column, i) => (
              <Grid.Column key={i}>
                <div key={i} className="state-column" 
                  onDragOver={(ev) => this.onDragOver(ev)}
                  onDrop={(ev) => this.onDrop(ev, column.id)}
                >
                  <StateColumn 
                    column={column} 
                    tasks={this.props.tasks}
                    onDragStart={this.onDragStart} 
                  />
                </div>
              </Grid.Column>
            ))}
        </Grid.Row>
      </Grid>
    );
  }

  render() {
    return (
      this.displayStateColumns()
    );
  }
}

export default StateColumnGrid;