import React from 'react';

export default function InputLayout({className ='', children}) {
    return (
        <div className={`text_input ${className}`}>
            {children}
        </div>
    );
}