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
import backClient from './services/backClient';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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
      currentIndex: 0,
      inputIndex: 0,
      json: {}
    };
  }

  componentDidMount() {
    backClient.getSize(r => {
      if (r.size >= 1) {
        var currentIndex = parseInt(localStorage.getItem('currentIndex'));
        if (!currentIndex || currentIndex > r.size) currentIndex = 1;
        this.setState({
          size: r.size,
          currentIndex,
          inputIndex: currentIndex
        });
      } else {
        alert("The json array must have al least one element.")
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentIndex !== prevState.currentIndex) {
      backClient.getJsonArrayAt(this.state.currentIndex - 1, (json) => {
        if (json.error) {
          alert('Error: ' + json.error)
        } else {
          this.setState({
            json,
            inputIndex: this.state.currentIndex
          });
          this.editor.jsonEditor.set(json);
        }
      });
    }
  }

  handleOnNext = () => {
    backClient.putJsonArrayAt(this.state.json, this.state.currentIndex- 1, res => {
      if(res.success) {
        const currentIndex = this.state.currentIndex + 1;
        localStorage.setItem('currentIndex', currentIndex);
        this.setState({currentIndex});
      } else {
        alert('Error: ' + res.error);
      }
    });
  }

  handleOnPrev = () => {
    backClient.putJsonArrayAt(this.state.json, this.state.currentIndex-1, res => {
      if(res.success) {
        const currentIndex = this.state.currentIndex - 1;
        localStorage.setItem('currentIndex', currentIndex);
        this.setState({currentIndex});
      } else {
        alert('Error: ' + res.error);
      }
    });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.setState({currentIndex: parseInt(e.target.value)});
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <MuiThemeProvider theme={theme}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <Paper className="pageIndex">
                  <Typography variant="h5" component="h2">
                    <TextField
                      id="currentIndexInput"
                      value={this.state.inputIndex}
                      onChange={e => this.setState({inputIndex: e.target.value})}
                      onBlur={e => this.setState({currentIndex: parseInt(e.target.value)})}
                      onKeyPress={this.handleKeyPress}
                      type="text"
                      margin="normal"
                      variant="outlined"
                    /> / {this.state.size}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
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
              {
                this.state.currentIndex > 1 &&
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
