/**
 * 五指棋遊戲管理類
 */
class Game {
    constructor() {
        this.board = new Board();
        this.currentPlayer = 1; // 1=黑棋(人類)，2=白棋(電腦)
        this.gameOver = false;
        this.winner = null;
        this.audioManager = new AudioManager();
        
        // DOM元素引用
        this.statusElement = null;
        this.restartBtn = null;
        this.undoBtn = null;
        this.playAgainBtn = null;
        this.gameResult = null;
        
        this.init();
    }

    /**
     * 初始化遊戲
     */
    init() {
        this.board.init();
        this.currentPlayer = 1;
        this.gameOver = false;
        this.winner = null;
        
        this.cacheDOM();
        this.bindEvents();
        this.updateUI();
    }

    /**
     * 緩存DOM元素
     */
    cacheDOM() {
        this.statusElement = document.getElementById('gameStatus');
        this.restartBtn = document.getElementById('restartBtn');
        this.undoBtn = document.getElementById('undoBtn');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        this.gameResult = document.getElementById('gameResult');
    }

    /**
     * 綁定事件監聽器
     */
    bindEvents() {
        if (this.restartBtn) {
            this.restartBtn.addEventListener('click', () => this.restart());
        }
        
        if (this.undoBtn) {
            this.undoBtn.addEventListener('click', () => this.undo());
        }
        
        if (this.playAgainBtn) {
            this.playAgainBtn.addEventListener('click', () => this.playAgain());
        }

        // 棋盤點擊事件
        if (this.board.gameBoard) {
            this.board.gameBoard.addEventListener('click', (e) => this.handleCellClick(e));
        }
    }

    /**
     * 處理棋盤格子點擊
     */
    handleCellClick(event) {
        if (this.gameOver || this.currentPlayer !== 1) return;
        
        const cell = event.target.closest('.board-cell');
        if (!cell) return;
        
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        
        if (this.makeMove(row, col)) {
            this.audioManager.playPlaceSound();
            
            if (this.checkGameEnd()) {
                this.endGame();
            } else {
                // 切換到電腦回合
                this.currentPlayer = 2;
                this.updateUI();
                
                // 延遲讓電腦下棋
                setTimeout(() => {
                    this.makeAIMove();
                }, 500);
            }
        }
    }

    /**
     * 執行移動
     */
    makeMove(row, col) {
        if (this.board.placePiece(row, col, this.currentPlayer)) {
            this.updateUI();
            return true;
        }
        return false;
    }

    /**
     * AI下棋
     */
    makeAIMove() {
        if (this.gameOver || this.currentPlayer !== 2) return;

        console.log('電腦開始思考...');

        const ai = new AI(this.board);
        const move = ai.getBestMove();

        console.log('電腦選擇的位置:', move);

        if (move) {
            this.board.placePiece(move.row, move.col, 2);
            this.audioManager.playPlaceSound();

            console.log(`電腦下棋在 (${move.row}, ${move.col})`);

            if (this.checkGameEnd()) {
                this.endGame();
            } else {
                this.currentPlayer = 1;
                this.updateUI();
            }
        } else {
            console.error('AI 無法找到合適的移動位置');
        }
    }

    /**
     * 檢查遊戲是否結束
     */
    checkGameEnd() {
        if (this.board.moves.length === 0) return false;
        
        const lastMove = this.board.moves[this.board.moves.length - 1];
        if (this.board.checkWin(lastMove.row, lastMove.col, lastMove.player)) {
            this.winner = lastMove.player;
            return true;
        }
        
        // 檢查是否平局（棋盤滿了）
        if (this.board.getPieceCount() === this.board.size * this.board.size) {
            this.winner = 0; // 平局
            return true;
        }
        
        return false;
    }

    /**
     * 結束遊戲
     */
    endGame() {
        this.gameOver = true;
        this.audioManager.playWinSound();
        this.showResult();
    }

    /**
     * 顯示遊戲結果
     */
    showResult() {
        if (!this.gameResult) return;
        
        const resultText = document.getElementById('resultText');
        if (this.winner === 1) {
            resultText.textContent = '恭喜！你贏了！';
        } else if (this.winner === 2) {
            resultText.textContent = '電腦獲勝！';
        } else {
            resultText.textContent = '平局！';
        }
        
        this.gameResult.style.display = 'flex';
    }

    /**
     * 重新開始遊戲
     */
    restart() {
        this.init();
        this.board.render('gameBoard');
        if (this.gameResult) {
            this.gameResult.style.display = 'none';
        }
    }

    /**
     * 悔棋
     */
    undo() {
        if (this.gameOver) return;
        
        // 悔兩步棋（人類和電腦各一步）
        const humanMove = this.board.undoMove();
        const aiMove = this.board.undoMove();
        
        if (humanMove || aiMove) {
            // 如果悔了人類的棋，恢復到人類回合
            if (humanMove) {
                this.currentPlayer = 1;
            }
            this.updateUI();
        }
    }

    /**
     * 再玩一次
     */
    playAgain() {
        this.restart();
    }

    /**
     * 更新UI顯示
     */
    updateUI() {
        if (this.statusElement) {
            if (this.gameOver) {
                if (this.winner === 1) {
                    this.statusElement.textContent = '你贏了！';
                } else if (this.winner === 2) {
                    this.statusElement.textContent = '電腦獲勝！';
                } else {
                    this.statusElement.textContent = '平局！';
                }
            } else {
                const playerText = this.currentPlayer === 1 ? '玩家' : '電腦';
                this.statusElement.textContent = `輪到${playerText}下棋`;
            }
        }

        // 更新玩家指示器
        this.updatePlayerIndicators();
    }

    /**
     * 更新玩家指示器
     */
    updatePlayerIndicators() {
        const blackPlayer = document.querySelector('.black-player');
        const whitePlayer = document.querySelector('.white-player');
        
        if (blackPlayer) {
            blackPlayer.classList.toggle('current-player', this.currentPlayer === 1 && !this.gameOver);
        }
        
        if (whitePlayer) {
            whitePlayer.classList.toggle('current-player', this.currentPlayer === 2 && !this.gameOver);
        }
    }

    /**
     * 獲取遊戲狀態
     */
    getState() {
        return {
            board: this.board.getBoardState(),
            currentPlayer: this.currentPlayer,
            gameOver: this.gameOver,
            winner: this.winner,
            moves: [...this.board.moves]
        };
    }

    /**
     * 設置遊戲狀態
     */
    setState(state) {
        this.board.setBoardState(state.board);
        this.currentPlayer = state.currentPlayer;
        this.gameOver = state.gameOver;
        this.winner = state.winner;
        this.updateUI();
        
        if (this.gameOver) {
            this.showResult();
        }
    }
}

/**
 * 音效管理類
 */
class AudioManager {
    constructor() {
        this.enabled = true;
        this.audioContext = null;
        this.init();
    }

    /**
     * 初始化音效
     */
    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API 不支援:', e);
        }
    }

    /**
     * 播放落子音效 - 使用 Web Audio API 生成
     */
    playPlaceSound() {
        if (!this.enabled || !this.audioContext) return;

        try {
            // 恢復 AudioContext（處理瀏覽器自動暫停）
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }

            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            // 設置頻率從 800Hz 下降到 400Hz
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);

            // 設置音量淡出
            gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);

            console.log('播放落子音效');
        } catch (e) {
            console.log('音效播放失敗:', e);
        }
    }

    /**
     * 播放勝利音效 - 使用 Web Audio API 生成
     */
    playWinSound() {
        if (!this.enabled || !this.audioContext) return;

        try {
            // 恢復 AudioContext
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }

            // 播放上升的音階：C, E, G, C (C大調和弦)
            const frequencies = [523.25, 659.25, 783.99, 1046.50];

            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();

                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);

                    oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                    oscillator.type = 'sine'; // 正弦波，聲音更柔和

                    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + 0.3);
                }, index * 150);
            });

            console.log('播放勝利音效');
        } catch (e) {
            console.log('音效播放失敗:', e);
        }
    }

    /**
     * 切換音效開關
     */
    toggleSound() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}