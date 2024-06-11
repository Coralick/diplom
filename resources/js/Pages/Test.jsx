import React from 'react';

function Test({auth,table, ...props}) {
    console.log(auth, table)
    return (
        <div>
            test
        </div>
    );
}

export default Test;