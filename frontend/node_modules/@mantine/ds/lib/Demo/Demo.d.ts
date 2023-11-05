import React from 'react';
import { CodeDemoProps } from '../CodeDemo/CodeDemo';
import { ConfiguratorDemoProps } from '../ConfiguratorDemo/ConfiguratorDemo';
import { StylesApiDemoProps } from '../StylesApiDemo/StylesApiDemo';
interface DemoComponent {
    component: React.FC<any>;
}
export type MantineDemo = ({
    type: 'code';
} & DemoComponent & CodeDemoProps) | ({
    type: 'configurator';
} & DemoComponent & ConfiguratorDemoProps) | ({
    type: 'styles-api';
} & DemoComponent & StylesApiDemoProps);
interface DemoProps {
    data: MantineDemo;
}
export declare function Demo({ data }: DemoProps): React.JSX.Element | null;
export {};
