import React, { useState, useEffect } from 'react';

import { CombatSystem } from '../services/CombatSystem';
import { EnemyGenerator } from '../services/EnemyGenerator';
import { PlayerModule } from '../services/PlayerModule';
import { TEnemy } from '../types/EnemyType';

export const Game: React.FC = () => {
  const [playerModule] = useState(() => new PlayerModule('Hero'));
  const [enemy, setEnemy] = useState<TEnemy | null>(null);
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [isFighting, setIsFighting] = useState(false);

  const startBattle = () => {
    if (isFighting) return;
    
    const newEnemy = EnemyGenerator.createEnemy(playerModule.player.level);
    setEnemy(newEnemy);
    setIsFighting(true);
    
    const combat = new CombatSystem(playerModule.player, newEnemy);
    const originalLog = console.log;
    const battleLogs: string[] = [];
    
    // Capture console logs
    console.log = (message: string) => {
      battleLogs.push(message);
      setCombatLog(prev => [...prev, message]);
    };

    combat.startBattle();
    console.log = originalLog;
  };

  return (
    <div className="game-container">
      <div className="player-stats">
        <h2>Player Stats</h2>
        <p>Name: {playerModule.player.name}</p>
        <p>Level: {playerModule.player.level}</p>
        <p>Health: {playerModule.player.stats.health}/{playerModule.player.stats.maxHealth}</p>
        <p>Attack: {playerModule.player.stats.attack}</p>
        <p>Defense: {playerModule.player.stats.defense}</p>
      </div>

      <div className="inventory">
        <h2>Inventory</h2>
        <ul>
          {playerModule.player.inventory.map((item, index) => (
            <li key={`${item.id}-${index}`}>
              {item.name} x{item.quantity}
            </li>
          ))}
        </ul>
      </div>

      <div className="combat-controls">
        <button 
          onClick={startBattle}
          disabled={isFighting}
        >
          Start Battle
        </button>
      </div>

      <div className="combat-log">
        <h2>Combat Log</h2>
        <div className="log-container">
          {combatLog.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};