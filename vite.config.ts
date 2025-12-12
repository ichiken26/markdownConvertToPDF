import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages用のベースパスを設定
// リポジトリ名を環境変数から取得（例: ichiken26/markdownConvertToPDF -> /markdownConvertToPDF/）
const getBasePath = () => {
  if (process.env.GITHUB_ACTIONS && process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1]
    return `/${repoName}/`
  }
  return '/'
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
})
