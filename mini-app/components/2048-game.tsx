"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

const SIZE = 4;

function createEmptyBoard(): number[][] {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function addRandomTile(board: number[][]): number[][] {
  const empty: [number, number][] = [];
  board.forEach((row, r) =>
    row.forEach((cell, c) => {
      if (cell === 0) empty.push([r, c]);
    })
  );
  if (empty.length === 0) return board;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  const value = Math.random() < 0.9 ? 2 : 4;
  const newBoard = board.map((row) => row.slice());
  newBoard[r][c] = value;
  return newBoard;
}

function transpose(board: number[][]): number[][] {
  return board[0].map((_, i) => board.map((row) => row[i]));
}

function reverseRows(board: number[][]): number[][] {
  return board.map((row) => row.slice().reverse());
}

function slideAndMerge(row: number[]): { newRow: number[]; scoreDelta: number } {
  const nonZero = row.filter((n) => n !== 0);
  const merged: number[] = [];
  let scoreDelta = 0;
  for (let i = 0; i < nonZero.length; i++) {
    if (i + 1 < nonZero.length && nonZero[i] === nonZero[i + 1]) {
      const mergedVal = nonZero[i] * 2;
      merged.push(mergedVal);
      scoreDelta += mergedVal;
      i++; // skip next
    } else {
      merged.push(nonZero[i]);
    }
  }
  while (merged.length < SIZE) merged.push(0);
  return { newRow: merged, scoreDelta };
}

function move(board: number[][], dir: "up" | "down" | "left" | "right"): { board: number[][]; scoreDelta: number } {
  let rotated = board;
  if (dir === "up") rotated = transpose(board);
  if (dir === "down") rotated = reverseRows(transpose(board));
  if (dir === "right") rotated = reverseRows(board);

  let scoreDelta = 0;
  const newRows = rotated.map((row) => {
    const { newRow, scoreDelta: delta } = slideAndMerge(row);
    scoreDelta += delta;
    return newRow;
  });

  let finalBoard = newRows;
  if (dir === "up") finalBoard = transpose(newRows);
  if (dir === "down") finalBoard = transpose(reverseRows(newRows));
  if (dir === "right") finalBoard = reverseRows(newRows);

  return { board: finalBoard, scoreDelta };
}

export default function Game2048() {
  const [board, setBoard] = useState<number[][]>(createEmptyBoard());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    let b = createEmptyBoard();
    b = addRandomTile(b);
    b = addRandomTile(b);
    setBoard(b);
  }, []);

  const handleMove = (dir: "up" | "down" | "left" | "right") => {
    if (gameOver) return;
    const { board: newBoard, scoreDelta } = move(board, dir);
    if (JSON.stringify(newBoard) === JSON.stringify(board)) return; // no change
    setBoard(newBoard);
    setScore((s) => s + scoreDelta);
    const nextBoard = addRandomTile(newBoard);
    setBoard(nextBoard);
    if (!hasMoves(nextBoard)) setGameOver(true);
  };

  const hasMoves = (b: number[][]): boolean => {
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (b[r][c] === 0) return true;
        if (c + 1 < SIZE && b[r][c] === b[r][c + 1]) return true;
        if (r + 1 < SIZE && b[r][c] === b[r + 1][c]) return true;
      }
    }
    return false;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-4 gap-2">
        {board.flat().map((val, idx) => (
          <div
            key={idx}
            className="w-16 h-16 flex items-center justify-center rounded-md border
              border-gray-300 text-2xl font-bold
              bg-gray-200"
          >
            {val !== 0 ? val : null}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleMove("up")}>↑</Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleMove("left")}>←</Button>
          <Button variant="outline" onClick={() => handleMove("down")}>↓</Button>
          <Button variant="outline" onClick={() => handleMove("right")}>→</Button>
        </div>
      </div>
      <div className="text-xl">Score: {score}</div>
      {gameOver && (
        <div className="mt-4">
          <Share text={`I scored ${score} in 2048! ${url}`} />
        </div>
      )}
    </div>
  );
}
>>>>>>> SEARCH
````

mini-app/public/logo.png.todo
````text
<<<<<<< SEARCH
