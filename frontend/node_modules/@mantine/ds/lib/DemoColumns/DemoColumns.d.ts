import React from 'react';
import { DemoAreaProps } from '../DemoArea';
export interface DemoColumnsProps extends DemoAreaProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    controls: React.ReactNode;
}
export declare function DemoColumns({ children, withPadding, centered, maxWidth, minHeight, title, description, controls, dimmed, striped, }: DemoColumnsProps): React.JSX.Element;
