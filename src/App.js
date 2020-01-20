import React from 'react';

import Button from './components/Button';

import './App.css';

//This is the object with all arithmetic operators which we will use in our operators event handler
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    'X': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => +firstOperand + +secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand
};

export default class App extends React.Component {          
    //This is our calculator's state, 
    //with this we will know what is the state of our calculator in further operations
    state = {
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null
    };

    //-------------------------Numbers------------------------//
    integers = e => {
        const value = e.target.value; //caching our event for further operations
        const { waitingForSecondOperand, displayValue } = this.state;

        //if we already have our first operand
        //and we have already typed our operator
        //after that we will clear dsiplay and write it from scratch
        if (waitingForSecondOperand) {
            this.setState({ 
                displayValue: value,
                waitingForSecondOperand: false
            });
        } else {//Else we must just add our digit to the displayValue

            //And if it is the initial "0", we must delete it and set diplay value our pressed digit
            if (displayValue === '0') {
                this.setState({ displayValue: value })
            } else {
                this.setState(prevState => ({ displayValue: prevState.displayValue + value }));
            }

        }
    }

    //if our displayValue is not "0" just type zero or double zero
    zero = e => {
        const value = e.target.value;
        const { displayValue } = this.state;

        if(displayValue.charAt(0) !== "0"){
            this.setState(prevState => ({displayValue: prevState.displayValue + value}))
        }
    }

    //------------------------Operations-------------------------//
    handleOperator = e => {
        const value = e.target.value;
        const { firstOperand, operator, displayValue } = this.state;

        //If we don't have our first operand, just put the displayValue in it
        if (firstOperand === null) {
            this.setState({ firstOperand: parseFloat(displayValue) });
        }

        //Otherwise if we have our first operator already,
        //We must figure out what exactly it is and use one of the methods from {performClaculations} object
        if (operator) {
            const result = performCalculation[operator](firstOperand, displayValue);

            //And set the result of calculation as a firstOperand and displayValue
            this.setState({
                displayValue: `${result}`,
                firstOperand: result
            })
        }

        //And in both cases we are ready to recieve one other operand
        //And set our operator
        this.setState({
            waitingForSecondOperand: true,
            operator: value
        });
    }

    //-----------------------Other Stuff----------------------//
    clear = () =>{
        const { displayValue } = this.state;

        //If theres only one digit left, instead of deleting just write "0"
        //Otherwise just delete one digit from the end
        if(displayValue.length <= 1) {
            this.setState({displayValue: "0"})
        } else { 
            this.setState(prevState => ({ displayValue: prevState.displayValue.slice(0, -1) }))
        } 
    }

    //Set the initial value
    allClear = () => {
        this.setState({
            displayValue: '0',
            firstOperand: null,
            waitingForSecondOperand: false,
            operator: null
        })
    }

    //Set random digit with the same rules as in the {integers} function
    randomInt = () => {
        const { displayValue } = this.state;

        if (displayValue === '0') {
            this.setState({ displayValue: `${Math.floor(Math.random() * 10)}` })
        } else {
            this.setState(prevState => ({ displayValue: prevState.displayValue + `${Math.floor(Math.random() * 10)}` }));
        }
    }

    dot = e => {
        const value = e.target.value;
        const { waitingForSecondOperand, displayValue } = this.state;

        //If we are waiting the second operand, we can't use dot
        if (waitingForSecondOperand === true) return;

        //Because we can't set dot as the first element 
        if(!displayValue.includes(value)){
            this.setState(prevState => ({displayValue: prevState.displayValue + value}));
        }
    }

    render(){
        const { displayValue } = this.state;

        return(
            <div id="calculator">
                <span id="result">
                {/* Avoiding overflowing with the following condition */}
                {displayValue.length > 14 ? displayValue.slice(-14) : displayValue}
                </span>

                <Button buttonHandler={this.clear} value="C"></Button>
                <Button buttonHandler={this.allClear} value="AC"></Button>
                <Button buttonHandler={this.randomInt} value="RAND"></Button>
                <Button buttonHandler={this.handleOperator} value="="></Button>

                <Button buttonHandler={this.integers} value="1"></Button>
                <Button buttonHandler={this.integers} value="2"></Button>
                <Button buttonHandler={this.integers} value="3"></Button>
                <Button buttonHandler={this.handleOperator} value="X"></Button>

                <Button buttonHandler={this.integers} value="4"></Button>
                <Button buttonHandler={this.integers} value="5"></Button>
                <Button buttonHandler={this.integers} value="6"></Button>
                <Button buttonHandler={this.handleOperator} value="/"></Button>

                <Button buttonHandler={this.integers} value="7"></Button>
                <Button buttonHandler={this.integers} value="8"></Button>
                <Button buttonHandler={this.integers} value="9"></Button>
                <Button buttonHandler={this.handleOperator} value="-"></Button>

                <Button buttonHandler={this.zero} value="00"></Button>
                <Button buttonHandler={this.zero} value="0"></Button>
                <Button buttonHandler={this.dot} value="."></Button>
                <Button buttonHandler={this.handleOperator} value="+"></Button>
            </div>
        )
    }
}