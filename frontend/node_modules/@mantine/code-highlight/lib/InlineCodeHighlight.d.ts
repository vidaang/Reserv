import { BoxProps, StylesApiProps, ElementProps, Factory } from '@mantine/core';
export type InlineCodeHighlightStylesNames = 'code';
export interface InlineCodeHighlightProps extends BoxProps, StylesApiProps<InlineCodeHighlightFactory>, ElementProps<'div'> {
    /** Code to highlight */
    code: string;
    /** Code language, `'tsx'` by default */
    language?: string;
}
export type InlineCodeHighlightFactory = Factory<{
    props: InlineCodeHighlightProps;
    ref: HTMLElement;
    stylesNames: InlineCodeHighlightStylesNames;
}>;
export declare const InlineCodeHighlight: import("@mantine/core").MantineComponent<{
    props: InlineCodeHighlightProps;
    ref: HTMLElement;
    stylesNames: InlineCodeHighlightStylesNames;
}>;
