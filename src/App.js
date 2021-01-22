import React, { Component } from 'react';
import './App.css';

import AddBookmark from './addBookmark/addBookmark';
import BookmarkApp from './bookmarkApp/bookmarkApp';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      showAddForm: false
    };
  }

  setShowAddForm(show) {
    this.setState({
      showAddForm: show
    });
  }

  addBookmark(bookmark) {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark],
      showAddForm: false
    });
  }

  componentDidMount() {
    const key = "$2a$10$xlhKgfmNMPShyTT3pWqk/OkFvH86A8llxzwXTk15.uJY.W21lInHC"
    const url = 'https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks';
    const options = {
      method: 'GET',
      headers: {
        // Add your key after Bearer
        "Authorization": "Bearer " + key,
        "Content-Type": "application/json"
      }
    };

    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        const countries = Object.keys(data)
          .map(key => data[key].item[0]);
        console.log(countries);
      }
      )

      .catch(err => {
        this.setState({
          error: err.message
        });
      });

  }

  render() {

    const page = this.state.showAddForm
      ? <AddBookmark showForm={show => this.setShowAddForm(show)} handleAdd={bookmark => this.addBookmark(bookmark)} />
      : <BookmarkApp bookmarks={this.state.bookmarks} showForm={show => this.setShowAddForm(show)} />;

    return (
      <div className="App">
        { page}
      </div>
    );
  }
}

export default App;
