import React from 'react';

const MyButton = ({ onClick }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <button onClick={handleClick}>Click Me</button>
    );
};

export default MyButton;