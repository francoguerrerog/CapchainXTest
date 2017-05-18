import React from "react";
import { connect } from 'react-redux';

class Home extends React.Component {
    
    renderPositions() {
        var rows = [];
        if (this.props.Positions.length > 0) {
            this.props.Positions.forEach(function(element) {                
                    rows.push(
                        <tr>
                            <td>{ element.AccountNumber }</td>
                            <td>{ element.TradeId }</td>
                            <td>{ element.TradeVersion }</td>
                            <td>{ element.Direction.toUpperCase() }</td>
                            <td>{ element.Operation.toUpperCase() }</td>
                            <td>{ element.Quantity }</td>
                        </tr>
                    );                
            }, this);
        }
        return rows;
    }

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Total Quantity</h3>
                    </div>
                    <div class="panel-body">
                        {this.props.TotalQuantity}
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Account number</th>
                                <th>Trade ID</th>
                                <th>Trade Version</th>
                                <th>Direction</th>
                                <th>Operation</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.renderPositions() }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
	const { TotalQuantity, Positions } = state;
	return { TotalQuantity, Positions };
};

export default connect(mapStateToProps, null)(Home);