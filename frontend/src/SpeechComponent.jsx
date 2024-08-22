import "./SearchComponent.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function SpeechComponent() {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const utteranceRef = useRef(new SpeechSynthesisUtterance());

    useEffect(() => {
        speak();
    }, [response]);

    const onAnswerQuestionClick = async () => {
        window.speechSynthesis.cancel();

        const response = await axios.post("http://localhost:3000/data", {
            message: question,
        });
        setResponse(response?.data?.content);
    };

    const speak = () => {
        if (response !== "") {
            const { current: utterance } = utteranceRef;
            const synth = window.speechSynthesis;
            const voices = synth.getVoices();
            const french = voices[3];

            utterance.pitch = 1.5;
            utterance.text = response;

            console.log({ response });
            if (french != undefined) {
                utterance.voice = french;
                synth.speak(utterance);
            }
        }
    };

    const onChangeInput = (evt) => {
        setQuestion(evt.target.value);
    };

    return (
        <>
            <label className="question__label" htmlFor="question">
                Question
            </label>
            <input
                id="question"
                onChange={onChangeInput}
                value={question}
            ></input>
            <label className="response" htmlFor="response">
                Response
            </label>
            <textarea id="response" readOnly value={response}></textarea>
            <button onClick={onAnswerQuestionClick}>Pose ta question</button>
        </>
    );
}

export default SpeechComponent;
