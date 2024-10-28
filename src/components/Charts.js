import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Day 1', visits: 4, pushups: 10 },
  { name: 'Day 2', visits: 3, pushups: 20 },
  { name: 'Day 3', visits: 5, pushups: 15 },
];

const Charts = () => {
    return (
        <LineChart width={600} height={300} data={data}>
            <Line type="monotone" dataKey="visits" stroke="#8884d8" />
            <Line type="monotone" dataKey="pushups" stroke="#82ca9d" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
    );
};

export default Charts;