import React, { Component } from 'react'
import './SelectionMenu.css'
import StudyInformation from './StudyInformation'

export default class SelectionMenu extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             individuals: [],
             startDate: {
                 value: '',
                 touched: false
             },
             endDate: {
                value: '',
                touched: false
            }
        }
    }
    // Add handlers to get the data. 
    // The selected data will need to be passed back to App and to Map to render on the map
    
    // Get a list of individuals in the eagle dataset
    render() {
        return (
                <div className="selection-menu">
                    <div className="banner-overlay">
                        <button 
                            type="button" 
                            className="close-btn" 
                            aria-label="Close"
                            onClick={this.props.onClick}
                        >&times;</button>
                        <form className="selectDataForm">
                            <fieldset>
                                <legend>Select viewing parameters</legend>
                                <label htmlFor="start-date">Start Date:</label>
                                <input type="date" id="start-date" name="start-date" />
                                <label htmlFor="end-date">End Date:</label>
                                <input type="date" id="end-date" name="end-date" />
                                <label htmlFor="fname">Select Individuals:</label>
                                <select id="eagles" name="eagles">
                                    {/* Get this from a list of individuals in the data */}
                                    <option value="Glenn">Glenn</option>
                                    <option value="Lewis">Lewis </option>
                                    <option value="Frey">Frey</option>
                                    <option value="Benedict">Benedict Cumberpatch</option>
                                </select>
                                <button type="submit" value="Submit">Map the data!</button>
                            </fieldset>
                        </form>
                        <StudyInformation />
                    </div>
                </div>
            )
    }
}

