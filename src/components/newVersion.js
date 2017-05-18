import React from "react";
import { connect } from 'react-redux';
import _ from "lodash";
import { 
    ValueChanged,
    CreateVersion } from '../actions';

class NewVersion extends React.Component {

    onTextChange(property, event) {
        const value = event.target.value;
        this.props.ValueChanged({ property, value });
        
        if (property === 'TradeId') {
            const Fields = _.find(this.props.Positions, [ 'TradeId', Number(value) ]);
            this.props.ValueChanged({ property: 'AccountNumberVersion', value: Fields.AccountNumber });
            this.props.ValueChanged({ property: 'DirectionVersion', value: Fields.Direction });
            this.props.ValueChanged({ property: 'QuantityVersion', value: Fields.Quantity });
        }
        
    }

    onButtonPress() {
        this.props.CreateVersion(this.props);
    }

    renderSelect() {
        var rows = [];
        if (this.props.Positions.length > 0) {
            this.props.Positions.forEach(function(element) {                
                    rows.push(<option value={element.TradeId}>{element.TradeId}</option>);                
            }, this);
        }
        return rows;
    }
    
    renderError() {
        if (this.props.ErrorVersion.length > 0 ) {
            return (
                <div class="alert alert-danger" role="alert"><span>{this.props.ErrorVersion}</span></div>
            );
        }        
    }

    render() {
        return (
            <div class = "container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">New Version</h3>
                    </div>
                    <table class="table">
                        <tbody>
                            <tr>
                                <td>Trade ID</td>
                                <td>
                                    <select value={this.props.TradeId} class="form-control" onChange={this.onTextChange.bind(this, 'TradeId')}>                                    
                                        {this.renderSelect()}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Account number</td>
                                <td>
                                    <input type="text" value={this.props.AccountNumberVersion} class="form-control" disabled />
                                </td>
                            </tr>
                            <tr>
                                <td>Security Identifier</td>
                                <td>
                                    <input type="text" value={this.props.SecurityIdentifierVersion} class="form-control" onChange={this.onTextChange.bind(this, 'SecurityIdentifierVersion')} />
                                </td>
                            </tr>
                            <tr>
                                <td>Operation</td>
                                <td>
                                    <select value={this.props.OperationVersion} class="form-control" onChange={this.onTextChange.bind(this, 'OperationVersion')}> 
                                        <option value="amend">AMEND</option>
                                        <option value="cancel">CANCEL</option>
                                    </select>
                                </td>                         
                            </tr>
                            <tr>
                                <td>Direction</td>
                                <td>
                                    <input type="text" value={this.props.DirectionVersion.toUpperCase()} disabled class="form-control" />
                                </td>                         
                            </tr>
                            <tr>
                                <td>Quantity</td>
                                <td>
                                    <input type="number" value={this.props.QuantityVersion} class="form-control" onChange={this.onTextChange.bind(this, 'QuantityVersion')} />
                                </td>                         
                            </tr>
                        </tbody>
                    </table>                
                </div>
                <div>
                    <button onClick={this.onButtonPress.bind(this)} type="button" class="btn btn-primary navbar-btn">
                        <b>Generate Version</b>
                    </button>
                </div>
                {this.renderError()}
            </div>
        );
    }
}

const mapStateToProps = state => {
	const { TradeId, AccountNumberVersion, SecurityIdentifierVersion, OperationVersion, DirectionVersion, QuantityVersion, Positions, ErrorVersion } = state;
	return { TradeId, AccountNumberVersion, SecurityIdentifierVersion, OperationVersion, DirectionVersion, QuantityVersion, Positions, ErrorVersion };
};

export default connect(mapStateToProps, { 
    ValueChanged,
    CreateVersion })(NewVersion);