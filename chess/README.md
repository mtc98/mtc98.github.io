# fgame1

五子棋遊戲 - Flutter 跨平台應用（iOS、Android、Web）

## 專案說明

這是一個使用 Flutter 開發的五子棋遊戲應用，支援人機對戰，可在 iOS、Android 和 Web 平台運行。

## 技術架構

- **Flutter**: 跨平台 UI 框架
- **WebView**: 在移動端使用 `webview_flutter`，Web 端使用 `package:web` 的 HTMLIFrameElement
- **遊戲引擎**: HTML5 + JavaScript（位於 `5chess/` 目錄）

## 專案修改記錄

### 2025-10-02 跨平台適配與 UI 優化

#### 1. Web 平台支援
**問題**: `webview_flutter` 不支援 Web 平台，導致 Web 端報錯
**解決方案**:
- 使用條件導入分離 Web 和移動端實現
- 創建 `web_game_view.dart` 使用 `package:web` 的 `HTMLIFrameElement`
- 創建 `mobile_game_view.dart` 使用 `webview_flutter`
- 在 `main.dart` 中使用 `if (dart.library.html)` 條件導入
- 將棄用的 `dart:html` 遷移到 `package:web` 和 `dart:js_interop`

**修改文件**:
- `lib/main.dart`: 添加條件導入邏輯
- `lib/web_game_view.dart`: Web 平台實現
- `lib/mobile_game_view.dart`: 移動平台實現
- `pubspec.yaml`: 添加 `web: ^1.1.0` 依賴

#### 2. 移動端棋盤顯示修復
**問題**: iOS/Android 上棋盤只顯示 15x10，底部被切掉，超出白色背景區域
**原因**: 固定高度 `height: 450px` 導致在小螢幕上被裁切
**解決方案**:
- 將固定高度改為 `aspect-ratio: 1 / 1`，根據寬度自動計算高度
- 使用 `width: min(450px, 95vw)` 讓棋盤自適應螢幕寬度
- 將 `body` 的 `align-items` 從 `flex-start` 改為 `center`，讓內容垂直居中

**修改文件**:
- `5chess/css/game.css`:
  - `.game-board`: `height: 450px` → `aspect-ratio: 1 / 1`
  - `.game-board`: `width: 90vw` → `width: min(450px, 95vw)`
  - `body`: `align-items: flex-start` → `align-items: center`

#### 3. 棋子形狀優化
**問題**: 棋子顯示為橢圓形而非正圓形
**原因**: Grid 的 `gap: 1px` 和 `padding` 導致格子寬高比例不一致
**解決方案**:
- 移除 grid gap: `gap: 1px` → `gap: 0`
- 移除 padding: `padding: 1px` → `padding: 0`
- 確保每個格子都是正方形

**修改文件**:
- `5chess/css/game.css`:
  - `.game-board`: `gap: 1px` → `gap: 0`
  - `.game-board`: `padding: 1px` → `padding: 0`

#### 4. 留白空間優化
**問題**: 白色背景區域左右間距過大，浪費空間
**解決方案**:
- 縮小容器的左右 padding
- 提高棋盤寬度佔比，從 90vw 提升到 95vw
- 響應式設計中進一步優化小螢幕的間距

**修改文件**:
- `5chess/css/game.css`:
  - `.game-container`: `padding: 30px` → `padding: 20px 15px`
  - `.game-board`: `margin: 20px auto` → `margin: 15px auto`
  - 移動端: `padding: 15px` → `padding: 10px 8px`

#### 5. 白子視覺優化
**問題**: 白子的灰色邊框讓視覺上看起來不夠圓潤
**解決方案**:
- 將白子邊框顏色從深灰色改為淺灰色，更接近白色

**修改文件**:
- `5chess/css/game.css`:
  - `.game-piece.white`: `border: 3px solid #999` → `border: 3px solid #e8e8e8`

#### 6. Web 版本部署到 GitHub Pages
**目標**: 將 Web 版本部署到 `https://mtc98.github.io/chess`

**部署步驟**:
1. Build Web 版本（指定 base-href 為子目錄）
   ```bash
   flutter build web --release --base-href /chess/
   ```

   **重要**: 必須使用 `--base-href /chess/` 參數，否則資源路徑會錯誤，導致頁面無法正確載入

2. Clone GitHub Pages 倉庫
   ```bash
   git clone https://github.com/mtc98/mtc98.github.io.git
   ```

3. 複製 Web build 產物到 `/chess` 目錄
   ```bash
   mkdir -p mtc98.github.io/chess
   cp -r build/web/* mtc98.github.io/chess/
   ```

4. 提交並推送到 GitHub
   ```bash
   cd mtc98.github.io
   git add chess/
   git commit -m "Add chess game to /chess directory"
   git push origin main
   ```

5. 訪問部署的網站
   - URL: **https://mtc98.github.io/chess**
   - GitHub Pages 通常需要 1-3 分鐘更新

**常見問題**:
- 如果頁面顯示空白或載入錯誤，檢查 `index.html` 中的 `<base href="/chess/">` 是否正確
- 瀏覽器快取問題：使用強制重新整理（Ctrl+F5 或 Cmd+Shift+R）

**使用的工具**:
- GitHub CLI (`gh`) - 已使用 mtc98 帳號登入
- Git 配置: `mtc98` / `mtc98tw.gmail.com`

## 運行說明

### iOS/Android
```bash
flutter run
```

### Web (本地開發)
```bash
flutter run -d chrome
```

### Web (線上版本)
訪問: **https://mtc98.github.io/chess**

## Getting Started

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Lab: Write your first Flutter app](https://docs.flutter.dev/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://docs.flutter.dev/cookbook)

For help getting started with Flutter development, view the
[online documentation](https://docs.flutter.dev/), which offers tutorials,
samples, guidance on mobile development, and a full API reference.
