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
				console.log(response)
				this.setState({ books: response}) 
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
              	<Bookshelf name="Currently Reading" books={this.state.books.filter(book => book.shelf === "currentlyReading")}/>
            	<Bookshelf name="Want to Read" books={this.state.books.filter(book => book.shelf === "wantToRead")}/>
              	<Bookshelf name="Read" books={this.state.books.filter(book => book.shelf === "read")}/>
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