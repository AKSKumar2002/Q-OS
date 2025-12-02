import { FC } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { Plugin as Plugin_2 } from 'rollup';
import { Plugin as Plugin_3 } from 'vite';
import { UserConfig } from 'vite';

/**
 * An application that can be ran by ProzillaOS
 * Applications can be installed by adding them to the `apps` array in {@link AppsConfig}
 */
declare class App<AppProps extends WindowProps = WindowProps> {
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

declare const APP_CATEGORIES: readonly ["Business", "Developer tools", "Education", "Entertainment", "Food & dining", "Health & fitness", "Kids & family", "Lifestyle", "Media", "Medical", "Multimedia design", "Music", "Navigation & maps", "News & weather", "Personal finance", "Personalization", "Photo & video", "Productivity", "Security", "Shopping", "Social", "Sports", "Travel", "Utilities & tools"];

declare interface AppMetadata {
    name: string;
    version: `${number}.${number}.${number}`;
    author: string;
}

export declare function appMetadataPlugin({ entryPath }: AppMetadataPluginOptions): Plugin_3;

declare interface AppMetadataPluginOptions {
    entryPath: string;
}

declare class AppsConfig {
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

/**
 * Helper function for creating Vite configurations for ProzillaOS apps
 * @param basePath - Path of base directory
 * @param entryPath - Path of library entry
 * @returns Vite configuration
 * @see https://vitejs.dev/config/
 */
export declare const appViteConfig: (basePath: string, entryPath: string) => UserConfig;

declare function print_2(message: string, status?: Status, newLine?: boolean): void;
export { print_2 as print }

export declare interface StageOptions {
    appsConfig: AppsConfig;
    /**
     * Favicon of the website
     */
    favicon: string;
    /**
     * Name of the website
     * @example "ProzillaOS"
     */
    siteName: string;
    /**
     * Tag line of the website
     * @example "Web-based Operating System"
     */
    siteTagLine: string;
    /**
     * Domain of the live website
     *
     * A CNAME file will be generated with this value
     * @example "os.prozilla.dev"
     */
    domain: string;
    /**
     * Array of image URLs that will be added to the sitemap
     */
    imageUrls?: string[];
}

export declare function stageSitePlugin(options: StageOptions): Plugin_2;

export declare type Status = "error" | "info" | "file" | "success" | "start";

declare class Vector2 {
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

declare interface WindowProps extends WindowOptions {
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

export { }
