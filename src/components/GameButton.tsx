import { Button } from "@mui/material"

type propsType = {
    waitForGuess: boolean,
    onClick: () => Promise<void>,
    buttonStyle: React.CSSProperties
    text: string
}


function GameButton(props: propsType){
    const buttonProps = {
        className: "button-main",
        disabled: props.waitForGuess,
    }
    return (
        <Button
        style={{...props.buttonStyle}}
        onClick={props.onClick}
        {...buttonProps}
        variant="contained" 
        color="primary" 
        >{props.text}</Button>
    )
}

export default GameButton