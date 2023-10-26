import React from 'react';
interface FileIconProps {
    fileName: string | undefined;
    getFileIcon?: ((fileName: string) => React.ReactNode) | undefined;
    fileIcon: React.ReactNode | undefined;
    className?: string;
    style?: React.CSSProperties;
}
export declare function FileIcon({ fileIcon, fileName, getFileIcon, className, style }: FileIconProps): React.JSX.Element | null;
export {};
