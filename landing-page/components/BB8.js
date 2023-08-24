import React from 'react';

const BB8 = () => {
    return (
        <div>
            <div style={{
                'fontSize': '20px',
                'textAlign': 'center'
            }}>
                This is the React Component hosted at localhost:8081 in a NextJS App
            </div>
            <div
                style={{
                    'backgroundImage': 'url(https://res.cloudinary.com/omher/image/upload/v1652424876/mf/bb8_zzkms4.png)',
                    'backgroundSize': 'contain',
                    'backgroundRepeat': 'no-repeat',
                    'width': '200px',
                    'height': '200px',
                    'border': '2px solid',
                    'color': 'black',
                    'resize': 'both',
                    'overflow': 'scroll',
                    'margin': 'auto',
                }}
            >
            </div>
        </div>
    );
};

export default BB8;
