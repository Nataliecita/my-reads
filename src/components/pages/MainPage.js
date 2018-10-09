import React from 'react'
import * as BooksAPI from '../../BooksAPI'

import Bookshelf from '../Bookshelf'


class MainPage extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			books: []
		}
	}

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
               <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
             </div>
           </div>
		)
	}
}

export default MainPage