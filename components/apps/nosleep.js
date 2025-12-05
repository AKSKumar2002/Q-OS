import React from 'react';

export function displayNoSleep() {
    return (
        <iframe
            src="./components/apps/NS/index.html"
            frameBorder="0"
            title="No Sleep App"
            className="h-full w-full bg-ub-cool-grey"
        />
    );
}

export default displayNoSleep;
