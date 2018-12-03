import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import StateColumn from './StateColumn';

class StateColumnGrid extends Component {

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
                  <StateColumn 
                    key={column.id}
                    column={column} 
                    tasks={this.props.tasks}
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