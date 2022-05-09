
import React from 'react';
import './index.css';





export default function Die(props) {

    const styles = {
        backgroundColor: props.isLocked ? "#59E391" : "white"
    }

    return (
        <div 
            className='die'
            style = {styles}
            onClick={() => props.toggleLocked(props.id)}
        >
            <p className='die-number'>{props.number}</p>
        </div>
    )
}