import React from 'react'

const LoadingScreen = () => {
    return (
        <div id="loading-screen" className="loading-screen">
            <div className="loading-screen__content">
                <h1 className="loading-screen__text color--red">Scanning for Channels...</h1>
                <div className="loading-screen__progress-bar-container">
                    <div className="loading-screen__progress-bar"></div>
                </div>
            </div>
            
        </div>
    )
}

export default LoadingScreen
