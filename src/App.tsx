import React from 'react';
import { Game } from './components/Game';
import './index.css';

export default function App() {
  return (
    <div id="game-root">
      <div className="grid-bg" />
      <div className="game-wrap">
        <Game />
      </div>
    </div>
  );
}
