import React from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

import * as BooksAPI from '../../BooksAPI'
import Book from '../Book'



class SearchPage extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      books: [],
      results: [],
      query: ""
    }
  }

  componentDidMount(){
    BooksAPI.getAll()
      .then(response =>{
        this.setState({ books: response}) 
      })
  }

  updateQuery = (query )=> {
    // this.setState({ query: query.trim() })
    this.setState({ query: query }, this.submitQuery)
  }

  submitQuery() {
    if(this.state.query === "" || this.state.query === "undefinded"){
      return this.setState({ results: [] })
    }
    BooksAPI.search(this.state.query.trim()).then( response =>{
      if(response.error){
        return this.setState({ results: [] })
      } else {
        response.forEach(book => {
          let filter = this.state.books.filter(b => b.id === book.id)

          if(filter[0]){
            book.shelf = filter[0].shelf
          }
        })
        return this.setState({ results: response})
      }
    })
  }

  updateBookShelf = (book, shelf) => {
      BooksAPI.update(book, shelf)
          .then(() => {
            book.shelf = shelf
            this.setState(state =>({
              books: state.books.filter(b => b.id !== book.id).concat([book])
            }))
          })
  }


	render(){
		return (
			<div className="search-books">
        <div className="search-books-bar">

          <Link className="close-search "to="/">Close</Link>
          <div className="search-books-input-wrapper">

            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.results.map((item, key) =>  <Book updateBookShelf= {this.updateBookShelf} book={item} key={key} />)
            }
          </ol>
        </div>
      </div>
		)
	}
}

export default SearchPage