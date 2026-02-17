import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PredictionPage from './pages/PredictionPage';
import QuizPage from './pages/Quiz';
import MemoPage from './pages/Memo';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/predict" element={<PredictionPage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/memo" element={<MemoPage />} />
            </Routes>
        </Router>
    );
}

export default App;
