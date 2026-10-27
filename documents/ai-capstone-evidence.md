# AI 人力轉型評估與課程推薦系統｜作品佐證

本頁整理團隊專題現有程式與既有測試截圖，並非正式營運或本次端到端測試結果。

## 原始資料

專題名稱：AI-Transformation-Evaluation-Course-Recommendation。

## 功能與可查對來源

| 功能 | 原專題內對應檔案 | 本次檢視範圍 |
|---|---|---|
| 多角色與企業登入環境 | README.md、public/login.html、includes/auth_check.php | 系統文件與角色驗證結構 |
| 主管專案、成員與檢核點 | api/project_manage.php | PHP 動作分派與 MySQL 查詢 |
| AI 對話紀錄提交 | public/my_project_detail.html、public/shared_chat.js | 文件、介面與既有整合測試截圖 |
| 員工成果評分 | public/my_scoring.html | 對話選取、評分與歷史紀錄介面 |
| 技能缺口分析 | public/hr_gap_analysis.html、api/training_recommend_api.php | 部門篩選、技能需求與現有能力查詢 |
| 培訓推薦 | public/hr_training.html、api/ai_training_recommendation.php | HR 介面與本機 Ollama 介接程式 |

## 圖片依據

作品集 images/ai-capstone-project.jpg 直接取自原專題 tests/main-integration.jpg，圖中為測試帳號的專案、階段檢核點與 AI 對話提交介面。這是既有測試畫面，不是本次重新執行的驗證結果，也不代表真實企業或員工成效。

## 參與與驗證界線

- 依本人說明為團隊專題作品；個人分工與開發期間尚未提供，不將整個系統功能等同於個人獨立完成。
- 系統完整執行依賴 PHP、MySQL、登入狀態與 AI 服務。本次僅讀取程式、文件及既有圖片，沒有操作原專題資料庫、啟動模型、登入帳號或執行資料庫遷移。
- 未將憑證設定、cookies、測試帳密、使用者上傳檔或原專題資料庫內容複製到個人網站。
- 未將受登入保護的 HTML 誤當成可獨立操作的靜態展示頁。作品集提供介紹與既有畫面，完整操作仍在原專題環境進行。

## 企業參訪（獨立經歷）

依本人補充：大二參訪 ENNOSTAR（依本人要求不列日期）。照片保存於 images/company-visit.jpg，佐證參訪與交流，不推定為實習、就業或本專題合作企業。
