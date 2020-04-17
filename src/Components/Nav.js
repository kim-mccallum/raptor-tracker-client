import React from 'react'
import './Nav.css'

export default function Nav() {
    return (
        <nav className='app-nav'>
            <img className="logo" src="https://hawkwatch.org/images/HWI-logo_tag2.png" alt="HWI logo"/>
            <ul>
                <li><a href="#Eagles" className="active">Golden Eagles</a></li>
                <li><a href="#services">African Vultures</a></li>
                <li><a href="#clients">Learn about tracking research</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    )
}
