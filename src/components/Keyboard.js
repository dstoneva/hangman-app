import Key from './Key'
import '../styles/Keyboard.css'
import { useEffect, useState } from 'react'

const Keyboard = ({ handleLetterUsed, keys }) => {
  const [keyboardLayout, setKeyboardLayout] = useState([])
  const rows = () => {
    if (keys.length % 5 === 0) {
      return keys.length / 5
    }

    if (keys.length % 4 === 0) {
      return keys.length / 4
    }

    if (keys.length % 6 === 0) {
      return keys.length / 6
    }

    return 2
  }

  useEffect(() => {
    let layout = []
    let keysPerRow = keys.length / rows()
    for (let i = 0; i < rows(); i++) {
      let row = []
      for (let j = 0; j < keysPerRow; j++) {
        row.push(keys[keysPerRow * i + j])
      }
      layout.push(row)
    }
    setKeyboardLayout(layout)
    // eslint-disable-next-line
  }, [keys])

  return (
    <div className='keyboard'>
      {keyboardLayout.map((row, idx) => {
        return (
          <div className='keyboard-row' key={idx}>
            {row.map((letter, index) => {
              return <Key handleLetterUsed={handleLetterUsed} letter={letter} key={index}></Key>
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Keyboard
