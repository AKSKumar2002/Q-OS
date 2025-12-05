import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import Settings from '../apps/settings';
import ReactGA from 'react-ga';
import { displayTerminal } from '../apps/terminal'

export class Window extends Component {
    constructor() {
        super();
        this.id = null;
        this.startX = 60;
        this.startY = 10;
        this.state = {
            cursorType: "cursor-default",
            width: 60, // percentage width
            height: 85, // percentage height
            widthPx: 800, // pixel width for react-rnd
            heightPx: 600, // pixel height for react-rnd
            x: 60, // x position in pixels
            y: 10, // y position in pixels
            closed: false,
            maximized: false
        }
    }

    componentDidMount() {
        this.id = this.props.id;
        this.setDefaultWindowDimenstion();

        // google analytics
        ReactGA.pageview(`/${this.id}`);
    }

    componentWillUnmount() {
        ReactGA.pageview("/desktop");
    }

    setDefaultWindowDimenstion = () => {
        if (window.innerWidth < 640) {
            const widthPx = window.innerWidth * 0.85;
            const heightPx = window.innerHeight * 0.6;
            this.setState({
                height: 60,
                width: 85,
                widthPx: widthPx,
                heightPx: heightPx,
                x: (window.innerWidth - widthPx) / 2,
                y: (window.innerHeight - heightPx) / 2
            });
        }
        else {
            const widthPx = window.innerWidth * 0.6;
            const heightPx = window.innerHeight * 0.85;
            this.setState({
                height: 85,
                width: 60,
                widthPx: widthPx,
                heightPx: heightPx,
                x: this.startX,
                y: this.startY
            });
        }
    }



    changeCursorToMove = () => {
        this.focusWindow();
        if (this.state.maximized) {
            this.restoreWindow();
        }
        this.setState({ cursorType: "cursor-move" })
    }

    changeCursorToDefault = () => {
        this.setState({ cursorType: "cursor-default" })
    }

    onResize = (e, direction, ref, delta, position) => {
        this.setState({
            widthPx: ref.offsetWidth,
            heightPx: ref.offsetHeight,
            x: position.x,
            y: position.y
        });
    }

    onResizeStop = (e, direction, ref, delta, position) => {
        const widthPercent = (ref.offsetWidth / window.innerWidth) * 100;
        const heightPercent = (ref.offsetHeight / window.innerHeight) * 100;

        this.setState({
            width: widthPercent,
            height: heightPercent,
            widthPx: ref.offsetWidth,
            heightPx: ref.offsetHeight,
            x: position.x,
            y: position.y
        });
        this.checkOverlap();
    }

    onDragStop = (e, d) => {
        this.setState({
            x: d.x,
            y: d.y
        });
        this.changeCursorToDefault();
        this.checkOverlap();
    }

    setWinowsPosition = () => {
        var r = document.querySelector("#" + this.id);
        var rect = r.getBoundingClientRect();
        r.style.setProperty('--window-transform-x', rect.x.toFixed(1).toString() + "px");
        r.style.setProperty('--window-transform-y', (rect.y.toFixed(1) - 32).toString() + "px");
    }

    checkOverlap = () => {
        var r = document.querySelector("#" + this.id);
        var rect = r.getBoundingClientRect();
        if (rect.x.toFixed(1) < 50) { // if this window overlapps with SideBar
            this.props.hideSideBar(this.id, true);
        }
        else {
            this.props.hideSideBar(this.id, false);
        }
    }

    focusWindow = () => {
        this.props.focus(this.id);
    }

    minimizeWindow = () => {
        let posx = -310;
        if (this.state.maximized) {
            posx = -510;
        }
        this.setWinowsPosition();
        // Store current position
        var r = document.querySelector("#" + this.id);
        r.style.setProperty('--window-transform-x', this.state.x.toString());
        r.style.setProperty('--window-transform-y', this.state.y.toString());

        // get corrosponding sidebar app's position
        r = document.querySelector("#sidebar-" + this.id);
        var sidebBarApp = r.getBoundingClientRect();

        r = document.querySelector("#" + this.id);
        // translate window to that position
        r.style.transform = `translate(${posx}px,${sidebBarApp.y.toFixed(1) - 240}px) scale(0.2)`;
        this.props.hasMinimised(this.id);
    }

    restoreWindow = () => {
        var r = document.querySelector("#" + this.id);
        this.setDefaultWindowDimenstion();
        // get previous position
        let posx = parseFloat(r.style.getPropertyValue("--window-transform-x"));
        let posy = parseFloat(r.style.getPropertyValue("--window-transform-y"));

        this.setState({
            maximized: false,
            x: posx || this.startX,
            y: posy || this.startY
        });

        setTimeout(() => {
            this.checkOverlap();
        }, 300);
    }

    maximizeWindow = () => {
        if (this.state.maximized) {
            this.restoreWindow();
        }
        else {
            this.focusWindow();
            var r = document.querySelector("#" + this.id);
            this.setWinowsPosition();

            // Save current position before maximizing
            r.style.setProperty('--window-transform-x', this.state.x.toString());
            r.style.setProperty('--window-transform-y', this.state.y.toString());

            this.setState({
                maximized: true,
                height: 96.3,
                width: 100.2,
                widthPx: window.innerWidth,
                heightPx: window.innerHeight - 32,
                x: 0,
                y: 0
            });
            this.props.hideSideBar(this.id, true);
        }
    }

    closeWindow = () => {
        this.setWinowsPosition();
        this.setState({ closed: true }, () => {
            this.props.hideSideBar(this.id, false);
            setTimeout(() => {
                this.props.closed(this.id)
            }, 300) // after 300ms this window will be unmounted from parent (Desktop)
        });
    }

    render() {
        return (
            <Rnd
                size={{ width: this.state.widthPx, height: this.state.heightPx }}
                position={{ x: this.state.x, y: this.state.y }}
                onDragStart={this.changeCursorToMove}
                onDragStop={this.onDragStop}
                onResize={this.onResize}
                onResizeStop={this.onResizeStop}
                minWidth={300}
                minHeight={200}
                bounds="parent"
                resizeHandleClasses={resizeHandleClasses}
                dragHandleClassName="bg-ub-window-title"
                enableResizing={!this.state.maximized}
                disableDragging={this.state.maximized}
                style={{
                    zIndex: this.props.isFocused ? 30 : 20
                }}
            >
                <div
                    className={this.state.cursorType + " " + (this.state.closed ? " closed-window " : "") + (this.state.maximized ? " duration-300 rounded-none" : " rounded-lg rounded-b-none") + (this.props.minimized ? " opacity-0 invisible duration-200 " : "") + (this.props.isFocused ? "" : " notFocused") + " opened-window overflow-hidden min-w-1/4 min-h-1/4 main-window window-shadow border-black border-opacity-40 border border-t-0 flex flex-col"}
                    style={{ width: '100%', height: '100%' }}
                    id={this.id}
                >
                    <WindowTopBar title={this.props.title} />
                    <WindowEditButtons minimize={this.minimizeWindow} maximize={this.maximizeWindow} isMaximised={this.state.maximized} close={this.closeWindow} id={this.id} />
                    {(this.id === "settings"
                        ? <Settings changeBackgroundImage={this.props.changeBackgroundImage} currBgImgName={this.props.bg_image_name} />
                        : <WindowMainScreen screen={this.props.screen} title={this.props.title}
                            addFolder={this.props.id === "terminal" ? this.props.addFolder : null}
                            openApp={this.props.openApp} />)}
                </div>
            </Rnd >
        )
    }
}

export default Window

// Window's title bar
export function WindowTopBar(props) {
    return (
        <div className={" relative bg-ub-window-title border-t-2 border-white border-opacity-5 py-1.5 px-3 text-white w-full select-none rounded-b-none"}>
            <div className="flex justify-center text-sm font-bold">{props.title}</div>
        </div>
    )
}



// Window's Edit Buttons
export function WindowEditButtons(props) {
    return (
        <div className="absolute select-none right-0 top-0 mt-1 mr-1 flex justify-center items-center">
            <span className="mx-1.5 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-full flex justify-center mt-1 h-5 w-5 items-center" onClick={props.minimize}>
                <img
                    src="./themes/Yaru/window/window-minimize-symbolic.svg"
                    alt="ubuntu window minimize"
                    className="h-5 w-5 inline"
                />
            </span>
            {
                (props.isMaximised
                    ?
                    <span className="mx-2 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-full flex justify-center mt-1 h-5 w-5 items-center" onClick={props.maximize}>
                        <img
                            src="./themes/Yaru/window/window-restore-symbolic.svg"
                            alt="ubuntu window restore"
                            className="h-5 w-5 inline"
                        />
                    </span>
                    :
                    <span className="mx-2 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-full flex justify-center mt-1 h-5 w-5 items-center" onClick={props.maximize}>
                        <img
                            src="./themes/Yaru/window/window-maximize-symbolic.svg"
                            alt="ubuntu window maximize"
                            className="h-5 w-5 inline"
                        />
                    </span>
                )
            }
            <button tabIndex="-1" id={`close-${props.id}`} className="mx-1.5 focus:outline-none cursor-default bg-ub-orange bg-opacity-90 hover:bg-opacity-100 rounded-full flex justify-center mt-1 h-5 w-5 items-center" onClick={props.close}>
                <img
                    src="./themes/Yaru/window/window-close-symbolic.svg"
                    alt="ubuntu window close"
                    className="h-5 w-5 inline"
                />
            </button>
        </div>
    )
}

// Window's Main Screen
export class WindowMainScreen extends Component {
    constructor() {
        super();
        this.state = {
            setDarkBg: false,
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ setDarkBg: true });
        }, 3000);
    }
    render() {
        return (
            <div className={"w-full flex-grow z-20 max-h-full overflow-y-auto windowMainScreen" + (this.state.setDarkBg ? " bg-ub-drk-abrgn " : " bg-ub-cool-grey")}>
                {this.props.addFolder ? displayTerminal(this.props.addFolder, this.props.openApp) : this.props.screen()}
            </div>
        )
    }
}