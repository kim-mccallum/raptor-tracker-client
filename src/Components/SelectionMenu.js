import React, { Component } from 'react'
import './SelectionMenu.css'

export default class SelectionMenu extends Component {
    constructor(props) {
        super(props)
        
        // Change these 
        this.state = {
            species: 'all',
            // probably don't need both tracking period and startDate/endDate
            trackingPeriod:'',
            startDate: '',
            endDate: ''
        }
    }
    // Add handlers to get the data and put it into state
        // The selected data will need to be passed back to App and to Map to render on the map
    // Format dates as timestamps and get start_date and end_date to be formatted and ready for server request
            // Week: start_date = today and end_date = start_date 7 days
            // Month: start_date = today and end_date = start_date 31 days
            // Year: start_date = today and end_date = start_date 365 days
    rangeHandler = (e) => {
        // do stuff
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    
    render() {
        console.log(this.state)
        return (
                <div className="selection-menu">
                    <div className="form-container">
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
                                <fieldset id="date-slider">
                                    <legend>Custom date range</legend>
                                    <label htmlFor="startDate">Start Date:</label>
                                    <input type="range" id="startDate" name="startDate" min="0" max="100" 
                                        value={this.state.startDate} onChange={this.rangeHandler}
                                    />
                                    <br/>
                                    <label htmlFor="endDate">End Date:</label>
                                    <input type="range" id="endDate" name="endDate" min="0" max="100" 
                                        value={this.state.endDate} onChange={this.rangeHandler}
                                    />
                                    <br/>
                                </fieldset>
                            </fieldset>
                        </form>
                    </div>
                </div>
            )
    }
}

