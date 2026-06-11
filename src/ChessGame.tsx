import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Bot,
  Brain,
  Crown,
  Flag,
  Gamepad2,
  Play,
  RotateCcw,
  Shield,
  Sparkles,
  Swords,
  Target,
  Trophy,
  UserRound,
} from "lucide-react";

type Color = "w" | "b";
type PieceType = "p" | "r" | "n" | "b" | "q" | "k";
type Piece = { type: PieceType; color: Color };
type Board = Array<Array<Piece | null>>;
type Square = { r: number; c: number };
type Move = Square & { toR: number; toC: number; captured?: Piece | null; promotion?: PieceType };
type GameMode = "menu" | "playing";
type PlayMode = "bot" | "local";
type BotLevel = "easy" | "normal" | "hard";

type ChessGameProps = {
  onBackToPortfolio: () => void;
};

const pieceSymbols: Record<Color, Record<PieceType, string>> = {
  w: { k: "♔", q: "♕", r: "♖", b: "♗", n: "♘", p: "♙" },
  b: { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" },
};

const pieceNames: Record<PieceType, string> = {
  k: "King",
  q: "Queen",
  r: "Rook",
  b: "Bishop",
  n: "Knight",
  p: "Pawn",
};

const pieceValues: Record<PieceType, number> = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 99,
};


const botLevelLabels: Record<BotLevel, string> = {
  easy: "Easy",
  normal: "Normal",
  hard: "Hard",
};

const botLevelDescriptions: Record<BotLevel, string> = {
  easy: "Random ringan",
  normal: "Seimbang",
  hard: "Lebih agresif",
};

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const inside = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8;
const opposite = (color: Color): Color => (color === "w" ? "b" : "w");

function createBoard(): Board {
  const empty: Board = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null));
  const back: PieceType[] = ["r", "n", "b", "q", "k", "b", "n", "r"];

  for (let c = 0; c < 8; c++) {
    empty[0][c] = { type: back[c], color: "b" };
    empty[1][c] = { type: "p", color: "b" };
    empty[6][c] = { type: "p", color: "w" };
    empty[7][c] = { type: back[c], color: "w" };
  }

  return empty;
}

function cloneBoard(board: Board): Board {
  return board.map(row => row.map(piece => (piece ? { ...piece } : null)));
}

function coord(square: Square) {
  return `${files[square.c]}${8 - square.r}`;
}

function getPseudoMoves(board: Board, r: number, c: number): Move[] {
  const piece = board[r][c];
  if (!piece) return [];

  const moves: Move[] = [];
  const add = (toR: number, toC: number) => {
    if (!inside(toR, toC)) return;
    const target = board[toR][toC];
    if (!target || target.color !== piece.color) {
      moves.push({ r, c, toR, toC, captured: target ?? null });
    }
  };

  if (piece.type === "p") {
    const dir = piece.color === "w" ? -1 : 1;
    const start = piece.color === "w" ? 6 : 1;
    const nextR = r + dir;

    if (inside(nextR, c) && !board[nextR][c]) {
      moves.push({ r, c, toR: nextR, toC: c, promotion: nextR === 0 || nextR === 7 ? "q" : undefined });
      const twoR = r + dir * 2;
      if (r === start && inside(twoR, c) && !board[twoR][c]) {
        moves.push({ r, c, toR: twoR, toC: c });
      }
    }

    for (const dc of [-1, 1]) {
      const tr = r + dir;
      const tc = c + dc;
      if (inside(tr, tc) && board[tr][tc] && board[tr][tc]?.color !== piece.color) {
        moves.push({ r, c, toR: tr, toC: tc, captured: board[tr][tc], promotion: tr === 0 || tr === 7 ? "q" : undefined });
      }
    }
  }

  if (piece.type === "n") {
    for (const [dr, dc] of [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]) {
      add(r + dr, c + dc);
    }
  }

  if (["b", "r", "q"].includes(piece.type)) {
    const directions: number[][] = [];
    if (["b", "q"].includes(piece.type)) directions.push([-1, -1], [-1, 1], [1, -1], [1, 1]);
    if (["r", "q"].includes(piece.type)) directions.push([-1, 0], [1, 0], [0, -1], [0, 1]);

    for (const [dr, dc] of directions) {
      let tr = r + dr;
      let tc = c + dc;
      while (inside(tr, tc)) {
        const target = board[tr][tc];
        if (!target) {
          moves.push({ r, c, toR: tr, toC: tc });
        } else {
          if (target.color !== piece.color) moves.push({ r, c, toR: tr, toC: tc, captured: target });
          break;
        }
        tr += dr;
        tc += dc;
      }
    }
  }

  if (piece.type === "k") {
    for (const dr of [-1, 0, 1]) {
      for (const dc of [-1, 0, 1]) {
        if (dr !== 0 || dc !== 0) add(r + dr, c + dc);
      }
    }
  }

  return moves;
}

function applyMove(board: Board, move: Move): Board {
  const next = cloneBoard(board);
  const piece = next[move.r][move.c];
  next[move.r][move.c] = null;
  if (piece) {
    next[move.toR][move.toC] = {
      ...piece,
      type: move.promotion ?? piece.type,
    };
  }
  return next;
}

function findKing(board: Board, color: Color): Square | null {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p?.type === "k" && p.color === color) return { r, c };
    }
  }
  return null;
}

function isSquareAttacked(board: Board, square: Square, attacker: Color): boolean {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (!p || p.color !== attacker) continue;
      const moves = getPseudoMoves(board, r, c);
      if (moves.some(m => m.toR === square.r && m.toC === square.c)) return true;
    }
  }
  return false;
}

function isKingInCheck(board: Board, color: Color): boolean {
  const king = findKing(board, color);
  if (!king) return true;
  return isSquareAttacked(board, king, opposite(color));
}

function getLegalMoves(board: Board, color: Color, from?: Square): Move[] {
  const moves: Move[] = [];
  const startRows = from ? [from.r] : [0, 1, 2, 3, 4, 5, 6, 7];
  const startCols = from ? [from.c] : [0, 1, 2, 3, 4, 5, 6, 7];

  for (const r of startRows) {
    for (const c of startCols) {
      const piece = board[r][c];
      if (!piece || piece.color !== color) continue;
      for (const move of getPseudoMoves(board, r, c)) {
        const next = applyMove(board, move);
        if (!isKingInCheck(next, color)) moves.push(move);
      }
    }
  }

  return moves;
}

function materialScore(board: Board, color: Color): number {
  return board.flat().reduce((total, piece) => {
    if (!piece) return total;
    return total + (piece.color === color ? pieceValues[piece.type] : -pieceValues[piece.type]);
  }, 0);
}

function centerBonus(move: Move): number {
  const centerDistance = Math.abs(3.5 - move.toR) + Math.abs(3.5 - move.toC);
  return Math.max(0, 4 - centerDistance) * 0.45;
}

function evaluateMove(board: Board, move: Move, botColor: Color): number {
  const target = board[move.toR][move.toC];
  const next = applyMove(board, move);
  let score = Math.random() * 0.45;
  if (target) score += pieceValues[target.type] * 8;
  if (move.promotion) score += 14;
  if (isKingInCheck(next, opposite(botColor))) score += 5;
  score += centerBonus(move);

  const piece = board[move.r][move.c];
  if (piece?.type === "q" && !target) score -= 0.4;
  if (piece?.type === "p") score += 0.25;
  return score;
}

function chooseBotMove(board: Board, botColor: Color, level: BotLevel): Move | null {
  const moves = getLegalMoves(board, botColor);
  if (!moves.length) return null;

  if (level === "easy") {
    const captureMoves = moves.filter(move => board[move.toR][move.toC]);
    const pool = captureMoves.length && Math.random() > 0.65 ? captureMoves : moves;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  const scored = moves
    .map(move => {
      const next = applyMove(board, move);
      const opponentMoves = getLegalMoves(next, opposite(botColor));
      const isMate = opponentMoves.length === 0 && isKingInCheck(next, opposite(botColor));
      const opponentBestCapture = opponentMoves.reduce((best, reply) => {
        const captured = next[reply.toR][reply.toC];
        return Math.max(best, captured ? pieceValues[captured.type] : 0);
      }, 0);

      let score = evaluateMove(board, move, botColor);

      if (level === "hard") {
        score += materialScore(next, botColor) * 1.15;
        score += Math.min(6, getLegalMoves(next, botColor).length * 0.08);
        score -= opponentBestCapture * 2.7;
        if (isMate) score += 999;
      } else {
        score += materialScore(next, botColor) * 0.5;
      }

      return { move, score };
    })
    .sort((a, b) => b.score - a.score);

  if (level === "normal") {
    const top = scored.slice(0, Math.min(3, scored.length));
    return top[Math.floor(Math.random() * top.length)].move;
  }

  return scored[0].move;
}

function countMaterial(board: Board) {
  const score = { w: 0, b: 0 };
  board.flat().forEach(piece => {
    if (piece) score[piece.color] += pieceValues[piece.type];
  });
  return score;
}

function capturedPieces(board: Board, color: Color) {
  const startCounts: Record<PieceType, number> = { p: 8, r: 2, n: 2, b: 2, q: 1, k: 1 };
  const current: Record<PieceType, number> = { p: 0, r: 0, n: 0, b: 0, q: 0, k: 0 };
  board.flat().forEach(piece => {
    if (piece?.color === color) current[piece.type] += 1;
  });
  return (Object.keys(startCounts) as PieceType[]).flatMap(type => {
    const missing = startCounts[type] - current[type];
    return Array.from({ length: Math.max(0, missing) }, () => ({ type, color }));
  });
}

export default function ChessGameView({ onBackToPortfolio }: ChessGameProps) {
  const [mode, setMode] = useState<GameMode>("menu");
  const [playMode, setPlayMode] = useState<PlayMode>("bot");
  const [botLevel, setBotLevel] = useState<BotLevel>("normal");
  const [playerSide, setPlayerSide] = useState<Color>("w");
  const [board, setBoard] = useState<Board>(() => createBoard());
  const [turn, setTurn] = useState<Color>("w");
  const [selected, setSelected] = useState<Square | null>(null);
  const [legalTargets, setLegalTargets] = useState<Move[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [lastMove, setLastMove] = useState<Move | null>(null);
  const [thinking, setThinking] = useState(false);

  const legalMoves = useMemo(() => getLegalMoves(board, turn), [board, turn]);
  const material = useMemo(() => countMaterial(board), [board]);
  const whiteCaptured = useMemo(() => capturedPieces(board, "b"), [board]);
  const blackCaptured = useMemo(() => capturedPieces(board, "w"), [board]);
  const inCheck = useMemo(() => isKingInCheck(board, turn), [board, turn]);
  const gameOver = mode === "playing" && legalMoves.length === 0;
  const resultText = gameOver
    ? inCheck
      ? turn === "w"
        ? "Black Wins by Checkmate"
        : "White Wins by Checkmate"
      : "Draw by Stalemate"
    : "";

  const resetGame = (nextMode: GameMode = mode) => {
    setBoard(createBoard());
    setTurn("w");
    setSelected(null);
    setLegalTargets([]);
    setHistory([]);
    setLastMove(null);
    setThinking(false);
    setMode(nextMode);
  };

  const startGame = () => {
    resetGame("playing");
  };

  const commitMove = (move: Move, actor: Color) => {
    const piece = board[move.r][move.c];
    if (!piece) return;
    const captured = board[move.toR][move.toC];
    const notation = `${actor === "w" ? "White" : "Black"}: ${pieceNames[piece.type]} ${coord({ r: move.r, c: move.c })} → ${coord({ r: move.toR, c: move.toC })}${captured ? ` captures ${pieceNames[captured.type]}` : ""}${move.promotion ? " = Queen" : ""}`;

    setBoard(prev => applyMove(prev, move));
    setTurn(opposite(actor));
    setSelected(null);
    setLegalTargets([]);
    setLastMove(move);
    setHistory(prev => [notation, ...prev].slice(0, 8));
  };

  const handleSquareClick = (r: number, c: number) => {
    if (mode !== "playing" || gameOver || thinking) return;
    if (playMode === "bot" && turn !== playerSide) return;

    const piece = board[r][c];
    const targetMove = selected ? legalTargets.find(m => m.toR === r && m.toC === c) : undefined;

    if (targetMove) {
      commitMove(targetMove, turn);
      return;
    }

    if (piece?.color === turn) {
      const targets = getLegalMoves(board, turn, { r, c });
      setSelected({ r, c });
      setLegalTargets(targets);
      return;
    }

    setSelected(null);
    setLegalTargets([]);
  };

  useEffect(() => {
    if (mode !== "playing" || playMode !== "bot" || gameOver || turn === playerSide || thinking) return;

    const timer = window.setTimeout(() => {
      setThinking(true);
      window.setTimeout(() => {
        const best = chooseBotMove(board, turn, botLevel);
        if (best) commitMove(best, turn);
        setThinking(false);
      }, 520);
    }, 380);

    return () => window.clearTimeout(timer);
  }, [mode, playMode, gameOver, turn, playerSide, thinking, board, botLevel]);

  const visibleBoard = playerSide === "w" ? board : [...board].reverse().map(row => [...row].reverse());
  const translateVisibleToReal = (vr: number, vc: number) => {
    if (playerSide === "w") return { r: vr, c: vc };
    return { r: 7 - vr, c: 7 - vc };
  };

  const turnLabel = turn === "w" ? "White" : "Black";
  const activePlayer = playMode === "bot" ? (turn === playerSide ? "Your Turn" : `Bot ${botLevelLabels[botLevel]} Thinking`) : `${turnLabel} Turn`;

  return (
    <motion.main
      key="chess-game-view"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="flex-grow max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 w-full max-w-full overflow-x-hidden space-y-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full max-w-full overflow-hidden">
        <div className="space-y-2">
          <button
            onClick={onBackToPortfolio}
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Portofolio
          </button>
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3 py-1 mb-3">
              <Gamepad2 className="h-3.5 w-3.5" />
              Playable Chess Game
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white">
              Neon Chess <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Arena</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-3xl mt-3 leading-relaxed">
              Game catur modern untuk portfolio: pilih mode, gerakkan bidak, lawan bot lokal, pilih level bot, lihat legal move, capture history, check status, dan animasi board yang clean.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto max-w-full min-w-0">
          <StatCard label="Mode" value={playMode === "bot" ? "vs Bot" : "Local"} icon={<Bot className="h-4 w-4" />} />
          <StatCard label="Level" value={playMode === "bot" ? botLevelLabels[botLevel] : "-"} icon={<Brain className="h-4 w-4" />} />
          <StatCard label="Turn" value={thinking ? "Bot" : turnLabel} icon={<Target className="h-4 w-4" />} />
          <StatCard label="Material" value={`${material.w}-${material.b}`} icon={<Trophy className="h-4 w-4" />} />
        </div>
      </div>

      {mode === "menu" ? (
        <GameMenu
          playMode={playMode}
          setPlayMode={setPlayMode}
          playerSide={playerSide}
          setPlayerSide={setPlayerSide}
          botLevel={botLevel}
          setBotLevel={setBotLevel}
          startGame={startGame}
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <section className="xl:col-span-8 bg-cyber-card/60 card-gloss border border-cyan-500/10 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/5">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 border-b border-white/5 bg-slate-950/40">
              <div className="flex items-center gap-3">
                <div className={`h-11 w-11 rounded-2xl flex items-center justify-center border ${turn === "w" ? "bg-white text-slate-950 border-white" : "bg-slate-950 text-white border-slate-600"}`}>
                  <Crown className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Battle Status</p>
                  <h3 className="text-lg font-display font-bold text-white">
                    {gameOver ? resultText : activePlayer}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {inCheck && !gameOver && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-orange-500/10 border border-orange-400/20 text-orange-300 text-xs font-mono">
                    <Shield className="h-3.5 w-3.5" />
                    CHECK
                  </span>
                )}
                <button
                  onClick={() => resetGame("playing")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white hover:border-cyan-400/40 transition-all"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>
                <button
                  onClick={() => setMode("menu")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-xs text-cyan-300 hover:bg-cyan-500/20 transition-all"
                >
                  <Flag className="h-4 w-4" />
                  Ganti Mode
                </button>
              </div>
            </div>

            <div className="relative p-4 sm:p-8 bg-[radial-gradient(circle_at_50%_35%,rgba(34,211,238,0.16),transparent_28%),linear-gradient(135deg,rgba(2,6,23,0.95),rgba(15,23,42,0.92))]">
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(34,211,238,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.12) 1px, transparent 1px)", backgroundSize: "34px 34px" }}></div>

              <div className="relative mx-auto w-full max-w-[720px] aspect-square rounded-2xl sm:rounded-[2rem] border border-cyan-500/20 bg-slate-950/75 p-1.5 sm:p-4 shadow-2xl shadow-cyan-500/10">
                <div className="grid grid-cols-8 grid-rows-8 w-full h-full rounded-[1.35rem] overflow-hidden border border-white/10">
                  {visibleBoard.map((row, vr) => row.map((piece, vc) => {
                    const { r, c } = translateVisibleToReal(vr, vc);
                    const isLight = (r + c) % 2 === 0;
                    const isSelected = selected?.r === r && selected?.c === c;
                    const target = legalTargets.find(m => m.toR === r && m.toC === c);
                    const isLast = lastMove && ((lastMove.r === r && lastMove.c === c) || (lastMove.toR === r && lastMove.toC === c));
                    const isKingCheck = piece?.type === "k" && piece.color === turn && inCheck;

                    return (
                      <button
                        key={`${r}-${c}`}
                        onClick={() => handleSquareClick(r, c)}
                        className={`relative flex items-center justify-center select-none transition-all duration-200 ${
                          isLight ? "bg-cyan-950/70" : "bg-slate-900/95"
                        } ${isSelected ? "ring-4 ring-cyan-300/80 z-10" : ""} ${isLast ? "after:absolute after:inset-0 after:bg-emerald-400/12" : ""} ${isKingCheck ? "animate-pulse bg-orange-500/30" : ""}`}
                      >
                        <span className="absolute top-1 left-1 text-[9px] sm:text-[10px] font-mono text-slate-500">
                          {vc === 0 ? 8 - r : ""}
                        </span>
                        <span className="absolute bottom-1 right-1 text-[9px] sm:text-[10px] font-mono text-slate-500">
                          {vr === 7 ? files[c] : ""}
                        </span>

                        {target && (
                          <span className={`absolute rounded-full ${piece ? "inset-[18%] border-4 border-orange-300/70" : "h-4 w-4 sm:h-5 sm:w-5 bg-cyan-300/80 shadow-lg shadow-cyan-400/40"}`}></span>
                        )}

                        <AnimatePresence mode="popLayout">
                          {piece && (
                            <motion.span
                              key={`${piece.color}-${piece.type}-${r}-${c}`}
                              initial={{ scale: 0.8, opacity: 0, y: -8 }}
                              animate={{ scale: 1, opacity: 1, y: 0 }}
                              exit={{ scale: 0.5, opacity: 0 }}
                              whileHover={{ scale: 1.08 }}
                              className={`relative z-10 text-3xl min-[380px]:text-4xl sm:text-5xl md:text-6xl leading-none drop-shadow-[0_10px_18px_rgba(0,0,0,.65)] ${
                                piece.color === "w" ? "text-white" : "text-violet-300"
                              }`}
                            >
                              {pieceSymbols[piece.color][piece.type]}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    );
                  }))}
                </div>
              </div>
            </div>
          </section>

          <aside className="xl:col-span-4 space-y-5">
            <div className="bg-cyber-card/60 card-gloss border border-white/5 rounded-3xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
                <Brain className="h-4 w-4" />
                Game Info
              </div>

              <div className="grid grid-cols-2 gap-3">
                <InfoPill label="Kamu" value={playMode === "bot" ? (playerSide === "w" ? "White" : "Black") : "Local"} />
                <InfoPill label="Bot Level" value={playMode === "bot" ? botLevelLabels[botLevel] : "-"} />
                <InfoPill label="Status" value={gameOver ? "Finished" : thinking ? "Bot Move" : "Playing"} />
                <InfoPill label="White" value={material.w.toString()} />
                <InfoPill label="Black" value={material.b.toString()} />
              </div>

              <div className="rounded-2xl bg-slate-950/55 border border-white/5 p-4">
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-3">Captured Pieces</p>
                <CapturedRow title="White captured" pieces={whiteCaptured} />
                <CapturedRow title="Black captured" pieces={blackCaptured} />
              </div>
            </div>

            <div className="bg-cyber-card/60 card-gloss border border-white/5 rounded-3xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-violet-300 uppercase tracking-widest">
                <Swords className="h-4 w-4" />
                Move History
              </div>
              <div className="space-y-2 max-h-[330px] overflow-y-auto pr-1">
                {history.length ? history.map((item, idx) => (
                  <div key={`${item}-${idx}`} className="text-xs leading-relaxed text-slate-300 bg-slate-950/45 border border-white/5 rounded-xl px-3 py-2">
                    {item}
                  </div>
                )) : (
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Belum ada langkah. Klik bidak untuk melihat legal move, lalu pilih kotak tujuan.
                  </p>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-cyan-400/15 rounded-3xl p-5">
              <div className="flex items-center gap-2 text-cyan-300 font-display font-bold">
                <Sparkles className="h-4 w-4" />
                Portfolio Value
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                Game ini menunjukkan logika front-end: state management, algoritma legal move, bot lokal bertingkat tanpa API token, validasi check, animasi UI, dan interaksi user yang rapi.
              </p>
            </div>
          </aside>
        </div>
      )}
    </motion.main>
  );
}

function GameMenu({
  playMode,
  setPlayMode,
  playerSide,
  setPlayerSide,
  botLevel,
  setBotLevel,
  startGame,
}: {
  playMode: PlayMode;
  setPlayMode: (mode: PlayMode) => void;
  playerSide: Color;
  setPlayerSide: (side: Color) => void;
  botLevel: BotLevel;
  setBotLevel: (level: BotLevel) => void;
  startGame: () => void;
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      <div className="lg:col-span-7 bg-cyber-card/60 card-gloss border border-cyan-500/10 rounded-3xl p-6 sm:p-8 overflow-hidden relative min-h-[520px] flex flex-col justify-between">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(34,211,238,.38), transparent 24%), radial-gradient(circle at 80% 60%, rgba(168,85,247,.32), transparent 28%)" }}></div>
        <div className="relative space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/20 text-violet-300 text-[10px] font-mono uppercase tracking-widest">
            <Crown className="h-3.5 w-3.5" />
            Modern Strategy Board
          </div>
          <h3 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight">
            Mainkan Catur Modern Langsung di Portfolio
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
            Pilih mode permainan, warna bidak, dan level bot. Semua berjalan lokal di browser tanpa API dan tanpa token.
          </p>
        </div>

        <div className="relative mt-8 grid grid-cols-8 max-w-[520px] aspect-square rounded-3xl overflow-hidden border border-cyan-400/20 shadow-2xl shadow-cyan-500/10 rotate-1 hover:rotate-0 transition-transform duration-500">
          {createBoard().map((row, r) => row.map((piece, c) => (
            <div key={`${r}-${c}`} className={`flex items-center justify-center ${(r + c) % 2 === 0 ? "bg-cyan-950/70" : "bg-slate-900"}`}>
              {piece && (
                <span className={`text-3xl sm:text-4xl drop-shadow-xl ${piece.color === "w" ? "text-white" : "text-violet-300"}`}>
                  {pieceSymbols[piece.color][piece.type]}
                </span>
              )}
            </div>
          )))}
        </div>
      </div>

      <div className="lg:col-span-5 space-y-5">
        <div className="bg-cyber-card/60 card-gloss border border-white/5 rounded-3xl p-6 space-y-5">
          <div>
            <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest">Game Setup</p>
            <h3 className="text-2xl font-display font-extrabold text-white mt-1">Pilih Mode</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ChoiceButton
              active={playMode === "bot"}
              onClick={() => setPlayMode("bot")}
              icon={<Bot className="h-5 w-5" />}
              title="Lawan Bot"
              desc="Bot lokal tanpa token"
            />
            <ChoiceButton
              active={playMode === "local"}
              onClick={() => setPlayMode("local")}
              icon={<UserRound className="h-5 w-5" />}
              title="2 Player"
              desc="Main bergantian lokal"
            />
          </div>

          {playMode === "bot" && (
            <div className="space-y-3">
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Pilih Warna</p>
              <div className="grid grid-cols-2 gap-3">
                <ChoiceButton
                  active={playerSide === "w"}
                  onClick={() => setPlayerSide("w")}
                  icon={<Crown className="h-5 w-5" />}
                  title="White"
                  desc="Jalan pertama"
                />
                <ChoiceButton
                  active={playerSide === "b"}
                  onClick={() => setPlayerSide("b")}
                  icon={<Shield className="h-5 w-5" />}
                  title="Black"
                  desc="Bot jalan dulu"
                />
              </div>

              <div className="space-y-3">
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Level Bot</p>
                <div className="grid grid-cols-3 gap-3">
                  {(["easy", "normal", "hard"] as BotLevel[]).map(level => (
                    <button
                      key={level}
                      onClick={() => setBotLevel(level)}
                      className={`rounded-2xl border p-3 text-left transition-all ${
                        botLevel === level
                          ? "bg-violet-500/10 border-violet-400/40 text-white shadow-lg shadow-violet-500/10"
                          : "bg-slate-950/45 border-white/5 text-slate-400 hover:text-white hover:border-violet-400/20"
                      }`}
                    >
                      <span className="block text-xs font-display font-bold">{botLevelLabels[level]}</span>
                      <span className="block text-[9px] mt-1 text-slate-500 leading-tight">{botLevelDescriptions[level]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={startGame}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-400 text-slate-950 font-display font-extrabold px-5 py-4 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-cyan-500/20"
          >
            <Play className="h-5 w-5" />
            Mulai Game Catur
          </button>
        </div>

        <div className="bg-slate-950/55 border border-white/5 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Target className="h-4 w-4" />
            Cara Main
          </div>
          <div className="space-y-3 text-xs text-slate-400 leading-relaxed">
            <p>1. Klik bidak milikmu untuk melihat kotak legal move.</p>
            <p>2. Klik kotak tujuan untuk menjalankan langkah.</p>
            <p>3. Bot lokal akan bergerak otomatis setelah giliran kamu, tanpa API dan tanpa token.</p>
            <p>4. Level Easy lebih random, Normal seimbang, Hard lebih agresif mencari capture dan posisi aman.</p>
            <p>5. Promosi pawn otomatis menjadi Queen. Castling dan en passant tidak dipakai agar mini game tetap ringan.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChoiceButton({ active, onClick, icon, title, desc }: { active: boolean; onClick: () => void; icon: ReactNode; title: string; desc: string }) {
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-2xl border p-4 transition-all ${
        active
          ? "bg-cyan-500/10 border-cyan-400/40 text-white shadow-lg shadow-cyan-500/10"
          : "bg-slate-950/45 border-white/5 text-slate-400 hover:text-white hover:border-cyan-400/20"
      }`}
    >
      <span className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border ${active ? "bg-cyan-400/15 border-cyan-300/30 text-cyan-300" : "bg-white/5 border-white/10"}`}>
        {icon}
      </span>
      <span className="block text-sm font-display font-bold">{title}</span>
      <span className="block text-[10px] mt-1 text-slate-500 leading-tight">{desc}</span>
    </button>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-3">
      <div className="flex items-center gap-2 text-cyan-400 mb-1">{icon}<span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">{label}</span></div>
      <p className="text-sm font-display font-bold text-white">{value}</p>
    </div>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-3">
      <p className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">{label}</p>
      <p className="text-sm text-white font-display font-bold mt-1">{value}</p>
    </div>
  );
}

function CapturedRow({ title, pieces }: { title: string; pieces: Piece[] }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-white/5 last:border-b-0">
      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">{title}</span>
      <div className="flex flex-wrap justify-end gap-1 min-h-6">
        {pieces.length ? pieces.map((piece, idx) => (
          <span key={`${piece.color}-${piece.type}-${idx}`} className={`text-xl leading-none ${piece.color === "w" ? "text-white" : "text-violet-300"}`}>
            {pieceSymbols[piece.color][piece.type]}
          </span>
        )) : <span className="text-xs text-slate-600">—</span>}
      </div>
    </div>
  );
}
