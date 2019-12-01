import React, {  Component, Fragment } from 'react';
import './App.css';

class Quote extends Component {
    constructor() {
        super();
        this.state = {
            quote: {
                statement: '',
                author: ''
            },
            hasQuote: false,
        }
        this.getRandomQuote = this.getRandomQuote.bind(this);
        this.renderQuote = this.renderQuote.bind(this);
    }

    getRandomQuote = () => {
        fetch('https://whispering-tor-42997.herokuapp.com/QueenQuotes')
         .then(response => response.json())
         .then(data => {
             console.log(data);
             const randomIndex = Math.floor(Math.random() * 81);
            if(data[randomIndex].statement) {
                let { quote } = this.state;
                let quoteData = data[randomIndex];
                quote.statement = quoteData.statement;
                quote.author = quoteData.author;
                this.setState({ quote }, () => {
                    if(this.state.hasQuote === false) {
                        this.setState({ hasQuote: true })
                    }
                })
            } 
            else {
                return console.error('No quote has been found')
            }
         })
    }

    renderQuote = () => {
        const { statement } = this.state.quote;
        const { author } = this.state.quote;
        return (
            <Fragment>
                <br/>
                <q className="quote">{statement}</q>
                <h3 className="author">{author}</h3>
            </Fragment>
        )
    }

    render() {
        console.log(this.state);
        const { hasQuote } = this.state;
        return (
            <main className="container">
                <img className="background" src={require('../src/dog.jpg')} alt="Lizzo"></img>
                <div className="LizzoQuotes">
                    <h1 className="title">Quotes From Queens</h1>
                    <button className="button" onClick={this.getRandomQuote}>
                    Empower me
                    </button>
                    <br />
                    {hasQuote === true ? this.renderQuote() : ''}
                </div>
            </main>
        )
    }
}

export default Quote;