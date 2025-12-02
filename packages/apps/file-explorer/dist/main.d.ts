import { App } from '@prozilla-os/core';
import { FC } from 'react';
import { OnSelectionChangeParams } from '@prozilla-os/core';
import { WindowProps } from '@prozilla-os/core';

export declare const fileExplorer: App<FileExplorerProps>;

declare interface FileExplorerProps extends WindowProps {
    path?: string;
    selectorMode?: number;
    Footer?: FC;
    onSelectionChange?: (params: OnSelectionChangeParams) => void;
    onSelectionFinish?: () => void;
}

export declare enum FileSelectorMode {
    None = 0,
    Single = 1,
    Multi = 2
}

export { }
