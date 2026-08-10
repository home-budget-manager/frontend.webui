import type { ComponentType } from "react";

export class MenuItem {
    private _icon: ComponentType;
    private _label: string;
    private _url: string;
    private _pathMatcher: (currentPath: string, itemUrl: string) => boolean;

    constructor(
        icon: ComponentType,
        label: string,
        url: string,
        pathMatcher?: (currentPath: string, itemUrl: string) => boolean
    ) {
        this._icon = icon;
        this._label = label;
        this._url = url;
        this._pathMatcher = pathMatcher ?? ((currentPath, itemUrl) => currentPath === itemUrl);
    }

    public get icon(): ComponentType {
        return this._icon;
    }

    public get label(): string {
        return this._label;
    }

    public get url(): string {
        return this._url;
    }

    public isActive(currentPath: string): boolean {
        return this._pathMatcher(currentPath, this._url);
    }
}