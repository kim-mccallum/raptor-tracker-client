import React, { Component } from 'react'
import SelectionMenu from './SelectionMenu'
import './Nav.css'

export default class Nav extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isMenuVisible: false
        }
    }

    handleToggleMenu = (e) => {
        e.preventDefault();
        this.setState({
            isMenuVisible: !this.state.isMenuVisible
        })
    }
    
    render() {
        let menu;
        if(this.state.isMenuVisible === true){
            menu = <SelectionMenu onClick={this.handleToggleMenu}/>
        }
        return (
            <>
                <nav className='app-nav' onClick={this.props.hideBanner}>
                    <img className="logo" src="https://hawkwatch.org/images/HWI-logo_tag2.png" alt="HWI logo"/>
                    <p className="placeholder">Render info about bird here: Name, species, first/last deploy date</p>
                    <ul>
                        <li><a href="#Select-Data" className="active" onClick={this.handleToggleMenu}>Select Data</a></li>
                        <li><a href="https://hawkwatch.org/our-work/tracking" target="blank">Learn about tracking research</a></li>
                        <li><a href="https://hawkwatch.org/about/contact-us" target="blank">Contact</a></li>
                    </ul>
                </nav>
                <>
                    {menu}
                </>
            </>
        )
    }
}


