import React from 'react';
import Charts from './Charts';
import MyCalendar from './Calendar';
import ManualInput from './ManualInput';

const Track = () => {
    return (
        <div>
            <h1>Track</h1>
            <p>Track your activities here.</p>
            <ManualInput />
            <Charts />
            <MyCalendar />
        </div>
    );
};

export default Track;