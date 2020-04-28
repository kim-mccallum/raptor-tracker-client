import React from 'react'
import './WelcomeBanner.css'

export default function WelcomeBanner(props) {
    return (
        <div className="backdrop" onClick={props.hideBanner}>
            <div className="welcome-banner-overlay">
                <button 
                    type="button" 
                    className="close-btn" 
                    aria-label="Close"
                    onClick={props.hideBanner}
                >&times;</button>
                <h1>Welcome to the Raptor Tracker</h1>
                <p>View movements and explore behavior patterns of raptors GPS tagged by Hawkwatch International. Use the menu on the left to select by species and date.</p>
                <p>Click on the left menu or the map to get started! NOTE for testers, the raptor icons that are shown on initial load are the most recent locations 
                    in my test database. When you click on them, their paths (all the data I have copied) show up.</p>
            </div>
        </div>
    )
}
