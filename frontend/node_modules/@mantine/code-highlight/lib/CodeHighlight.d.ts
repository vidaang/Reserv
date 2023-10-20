import { BoxProps, StylesApiProps, ElementProps, Factory } from '@mantine/core';
export type CodeHighlightStylesNames = 'root' | 'code' | 'pre' | 'copy';
export interface CodeHighlightProps extends BoxProps, StylesApiProps<CodeHighlightFactory>, ElementProps<'div'> {
    /** Code to highlight */
    code: string;
    /** Code language, `'tsx'` by default */
    language?: string;
    /** Determines whether copy button should be displayed, `true` by default */
    withCopyButton?: boolean;
    /** Copy tooltip label, `'Copy code'` by default */
    copyLabel?: string;
    /** Copied tooltip label, `'Copied'` by default */
    copiedLabel?: string;
    /** Determines whether code should be highlighted only after component is mounted to the dom (disables code highlight on server), `false` by default */
    highlightOnClient?: boolean;
}
export type CodeHighlightFactory = Factory<{
    props: CodeHighlightProps;
    ref: HTMLDivElement;
    stylesNames: CodeHighlightStylesNames;
}>;
export declare const CodeHighlight: import("@mantine/core").MantineComponent<{
    props: CodeHighlightProps;
    ref: HTMLDivElement;
    stylesNames: CodeHighlightStylesNames;
}>;
