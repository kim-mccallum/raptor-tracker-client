import React from 'react'
import './WelcomeBanner.css'

export default function WelcomeBanner(props) {
    return (
        <div className="welcome-banner-overlay">
            <button 
                type="button" 
                className="close-btn" 
                aria-label="Close"
                onClick={props.hideBanner}
            >&times;</button>
            <h1>Welcome to the Raptor Tracker</h1>
            <p>View movements and explore behavior patterns of raptors GPS tagged by Hawkwatch International. Use the menu on the left to select by species, indididual and date.</p>
            <p>Click on the left menu or the map to get started!</p>
        </div>
    )
}
