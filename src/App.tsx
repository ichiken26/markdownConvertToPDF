import React, { useRef } from 'react'
import ReactMarkdown  from 'react-markdown'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css/github-markdown.css'
// import { useReactToPrint } from 'react-to-print'
import './App.css'

import { useMarkdownReader } from './hooks/useMarkdownReader';

const App: React.FC = () => {
  // Custom Hook(Vueでいうcomposables)
  const { markdownContent, handleFileUpload } = useMarkdownReader();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handlePrint = () =>{
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
          <div className="markdown-body">
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
