import { FC } from 'react';
import { HTMLAttributeAnchorTarget } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { MemoExoticComponent } from 'react';
import { MouseEvent as MouseEvent_2 } from 'react';
import { MutableRefObject } from 'react';
import { NamedExoticComponent } from 'react';
import { ReactElement } from 'react';
import { ReactNode } from 'react';
import { Ref } from 'react';
import { UaEventOptions } from 'react-ga4/types/ga4';
import { default as utilStyles } from './utils.module.css';

declare interface ActionProps {
    actionId?: string;
    label?: string;
    icon?: string | object;
    shortcut?: string[];
    onTrigger?: (event?: Event, triggerParams?: unknown, ...args: unknown[]) => void;
    children?: ReactNode;
    disabled?: boolean;
}

/**
 * @example
 * <ClickAction
 * 	label="Reload"
 * 	shortcut={["Control", "r"]}
 * 	icon={faArrowsRotate}
 * 	onTrigger={() => {
 * 		reloadViewport();
 * 	}}
 * />
 */
export declare function Actions({ children, mode, className, onAnyTrigger, triggerParams, avoidTaskbar }: ActionsProps): ReactElement;

declare interface ActionsProps {
    mode?: string;
    className?: string;
    onAnyTrigger?: (event: Event, triggerParams: unknown, ...args: unknown[]) => void;
    children?: ReactNode;
    triggerParams?: unknown;
    avoidTaskbar?: boolean;
    [key: string]: unknown;
}

declare interface AlertParams {
    title: string;
    text: string;
    iconUrl?: string;
    size?: Vector2;
    single?: boolean;
}

/**
 * An application that can be ran by ProzillaOS
 * Applications can be installed by adding them to the `apps` array in {@link AppsConfig}
 */
export declare class App<AppProps extends WindowProps = WindowProps> {
    /**
     * The display name of this application
     */
    name: string;
    /**
     * The unique ID of this application
     */
    id: string;
    /**
     * Main component that renders this app inside a window
     */
    windowContent: FC<AppProps>;
    /**
     * Default options that get passed to the {@link this.windowContent} component
     */
    windowOptions?: Partial<AppProps> & WindowOptions_2;
    /**
     * Description of this application
     */
    description: string | null;
    /**
     * URL of the icon of this application
     */
    iconUrl: string | null;
    /**
     * Defines what the app can handle and how it can be used elsewhere in the system
     */
    role: string | null;
    /**
     * An array of file extensions that this application can interpret
     */
    associatedExtensions: string[];
    /**
     * Determines whether the app is pinned by default
     * @default true
     */
    pinnedByDefault: boolean;
    /**
     * Determines whether the app is launched at startup
     * @default false
     */
    launchAtStartup: boolean;
    /**
     * The category the app belongs to
     */
    category: typeof APP_CATEGORIES[number] | null;
    /**
     * Metadata of the app's package
     */
    metadata: AppMetadata | null;
    /**
     * Determines whether a desktop icon is added to the default data
     * @default false
     */
    showDesktopIcon: boolean;
    isActive: boolean;
    isPinned?: boolean;
    isInstalled: boolean;
    constructor(name: App["name"], id: App["id"], windowContent: App<AppProps>["windowContent"], windowOptions?: Partial<AppProps> & WindowOptions_2);
    WindowContent: (props: AppProps) => JSX_2.Element | null;
    /**
     * Set the display name of this application
     */
    setName(name: string): this;
    /**
     * Set the description of this application
     */
    setDescription(description: App["description"]): this;
    /**
     * Set the URL of the icon of this application
     */
    setIconUrl(iconUrl: App["iconUrl"]): this;
    /**
     * Set the role of this application
     */
    setRole(role: string | null): this;
    /**
     * Set the associated extensions of this application
     */
    setAssociatedExtensions(extensions: string[] | null): this;
    /**
     * Changes whether this application is pinned by default or not
     */
    setPinnedByDefault(pinnedByDefault: boolean): this;
    /**
     * Changes whether this application is launched at startup or not
     */
    setLaunchAtStartup(launchAtStartup: boolean): this;
    /**
     * Changes whether this application is installed by default or not
     */
    setInstalled(installed: boolean): this;
    /**
     * Changes the category this application belongs to
     */
    setCategory(category: typeof APP_CATEGORIES[number] | null): this;
    /**
     * Changes the metadata for this application
     */
    setMetadata(metadata: AppMetadata | null): this;
    /**
     * Changes whether this application has a desktop icon in the default data
     */
    setShowDesktopIcon(showDesktopIcon: boolean): this;
    /**
     * Changes the default options for the {@link this.windowContent} component
     */
    setWindowOptions(windowOptions: Partial<AppProps> & WindowOptions_2): this;
}

export declare const APP_CATEGORIES: readonly ["Business", "Developer tools", "Education", "Entertainment", "Food & dining", "Health & fitness", "Kids & family", "Lifestyle", "Media", "Medical", "Multimedia design", "Music", "Navigation & maps", "News & weather", "Personal finance", "Personalization", "Photo & video", "Productivity", "Security", "Shopping", "Social", "Sports", "Travel", "Utilities & tools"];

declare interface AppMetadata {
    name: string;
    version: `${number}.${number}.${number}`;
    author: string;
}

export declare class AppsConfig {
    apps: AppsConfigOptions["apps"];
    static APP_ROLES: {
        fileExplorer: string;
        terminal: string;
        textEditor: string;
        settings: string;
        mediaViewer: string;
        browser: string;
    };
    constructor(options?: Partial<AppsConfigOptions>);
    get installedApps(): App<WindowProps>[];
    /**
     * @param includeUninstalled Include apps that are not currently installed
     */
    getAppById(id: string, includeUninstalled?: boolean): App | null;
    /**
     * Get the app associated with a file extension
     */
    getAppByFileExtension(fileExtension: string): App | null;
    /**
     * Get the app with a specific role
     */
    getAppByRole(role: string): App | null;
    /**
     * Get all applications (including uninstalled apps) that belong to a category
     */
    getAppsByCategory(category: typeof APP_CATEGORIES[number]): App[];
}

declare interface AppsConfigOptions {
    /**
     * An array of applications
     */
    apps: App<WindowProps>[];
}

export declare const AUDIO_EXTENSIONS: string[];

export declare function Button({ className, href, children, icon, target, ...props }: ButtonProps): JSX_2.Element;

declare interface ButtonProps {
    className?: string;
    href?: string;
    icon?: IconProp;
    target?: HTMLAttributeAnchorTarget;
    children?: ReactNode;
    [key: string]: unknown;
}

export declare const ClickAction: MemoExoticComponent<({ actionId, label, shortcut, disabled, onTrigger, icon }: ClickActionProps) => JSX_2.Element>;

declare interface ClickActionProps extends ActionProps {
    icon?: string | object;
}

/**
 * Simulates closing the viewport by opening a blank page
 * @param name - Name of the app
 */
export declare function closeViewport(requireConfirmation: boolean | undefined, name: string): void;

export declare const CODE_EXTENSIONS: string[];

export declare function copyToClipboard(string: string, onSuccess?: (value: void) => void, onFail?: (value: void) => void): void;

export declare function DefaultRoute(): JSX_2.Element;

export declare const Desktop: MemoExoticComponent<() => JSX_2.Element>;

export declare class DesktopConfig {
    defaultIconSize: DesktopConfigOptions["defaultIconSize"];
    defaultIconDirection: DesktopConfigOptions["defaultIconDirection"];
    constructor(options?: Partial<DesktopConfigOptions>);
}

declare interface DesktopConfigOptions {
    /**
     * @default 1
     */
    defaultIconSize: 0 | 1 | 2;
    /**
     * 0: vertical, 1: horizontal
     * @default 0
     * */
    defaultIconDirection: 0 | 1;
}

export declare function DialogBox({ modal, params, children, ...props }: ModalProps): JSX_2.Element;

export declare function DirectoryList({ directory, showHidden, folderClassName, fileClassName, className, onContextMenuFile, onContextMenuFolder, onOpenFile, onOpenFolder, allowMultiSelect, onSelectionChange, ...props }: DirectoryListProps): ReactElement | null;

declare interface DirectoryListProps {
    directory: VirtualFolder;
    showHidden?: boolean;
    folderClassName?: string;
    fileClassName?: string;
    className?: string;
    onContextMenuFile?: FileEventHandler;
    onContextMenuFolder?: FolderEventHandler;
    onOpenFile?: FileEventHandler;
    onOpenFolder?: FolderEventHandler;
    allowMultiSelect?: boolean;
    onSelectionChange?: (params: OnSelectionChangeParams) => void;
    [key: string]: unknown;
}

export declare function Divider(): JSX_2.Element;

export declare function downloadUrl(url: string, name: string): void;

export declare function DropdownAction({ label, icon, children, showOnHover }: DropdownActionProps): ReactElement;

declare interface DropdownActionProps extends ActionProps {
    showOnHover?: boolean;
}

export declare function DropdownButton({ label, options, shortcuts }: DropdownButtonProps): JSX_2.Element;

declare interface DropdownButtonProps {
    label: string;
    options: Record<string, () => void>;
    shortcuts: Record<string, string[]>;
}

declare class EventEmitter<EventMap extends EventNamesMap> {
    #private;
    static EVENT_NAMES: EventNamesMap;
    /**
     * Add event listener for an event
     */
    on<Key extends keyof EventMap>(eventName: Key, callback: (data: unknown) => void): void;
    /**
     * Remove event listener for an event
     */
    off<Key extends keyof EventMap>(eventName: Key, callback: (data: unknown) => void): void;
    /**
     * Dispatch event
     */
    emit<Key extends keyof EventMap>(eventName: Key, data?: unknown): void;
}

declare type EventNamesMap = Record<string, string>;

export declare const FILE_SCHEMES: {
    external: string;
    app: string;
};

export declare type FileEventHandler = (event: Event, file: VirtualFile) => void;

export declare type FolderEventHandler = (event: Event, folder: VirtualFolder) => void;

/**
 * Formats a shortcut (combination of keys) into a human-readable format.
 *
 * For a list of valid key values, refer to this page: <https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values>
 */
export declare function formatShortcut(shortcut: string[]): string;

export declare function generateUrl(options: GenerateUrlOptions): string;

declare interface GenerateUrlOptions {
    appId?: string;
    fullscreen?: boolean;
    standalone?: boolean;
}

export declare function getViewportParams(): Record<string, string>;

export declare function HeaderMenu({ children, ...props }: ActionsProps): JSX_2.Element;

declare function Image_2({ className, src, ...props }: ImageProps): JSX_2.Element;
export { Image_2 as Image }

export declare const IMAGE_EXTENSIONS: string[];

export declare function ImagePreview({ source, className, onError, ...props }: ImagePreviewProps): JSX_2.Element;

declare interface ImagePreviewProps {
    source: string;
    className?: string;
    onError?: () => void;
}

declare interface ImageProps {
    className?: string;
    src?: string;
    [key: string]: unknown;
}

export declare function Interactable({ onClick, onDoubleClick, children, ...props }: InteractableProps): JSX_2.Element;

declare interface InteractableProps {
    onClick?: (event: MouseEvent) => void;
    onDoubleClick?: (event: MouseEvent) => void;
    children: ReactNode;
    [key: string]: unknown;
}

export declare function isValidUrl(string: string): boolean;

export declare const MEDIA_EXTENSIONS: string[];

export declare class MiscConfig {
    doubleClickDelay: MiscConfigOptions["doubleClickDelay"];
    constructor(options?: Partial<MiscConfigOptions>);
}

declare interface MiscConfigOptions {
    /**
     * The maximum time between two clicks to register as a double click (in ms)
     * @default 250
     * */
    doubleClickDelay: number;
}

declare class Modal {
    size: Vector2;
    position: Vector2;
    icon: string | null;
    title: string | null;
    modalsManager: ModalsManager | null;
    element: FC<ModalProps> | null;
    props: object;
    callback: ((...args: unknown[]) => void) | null;
    id: number | null;
    dismissible: boolean;
    lastInteraction?: number;
    constructor(element: Modal["element"], callback?: Modal["callback"]);
    setIcon(icon: string): Modal;
    setTitle(title: string): Modal;
    setPosition(position: Vector2): Modal;
    setSize(size: Vector2): Modal;
    setProps(props: object): Modal;
    /**
     * @param {boolean} dismissible
     * @returns {Modal}
     */
    setDismissible(dismissible: boolean): Modal;
    focus(): void;
    finish(...args: unknown[]): void;
    close(): void;
}

export declare interface ModalProps {
    modal?: Modal;
    params?: {
        appId?: string;
        fullscreen?: boolean;
        iconUrl?: string;
        title?: string;
        standalone?: boolean;
        [key: string]: unknown;
    };
    children?: ReactNode;
    onFinish?: () => void;
    [key: string]: unknown;
}

export declare class ModalsConfig {
    defaultDialogSize: ModalsConfigOptions["defaultDialogSize"];
    defaultFileSelectorSize: ModalsConfigOptions["defaultFileSelectorSize"];
    static DIALOG_CONTENT_TYPES: {
        closeButton: number;
    };
    constructor(options?: Partial<ModalsConfigOptions>);
}

declare interface ModalsConfigOptions {
    /**
     * Default size of a dialog box
     * @default new Vector2(400, 200)
     */
    defaultDialogSize: Vector2;
    /**
     * Default size of a file selector
     * @default new Vector2(700, 400)
     */
    defaultFileSelectorSize: Vector2;
}

export declare class ModalsManager {
    modals: Record<string, Modal>;
    containerRef?: MutableRefObject<HTMLElement>;
    updateModals: (modals: ModalsManager["modals"]) => void;
    /**
     * @param single - Set to false to preserve other open modals
     */
    open(modal: Modal, single?: boolean): void;
    close(modalId: string | number, sendModalsUpdate?: boolean): void;
    focus(modalId: string): void;
    setUpdateModals(updateModals: ModalsManager["updateModals"]): void;
    get modalIds(): string[];
    static getModalIconUrl(name: string): string;
}

declare type ModalsManagerState = ModalsManager | undefined;

export declare const ModalsView: MemoExoticComponent<() => JSX_2.Element>;

export declare function NoRoute(): JSX_2.Element;

export declare interface OnSelectionChangeParams {
    files?: string[];
    folders?: string[];
    directory?: VirtualFolder;
}

export declare function openUrl(url: string, target?: HTMLAttributeAnchorTarget): void;

declare type OpenWindowedModal = (params: OpenWindowedModalParams) => Modal;

declare interface OpenWindowedModalParams {
    appId?: string;
    iconUrl?: string;
    title?: string;
    size: Vector2;
    Modal: FC<ModalProps>;
    single?: boolean;
    fullscreen?: WindowProps["fullscreen"];
}

declare type OptionalStringProperty = string | null | undefined;

export declare const OutsideClickListener: MemoExoticComponent<({ onOutsideClick, children }: OutsideClickListenerProps) => JSX_2.Element>;

declare interface OutsideClickListenerProps {
    onOutsideClick: (event: Event) => void;
    children: ReactNode;
}

export declare function ProgressBar({ fillPercentage, fillColor, backgroundColor, align, className }: ProgressBarProps): JSX_2.Element;

declare interface ProgressBarProps {
    fillPercentage: number;
    fillColor?: string;
    backgroundColor?: string;
    align?: "left";
    className?: string;
}

export declare const ProzillaOS: NamedExoticComponent<ProzillaOSProps>;

declare interface ProzillaOSProps {
    systemName?: string;
    tagLine?: string;
    config?: {
        apps?: Partial<AppsConfigOptions>;
        desktop?: Partial<DesktopConfigOptions>;
        misc?: Partial<MiscConfigOptions>;
        modals?: Partial<ModalsConfigOptions>;
        taskbar?: Partial<TaskbarConfigOptions>;
        tracking?: Partial<TrackingConfigOptions>;
        windows?: Partial<WindowsConfigOptions>;
        virtualDrive?: Partial<VirtualDriveConfigOptions>;
    };
    skin?: Skin;
    children?: ReactNode;
}

export declare function RadioAction({ actionId, options, initialIndex, onTrigger }: RadioActionProps): ReactElement;

/**
 * @param {object} props
 * @param {string} props.actionId
 * @param {{
         * 	label: string,
         * 	shortcut: string[]
         * }[]} props.options
 * @param {number} props.initialIndex
 * @param {Function} props.onTrigger
 */
declare interface RadioActionProps extends ActionProps {
    options: {
        label: string;
        shortcut?: string[];
    }[];
    initialIndex: number;
}

/**
 * Reloads the viewport
 */
export declare function reloadViewport(): void;

export declare function removeBaseUrl(url: string): string;

export declare function removeUrlProtocol(url: string): string;

export declare function Router({ path, homePage, fallbackPage, children }: RouterProps): JSX_2.Element;

declare interface RouterProps {
    path?: string;
    homePage?: JSX.Element;
    fallbackPage?: JSX.Element;
    children?: ReactElement;
}

declare class Settings {
    #private;
    path: string;
    file: VirtualFile;
    xmlDoc?: Document;
    constructor(virtualRoot: VirtualRoot, path: string);
    /**
     * Reads the xml doc from the given path and assigns it to itself
     */
    read(): Promise<void>;
    write(): void;
    /**
     * Checks if xml doc is missing
     */
    isMissingXmlDoc(): Promise<boolean>;
    /**
     * Gets a value by a given key if it exists or calls a callback function whenever the value changes
     */
    get(key: string, callback?: (value: string) => void): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
}

export declare class SettingsManager {
    #private;
    static VIRTUAL_PATHS: {
        [s: string]: string;
    };
    constructor(virtualRoot: VirtualRoot);
    getSettings(path: string): Settings;
}

declare type SettingsManagerState = SettingsManager | undefined;

export declare function setViewportIcon(url: string): void;

export declare function setViewportTitle(title: string): void;

export declare function Share({ modal, params, ...props }: ModalProps): JSX_2.Element;

declare class Skin {
    systemIcon: SkinOptions["systemIcon"];
    appIcons: SkinOptions["appIcons"];
    appNames: SkinOptions["appNames"];
    wallpapers: SkinOptions["wallpapers"];
    defaultWallpaper: SkinOptions["defaultWallpaper"];
    fileIcons: SkinOptions["fileIcons"];
    folderIcons: SkinOptions["folderIcons"];
    loadStyleSheet: SkinOptions["loadStyleSheet"];
    defaultTheme: SkinOptions["defaultTheme"];
    constructor(options?: Partial<SkinOptions>);
}

declare interface SkinOptions {
    /**
     * SVG icon for the system
     * @default
     * "https://os.prozilla.dev/icon.svg"
     */
    systemIcon: string;
    /**
     * Replacements for app icons based on app id
     */
    appIcons?: {
        [key: string]: string;
    };
    /**
     * Replacements for app names based on app id
     */
    appNames?: {
        [key: string]: string;
    };
    /**
     * Array of URLs of wallpaper images
     */
    wallpapers: string[];
    /**
     * URL of default wallpaper image
     * @default
     * "https://os.prozilla.dev/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png"
     */
    defaultWallpaper: string;
    /**
     * URLs of icons for types of files
     */
    fileIcons: {
        generic: string;
        info?: string;
        text?: string;
        code?: string;
        external?: string;
        video?: string;
        audio?: string;
    };
    /**
     * URLs of icons for types of folders
     */
    folderIcons: {
        generic: string;
        images?: string;
        text?: string;
        link?: string;
        video?: string;
        audio?: string;
    };
    /**
     * Function that dynamically imports style sheet
     */
    loadStyleSheet?: () => void;
    /**
     * Default theme
     */
    defaultTheme?: Theme;
}

export declare function StandaloneRoute({ app }: StandaloneRouteProps): JSX_2.Element;

declare interface StandaloneRouteProps {
    app: App;
}

declare class StorageManager_2 {
    static MAX_BYTES: number;
    static store(key: string, value: string): void;
    static load(key: string): string | null;
    static clear(): void;
    static getByteSize(string: string | null): number;
    static byteToKilobyte(bytes: number): number;
}
export { StorageManager_2 as StorageManager }

export declare class SystemManager {
    #private;
    readonly systemName: string;
    readonly tagLine: string;
    readonly skin: Skin;
    readonly appsConfig: AppsConfig;
    readonly desktopConfig: DesktopConfig;
    readonly miscConfig: MiscConfig;
    readonly modalsConfig: ModalsConfig;
    readonly taskbarConfig: TaskbarConfig;
    readonly trackingConfig: TrackingConfig;
    readonly windowsConfig: WindowsConfig;
    readonly virtualDriveConfig: VirtualDriveConfig;
    constructor({ systemName, tagLine, skin, desktopConfig, appsConfig, miscConfig, modalsConfig, taskbarConfig, trackingConfig, windowsConfig, virtualDriveConfig, }: SystemManagerParams);
    private loadSkin;
    getUptime(precision?: number): string;
}

declare interface SystemManagerParams {
    systemName: SystemManager["systemName"] | null;
    tagLine: SystemManager["tagLine"] | null;
    skin?: SystemManager["skin"];
    desktopConfig: DesktopConfig;
    appsConfig: AppsConfig;
    miscConfig: MiscConfig;
    modalsConfig: ModalsConfig;
    taskbarConfig: TaskbarConfig;
    trackingConfig: TrackingConfig;
    windowsConfig: WindowsConfig;
    virtualDriveConfig: VirtualDriveConfig;
}

export declare const Taskbar: MemoExoticComponent<() => JSX_2.Element>;

export declare class TaskbarConfig {
    height: TaskbarConfigOptions["height"];
    constructor(options?: Partial<TaskbarConfigOptions>);
}

declare interface TaskbarConfigOptions {
    /**
     * Height of the taskbar in CSS pixels
     * @default 3 * 16
     */
    height: number;
}

export declare function TextDisplay({ children }: TextDisplayProps): JSX_2.Element;

declare interface TextDisplayProps {
    children: ReactNode;
}

declare enum Theme {
    Dark = 0,
    Light = 1,
    Cherry = 2,
    Mango = 3,
    Aqua = 4,
    Grape = 5
}

export declare class TimeManager {
    static START_DATE: Date;
    /**
     * Resets the time
     */
    static reset(): void;
    /**
     * Get the current uptime
     */
    static getUptime(precision?: number): string;
}

export declare function ToggleAction({ actionId, label, shortcut, initialValue, onTrigger }: ToggleActionProps): ReactElement;

declare interface ToggleActionProps extends ActionProps {
    initialValue: boolean;
}

export declare class TrackingConfig {
    enabled: TrackingConfigOptions["enabled"];
    googleAnalyticsMeasurementId: TrackingConfigOptions["GAMeasurementId"];
    constructor(options?: Partial<TrackingConfigOptions>);
}

declare interface TrackingConfigOptions {
    /**
     * Enable tracking
     * @default true
     */
    enabled: boolean;
    /** Google Analytics measurement ID */
    GAMeasurementId: string;
}

export declare class TrackingManager {
    #private;
    measurementId?: string | null;
    constructor(systemManager: SystemManager);
    init(): this;
    event(options: UaEventOptions | string): void;
}

declare type TrackingManagerState = TrackingManager | undefined;

export declare function useAlert(): {
    alert: ({ title, text, iconUrl, size, single }: AlertParams) => void;
};

export declare function useAppFolder(app?: App): VirtualFolder | null;

/**
 * Combine class names and an optional static class name
 */
export declare function useClassNames(classNames: (string | undefined)[], block?: string, element?: string, modifier?: string | string[]): string;

export declare function useContextMenu({ Actions }: UseContextMenuParams): {
    onContextMenu: (event: MouseEvent_2<HTMLElement, MouseEvent_2>, params?: object) => Modal;
    ShortcutsListener: () => JSX_2.Element;
};

declare interface UseContextMenuParams {
    Actions: FC<ActionsProps>;
}

export declare function useHistory<Type>(initialState: Type): {
    history: Type[];
    stateIndex: number;
    pushState: (state: Type) => void;
    undo: () => void;
    redo: () => void;
    undoAvailable: boolean;
    redoAvailable: boolean;
};

export declare function useKeyboardListener({ onKeyDown, onKeyUp }: UseKeyboardListenerParams): void;

declare interface UseKeyboardListenerParams {
    onKeyDown?: (event: KeyboardEvent) => void;
    onKeyUp?: (event: KeyboardEvent) => void;
}

export declare function useModalsManager(): ModalsManagerState;

export declare function useMouseListener({ onMouseDown, onMouseUp, onClick, onContextMenu }: UseMouseListenerParams): void;

declare interface UseMouseListenerParams {
    onMouseDown: EventListener;
    onMouseUp: EventListener;
    onClick: EventListener;
    onContextMenu: EventListener;
}

export declare function useScreenBounds({ avoidTaskbar }: {
    avoidTaskbar: boolean;
}): {
    ref: Ref<HTMLElement>;
    initiated: boolean;
    alignLeft: boolean;
    alignTop: boolean;
};

export declare function useScreenDimensions(): [screenWidth: number | null, screenHeight: number | null];

export declare function useScrollWithShadow(params: UseScrollWithShadowParams): {
    boxShadow: string;
    onUpdate: (event: Event | {
        target: HTMLElement;
    }) => void;
};

declare interface UseScrollWithShadowParams {
    ref?: MutableRefObject<HTMLElement>;
    horizontal?: boolean;
    dynamicOffset?: boolean;
    dynamicOffsetFactor?: number;
    shadow?: {
        offset?: number;
        blurRadius?: number;
        spreadRadius?: number;
        color?: {
            r?: number;
            g?: number;
            b?: number;
            a?: number;
        };
    };
}

export declare function useSettingsManager(): SettingsManagerState;

/**
 * TO DO: rewrite to use a global shortcuts manager instead, to allow certain shortcuts to be prioritized and prevent conflicts
 */
export declare function useShortcuts({ options, shortcuts, useCategories }: UseShortcutsParams): void;

declare interface UseShortcutsParams {
    options: Record<string, Record<string, (event: KeyboardEvent) => void>> | Record<string, (event: KeyboardEvent) => void>;
    shortcuts?: Record<string, Record<string, string[]>> | Record<string, string[]>;
    useCategories?: boolean;
}

/**
 * Generates static class name using BEM notation
 */
export declare function useStaticClassName(block?: string, element?: string, modifier?: string | string[]): string | null;

export declare function useSystemManager(): SystemManager;

export declare function useTrackingManager(): TrackingManagerState;

export declare function useVirtualRoot(): VirtualRootState;

export declare function useWindowedModal(): {
    openWindowedModal: OpenWindowedModal;
};

export declare function useWindowsManager(): WindowsManagerState;

export declare function useZIndex({ groupIndex, index }: UseZIndexParams): number;

declare interface UseZIndexParams {
    groupIndex: number;
    index: number;
}

export { utilStyles }

export declare class Vector2 {
    x: number;
    y: number;
    static get ZERO(): Vector2;
    get clone(): Vector2;
    constructor(x: number, y?: number);
    round(): Vector2;
    getDistance(x: number, y?: number): number;
    getDistance(vector2: Vector2): number;
    static add(vector2A: Vector2, vector2B: Vector2): Vector2;
    static subtract(vector2A: Vector2, vector2B: Vector2): Vector2;
    static scale(vector2: Vector2, scalar: number): Vector2;
    static magnitude(vector2: Vector2): number;
    static normalize(vector2: Vector2): Vector2;
    static sqrDistance(vector2A: Vector2, vector2B: Vector2): number;
    static lerp(vector2A: Vector2, vector2B: Vector2, t: number): Vector2;
}

export declare const VIDEO_EXTENSIONS: string[];

declare class VirtualBase extends EventEmitter<EventNamesMap> {
    name: string;
    alias: string | undefined | null;
    parent: VirtualFolder | undefined | null;
    isProtected: boolean | undefined | null;
    iconUrl: string | undefined | null;
    linkedFile: VirtualFile | undefined | null;
    linkedFolder: VirtualFolder | undefined | null;
    editedByUser: boolean | undefined | null;
    isRoot: boolean | undefined | null;
    root: VirtualRoot | undefined | null;
    isDeleted: boolean;
    static EVENT_NAMES: {
        update: string;
    };
    constructor(name: string);
    get id(): string;
    setName(name: string): this;
    setAlias(alias: string): this;
    setParent(parent: VirtualFolder): this;
    setProtected(value: boolean): this;
    setIconUrl(iconUrl: string | null): this;
    getIconUrl(): string;
    getType(): string;
    delete(): void;
    confirmChanges(root?: VirtualRoot): void;
    open(..._args: unknown[]): unknown;
    get path(): string;
    /**
     * Returns path without using this item's alias
     */
    get displayPath(): string;
    /**
     * Returns path without using any aliases
     */
    get absolutePath(): string;
    /**
     * Returns whether this can be edited in its current state
     */
    get canBeEdited(): boolean;
    getRoot(): VirtualRoot;
    isFile(): boolean;
    isFolder(): boolean;
    toJSON(): VirtualBaseJson | null;
    toString(): string | null;
}

declare interface VirtualBaseJson {
    nam: string;
    ico?: string;
}

export declare class VirtualDriveConfig {
    saveData: VirtualDriveConfigOptions["saveData"];
    defaultData: VirtualDriveConfigOptions["defaultData"];
    constructor(options?: Partial<VirtualDriveConfigOptions>);
}

declare interface VirtualDriveConfigOptions {
    /**
     * Enables persistent storage of the virtual drive
     * @default true
     */
    saveData: boolean;
    /**
     * Configure the data that is loaded initially when ProzillaOS is opened
     */
    defaultData: {
        /**
         * Include pictures folder in default data
         * @default true
         */
        includePicturesFolder?: boolean;
        /**
         * Include documents folder in default data
         * @default true
         */
        includeDocumentsFolder?: boolean;
        /**
         * Include desktop folder in default data
         * @default true
         */
        includeDesktopFolder?: boolean;
        /**
         * Include source tree folder in default data
         * @default true
         */
        includeSourceTree?: boolean;
        /**
         * Include apps folder in default data
         * @default true
         */
        includeAppsFolder?: boolean;
        loadData?: (virtualRoot: VirtualRoot) => void;
    };
}

/**
 * A virtual file that can be stored inside a folder
 */
export declare class VirtualFile extends VirtualBase {
    extension: OptionalStringProperty;
    source: OptionalStringProperty;
    content: OptionalStringProperty;
    static NON_TEXT_EXTENSIONS: string[];
    static EVENT_NAMES: {
        update: string;
        contentChange: string;
    };
    constructor(name: string, extension?: string);
    setAlias(alias: string): this;
    /**
     * Sets the source of this file and removes the content
     */
    setSource(source: string): this;
    /**
     * Sets the content of this file and removes the source
     */
    setContent(content: string | string[]): this;
    get id(): string;
    static splitId(id: string): {
        name: string;
        extension: OptionalStringProperty;
    };
    /**
     * Opens this file in an app associated with its extension
     */
    open(windowsManager: WindowsManager): object | null;
    read(): Promise<OptionalStringProperty | undefined>;
    isFile(): boolean;
    getIconUrl(): string;
    getType(): string;
    download(): void;
    isDownloadable(): boolean;
    toJSON(): VirtualFileJson | null;
    static removeFileScheme(source: string): string;
}

declare interface VirtualFileJson extends VirtualBaseJson {
    ext?: string;
    cnt?: string;
    src?: string;
}

/**
 * A link that points to a virtual file
 */
export declare class VirtualFileLink extends VirtualFile {
    linkedPath?: string;
    constructor(name: string, linkedFile?: VirtualFile);
    setLinkedFile(file: VirtualFile): VirtualFileLink;
    setLinkedPath(path: string): VirtualFileLink;
    isValid(): boolean;
    toJSON(): VirtualFileLinkJson | null;
    setAlias(...args: Parameters<VirtualFile["setAlias"]>): this;
    setSource(...args: Parameters<VirtualFile["setSource"]>): this;
    setContent(...args: Parameters<VirtualFile["setContent"]>): this;
    get id(): string;
    open(...args: Parameters<VirtualFile["open"]>): ReturnType<VirtualFile["open"]>;
    read(...args: Parameters<VirtualFile["read"]>): Promise<string | null | undefined>;
    getIconUrl(...args: Parameters<VirtualFile["getIconUrl"]>): ReturnType<VirtualFile["getIconUrl"]>;
}

declare interface VirtualFileLinkJson extends VirtualFileJson {
    lnk: string;
}

/**
 * A virtual folder that can contains files and sub-folders
 */
export declare class VirtualFolder extends VirtualBase {
    subFolders: (VirtualFolder | VirtualFolderLink)[];
    files: (VirtualFile | VirtualFileLink)[];
    type: number | undefined;
    static TYPE: {
        general: number;
        media: number;
    };
    constructor(name: string, type?: number);
    setAlias(alias: string): this;
    /**
     * Returns true if this folder contains a file matching a name and extension
     */
    hasFile(name: string, extension?: string): boolean;
    /**
     * Returns true if this folder contains a folder matching a name
     */
    hasFolder(name: string): boolean;
    /**
     * Finds and returns a file inside this folder matching a name and extension
     */
    findFile(name: string, extension?: string | null): VirtualFile | VirtualFileLink | null;
    /**
     * Finds and returns a folder inside this folder matching a name
     */
    findSubFolder(name: string): VirtualFolder | VirtualFolderLink | null;
    /**
     * Creates a file with a name and extension
     */
    createFile(name: string, extension?: string, callback?: (newFile: VirtualFile | VirtualFileLink) => void): this;
    /**
     * Creates files based on an array of objects with file names and extensions
     */
    createFiles(files: {
        name: string;
        extension: string;
    }[]): this;
    /**
     * Creates a file link with a name
     */
    createFileLink(name: string, callback?: (newFileLink: VirtualFileLink | VirtualFile) => void): this;
    /**
     * Creates file links based on an array of objects with file names and extensions
     */
    createFileLinks(fileLinks: {
        name: string;
    }[]): this;
    /**
     * Creates a folder with a name
     */
    createFolder(name: string, callback?: (newFolder: VirtualFolder) => void): this;
    /**
     * Creates folders based on an array of folder names
     */
    createFolders(names: string[]): this;
    /**
     * Creates a folder link with a name
     */
    createFolderLink(name: string, callback?: (newFolderLink: VirtualFolderLink | VirtualFolder) => void): this;
    /**
     * Creates folder links based on an array of folder names
     */
    createFolderLinks(names: string[]): this;
    /**
     * Removes a file or folder from this folder
     */
    remove(child: VirtualFile | VirtualFileLink | VirtualFolder | VirtualFolderLink): this;
    /**
     * Returns the file or folder at a relative path or null if it doesn't exist
     */
    navigate(relativePath: string): VirtualFile | VirtualFolder | null;
    /**
     * Opens this folder in file explorer
     */
    open(windowsManager: WindowsManager): object | null | undefined;
    /**
     * Deletes this folder and all its files and sub-folders recursively
     */
    delete(): void;
    /**
     * Returns all files inside this folder
     * @param showHidden Whether to include hidden files
     */
    getFiles(showHidden?: boolean): VirtualFile[];
    /**
     * Returns all sub-folders inside this folder
     * @param showHidden Whether to include hidden folders
     */
    getSubFolders(showHidden?: boolean): VirtualFolder[];
    /**
     * Returns the amount of files and sub-folders inside this folder
     * @param includeHidden Whether to include hidden files and folders in the count
     */
    getItemCount(includeHidden?: boolean): number;
    isFolder(): boolean;
    getIconUrl(): string;
    toJSON(): VirtualFolderJson | null;
}

declare interface VirtualFolderJson extends VirtualBaseJson {
    fls?: VirtualFileJson[];
    fds?: VirtualFolderJson[];
}

/**
 * A link that points to a virtual folder
 */
export declare class VirtualFolderLink extends VirtualFolder {
    linkedPath?: string;
    constructor(name: string, linkedFolder?: VirtualFolder);
    setLinkedFolder(folder: VirtualFolder): VirtualFolderLink;
    setLinkedPath(path: string): VirtualFolderLink;
    isValid(): boolean;
    getIconUrl(): string;
    toJSON(): VirtualFolderLinkJson | null;
    setAlias(...args: Parameters<VirtualFolder["setAlias"]>): this;
    createFile(...args: Parameters<VirtualFolder["createFile"]>): this;
    createFiles(...args: Parameters<VirtualFolder["createFiles"]>): this;
    createFolder(...args: Parameters<VirtualFolder["createFolder"]>): this;
    createFolders(...args: Parameters<VirtualFolder["createFolders"]>): this;
    hasFile(...args: Parameters<VirtualFolder["hasFile"]>): ReturnType<VirtualFolder["hasFile"]>;
    hasFolder(...args: Parameters<VirtualFolder["hasFolder"]>): ReturnType<VirtualFolder["hasFolder"]>;
    findFile(...args: Parameters<VirtualFolder["findFile"]>): ReturnType<VirtualFolder["findFile"]>;
    findSubFolder(...args: Parameters<VirtualFolder["findSubFolder"]>): ReturnType<VirtualFolder["findSubFolder"]>;
    getFiles(...args: Parameters<VirtualFolder["getFiles"]>): ReturnType<VirtualFolder["getFiles"]>;
    getSubFolders(...args: Parameters<VirtualFolder["getSubFolders"]>): ReturnType<VirtualFolder["getSubFolders"]>;
    open(...args: Parameters<VirtualFolder["open"]>): ReturnType<VirtualFolder["open"]>;
    getItemCount(...args: Parameters<VirtualFolder["getItemCount"]>): ReturnType<VirtualFolder["getItemCount"]>;
}

declare interface VirtualFolderLinkJson extends VirtualFolderJson {
    lnk: string;
}

/**
 * A virtual folder that serves as the root folder
 */
export declare class VirtualRoot extends VirtualFolder {
    shortcuts: Record<string, VirtualFile | VirtualFileLink | VirtualFolder | VirtualFolderLink>;
    initiated: boolean;
    loadedDefaultData: boolean;
    systemManager: SystemManager;
    static EVENT_NAMES: {
        update: string;
        error: string;
    };
    constructor(systemManager: SystemManager);
    loadDefaultData(): void;
    loadData(): void;
    /**
     * Calls the storage manager's store function with this root's data as a string
     */
    saveData(): void;
    /**
     * Initiates this root by loading the default data and then the user's data on top
     */
    init(): VirtualRoot;
    /**
     * Adds a shortcut to a file or folder
     */
    addShortcut(name: string, destination: VirtualFile | VirtualFileLink | VirtualFolder | VirtualFolderLink): this;
    /**
     * Tells the storage manager to clear all data and reloads the window
     */
    reset(): void;
    static isValidName(_name: string): void;
    static isValidFileName(_name: string): void;
    static isValidFolderName(_name: string): void;
    get path(): string;
    get displayPath(): string;
    toJSON(): VirtualRootJson | null;
    toString(): string | null;
}

declare interface VirtualRootJson extends VirtualFolderJson {
    scs: Record<string, string>;
}

declare type VirtualRootState = VirtualRoot | undefined;

export declare const WebView: FC<WebViewProps>;

declare interface WebViewProps extends WindowProps {
    source?: string;
    title?: string;
}

export declare function WindowedModal({ modal, params, children, ...props }: ModalProps): JSX_2.Element;

declare interface WindowOptions {
    id?: string;
    app?: App;
    size?: Vector2;
    position?: Vector2;
    fullscreen?: boolean | string;
    options?: object;
    isFocused?: boolean;
    lastInteraction?: number;
    minimized?: boolean;
    [key: string]: unknown;
}

declare interface WindowOptions_2 {
    size?: Vector2;
    [key: string]: unknown;
}

export declare interface WindowProps extends WindowOptions {
    fullscreen?: boolean;
    onInteract?: () => void;
    setTitle?: React.Dispatch<React.SetStateAction<string>>;
    setIconUrl?: React.Dispatch<React.SetStateAction<string>>;
    close?: (event?: Event) => void;
    focus?: (event: Event, force?: boolean) => void;
    active?: boolean;
    minimized?: boolean;
    toggleMinimized?: (event?: Event) => void;
    index?: number;
    standalone?: boolean;
}

export declare class WindowsConfig {
    screenMargin: WindowsConfigOptions["screenMargin"];
    titleSeparator: WindowsConfigOptions["titleSeparator"];
    minScreenSize: WindowsConfigOptions["minScreenSize"];
    constructor(options?: Partial<WindowsConfigOptions>);
}

declare interface WindowsConfigOptions {
    /**
     * @default 32
     */
    screenMargin: number;
    /**
     * @default "-"
     */
    titleSeparator: string;
    /**
     * If the user's screen is smaller than these values, windows will always be maximized
     * @default new Vector2(350, 350)
     */
    minScreenSize: Vector2;
}

export declare class WindowsManager {
    #private;
    windows: {
        [id: string]: WindowOptions;
    };
    updateWindows: (window: WindowsManager["windows"]) => void;
    startupComplete: boolean;
    constructor(systemManager: SystemManager, trackingManager: TrackingManager);
    /**
     * Open a window for an app
     */
    open(appId: string, options?: WindowOptions | null): object | null;
    /**
     * Opens a file with the associated app or by a method specified by the file scheme
     * @returns Opened window
     */
    openFile(file: VirtualFile, options?: object): object | null;
    /**
     * Close a window
     */
    close(windowId: string): void;
    /**
     * Focus on a specific window
     */
    focus(windowId: string): void;
    /**
     * Check whether a window is focused
     */
    isFocused(windowId: string): boolean | undefined;
    /**
     * Check if any window is focused
     */
    isAnyFocused(): boolean;
    /**
     * Change the minimized state of a window
     * @param minimized - Leave as undefined to toggle the window's minimization state
     */
    setMinimized(windowId: string, minimized?: boolean): void;
    /**
     * Minimize all windows
     */
    minimizeAll(): void;
    /**
     * Check if an app has an open window
     */
    isAppActive(appId: string): boolean;
    /**
     * Get an opened window of a certain app
     */
    getAppWindowId(appId: string): string | null;
    setUpdateWindows(updateWindows: WindowsManager["updateWindows"]): void;
    startup(appIds: string[], options: Record<string, unknown>): void;
    get windowIds(): string[];
}

declare type WindowsManagerState = WindowsManager | undefined;

export declare const WindowsView: FC;

declare class ZIndexGroup {
    length: number;
    offset: number;
    groupIndex: number;
    zIndexManager: ZIndexManager | null;
    constructor(zIndexManager: ZIndexManager, initialLength?: number);
    setManager(zIndexManager: ZIndexManager): ZIndexGroup;
    setOffset(offset: number): ZIndexGroup;
    setLength(length: number): ZIndexGroup;
    getIndex(index: number): number;
}

export declare class ZIndexManager extends EventEmitter<typeof ZIndexManagerEvents> {
    static GROUPS: {
        WINDOWS: number;
        TASKBAR: number;
        MODALS: number;
    };
    static EVENT_NAMES: {
        readonly indexChange: "indexChange";
    };
    groups: ZIndexGroup[];
    constructor();
    update(): void;
    getIndex(groupIndex: number, index: number): number;
}

declare const ZIndexManagerEvents: {
    readonly indexChange: "indexChange";
};

export { }
