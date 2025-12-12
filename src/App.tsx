import React, { useRef, useState, useEffect } from 'react'
import ReactMarkdown  from 'react-markdown'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css/github-markdown.css'
// import { useReactToPrint } from 'react-to-print'
import './App.css'

import { useMarkdownReader } from './hooks/useMarkdownReader';

type PrintMode = 'dark' | 'light';

const App: React.FC = () => {
  // Custom Hook(Vueでいうcomposables)
  const { markdownContent, handleFileUpload } = useMarkdownReader();

  // 印刷モード（デフォルトは黒背景）
  const [printMode, setPrintMode] = useState<PrintMode>('dark');

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 印刷モードに応じてhtmlとbodyにクラスを追加
  useEffect(() => {
    document.documentElement.className = `print-mode-${printMode}`;
    document.body.className = `print-mode-${printMode}`;
    return () => {
      document.documentElement.className = '';
      document.body.className = '';
    };
  }, [printMode]);

  const handlePrint = () => {
    window.print();
  }
  
  return (
    <div className="container">
      <header className="no-print control-panel">
        <h1>Markdown to PDF Converter</h1>
        <p>React & TypeScrpt Static Export</p>
        <div className="actions">
          <input
            type="file"
            accept=".md"
            onChange={handleFileUpload} // カスタムフックから受け取った関数をセット
            ref={fileInputRef} // refをDOM要素に紐づけ
            className="file-input"
          />
          <div className="print-mode-selector">
            <label htmlFor="print-mode">印刷モード:</label>
            <select
              id="print-mode"
              value={printMode}
              onChange={(e) => setPrintMode(e.target.value as PrintMode)}
              className="print-mode-select"
            >
              <option value="dark">黒背景（デフォルト）</option>
              <option value="light">白背景</option>
            </select>
          </div>
          <button 
            onClick={handlePrint}
            disabled={!markdownContent} // フックからもらった変数を使いdisabled
            className="print-btn"
          >
            PDFとして保存 / 印刷
          </button>
        </div>
      </header>

      <main className="preview-area">
        {markdownContent ? (
          <div className={`markdown-body print-mode-${printMode}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdownContent}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="placeholder">
            <p>ここにMarkdownファイルの内容が表示されます。</p>
            <p>ファイルをアップロードしてください。</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
