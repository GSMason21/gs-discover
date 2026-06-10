import React from 'react';
import ReactDOM from 'react-dom/client';
import { QuizApp } from '../../shared/QuizApp';
import { QUIZ_CONFIG, QUESTIONS, PERSONAS } from './constants';
import '../../shared/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QuizApp config={QUIZ_CONFIG} questions={QUESTIONS} personas={PERSONAS} />
  </React.StrictMode>
);
