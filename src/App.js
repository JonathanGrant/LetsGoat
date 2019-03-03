import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const giphy = 'https://api.giphy.com/v1/gifs/search?api_key=K9654qRl1lOrwllarrPZp3AfCOCuXZsH&limit=1&q=meme ';

class GifShow extends Component {

  componentWillReceiveProps(newProps) {
    setTimeout(() => {
      var url = giphy + newProps.meme
      fetch(url)
      .then(results => {
        return results.json()
      }).then(data => {
        console.log(data)
        let imgUrl = data.data[0].images.original.url
        this.setState({url: imgUrl, loading: false, data: data})
      })
    }, 500)
    this.setState({loading: true})
  }

  render() {
    console.log(this)
    if (this.state && !this.state.loading) {
      return (
        <div>
          <img src={this.state.url} />
        </div>
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

class InputBox extends Component {

  constructor(props) {
    super(props);
    this.state = {text: 'goat'}
  }

  render() {
    return (
      <input type="text" name="meme" onChange={this.props.func}/>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {meme: 'goat'}
  }

  onEdit(e) {
    console.log(e.target.value)
    this.setState({meme: e.target.value})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <GifShow meme={this.state.meme} />
        <InputBox func={this.onEdit.bind(this)} />
        </header>
      </div>
    );
  }
}

export default App;
