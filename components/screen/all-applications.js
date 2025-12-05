import React from 'react';
import UbuntuApp from '../base/ubuntu_app';

export class AllApplications extends React.Component {
    constructor() {
        super();
        this.state = {
            query: "",
            apps: [],
            category: 0, // 0 for all, 1 for frequent
            isAnimating: true
        }
    }

    componentDidMount() {
        this.setState({
            apps: this.props.apps,
            isAnimating: false // Start animation immediately
        });
    }

    handleChange = (e) => {
        this.setState({
            query: e.target.value,
            apps: e.target.value === "" || e.target.value === null ?
                this.props.apps : this.state.apps.filter(
                    (app) => app.title.toLowerCase().includes(e.target.value.toLowerCase())
                )
        })
    }

    renderApps = () => {

        let appsJsx = [];
        let frequentAppsInfo = JSON.parse(localStorage.getItem("frequentApps"));
        let getFrequentApps = () => {
            let frequentApps = [];
            if (frequentAppsInfo) {
                frequentAppsInfo.forEach((app_info) => {
                    let app = this.props.apps.find(app => app.id === app_info.id);
                    if (app) {
                        frequentApps.push(app);
                    }
                })
            }
            return frequentApps;
        }

        let apps = this.state.category === 0 ? [...this.state.apps] : getFrequentApps();
        apps.forEach((app, index) => {
            const props = {
                name: app.title,
                id: app.id,
                icon: app.icon,
                openApp: this.props.openApp,
                isDesktop: false,
                onContextMenu: this.props.onAppContextMenu
            }

            appsJsx.push(
                <UbuntuApp key={index} {...props} />
            );
        });
        return appsJsx;
    }

    handleSwitch = (category) => {
        if (category !== this.state.category) {
            this.setState({
                category: category
            })
        }
    }

    render() {
        return (
            <>
                {/* Backdrop overlay */}
                <div className="fixed inset-0 bg-black bg-opacity-30 z-30 backdrop-blur-sm" style={{ animation: 'fadeIn 0.1s ease-out' }}></div>

                {/* Glassmorphic Start Menu */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-20 rounded-xl overflow-hidden shadow-2xl z-40 transition-all duration-150 ease-out ${this.state.isAnimating ? 'opacity-0 translate-y-2 scale-98' : 'opacity-100 translate-y-0 scale-100'}`}
                    style={{
                        width: '90vw',
                        maxWidth: '520px',
                        height: '85vh',
                        maxHeight: '600px',
                        background: 'rgba(30, 30, 46, 0.75)',
                        backdropFilter: 'blur(40px)',
                        WebkitBackdropFilter: 'blur(40px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                    }}
                >
                    {/* Header with Search */}
                    <div className="p-4 md:p-6 pb-3 md:pb-4">
                        <div className="flex items-center bg-white bg-opacity-10 rounded-lg px-3 md:px-4 py-2 border border-white border-opacity-10 hover:bg-opacity-15 transition-all">
                            <img className="w-4 h-4 opacity-60" alt="search icon" src={'./images/logos/search.png'} />
                            <input
                                className="flex-1 ml-2 md:ml-3 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
                                placeholder="Search apps..."
                                value={this.state.query}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="px-4 md:px-6 flex gap-1 mb-3">
                        <button
                            onClick={this.handleSwitch.bind(this, 0)}
                            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${this.state.category === 0
                                ? 'bg-white bg-opacity-15 text-white shadow-sm'
                                : 'text-gray-300 hover:bg-white hover:bg-opacity-10'
                                }`}
                        >
                            Pinned
                        </button>
                        <button
                            onClick={this.handleSwitch.bind(this, 1)}
                            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${this.state.category === 1
                                ? 'bg-white bg-opacity-15 text-white shadow-sm'
                                : 'text-gray-300 hover:bg-white hover:bg-opacity-10'
                                }`}
                        >
                            Frequent
                        </button>
                    </div>

                    {/* Apps Grid */}
                    <div className="px-4 md:px-6 pb-3 overflow-y-auto custom-scrollbar" style={{ height: 'calc(100% - 160px)' }}>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1 md:gap-2">
                            {this.renderApps()}
                        </div>
                    </div>

                    {/* Footer - User Profile */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-white bg-opacity-5 border-t border-white border-opacity-10 backdrop-blur-xl">
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                                    Q
                                </div>
                                <span className="text-white text-sm font-medium">Q-OS User</span>
                            </div>
                            <button className="p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                    }
                    
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 6px;
                    }
                    
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: rgba(255, 255, 255, 0.05);
                        border-radius: 10px;
                    }
                    
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: rgba(255, 255, 255, 0.2);
                        border-radius: 10px;
                    }
                    
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: rgba(255, 255, 255, 0.3);
                    }
                `}</style>
            </>
        )
    }
}

export default AllApplications;