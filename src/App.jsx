import { useEffect, useState } from 'react';
import './App.css';
import Result from './Components/Result/Result';
import questions from './Questions'
import { MdOutlineKeyboardDoubleArrowRight, MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';
import { ImRadioChecked2, ImRadioUnchecked } from 'react-icons/im';

function App() {
  const [next, setNext] = useState(0)
  const [question, setQuestion] = useState('')
  const [score, setScore] = useState(0)
  const [isActiveOption, setIsActiveOption] = useState('')
  const [showScore, setShowScore] = useState(false)
  const handleCheckAnswer = (selectedAns, correctAns) => {
    if (selectedAns === correctAns) {
      console.log('correct ans')
      setScore(score + 10)
    }
    else {
      console.log('wrong ans')
      setScore(score)
    }
  }
  const handlePrev = () => {
    if (next <= 0) {
      return
    }
    else {
      setNext(next - 1)
    }
  }

  const handleNext = () => {
    setIsActiveOption('')
    if (isActiveOption === '') {
      return
    }
    else {
      setNext(next + 1);
    }
  }
  const handleShowResult = () => {
    console.log('Result', score)
    setShowScore(true)
  }
  useEffect(() => {
    setQuestion(questions[next])
  }, [next, question])

  return (
    <div className="App">
      <div className="quizContainer">
        <div className="leftContainer">
          <div className="leftContainerInner">
            <h1>Question:</h1>
            <h3>{question.question}</h3>
          </div>
          <div className="qNumber">
            {next+1}/{questions.length}
          </div>
        </div>
        <div className="rightContainer">
          <div className="rightContainerInner">
            <ul className="options">
              {
                question.options && question.options.map((option, index) => {
                  return (<li key={index} className={`option ${isActiveOption === index ? 'activeOption' : ''}`}
                    onClick={() => {
                      handleCheckAnswer(option, question.CorrectAns);
                      setIsActiveOption(index)
                    }}><div className='radioCheckIcon'> {isActiveOption !== index ? <ImRadioUnchecked size={15} /> : <ImRadioChecked2 size={15} />}</div>{option}
                  </li>)
                })
              }
            </ul>
          </div>
          <div className="actionButtons">

            <button className={`btn ${next <= 0 ? 'btn-disable' : null}`}
              onClick={handlePrev}><MdOutlineKeyboardDoubleArrowLeft size={20} />Prev</button>
            {
              next >= questions.length-1 ? <button className={`btn btn-primary ${isActiveOption === '' ? 'btn-disable' : ''}`} onClick={handleShowResult}>Submit</button> :
                <button className={`btn btn-primary ${isActiveOption === '' ? 'btn-disable' : ''}`}
                  onClick={handleNext}>
                  Next<MdOutlineKeyboardDoubleArrowRight size={20} />
                </button>
            }
          </div>
        </div>
      </div>
      {
        showScore ? <Result score={score} setShowScore={setShowScore} /> : null
      }

    </div>
  );
}

export default App;
