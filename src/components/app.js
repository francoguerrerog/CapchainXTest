import React from "react";
import { Link } from "react-router";

const App = (props) => {
    return (
    <div class="container">
        <div class="page-header">
            <h1>CapchainX</h1>
        </div>
        { props.children }
    </div>  
    );      
};

export default App;
