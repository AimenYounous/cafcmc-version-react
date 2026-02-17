import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true,
            max: 100,
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#888' }
        },
        x: {
            grid: { display: false },
            ticks: { color: '#888' }
        }
    },
    plugins: {
        legend: {
            labels: {
                color: 'white',
                font: { size: 10 }
            }
        }
    }
};

const labels = ['Start', '15\'', '30\'', '45\'', 'Now'];

const AccuracyChart = ({ datasets }) => {
    const data = {
        labels,
        datasets: datasets,
    };

    return (
        <section className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-sm h-full">
            <h2 className="text-xl font-bold mb-4 text-afcon-gold">Who is Near to Win?</h2>
            <Line options={options} data={data} height={200} />
        </section>
    );
};

export default AccuracyChart;
