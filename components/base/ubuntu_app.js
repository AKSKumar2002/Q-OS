import React, { Component } from 'react'
import Draggable from 'react-draggable'

export class UbuntuApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDragged: false
        };
    }

    openApp = () => {
        this.props.openApp(this.props.id);
    }

    handleDragStart = () => {
        this.setState({ isDragged: true });
    }

    handleDragStop = (e, data) => {
        // Save position to localStorage
        const savedPositions = JSON.parse(localStorage.getItem('desktopAppPositions') || '{}');
        savedPositions[this.props.id] = { x: data.x, y: data.y };
        localStorage.setItem('desktopAppPositions', JSON.stringify(savedPositions));
    }

    render() {
        // Get saved position from localStorage
        const savedPositions = JSON.parse(localStorage.getItem('desktopAppPositions') || '{}');
        const savedPos = savedPositions[this.props.id];

        return (
            <Draggable
                defaultPosition={savedPos || { x: 0, y: 0 }}
                onStart={this.handleDragStart}
                onStop={this.handleDragStop}
                bounds="parent"
                disabled={false}
            >
                <div
                    className={`p-1 m-px z-10 bg-white bg-opacity-0 hover:bg-opacity-20 focus:bg-ub-orange focus:bg-opacity-50 focus:border-yellow-700 focus:border-opacity-100 border border-transparent outline-none rounded select-none w-24 h-20 flex flex-col justify-start items-center text-center text-xs font-normal text-white ${savedPos ? 'absolute cursor-move' : 'cursor-pointer'}`}
                    id={"app-" + this.props.id}
                    onDoubleClick={this.openApp}
                    tabIndex={0}
                >
                    <img width="40px" height="40px" className="mb-1 w-10 pointer-events-none" src={this.props.icon} alt={"Ubuntu " + this.props.name} />
                    {this.props.name}

                </div>
            </Draggable>
        )
    }
}

export default UbuntuApp
