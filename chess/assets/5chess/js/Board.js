/**
 * 五指棋棋盤管理類
 */
class Board {
    constructor() {
        this.size = 15; // 棋盤大小 15x15
        this.board = []; // 棋盤狀態，0=空，1=黑棋，2=白棋
        this.moves = []; // 記錄所有移動
        this.lastMove = null; // 最後一步棋
        this.gameBoard = null; // DOM元素引用
        this.init();
    }

    /**
     * 初始化棋盤
     */
    init() {
        this.board = [];
        for (let i = 0; i < this.size; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.size; j++) {
                this.board[i][j] = 0;
            }
        }
        this.moves = [];
        this.lastMove = null;
    }

    /**
     * 渲染棋盤到DOM
     */
    render(containerId) {
        this.gameBoard = document.getElementById(containerId);
        if (!this.gameBoard) {
            console.error('找不到棋盤容器元素');
            return;
        }

        this.gameBoard.innerHTML = '';

        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const cell = document.createElement('div');
                cell.className = 'board-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                // 添加特殊標記點（傳統圍棋點）
                if ((row === 3 || row === 7 || row === 11) && 
                    (col === 3 || col === 7 || col === 11)) {
                    cell.classList.add('star-point');
                }
                
                // 添加網格線樣式
                if (col === 0) cell.style.borderLeft = 'none';
                if (col === this.size - 1) cell.style.borderRight = 'none';
                
                this.gameBoard.appendChild(cell);
            }
        }
    }

    /**
     * 在指定位置放置棋子
     */
    placePiece(row, col, player) {
        if (this.isValidMove(row, col)) {
            this.board[row][col] = player;
            this.moves.push({row, col, player});
            this.lastMove = {row, col, player};
            this.renderPiece(row, col, player);
            return true;
        }
        return false;
    }

    /**
     * 渲染單個棋子
     */
    renderPiece(row, col, player) {
        const cell = this.gameBoard.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (!cell) return;

        // 清除現有棋子
        const existingPiece = cell.querySelector('.game-piece');
        if (existingPiece) {
            existingPiece.remove();
        }

        // 創建新棋子
        const piece = document.createElement('div');
        piece.className = `game-piece ${player === 1 ? 'black' : 'white'}`;
        
        if (this.lastMove && this.lastMove.row === row && this.lastMove.col === col) {
            piece.classList.add('last-move');
        }
        
        cell.appendChild(piece);
    }

    /**
     * 檢查移動是否有效
     */
    isValidMove(row, col) {
        return row >= 0 && row < this.size && 
               col >= 0 && col < this.size && 
               this.board[row][col] === 0;
    }

    /**
     * 檢查指定位置是否為空
     */
    isEmpty(row, col) {
        return this.board[row][col] === 0;
    }

    /**
     * 獲取指定位置的棋子
     */
    getPiece(row, col) {
        return this.board[row][col];
    }

    /**
     * 檢查是否有玩家獲勝
     */
    checkWin(row, col, player) {
        return this.checkDirection(row, col, player, 1, 0) || // 水平
               this.checkDirection(row, col, player, 0, 1) || // 垂直
               this.checkDirection(row, col, player, 1, 1) || // 對角線 \
               this.checkDirection(row, col, player, 1, -1);  // 對角線 /
    }

    /**
     * 檢查指定方向上是否有連續的棋子
     */
    checkDirection(row, col, player, deltaRow, deltaCol) {
        let count = 1; // 當前位置已經有一顆棋子
        
        // 正方向檢查
        count += this.countConsecutive(row, col, player, deltaRow, deltaCol);
        
        // 反方向檢查
        count += this.countConsecutive(row, col, player, -deltaRow, -deltaCol);
        
        return count >= 5;
    }

    /**
     * 計算指定方向上連續棋子的數量
     */
    countConsecutive(row, col, player, deltaRow, deltaCol) {
        let count = 0;
        let r = row + deltaRow;
        let c = col + deltaCol;
        
        while (r >= 0 && r < this.size && c >= 0 && c < this.size && 
               this.board[r][c] === player) {
            count++;
            r += deltaRow;
            c += deltaCol;
        }
        
        return count;
    }

    /**
     * 獲取所有有效移動位置
     */
    getValidMoves() {
        const validMoves = [];
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.board[row][col] === 0) {
                    validMoves.push({row, col});
                }
            }
        }
        return validMoves;
    }

    /**
     * 獲取棋盤上的棋子數量
     */
    getPieceCount() {
        let count = 0;
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.board[row][col] !== 0) {
                    count++;
                }
            }
        }
        return count;
    }

    /**
     * 悔棋
     */
    undoMove() {
        if (this.moves.length === 0) return null;
        
        const lastMove = this.moves.pop();
        this.board[lastMove.row][lastMove.col] = 0;
        this.lastMove = this.moves.length > 0 ? this.moves[this.moves.length - 1] : null;
        
        // 重新渲染棋盤
        this.renderBoard();
        
        return lastMove;
    }

    /**
     * 重新渲染整個棋盤
     */
    renderBoard() {
        if (!this.gameBoard) return;
        
        this.gameBoard.innerHTML = '';
        
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const cell = document.createElement('div');
                cell.className = 'board-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                if (this.board[row][col] !== 0) {
                    const piece = document.createElement('div');
                    piece.className = `game-piece ${this.board[row][col] === 1 ? 'black' : 'white'}`;
                    
                    if (this.lastMove && this.lastMove.row === row && this.lastMove.col === col) {
                        piece.classList.add('last-move');
                    }
                    
                    cell.appendChild(piece);
                }
                
                this.gameBoard.appendChild(cell);
            }
        }
    }

    /**
     * 獲取棋盤狀態的副本
     */
    getBoardState() {
        return this.board.map(row => [...row]);
    }

    /**
     * 設置棋盤狀態
     */
    setBoardState(boardState) {
        this.board = boardState.map(row => [...row]);
        this.moves = [];
        this.lastMove = null;
        
        // 找到最後一步棋
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.board[row][col] !== 0) {
                    this.moves.push({row, col, player: this.board[row][col]});
                }
            }
        }
        
        if (this.moves.length > 0) {
            this.lastMove = this.moves[this.moves.length - 1];
        }
        
        this.renderBoard();
    }
}