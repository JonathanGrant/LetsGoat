import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const giphy = 'https://api.giphy.com/v1/gifs/search?api_key=K9654qRl1lOrwllarrPZp3AfCOCuXZsH&limit=1&q=';
const tenor = 'https://api.tenor.com/v1/search?key=9T5XLH0PXOSB&limit=1&q=';

class TenorGifs extends Component {
  componentWillReceiveProps(newProps) {
    setTimeout(() => {
      var url = tenor + newProps.name + ' ' + newProps.meme
      fetch(url)
      .then(results => {
        return results.json()
      }).then(data => {
        console.log(data)
        let imgUrl = data.results[0].media[0].gif.url
        this.setState({url: imgUrl, loading: false, data: data})
      })
    }, 500)
    this.setState({loading: true})
  }

  render() {
    console.log(this)
    if (this.state && !this.state.loading) {
      return (
        <img src={this.state.url} className="col-lg-6 col-md-6 col-sm-12" />
      )
    } else {
      return (null
      )
    }
  }
}


class GifShow extends Component {

  componentWillReceiveProps(newProps) {
    setTimeout(() => {
      var url = giphy + newProps.name + ' ' + newProps.meme
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
        <img src={this.state.url} className="col-lg-6 col-md-6 col-sm-12" />
      )
    } else {
      return (null
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
        <div className="row" style={{display: 'flow-root'}}>
          <GifShow meme={this.state.meme} name={this.props.match? this.props.match.params.name : 'goat'} />
          <TenorGifs meme={this.state.meme} name={this.props.match? this.props.match.params.name : 'goat'} />
        </div>
        <InputBox func={this.onEdit.bind(this)} />
        </header>
      </div>
    );
  }
}

export default App;
