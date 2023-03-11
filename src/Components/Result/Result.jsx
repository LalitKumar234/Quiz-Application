import React from 'react'
import './Result.css'
import { MdClose } from 'react-icons/md';

const Result = ({score, setShowScore}) => {
  return (
    <div className="resultContainer">
        <div className="resultPopup">
        <div className="closeBtn">
        <MdClose size={20} onClick={()=>setShowScore(false)}/>
        </div>
            <h2>Your Score is 😀</h2>
            <h5>{score}/60</h5>
        </div>

    </div>
  )
}

export default Result