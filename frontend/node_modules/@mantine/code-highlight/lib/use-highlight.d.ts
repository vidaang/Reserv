interface UseHighlightInput {
    code: string;
    language: string;
    highlightOnClient: boolean | undefined;
}
export declare function useHighlight({ code, language, highlightOnClient }: UseHighlightInput): () => {
    dangerouslySetInnerHTML: {
        __html: string;
    };
    children?: undefined;
} | {
    children: string;
    dangerouslySetInnerHTML?: undefined;
};
export {};
