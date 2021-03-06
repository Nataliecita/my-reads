import React from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from '../../BooksAPI'
import Bookshelf from '../Bookshelf'


class MainPage extends React.Component {

	state = {
		books: []
	}

	// fetch data
	componentDidMount(){
		BooksAPI.getAll()
			.then(response =>{
				this.setState({ books: response}) 
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

	// Show the books in their respective shelves
	render(){
		return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
          	<Bookshelf updateBookShelf={this.updateBookShelf} name="Currently Reading" books={this.state.books.filter(book => book.shelf === "currentlyReading")}/>
        	<Bookshelf updateBookShelf={this.updateBookShelf} name="Want to Read" books={this.state.books.filter(book => book.shelf === "wantToRead")}/>
          	<Bookshelf updateBookShelf={this.updateBookShelf} name="Read" books={this.state.books.filter(book => book.shelf === "read")}/>
          </div>
         </div>
         <div className="open-search">
         	<Link to="/search"> Add a book</Link>
         </div>
      </div>
		)
	}
}

export default MainPage