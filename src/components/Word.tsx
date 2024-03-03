import { HStack } from "@chakra-ui/react"
import '../App.css'
import { Button } from "@mui/material";
import {Guess, ColorCoding} from './Board'



type propsType = {
        disabled: boolean,
        word: Guess, 
        updateColorCoding: ({ index, color }: { index: number; color: ColorCoding; }) => void
        waitForGuess: boolean
        id: string
}

enum Color {
    g = 'lightgreen',
    y = 'yellow',
    x = 'grey'
  }


const Word = (props: propsType) => {
    function handleClick(e: React.MouseEvent<HTMLButtonElement>, index: number){
        let color: ColorCoding
        if(['white', 'grey', ''].includes(e.currentTarget.style.backgroundColor)){
            e.currentTarget.style.backgroundColor = 'lightgreen'
            color = 'g'
        } else if(e.currentTarget.style.backgroundColor === 'lightgreen'){
            e.currentTarget.style.backgroundColor = 'yellow'
            color = 'y'
        } else {
            e.currentTarget.style.backgroundColor = 'grey'
            color = 'x'
        }
        props.updateColorCoding({index, color})

    }

    function setBackgroundColor(index: number, onlyGreen: boolean){
        const color = props.word.clue != "" ? Color[props.word.clue[index] as keyof typeof Color] : 'white'
        return onlyGreen ? (color === Color['g'] ? color : 'white') : color
    }

    return (
        <div>
            <HStack spacing={30} id={props.id}>
            { props.word.word.split('').map((char: string, index: number) => (
                <Button 
                style={{backgroundColor: setBackgroundColor(index, (props.id === "guess"))}}
                disabled={props.disabled} 
                onClick={(e) => {handleClick(e, index)}} 
                className="char-box" 
                key={`${props.word.word}-${index}`}>
                    {char}
                </Button>
            ))}
            </HStack>
        </div>
      );
    
}

export default Word