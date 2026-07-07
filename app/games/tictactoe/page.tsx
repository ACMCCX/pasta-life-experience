'use client';

import { useState, useEffect } from 'react';

type Player = 'X' | 'O' | null;
type GameMode = 'menu' | 'pvp' | 'pva';

const BOWTIE_SVG = (
  <svg viewBox="0 0 100 100" width="50" height="50" className="w-12 h-12">
    <circle cx="35" cy="50" r="18" fill="#e63030" />
    <rect x="53" y="40" width="12" height="20" fill="#ff6b1a" />
    <circle cx="65" cy="50" r="18" fill="#e63030" />
  </svg>
);

const TORTELLINI_SVG = (
  <svg viewBox="0 0 100 100" width="50" height="50" className="w-12 h-12">
    <circle cx="50" cy="50" r="25" fill="#ffd700" />
    <circle cx="50" cy="50" r="20" fill="#f5f5f5" />
    <path
      d="M 50 30 Q 60 50 50 70 Q 40 50 50 30"
      fill="#ffd700"
      opacity="0.6"
    />
  </svg>
);

function calculateWinner(board: Player[]): Player {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function getAIMove(board: Player[]): number {
  // Check if AI can win
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      const testBoard = [...board];
      testBoard[i] = 'O';
      if (calculateWinner(testBoard) === 'O') return i;
    }
  }

  // Check if need to block player
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      const testBoard = [...board];
      testBoard[i] = 'X';
      if (calculateWinner(testBoard) === 'X') return i;
    }
  }

  // Take center if available
  if (board[4] === null) return 4;

  // Take corners
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter((i) => board[i] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // Take any available
  const available = board.map((cell, i) => (cell === null ? i : null)).filter((i) => i !== null) as number[];
  return available[Math.floor(Math.random() * available.length)];
}

export default function TicTacToePage() {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [gameOver, setGameOver] = useState(false);

  const winner = calculateWinner(board);
  const isBoardFull = board.every((cell) => cell !== null);
  const isDraw = !winner && isBoardFull;

  // AI move
  useEffect(() => {
    if (gameMode === 'pva' && !isXNext && !gameOver && !isDraw && !winner) {
      const timer = setTimeout(() => {
        const aiMoveIndex = getAIMove(board);
        const newBoard = [...board];
        newBoard[aiMoveIndex] = 'O';
        setBoard(newBoard);
        setIsXNext(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [board, isXNext, gameMode, gameOver, isDraw, winner]);

  // Check for game end
  useEffect(() => {
    if (winner || isDraw) {
      setGameOver(true);
      if (winner === 'X') {
        setScores((s) => ({ ...s, X: s.X + 1 }));
      } else if (winner === 'O') {
        setScores((s) => ({ ...s, O: s.O + 1 }));
      } else {
        setScores((s) => ({ ...s, draws: s.draws + 1 }));
      }
    }
  }, [winner, isDraw]);

  const handleCellClick = (index: number) => {
    if (board[index] || gameOver) return;
    if (gameMode === 'pva' && !isXNext) return; // AI is playing

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
  };

  const handleBackToMenu = () => {
    setGameMode('menu');
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setScores({ X: 0, O: 0, draws: 0 });
    setGameOver(false);
  };

  // Menu screen
  if (gameMode === 'menu') {
    return (
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          background: 'linear-gradient(180deg, #0d0d0d 0%, #1a0a0a 100%)',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 8vw, 3.5rem)',
              fontWeight: 800,
              color: '#f5f5f5',
              marginBottom: '12px',
              fontFamily: 'var(--font-oswald)',
              letterSpacing: '-0.02em',
            }}
          >
            🎮 Pasta Life Tic-Tac-Toe
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: '#f5f5f5',
              opacity: 0.7,
              marginBottom: '40px',
              lineHeight: 1.5,
            }}
          >
            Bowtie vs. Tortellini. Who will win?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={() => setGameMode('pva')}
              style={{
                padding: '16px 32px',
                fontSize: '16px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #e63030, #ff6b1a)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--font-oswald)',
                letterSpacing: '0.02em',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              👤 Play vs. AI
            </button>
            <button
              onClick={() => setGameMode('pvp')}
              style={{
                padding: '16px 32px',
                fontSize: '16px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #ffd700, #ff6b1a)',
                color: '#0d0d0d',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--font-oswald)',
                letterSpacing: '0.02em',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              👥 Play with Friend
            </button>
          </div>

          <a
            href="/#games"
            style={{
              display: 'inline-block',
              marginTop: '40px',
              color: '#ff6b1a',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            ← Back to Games
          </a>
        </div>
      </main>
    );
  }

  // Game screen
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'linear-gradient(180deg, #0d0d0d 0%, #1a0a0a 100%)',
        fontFamily: 'var(--font-oswald)',
      }}
    >
      <div style={{ maxWidth: '500px', width: '100%' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1
            style={{
              fontSize: 'clamp(1.5rem, 6vw, 2.5rem)',
              fontWeight: 800,
              color: '#f5f5f5',
              marginBottom: '8px',
              letterSpacing: '-0.02em',
            }}
          >
            {gameMode === 'pva' ? '🤖 vs. AI' : '👥 Player vs. Player'}
          </h1>
          <p style={{ color: '#f5f5f5', opacity: 0.6, fontSize: '14px' }}>
            {winner ? (
              <>
                <span style={{ fontSize: '24px' }}>
                  {winner === 'X' ? '🎉' : '🎊'}
                </span>
                <br />
                {winner === 'X' ? 'Bowtie Wins!' : 'Tortellini Wins!'}
              </>
            ) : isDraw ? (
              <>
                <span style={{ fontSize: '24px' }}>🤝</span>
                <br />
                It's a Draw!
              </>
            ) : (
              <>
                {isXNext ? 'Bowtie' : 'Tortellini'}'s Turn
              </>
            )}
          </p>
        </div>

        {/* Scoreboard (always visible) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              background: 'rgba(230, 48, 48, 0.2)',
              border: '1px solid #e63030',
              borderRadius: '8px',
              padding: '12px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '12px', color: '#ff6b1a', fontWeight: 600 }}>
              BOWTIE
            </div>
            <div style={{ fontSize: '24px', color: '#e63030', fontWeight: 800 }}>
              {scores.X}
            </div>
          </div>
          <div
            style={{
              background: 'rgba(255, 215, 0, 0.2)',
              border: '1px solid #ffd700',
              borderRadius: '8px',
              padding: '12px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '12px', color: '#ffd700', fontWeight: 600 }}>
              DRAWS
            </div>
            <div style={{ fontSize: '24px', color: '#ffd700', fontWeight: 800 }}>
              {scores.draws}
            </div>
          </div>
          <div
            style={{
              background: 'rgba(255, 215, 0, 0.2)',
              border: '1px solid #ffd700',
              borderRadius: '8px',
              padding: '12px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '12px', color: '#ffd700', fontWeight: 600 }}>
              {gameMode === 'pva' ? 'AI' : 'TORTELLINI'}
            </div>
            <div style={{ fontSize: '24px', color: '#ffd700', fontWeight: 800 }}>
              {scores.O}
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            marginBottom: '24px',
            background: '#1a1a1a',
            padding: '12px',
            borderRadius: '12px',
            border: '2px solid #2a2a2a',
          }}
        >
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              style={{
                aspectRatio: '1 / 1',
                background: cell ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                border: '2px solid #2a2a2a',
                borderRadius: '8px',
                cursor: cell || gameOver || (gameMode === 'pva' && !isXNext) ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                fontSize: '40px',
              }}
              onMouseEnter={(e) => {
                if (!cell && !gameOver && !(gameMode === 'pva' && !isXNext)) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.borderColor = '#ff6b1a';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = cell ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)';
                e.currentTarget.style.borderColor = '#2a2a2a';
              }}
            >
              {cell === 'X' ? BOWTIE_SVG : cell === 'O' ? TORTELLINI_SVG : ''}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
          {gameOver ? (
            <>
              <button
                onClick={handleRestart}
                style={{
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #e63030, #ff6b1a)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                }}
              >
                ↻ Play Again
              </button>
              <button
                onClick={handleBackToMenu}
                style={{
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: 700,
                  background: 'transparent',
                  color: '#ff6b1a',
                  border: '2px solid #ff6b1a',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                }}
              >
                ← Change Mode
              </button>
            </>
          ) : (
            <button
              onClick={handleBackToMenu}
              style={{
                padding: '14px',
                fontSize: '15px',
                fontWeight: 700,
                background: 'transparent',
                color: '#ff6b1a',
                border: '2px solid #ff6b1a',
                borderRadius: '8px',
                cursor: 'pointer',
                letterSpacing: '0.02em',
              }}
            >
              ← Back to Menu
            </button>
          )}
        </div>

        {/* Mobile hint */}
        <p
          style={{
            fontSize: '12px',
            color: '#f5f5f5',
            opacity: 0.4,
            textAlign: 'center',
            marginTop: '24px',
          }}
        >
          💡 Works on mobile & tablet. Save to home screen for easy access!
        </p>
      </div>
    </main>
  );
}
