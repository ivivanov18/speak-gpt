import { useState, useEffect } from "react";
import axios from "axios";

function SpeechComponent() {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");

    useEffect(() => {
        speak();
    }, [response]);

    const onAnswerQuestionClick = async () => {
        const response = await axios.post("http://localhost:3000/data", {
            message: question,
        });
        setResponse(response?.data?.content);
    };

    const speak = () => {
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        const utterance = new SpeechSynthesisUtterance(response);
        const french = voices[3];
        if (french != undefined) {
            utterance.voice = french;
            synth.speak(utterance);
        }
    };

    const onChangeInput = (evt) => {
        setQuestion(evt.target.value);
    };

    return (
        <>
            <div>
                <label htmlFor="question">Question</label>
                <input
                    id="question"
                    onChange={onChangeInput}
                    value={question}
                ></input>
            </div>
            <textarea readOnly value={response}></textarea>
            <button onClick={onAnswerQuestionClick}>Pose ta question</button>
        </>
    );
}

export default SpeechComponent;
