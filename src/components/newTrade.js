import React from "react";
import { connect } from 'react-redux';
import { 
    ValueChanged,
    CreateTrade } from '../actions';

class NewTrade extends React.Component {

    onTextChange(property, event) {
        const value = event.target.value;
        this.props.ValueChanged({ property, value });
    }

    onButtonPress() {
        this.props.CreateTrade(this.props);
    }

    renderError() {
        if (this.props.Error.length > 0 ) {
            return (
                <div class="alert alert-danger" role="alert"><span>{this.props.Error}</span></div>
            );
        }        
    }
    
    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">New Trade</h3>
                    </div>
                    <table class="table">
                        <tbody>
                            <tr>
                                <td>Account number</td>
                                <td>
                                    <input type="text" value={this.props.AccountNumber} class="form-control" onChange={this.onTextChange.bind(this, 'AccountNumber')} />
                                </td>
                            </tr>
                            <tr>
                                <td>Security Identifier</td>
                                <td>
                                    <input type="text" value={this.props.SecurityIdentifier} class="form-control" onChange={this.onTextChange.bind(this, 'SecurityIdentifier')} />
                                </td>
                            </tr>
                            <tr>
                                <td>Direction</td>
                                <td>
                                    <select value={this.props.Direction} class="form-control" onChange={this.onTextChange.bind(this, 'Direction')}>
                                        <option value="buy">BUY</option>
                                        <option value="sell">SELL</option>                        
                                    </select>
                                </td>                         
                            </tr>
                            <tr>
                                <td>Quantity</td>
                                <td>
                                    <input type="number" value={this.props.Quantity} class="form-control" onChange={this.onTextChange.bind(this, 'Quantity')} />
                                </td>                         
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <button onClick={this.onButtonPress.bind(this)} type="button" class="btn btn-primary navbar-btn">
                        <b>Generate Trade</b>
                    </button>
                </div>
                {this.renderError()}
            </div>
        );
    }
}

const mapStateToProps = state => {
	const { AccountNumber, SecurityIdentifier, Operation, Direction, Quantity, Error } = state;
	return { AccountNumber, SecurityIdentifier, Operation, Direction, Quantity, Error };
};

export default connect(mapStateToProps, { 
    ValueChanged,
    CreateTrade })(NewTrade);