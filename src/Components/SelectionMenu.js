import React, { Component } from 'react'
import moment from 'moment';
import './SelectionMenu.css'


export default class SelectionMenu extends Component {
    state = {
        yearActive: true,
        monthActive: false,
        weekActive: false,
    }
    
    studyHandler = (e) => {
        this.props.filterData({
            study_id: e.target.value,
            individual_id: ''
        })
    }
    weekHandler = () => {
        this.props.filterData({
            start_time: moment().subtract(1, 'week').format('x')
        })
        this.setState({ 
            yearActive: false,
            monthActive: false,
            weekActive: true,
        });
        this.props.deactivateIsRaptorClicked();
    }
    monthHandler = () => {
        this.props.filterData({
            start_time: moment().subtract(1, 'month').format('x')
        })
        this.setState({ 
            yearActive: false,
            monthActive: true,
            weekActive: false,
        });
        this.props.deactivateIsRaptorClicked();
    }
    yearHandler = () => {
        this.props.filterData({
            start_time: moment().subtract(1, 'year').format('x')
        })
        this.setState({ 
            yearActive: true,
            monthActive: false,
            weekActive: false,
        });
        this.props.activateIsRaptorClicked();
    }

    render() {
        let raptorName 
        if(this.props.raptorId !== ''){
            raptorName = <p>Selected raptor: {this.props.raptorId}</p>
        }
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
                            <button type="button" onClick={this.weekHandler} className={`btn ${this.state.weekActive ? 'active' :''}`}>Week</button>
                            <button type="button" onClick={this.monthHandler} className={`btn ${this.state.monthActive ? 'active' :''}`}>Month</button>
                            <button type="button" onClick={this.yearHandler} className={`btn ${this.props.isRaptorClicked ? 'active' :null}`}>Year</button>
                            {/* <button type="button" onClick={this.yearHandler} className={`btn ${this.props.isRaptorClicked ? 'active' : this.state.yearActive ? 'active': null}`}>Year</button> */}
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
                        {raptorName}
                    </form>
                </div>
            </div>
            )
    }
}

