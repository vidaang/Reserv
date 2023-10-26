import React from 'react';
import { CodeHighlightTabsCode } from '@mantine/code-highlight';
export declare function getFileIcon(fileName: string): React.JSX.Element | null;
export interface DemoCodeProps {
    code?: string | CodeHighlightTabsCode | CodeHighlightTabsCode[];
    defaultExpanded?: boolean;
}
export declare function DemoCode({ code, defaultExpanded }: DemoCodeProps): React.JSX.Element;
