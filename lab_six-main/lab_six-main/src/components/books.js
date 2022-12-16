import React from "react";
import { BookItem } from './bookItem';
import Button from "react-bootstrap/Button";


export class Books extends React.Component {
    render() {
        return this.props.books.map(
            (book) => {
                return <BookItem book={book} key={book._id} Reload={this.props.Reload}></BookItem>
            }
        );
    }

}
