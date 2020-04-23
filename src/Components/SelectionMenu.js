import React, { Component } from 'react'
import './SelectionMenu.css'
import StudyInformation from './StudyInformation'

export default class SelectionMenu extends Component {
    constructor(props) {
        super(props)
        
        // Change these 
        this.state = {
            species: 'all',
            // probably don't need both tracking period and startDate/endDate
            trackingPeriod: {
               value: '',
               touched: false
            },
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
    // Add handlers to get the data and put it into state
        // The selected data will need to be passed back to App and to Map to render on the map
    // Format dates as timestamps and get start_date and end_date to be formatted and ready for server request
            // Week: start_date = today and end_date = start_date 7 days
            // Month: start_date = today and end_date = start_date 31 days
            // Year: start_date = today and end_date = start_date 365 days
    
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
                                <legend>Select map data</legend>
                                <label htmlFor="species">Select species:</label><br/>
                                <select id="species" name="species">
                                    <option value="all">All</option>
                                    <option value="golden-eagles">Golden eagles</option>
                                    <option value="african-vultures">African vultures </option>                    
                                </select>
                                <br/>
                                <legend>Tracking period</legend>
                                <button type="button" value="Week">Week</button>
                                <button type="button" value="Month">Month</button>
                                <button type="button" value="Year">Year</button>
                                <br/>
                                <legend>Custom date range</legend>
                                <label htmlFor="start-date">Start Date:</label>
                                <input type="date" id="start-date" name="start-date" />
                                <br/>
                                <label htmlFor="end-date">End Date:</label>
                                <input type="date" id="end-date" name="end-date" />
                                <br/>
                                <button type="submit" value="Submit">Map the data!</button>
                            </fieldset>
                        </form>
                        <StudyInformation />
                    </div>
                </div>
            )
    }
}

