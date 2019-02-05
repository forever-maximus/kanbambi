import React, { Component } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import StateColumn from './StateColumn';

const columnStyle = {
  padding: '0px 10px'
}

class StateColumnGrid extends Component {

  displayStateColumns = () => {
    const stateColumns = this.props.stateColumns;
    if (this.props.loading || Object.keys(stateColumns).length === 0) {
      // Still loading board
      return <Loader active content="Loading" />;
    }

    return (
      <Grid columns={Object.keys(stateColumns).length}>
          <Grid.Row>
            {Object.values(stateColumns).map((column, i) => (
              <Grid.Column key={i} style={columnStyle}>
                  <StateColumn 
                    key={column.id}
                    column={column} 
                    tasks={this.props.tasks}
                    labels={this.props.labels}
                    openModal={this.props.openModal}
                    isModalOpen={this.props.isModalOpen}
                    addNewTask={this.props.addNewTask}
                    clientId={this.props.clientId}
                    boardId={this.props.boardId}
                  />
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