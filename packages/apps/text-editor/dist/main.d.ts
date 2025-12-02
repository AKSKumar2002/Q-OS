import { App } from '@prozilla-os/core';
import { VirtualFile } from '@prozilla-os/core';
import { WindowProps } from '@prozilla-os/core';

export declare const textEditor: App<TextEditorProps>;

declare interface TextEditorProps extends WindowProps {
    file?: VirtualFile;
    mode?: "view" | "edit";
    path?: string;
}

export { }
