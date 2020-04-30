import React, { Component } from 'react'
import moment from 'moment';
import './SelectionMenu.css'

// This should be an RFC
export default class SelectionMenu extends Component {
    studyHandler = (e) => {
        // console.log('here is your value!', e.target.value)
        this.props.filterData({
            study_id: e.target.value
        })
    }
    weekHandler = () => {
        this.props.filterData({
            start_time: moment().subtract(1, 'week').format('x')
        })
    }
    monthHandler = () => {
        this.props.filterData({
            start_time: moment().subtract(1, 'month').format('x')
        })
    }
    yearHandler = () => {
        this.props.filterData({
            start_time: moment().subtract(1, 'year').format('x')
        })
    }

    render() {
        return (
                <div className="selection-menu">
                    <div className="form-container">
                        <form className="selectDataForm">
                            <fieldset>
                                <legend>Select map data</legend>
                                <label htmlFor="study_id">Select species:</label><br/>
                                <select id="study_id" onChange={this.studyHandler}>
                                    <option value="">All</option>
                                    <option value="296675205">Golden eagles</option>
                                    <option value="473993694">African vultures</option>                    
                                </select>
                                <br/>
                                <legend>Tracking period</legend>
                                {/* FIGURE OUT HOW TO ADD A CLASS TO STYLE THE ACTIVE BUTTON SO USERS KNOW WHAT IS IN STATE */}
                                <button type="button" onClick={this.weekHandler} >Week</button>
                                <button type="button" onClick={this.monthHandler} >Month</button>
                                <button type="button" onClick={this.yearHandler} >Year</button>
                                <br/>
                                <fieldset id="date-slider">
                                    <legend>Custom date range</legend>
                                    <label htmlFor="startDate">Start Date:</label>
                                    <input type="range" id="startDate" name="startDate" min="0" max="100" 
                                        value='0' onChange={this.rangeHandler}
                                    />
                                    <br/>
                                    <label htmlFor="endDate">End Date:</label>
                                    <input type="range" id="endDate" name="endDate" min="0" max="100" 
                                        value='0' onChange={this.rangeHandler}
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

