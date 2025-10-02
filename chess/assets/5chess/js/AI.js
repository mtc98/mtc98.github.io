/**
 * 五指棋AI類
 */
class AI {
    constructor(board) {
        this.board = board;
        this.maxDepth = 4; // AI搜尋深度
    }

    /**
     * 獲取最佳移動
     */
    getBestMove() {
        const validMoves = this.board.getValidMoves();
        if (validMoves.length === 0) return null;

        console.log('有效移動數量:', validMoves.length);

        // 如果是開局第一步或第二步，使用簡單策略
        const pieceCount = this.board.getPieceCount();
        if (pieceCount === 0) {
            // 第一步下在天元
            console.log('AI選擇天元位置');
            return {row: 7, col: 7};
        } else if (pieceCount === 1) {
            // 第二步下在第一顆棋子附近
            const firstMove = this.board.moves[0];
            const nearby = this.getNearbyMoves(firstMove.row, firstMove.col, 2);
            console.log('AI選擇靠近第一步的位置');
            return nearby[Math.floor(Math.random() * nearby.length)];
        }

        // 優先級1：檢查是否可以立即獲勝（五連）
        let winningMove = this.findWinningMove(2);
        if (winningMove) {
            console.log('AI找到勝利位置（五連）');
            return winningMove;
        }

        // 優先級2：阻擋對手立即獲勝（對手的活四）
        let blockingMove = this.findWinningMove(1);
        if (blockingMove) {
            console.log('AI阻擋對手勝利（阻擋活四）');
            return blockingMove;
        }

        // 優先級3：檢查自己是否能形成活四（必勝）
        let livelyFourMove = this.findLivelyFourMove(2);
        if (livelyFourMove) {
            console.log('AI形成活四（必勝）');
            return livelyFourMove;
        }

        // 優先級4：阻擋對手形成活四
        let blockLivelyFourMove = this.findLivelyFourMove(1);
        if (blockLivelyFourMove) {
            console.log('AI阻擋對手活四');
            return blockLivelyFourMove;
        }

        // 優先級5：檢查自己是否能形成活三
        let livelyThreeMove = this.findLivelyThreeMove(2);
        if (livelyThreeMove) {
            console.log('AI形成活三');
            return livelyThreeMove;
        }

        // 優先級6：阻擋對手形成活三
        let blockLivelyThreeMove = this.findLivelyThreeMove(1);
        if (blockLivelyThreeMove) {
            console.log('AI阻擋對手活三');
            return blockLivelyThreeMove;
        }

        // 優先級7：使用極大極小演算法搜索最佳位置
        const candidateMoves = this.getSmartMoves();
        console.log('候選移動數量:', candidateMoves.length);

        let bestMove = null;
        let bestScore = -Infinity;

        for (const move of candidateMoves) {
            // 嘗試這個移動
            this.board.placePiece(move.row, move.col, 2);

            // 使用較淺的深度評估
            const depth = candidateMoves.length > 20 ? 2 : 3;
            const score = this.minimax(depth - 1, false, -Infinity, Infinity);

            // 撤銷移動
            this.board.undoMove();

            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }

        console.log('AI選擇最佳位置:', bestMove);
        return bestMove;
    }

    /**
     * 獲取附近的移動位置
     */
    getNearbyMoves(row, col, distance) {
        const moves = [];
        for (let r = Math.max(0, row - distance); r <= Math.min(this.board.size - 1, row + distance); r++) {
            for (let c = Math.max(0, col - distance); c <= Math.min(this.board.size - 1, col + distance); c++) {
                if (this.board.isEmpty(r, c)) {
                    moves.push({row: r, col: c});
                }
            }
        }
        return moves;
    }

    /**
     * 獲取有意義的移動位置（已有棋子附近2格內）
     */
    getSmartMoves() {
        const smartMoves = new Set();
        const distance = 2;

        // 找出所有已有棋子附近的空位
        for (let row = 0; row < this.board.size; row++) {
            for (let col = 0; col < this.board.size; col++) {
                if (this.board.getPiece(row, col) !== 0) {
                    // 在這顆棋子周圍2格內找空位
                    for (let r = Math.max(0, row - distance); r <= Math.min(this.board.size - 1, row + distance); r++) {
                        for (let c = Math.max(0, col - distance); c <= Math.min(this.board.size - 1, col + distance); c++) {
                            if (this.board.isEmpty(r, c)) {
                                smartMoves.add(`${r},${c}`);
                            }
                        }
                    }
                }
            }
        }

        // 轉換回移動對象
        const moves = [];
        smartMoves.forEach(key => {
            const [row, col] = key.split(',').map(Number);
            moves.push({row, col});
        });

        return moves.length > 0 ? moves : this.board.getValidMoves();
    }

    /**
     * 極大極小演算法
     */
    minimax(depth, isMaximizing, alpha, beta) {
        // 檢查終止條件
        if (depth === 0 || this.isGameOver()) {
            return this.evaluateBoard();
        }

        // 只搜索有意義的位置
        const validMoves = this.getSmartMoves();

        // 限制搜索數量，提升速度
        const maxMoves = 15;
        const moves = validMoves.slice(0, Math.min(maxMoves, validMoves.length));

        if (isMaximizing) {
            let maxScore = -Infinity;

            for (const move of moves) {
                this.board.placePiece(move.row, move.col, 2);
                const score = this.minimax(depth - 1, false, alpha, beta);
                this.board.undoMove();

                maxScore = Math.max(maxScore, score);
                alpha = Math.max(alpha, score);

                if (beta <= alpha) {
                    break; // Alpha-Beta剪枝
                }
            }

            return maxScore;
        } else {
            let minScore = Infinity;

            for (const move of moves) {
                this.board.placePiece(move.row, move.col, 1);
                const score = this.minimax(depth - 1, true, alpha, beta);
                this.board.undoMove();

                minScore = Math.min(minScore, score);
                beta = Math.min(beta, score);

                if (beta <= alpha) {
                    break; // Alpha-Beta剪枝
                }
            }

            return minScore;
        }
    }

    /**
     * 評估棋盤價值
     */
    evaluateBoard() {
        let score = 0;
        
        // 檢查所有可能的連線模式
        for (let row = 0; row < this.board.size; row++) {
            for (let col = 0; col < this.board.size; col++) {
                if (this.board.getPiece(row, col) !== 0) {
                    score += this.evaluatePosition(row, col);
                }
            }
        }
        
        return score;
    }

    /**
     * 評估單個位置的價值
     */
    evaluatePosition(row, col) {
        const player = this.board.getPiece(row, col);
        let score = 0;
        
        // 評估四個方向的連線可能性
        score += this.evaluateDirection(row, col, player, 1, 0); // 水平
        score += this.evaluateDirection(row, col, player, 0, 1); // 垂直
        score += this.evaluateDirection(row, col, player, 1, 1); // 對角線 \
        score += this.evaluateDirection(row, col, player, 1, -1); // 對角線 /
        
        return score;
    }

    /**
     * 評估指定方向的連線價值
     */
    evaluateDirection(row, col, player, deltaRow, deltaCol) {
        let score = 0;
        const opponent = player === 1 ? 2 : 1;
        
        // 計算當前玩家的連線數量
        const playerCount = this.countConsecutive(row, col, player, deltaRow, deltaCol);
        
        // 計算對手的連線數量
        const opponentCount = this.countConsecutive(row, col, opponent, deltaRow, deltaCol);
        
        // 根據連線數量給分
        if (player === 2) { // AI是白棋（玩家2）
            score += this.getScoreForCount(playerCount) * 10; // AI分數加權
            score -= this.getScoreForCount(opponentCount) * 12; // 阻擋對手更重要
        } else { // 評估人類玩家的位置（用於minimax）
            score += this.getScoreForCount(playerCount) * 12;
            score -= this.getScoreForCount(opponentCount) * 10;
        }
        
        return score;
    }

    /**
     * 計算指定方向上連續棋子的數量
     */
    countConsecutive(row, col, player, deltaRow, deltaCol) {
        let count = 0;
        
        // 正方向
        let r = row + deltaRow;
        let c = col + deltaCol;
        while (r >= 0 && r < this.board.size && c >= 0 && c < this.board.size && 
               this.board.getPiece(r, c) === player) {
            count++;
            r += deltaRow;
            c += deltaCol;
        }
        
        // 反方向
        r = row - deltaRow;
        c = col - deltaCol;
        while (r >= 0 && r < this.board.size && c >= 0 && c < this.board.size && 
               this.board.getPiece(r, c) === player) {
            count++;
            r -= deltaRow;
            c -= deltaCol;
        }
        
        return count;
    }

    /**
     * 根據連線數量獲取分數
     */
    getScoreForCount(count) {
        switch (count) {
            case 0: return 0;
            case 1: return 1;
            case 2: return 10;
            case 3: return 100;
            case 4: return 1000;
            case 5: return 10000; // 五連勝
            default: return 10000;
        }
    }

    /**
     * 檢查遊戲是否結束
     */
    isGameOver() {
        if (this.board.moves.length === 0) return false;
        
        const lastMove = this.board.moves[this.board.moves.length - 1];
        return this.board.checkWin(lastMove.row, lastMove.col, lastMove.player) || 
               this.board.getPieceCount() === this.board.size * this.board.size;
    }

    /**
     * 獲取中心位置的獎勵分數
     */
    getCenterBonus(row, col) {
        const center = this.board.size / 2;
        const distance = Math.sqrt((row - center) ** 2 + (col - center) ** 2);
        return Math.max(0, (this.board.size / 2 - distance));
    }

    /**
     * 檢查是否為危險位置（對手可能獲勝）
     */
    isDangerousMove(row, col, player) {
        // 暫時下棋檢查
        this.board.placePiece(row, col, player);
        const isWin = this.board.checkWin(row, col, player);
        this.board.undoMove();
        
        return isWin;
    }

    /**
     * 尋找即將獲勝的移動
     */
    findWinningMove(player) {
        const validMoves = this.board.getValidMoves();

        for (const move of validMoves) {
            if (this.isDangerousMove(move.row, move.col, player)) {
                return move;
            }
        }

        return null;
    }

    /**
     * 尋找能形成活四的移動
     * 活四定義：四顆連續棋子，兩端都是空位（_XXXX_）
     */
    findLivelyFourMove(player) {
        const validMoves = this.getSmartMoves();

        for (const move of validMoves) {
            this.board.placePiece(move.row, move.col, player);

            // 檢查四個方向是否形成活四
            const hasLivelyFour = this.checkLivelyFour(move.row, move.col, player);

            this.board.undoMove();

            if (hasLivelyFour) {
                return move;
            }
        }

        return null;
    }

    /**
     * 檢查指定位置是否形成活四
     */
    checkLivelyFour(row, col, player) {
        const directions = [
            {dr: 1, dc: 0},   // 垂直
            {dr: 0, dc: 1},   // 水平
            {dr: 1, dc: 1},   // 對角線 \
            {dr: 1, dc: -1}   // 對角線 /
        ];

        for (const {dr, dc} of directions) {
            const count = this.countConsecutive(row, col, player, dr, dc) + 1;

            if (count === 4) {
                // 檢查兩端是否都是空位
                const leftEmpty = this.isEmptyAt(row - dr * (this.countInDirection(row, col, player, -dr, -dc) + 1),
                                                   col - dc * (this.countInDirection(row, col, player, -dr, -dc) + 1));
                const rightEmpty = this.isEmptyAt(row + dr * (this.countInDirection(row, col, player, dr, dc) + 1),
                                                    col + dc * (this.countInDirection(row, col, player, dr, dc) + 1));

                if (leftEmpty && rightEmpty) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * 尋找能形成活三的移動
     * 活三定義：三顆連續棋子，兩端都是空位，且再下一步能形成活四（_XXX_）
     */
    findLivelyThreeMove(player) {
        const validMoves = this.getSmartMoves();

        for (const move of validMoves) {
            this.board.placePiece(move.row, move.col, player);

            // 檢查是否形成活三
            const hasLivelyThree = this.checkLivelyThree(move.row, move.col, player);

            this.board.undoMove();

            if (hasLivelyThree) {
                return move;
            }
        }

        return null;
    }

    /**
     * 檢查指定位置是否形成活三
     */
    checkLivelyThree(row, col, player) {
        const directions = [
            {dr: 1, dc: 0},   // 垂直
            {dr: 0, dc: 1},   // 水平
            {dr: 1, dc: 1},   // 對角線 \
            {dr: 1, dc: -1}   // 對角線 /
        ];

        for (const {dr, dc} of directions) {
            const count = this.countConsecutive(row, col, player, dr, dc) + 1;

            if (count === 3) {
                const leftCount = this.countInDirection(row, col, player, -dr, -dc);
                const rightCount = this.countInDirection(row, col, player, dr, dc);

                // 檢查兩端是否都是空位
                const leftEmpty = this.isEmptyAt(row - dr * (leftCount + 1), col - dc * (leftCount + 1));
                const rightEmpty = this.isEmptyAt(row + dr * (rightCount + 1), col + dc * (rightCount + 1));

                // 活三：兩端都空，且至少有一端再延伸一格也是空的
                if (leftEmpty && rightEmpty) {
                    const leftEmpty2 = this.isEmptyAt(row - dr * (leftCount + 2), col - dc * (leftCount + 2));
                    const rightEmpty2 = this.isEmptyAt(row + dr * (rightCount + 2), col + dc * (rightCount + 2));

                    if (leftEmpty2 || rightEmpty2) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    /**
     * 計算指定方向的連續棋子數（單向）
     */
    countInDirection(row, col, player, dr, dc) {
        let count = 0;
        let r = row + dr;
        let c = col + dc;

        while (r >= 0 && r < this.board.size && c >= 0 && c < this.board.size &&
               this.board.getPiece(r, c) === player) {
            count++;
            r += dr;
            c += dc;
        }

        return count;
    }

    /**
     * 檢查指定位置是否為空
     */
    isEmptyAt(row, col) {
        if (row < 0 || row >= this.board.size || col < 0 || col >= this.board.size) {
            return false;
        }
        return this.board.isEmpty(row, col);
    }

    /**
     * 改進版的獲取最佳移動（加入更多策略）
     */
    getBestMoveAdvanced() {
        const validMoves = this.board.getValidMoves();
        if (validMoves.length === 0) return null;

        // 優先級1：檢查是否可以立即獲勝
        let winningMove = this.findWinningMove(2);
        if (winningMove) return winningMove;

        // 優先級2：阻擋對手獲勝
        let blockingMove = this.findWinningMove(1);
        if (blockingMove) return blockingMove;

        // 優先級3：使用極大極小演算法找最佳位置
        let bestMove = null;
        let bestScore = -Infinity;

        for (const move of validMoves) {
            // 嘗試這個移動
            this.board.placePiece(move.row, move.col, 2);
            
            // 評估這個位置（加入中心位置獎勵）
            let score = this.minimax(this.maxDepth - 1, false, -Infinity, Infinity);
            score += this.getCenterBonus(move.row, move.col) * 2;
            
            // 撤銷移動
            this.board.undoMove();
            
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }

        return bestMove;
    }
}