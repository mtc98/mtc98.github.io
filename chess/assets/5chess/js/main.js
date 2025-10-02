/**
 * 五指棋遊戲主程式
 */

// 遊戲全域變數
let game;

document.addEventListener('DOMContentLoaded', function() {
    initGame();
});

/**
 * 初始化遊戲
 */
function initGame() {
    console.log('初始化五指棋遊戲...');
    
    try {
        // 創建遊戲實例
        game = new Game();
        
        // 確保DOM元素存在
        const gameBoardElement = document.getElementById('gameBoard');
        if (!gameBoardElement) {
            console.error('找不到gameBoard元素，稍後重試...');
            setTimeout(initGame, 100);
            return;
        }
        
        // 渲染棋盤
        game.board.render('gameBoard');
        
        // 初始化音效
        game.audioManager.init();
        
        console.log('遊戲初始化完成');
        
        // 添加鍵盤事件監聽
        document.addEventListener('keydown', handleKeyPress);
        
        // 添加音效切換按鈕（可選）
        addSoundToggleButton();
        
    } catch (error) {
        console.error('遊戲初始化失敗:', error);
        setTimeout(initGame, 100);
    }
}

/**
 * 處理鍵盤事件
 */
function handleKeyPress(event) {
    switch (event.key) {
        case 'r':
        case 'R':
            if (event.ctrlKey || event.metaKey) {
                game.restart();
            }
            break;
        case 'z':
        case 'Z':
            if (event.ctrlKey || event.metaKey) {
                game.undo();
            }
            break;
        case 's':
        case 'S':
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                toggleSound();
            }
            break;
    }
}

/**
 * 添加音效切換按鈕
 */
function addSoundToggleButton() {
    const soundBtn = document.createElement('button');
    soundBtn.id = 'soundToggleBtn';
    soundBtn.innerHTML = '🔊';
    soundBtn.title = '切換音效';
    soundBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        background: rgba(102, 126, 234, 0.8);
        color: white;
        font-size: 16px;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    soundBtn.addEventListener('click', toggleSound);
    document.body.appendChild(soundBtn);
    
    // 更新音效按鈕狀態
    updateSoundButton();
}

/**
 * 切換音效開關
 */
function toggleSound() {
    if (game && game.audioManager) {
        const enabled = game.audioManager.toggleSound();
        updateSoundButton();

        // 顯示提示
        const statusText = enabled ? '音效已開啟 🔊' : '音效已關閉 🔇';
        showMessage(statusText, 2000);

        console.log('音效狀態:', enabled ? '已開啟' : '已關閉');
    }
}

/**
 * 更新音效按鈕顯示
 */
function updateSoundButton() {
    const soundBtn = document.getElementById('soundToggleBtn');
    if (soundBtn && game && game.audioManager) {
        soundBtn.innerHTML = game.audioManager.enabled ? '🔊' : '🔇';
        soundBtn.title = `音效已${game.audioManager.enabled ? '開啟' : '關閉'} - 點擊切換`;
    }
}

/**
 * 顯示臨時訊息
 */
function showMessage(text, duration = 2000) {
    // 移除現有的訊息
    const existingMsg = document.querySelector('.temp-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    const msg = document.createElement('div');
    msg.className = 'temp-message';
    msg.textContent = text;
    msg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 16px;
        font-weight: bold;
        z-index: 2000;
        animation: fadeInOut 0.3s ease;
        pointer-events: none;
    `;
    
    document.body.appendChild(msg);
    
    // 添加淡入淡出動畫樣式
    if (!document.querySelector('#message-styles')) {
        const style = document.createElement('style');
        style.id = 'message-styles';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        if (msg.parentNode) {
            msg.remove();
        }
    }, duration);
}

/**
 * 創建簡單的音效文件（如果不存在）
 */
function createSoundFiles() {
    // 這裡我們使用HTML5 Web Audio API來生成簡單的音效
    // 在實際應用中，你可能想要使用真正的音效文件
    
    if (!game || !game.audioManager) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // 創建落子音效（簡單的beep聲）
    function createPlaceSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    // 創建勝利音效（上升的音階）
    function createWinSound() {
        const frequencies = [523, 659, 784, 1047]; // C, E, G, C (C大調)
        
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
            }, index * 100);
        });
    }
    
    // 替換音效播放函數
    const originalPlayPlaceSound = game.audioManager.playPlaceSound;
    const originalPlayWinSound = game.audioManager.playWinSound;
    
    game.audioManager.playPlaceSound = function() {
        if (this.enabled) {
            try {
                createPlaceSound();
            } catch (e) {
                console.log('音效播放失敗:', e);
            }
        }
    };
    
    game.audioManager.playWinSound = function() {
        if (this.enabled) {
            try {
                createWinSound();
            } catch (e) {
                console.log('音效播放失敗:', e);
            }
        }
    };
}

// 當音效文件載入失敗時，使用程式生成的音效
document.addEventListener('DOMContentLoaded', function() {
    // 檢查音效元素是否存在
    const placeSound = document.getElementById('placeSound');
    const winSound = document.getElementById('winSound');
    
    if (placeSound && winSound) {
        // 當音效能源載入失敗時，使用程式生成音效
        placeSound.addEventListener('error', createSoundFiles);
        winSound.addEventListener('error', createSoundFiles);
        
        // 如果沒有設定src，預設使用程式生成音效
        if (!placeSound.src) {
            setTimeout(createSoundFiles, 100);
        }
    }
});

/**
 * 遊戲統計資訊（開發用）
 */
function showGameStats() {
    if (!game) return;
    
    const stats = {
        總步數: game.board.moves.length,
        棋盤滿度: Math.round((game.board.getPieceCount() / (game.board.size * game.board.size)) * 100) + '%',
        當前玩家: game.currentPlayer === 1 ? '人類' : '電腦',
        遊戲狀態: game.gameOver ? '結束' : '進行中'
    };
    
    console.table(stats);
    return stats;
}

// 將統計函數暴露到全域
window.showGameStats = showGameStats;

// 開發者工具
if (typeof window !== 'undefined') {
    window.game = game; // 讓遊戲物件可在控制台訪問
    window.debugAI = function() {
        const ai = new AI(game.board);
        console.log('AI分析當前棋盤...');
        const move = ai.getBestMoveAdvanced();
        console.log('建議移動:', move);
        return move;
    };
}