interface SelectDataItem {
    label: string;
    value: string;
}
export type SelectData = (string | SelectDataItem)[];
export declare function transformSelectData(data: SelectData): SelectDataItem[];
export {};
