import React, { useState } from 'react';

const ManualInput = () => {
    const [beerCount, setBeerCount] = useState(0);
    const [pushupCount, setPushupCount] = useState(0);

    const handleBeerClick = () => {
        setBeerCount(beerCount + 1);
        // Hier kannst du die API-Integration hinzufügen
    };

    const handlePushupClick = () => {
        setPushupCount(pushupCount + 1);
        // Hier kannst du die API-Integration hinzufügen
    };

    return (
        <div>
            <button onClick={handleBeerClick}>Add Beer</button>
            <button onClick={handlePushupClick}>Add Pushup</button>
            <p>Beers: {beerCount}</p>
            <p>Pushups: {pushupCount}</p>
        </div>
    );
};

export default ManualInput;