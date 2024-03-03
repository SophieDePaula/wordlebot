import { HStack, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {Alert, Box} from "@mui/material";
import Word from './Word'
import GameButton from "./GameButton";
import CircularProgress from '@mui/material/CircularProgress';
import useFetchWord from "../hooks/useFetchWord";

const ENDPOINT = 'https://interviewing.venteur.co/api/wordle'

const CONGRATS_MSG = "Congratulations! You found the word!  🎉"
const WORD_FOUND_CODING = 'ggggg'


export type Guess = {
    word: string
    clue: string
}

export type ColorCoding = "g" | "y" | "x"

function Board() {
    const [words, setWords] = useState<Guess[]>([])
    const [waitForGuess, setWaitForGuess] = useState<boolean>(false)
    const [currGuess, setCurrGuess] = useState<string>("")
    const [colorCoding, setColorCoding] = useState<string[]>(new Array(5).fill('x'))
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [congratsAlert, setCongratsAlert] = useState<string>("")
    const { fetchWord, error } = useFetchWord({endpoint: ENDPOINT, words});
    
    useEffect(() => {
        if (fetchWord) {
            setWaitForGuess(false);
            setCurrGuess(fetchWord.guess.toUpperCase());
        }
    }, [fetchWord]);

    const handleGuessWord = async () => {
        setWaitForGuess(true)
        
        if(currGuess !== "") {         
            setWords([...words, {word: currGuess.toUpperCase(), clue: colorCoding.join('')}])
        }

       
        setCurrGuess(fetchWord?.guess)
        if(error !== "") {
            setShowAlert(true)
        } else {
            setShowAlert(false)
        }
    }

    const handleResetGame = async () => {
        setWords([])
        setCurrGuess("")
        setColorCoding(new Array(5).fill('x'))
        setShowAlert(false)
        setCongratsAlert("")
    }

    function handleColorCoding({index, color}: {index: number, color: ColorCoding}) {
        const newColorCoding = colorCoding.map((item,i) => i === index ? color : item)
        if (newColorCoding.join('') === WORD_FOUND_CODING) {
            setCongratsAlert(CONGRATS_MSG)
        } else if(congratsAlert != "") {
            setCongratsAlert("")
        }
        setColorCoding(newColorCoding)
    }

    return (
        <div style={{marginTop: '2rem'}}>   
        <HStack>
            <GameButton 
            buttonStyle={{marginLeft: '2rem'}} 
            onClick={handleGuessWord}
            waitForGuess={waitForGuess || congratsAlert !== "" || showAlert}
            text={waitForGuess ? `Guessing...` :`Guess word`}
            />  
            <GameButton
            buttonStyle={{marginLeft: 'auto', marginRight: '2rem'}} 
            onClick={handleResetGame}
            waitForGuess={waitForGuess}
            text='Reset Game'
            />
        </HStack>
        {
            waitForGuess ? 
            <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                <CircularProgress />
            </Box> 
                :
            <VStack>
                <Word 
                    key={"guess"} 
                    updateColorCoding={handleColorCoding} 
                    word={{word: currGuess, clue: words.length > 0 ? words[words.length-1].clue : ""}} 
                    disabled={false}
                    waitForGuess={waitForGuess}  
                    id="guess"
                 />  
                {[...words].reverse().map((word) => {
                    return <Word 
                        key={word.word} 
                        updateColorCoding={handleColorCoding} 
                        word={word} 
                        disabled={true}
                        waitForGuess={waitForGuess}    
                        id={word.word}
                    />
                })}
                   
            </VStack>
        }
            { showAlert && <Alert severity="error" className="alert">{error}</Alert>}
            { congratsAlert !== "" && <Alert className="alert">{congratsAlert}</Alert>}
         </div>
    )
}

export default Board;