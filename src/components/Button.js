import React from 'react';
import PropTypes from 'prop-types';

import '../App.css';

const Button = props => {
    const { value, buttonHandler } = props;
    
    return (
        <button className="buttons" value={value} onClick={(e) => buttonHandler(e, "value")}>{value}</button>
    )
}

export default Button;

Button.propTypes = {
    buttonHandler: PropTypes.func.isRequired
};

Button.defaultProps = {
    buttonHandler: () => console.log('Sorry, the button is not initialized yet')
}