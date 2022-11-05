import React, { useCallback, useState, useRef, useEffect } from 'react'
import './bubble-input.css'
import keydown from './assets/keydown.wav'
import sent from './assets/sent.wav'

const BubbleInput = ({ onChange, onSubmit, value }) => {
  const keydownAudio = new Audio(keydown)
  const sentMessageAudio = new Audio(sent)

  const refEditable = useRef()
  const refContainer = useRef()
  const [submitted, setSubmitted] = useState(false)

  const handleKeyDown = e => {
    const { current: elContainer } = refContainer
    const { current: elEditable } = refEditable

    const { isComposing } = e.nativeEvent

    keydownAudio.play()

    if (e.key === 'Enter' && !isComposing) {
      const height = elContainer.clientHeight
      onSubmit && onSubmit(height)
      e.preventDefault()
      setSubmitted(true)

      sentMessageAudio.play()

      requestAnimationFrame(() => {
        elEditable.focus()
        elEditable.innerText = ''
        setSubmitted(false)
      })
    }
  }
  const handleBlur = useCallback(() => {
    const { current: elDiv } = refEditable
    if (elDiv) {
      elDiv.focus()
    }
  }, [refEditable])

  useEffect(handleBlur, [handleBlur])

  return (
    <div
      ref={refContainer}
      className={`bubble input  ${value.length === 0 ? 'empty' : ''} ${
        submitted ? 'submitted' : ''
      }`}
    >
      <div
        ref={refEditable}
        className="bubble-content"
        contentEditable
        spellCheck="false"
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onInput={e => onChange(e.target.innerText)}
      />
    </div>
  )
}

export default BubbleInput
