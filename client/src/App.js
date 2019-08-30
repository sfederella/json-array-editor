import React from 'react';
import './App.css';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/github';
import {Button, Grid} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {lightGreen} from '@material-ui/core/colors';
import backClient from './services/backClient'

lightGreen.contrastText = '#fff';
const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
  }
});

class App extends React.Component {
  setEditorRef = instance => this.editor = instance;

  constructor() {
    super();
    this.state = {
      size: 0,
      currentIndex: -1,
      json: {}
    };
  }

  componentDidMount() {
    backClient.getStatus(status => {
      if(status.size <= status.lastUpdated - 1) {
        alert('You have finished successfully');
      } else {
        this.setState({
          size: status.size,
          currentIndex: status.lastUpdated + 1
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentIndex !== prevState.currentIndex) {
      backClient.getJsonArrayAt(this.state.currentIndex, (json) => {
        if(json.error) {
          alert('Error: ' + json.error)
        } else {
          this.setState({json});
          this.editor.jsonEditor.set(json);
        }
      });
    }
  }

  handleOnNext = () => {
    backClient.putJsonArrayAt(this.state.json, this.state.currentIndex, res => {
      if(res.success) {
        const currentIndex = this.state.currentIndex + 1;
        this.setState({currentIndex});
      } else {
        alert('Error: ' + res.error);
      }
    });
  }

  handleOnPrev = () => {
    backClient.putJsonArrayAt(this.state.json, this.state.currentIndex, res => {
      if(res.success) {
        const currentIndex = this.state.currentIndex - 1;
        this.setState({currentIndex});
      } else {
        alert('Error: ' + res.error);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <MuiThemeProvider theme={theme}>
            <Editor
              ref={this.setEditorRef}
              value={this.state.json}
              onChange={(json) => this.setState({json})}
              ace={ace}
              mode='code'
              theme="ace/theme/github"
            />
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              {this.state.currentIndex > 0 &&
                <Grid item>
                  <Button variant="contained" color="secondary" size="large" onClick={this.handleOnPrev}>
                    Previous
                  </Button>
                </Grid>
              }
              <Grid item>
                <Button variant="contained" color="primary" size="large" onClick={this.handleOnNext}>
                  Next
                </Button>
              </Grid>
            </Grid>
          </MuiThemeProvider>
        </header>
      </div>
    );
  }
}

export default App;
