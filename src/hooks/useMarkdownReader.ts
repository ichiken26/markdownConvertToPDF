import { useState, type ChangeEvent } from 'react';

/**
 * アップロードされたマークダウンファイルの内容を返す関数
 * @param markdownContent マークダウンの内容を保持
 * @param function アップロードされたファイルの内容を保持 
 */
export const useMarkdownReader = () => {
    // マークダウンコンテンツをinit
    const [markdownContent, setMarkdownContent] = useState<string>('');

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            setMarkdownContent(content);
        };
        reader.readAsText(file);
    }

    return {
        markdownContent,
        handleFileUpload,
    }
}