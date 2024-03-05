import { useEffect, useState } from "react";
import {Guess} from '../components/Board'

type PropsType = {
    endpoint: string
    words: Guess[]
}
type OutputType = {
    error: string
    fetchWord: BotGuess
}
type BotGuess = {
    guess: string
}
const MAX_ATTEMPTS_MSG = "Maximum attempts reached. Please reset the game."
const WORD_NOT_FOUND_MSG = 'No words found. Please reset the game.'

const useFetchWord = ({words, endpoint}: PropsType): OutputType =>  {
  const [fetchWord, setFetchWord] = useState<BotGuess>({guess: ''});
  const [error, setError] = useState<string>('');


  useEffect(() => {
    if (error) {
      setError("")
    }
    const fetchNewWord = async () => {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',   
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(words)
        });

        if(response.status !== 200) {
          throw new Error(words.length > 5 ? MAX_ATTEMPTS_MSG : WORD_NOT_FOUND_MSG);
        }
        const data = await response.json();
        setFetchWord(data);
      } catch (error) {
        if(error instanceof Error) {
            setError(error.message);
        } else {
            setError(String(error))
        }
        setFetchWord({guess: ''})

      }
    };

    fetchNewWord();
  }, [endpoint, words]);

  return { fetchWord, error };
};

export default useFetchWord;