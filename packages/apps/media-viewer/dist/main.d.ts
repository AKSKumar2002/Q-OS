import { App } from '@prozilla-os/core';
import { VirtualFile } from '@prozilla-os/core';
import { WindowProps } from '@prozilla-os/core';

export declare const mediaViewer: App<MediaViewerProps>;

declare interface MediaViewerProps extends WindowProps {
    file?: VirtualFile;
}

export { }
