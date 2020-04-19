import React from 'react'
import './SelectionMenu.css'

export default function SelectionMenu(props) {
    return (
        <div className="selection-menu">
            <div className="banner-overlay">
                <button 
                    type="button" 
                    className="close-btn" 
                    aria-label="Close"
                    onClick={props.onClick}
                >&times;</button>
                <h2>Menu overlay on map coming soon</h2>
            </div>
        </div>
    )
}
