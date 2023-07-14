import {default as GraphemeSplitter} from 'grapheme-splitter'
import {useEffect, useState} from 'react'
import Div100vh from 'react-div-100vh'

import {AlertContainer} from '@/components/alerts/AlertContainer'
import {Grid} from '@/components/grid/Grid'
import {Keyboard} from '@/components/keyboard/Keyboard'
import {DISCOURAGE_INAPP_BROWSERS, MAX_CHALLENGES, REVEAL_TIME_MS,} from '@/constants/settings'
import {CORRECT_WORD_MESSAGE, DISCOURAGE_INAPP_BROWSER_TEXT, NOT_ENOUGH_LETTERS_MESSAGE, WIN_MESSAGES, WORD_NOT_FOUND_MESSAGE,} from '@/constants/strings'
import {useAlert} from '@/context/AlertContext'
import {isInAppBrowser} from '@/lib/browser'
import {getWordOfDay, isWordInWordList, solution, unicodeLength,} from '@/lib/words'

function App() {
  const [solutionWord, setSolutionWord] = useState<string>(getWordOfDay(Math.random()))

  const {showError: showErrorAlert, showSuccess: showSuccessAlert} = useAlert()
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isGameLost, setIsGameLost] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [guesses, setGuesses] = useState<string[]>([])

  useEffect(() => {
    DISCOURAGE_INAPP_BROWSERS &&
    isInAppBrowser() &&
    showErrorAlert(DISCOURAGE_INAPP_BROWSER_TEXT, {
      persist: false,
      durationMs: 7000,
    })
  }, [showErrorAlert])

  const clearCurrentRowClass = () => {
    setCurrentRowClass('')
  }

  useEffect(() => {
    if (isGameWon) {
      const winMessage =
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      const delayMs = REVEAL_TIME_MS * solutionWord.length

      showSuccessAlert(winMessage, {
        persist: true
      })
    }
  }, [isGameWon, isGameLost, showSuccessAlert])

  const onChar = (value: string) => {
    if (
      unicodeLength(`${currentGuess}${value}`) <= solutionWord.length &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(
      new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join('')
    )
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }

    if (!(unicodeLength(currentGuess) === solutionWord.length)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    if (!isWordInWordList(currentGuess)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    setIsRevealing(true)

    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * solution.length)

    const winningWord = currentGuess === solutionWord

    if (
      unicodeLength(currentGuess) === solutionWord.length &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        return setIsGameWon(true)
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        setIsGameLost(true)
        showErrorAlert(CORRECT_WORD_MESSAGE(solutionWord), {
          persist: true,
          delayMs: REVEAL_TIME_MS * solutionWord.length + 1,
        })
      }
    }
  }

  return (
    <>
      <div className="absolute left-0 top-0 w-screen h-screen bg-no-repeat bg-cover bg-termo" />
      <p className={"left-10 top-1/2 absolute bg-[#232323] rounded-lg text-white py-12 px-8 text-2xl font-bold"}>
        Palavra sorteada: {solutionWord}
      </p>
      <Div100vh>
        <div className="absolute right-[900px] top-[215px] flex flex-col">
          <div className="mx-auto flex w-full grow flex-col px-1 pt-2 pb-8 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2">
            <div className="flex grow flex-col absolute">
              <AlertContainer/>

              <Grid
                solution={solutionWord}
                guesses={guesses}
                currentGuess={currentGuess}
                isRevealing={isRevealing}
                currentRowClassName={currentRowClass}
              />
            </div>
            <Keyboard
              onChar={onChar}
              onDelete={onDelete}
              onEnter={onEnter}
              solution={solutionWord}
              guesses={guesses}
              isRevealing={isRevealing}
            />
            {/*{(isGameWon || isGameLost) && !isRevealing && (*/}
            {/*  <button className={"fixed bottom-10 -translate-x-1/2 left-1/2 text-white text-2xl"} onClick={() => {*/}
            {/*    setGuesses([])*/}
            {/*    setIsGameWon(false)*/}
            {/*    setIsGameLost(false)*/}
            {/*    setCurrentGuess('')*/}
            {/*    setSolutionWord(getWordOfDay(Math.random()))*/}

            {/*    if (isGameWon) {*/}
            {/*      showSuccessAlert("", {*/}
            {/*        durationMs: 0,*/}
            {/*      })*/}
            {/*    } else {*/}
            {/*      showErrorAlert("", {*/}
            {/*        durationMs: 0,*/}
            {/*      })*/}
            {/*    }*/}
            {/*  }}>*/}
            {/*    Recomeçar*/}
            {/*  </button>*/}
            {/*)}*/}
          </div>
        </div>
      </Div100vh>
    </>
  )
}

export default App
