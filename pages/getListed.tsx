import { useEffect, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Loader from "../components/Loader";

const NUM_QUESTIONS = 6;

const questions = [
    {
        text: "What is the name of your project?",
        placeholder: "project name",
        inputType: "text",
    },
    {
        text: "What is your smart contract address?",
        placeholder: "smart contract address",
        inputType: "text",
        pattern: "0x[a-fA-F0-9]{40}",
        errorMessage: "please enter an ETH address",
    },
    {
        text: "What is your projects total supply?",
        placeholder: "total supply",
        inputType: "number",
        min: 1,
    },
    {
        text: "What is your projects public mint date?",
        placeholder: "public mint date",
        inputType: "datetime-local",
    },
    {
        text: "What is your website URL?",
        placeholder: "website url",
        inputType: "url",
        pattern: "(https | http)?://.+",
        errorMessage: "please enter a valid URL",
    },
    {
        text: "What is your Twitter URL?",
        placeholder: "twitter url",
        inputType: "url",
        pattern: "(https | http)?://.+",
        errorMessage: "please enter a valid URL",
    },
    {
        text: "What is your Discord URL?",
        placeholder: "discord url",
        inputType: "url",
        pattern: "(https | http)?://.+",
        errorMessage: "please enter a valid URL",
    },
];

export default function GetListed() {
    const [questionIndex, setQuestionIndex] = useState(0);

    const [answers, setAnswers] = useState<any>([]);

    const [currentAnswer, setCurrentAnswer] = useState("");

    const [isInputValid, setIsInputValid] = useState(false);

    const [isWaitingSubmit, setIsWaitingSubmit] = useState(false);

    const [didSubmit, setDidSubmit] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    async function handleClick() {
        if (questionIndex !== NUM_QUESTIONS) {
            setAnswers((oldAnswers: any) => [
                ...oldAnswers,
                ...[
                    {
                        question: questions[questionIndex].text,
                        answer: currentAnswer,
                    },
                ],
            ]);

            setCurrentAnswer("");

            setQuestionIndex(questionIndex + 1);
            setIsInputValid(false);
        } else {
            setAnswers((oldAnswers: any) => [
                ...oldAnswers,
                ...[
                    {
                        question: questions[questionIndex].text,
                        answer: currentAnswer,
                    },
                ],
            ]);

            setCurrentAnswer("");
            setIsInputValid(false);
        }
    }

    async function submitForm() {
        setIsWaitingSubmit(true);

        let answersString = "";
        let questionsString = "";

        answers.forEach((element: any) => {
            answersString += `&answers=${encodeURIComponent(element.answer)}`;

            questionsString += `&questions=${encodeURIComponent(
                element.question
            )}`;
        });

        const res = await fetch(
            `/api/getListed/submit?${answersString}${questionsString}`
        );

        setDidSubmit(true);

        if (res.status === 200) {
            setSubmitSuccess(true);
        } else {
            setSubmitSuccess(false);
        }
        setIsWaitingSubmit(false);

        console.log(`/api/getListed/submit?${answersString}${questionsString}`);
    }

    useEffect(() => {
        if (answers.length === NUM_QUESTIONS + 1) {
            submitForm();
        }
    }, [answers]);

    return (
        <div
            className="flex flex-col items-center w-11/12 pt-12 animate-fadeIn"
            style={{ minHeight: "calc(100vh - 64px)" }}
        >
            <h1 className="self-start text-4xl font-extrabold dark:text-white">
                get listed
            </h1>
            <div className="flex flex-col items-center flex-1 w-full overflow-hidden mb-14">
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={questionIndex}
                        classNames="slideUp"
                        timeout={500}
                        // addEndListener={(node, done) => {
                        //     node.addEventListener("transitionend", done, false);
                        // }}
                    >
                        <div className="max-w-[1000px] flex flex-col items-center justify-center flex-1 w-11/12 md:w-3/4">
                            {isWaitingSubmit || didSubmit ? (
                                <>
                                    <SwitchTransition>
                                        <CSSTransition
                                            key={
                                                isWaitingSubmit
                                                    ? "true"
                                                    : "false"
                                            }
                                            classNames="fade"
                                            timeout={300}
                                        >
                                            {isWaitingSubmit ? (
                                                <Loader />
                                            ) : (
                                                <>
                                                    <p
                                                        className={`text-3xl font-black text-transparent bg-gradient-to-br bg-clip-text ${
                                                            submitSuccess
                                                                ? "from-[#29FC25] to-[#00FE38]"
                                                                : "from-[#FF2B2B] to-[#FE0000]"
                                                        }`}
                                                    >
                                                        {submitSuccess
                                                            ? "successfully submited form"
                                                            : "failed to submit form"}
                                                    </p>
                                                    <p
                                                        className={`mt-3 font-medium text-white`}
                                                    >
                                                        {submitSuccess
                                                            ? "we will review your answers as soon as possible"
                                                            : "please try again"}
                                                    </p>
                                                </>
                                            )}
                                        </CSSTransition>
                                    </SwitchTransition>
                                </>
                            ) : (
                                <AQuestion
                                    index={questionIndex}
                                    currentAnswer={currentAnswer}
                                    setCurrentAnswer={setCurrentAnswer}
                                    isInputValid={isInputValid}
                                    setIsInputValid={setIsInputValid}
                                />
                            )}
                        </div>
                    </CSSTransition>
                </SwitchTransition>

                <button
                    disabled={
                        !isInputValid || currentAnswer.length === 0 || didSubmit
                    }
                    onClick={handleClick}
                    className={`flex items-center ${
                        didSubmit ? "invisible" : ""
                    } ${
                        !isInputValid || currentAnswer.length === 0
                            ? "opacity-70"
                            : ""
                    } justify-center pl-4 pr-2 text-lg py-1.5 ml-auto font-semibold text-white dark:text-black transition-opacity duration-300 bg-moreLight dark:bg-white rounded-md hover:opacity-70`}
                >
                    <p>{questionIndex === NUM_QUESTIONS ? "submit" : "next"}</p>
                    <svg
                        className="w-5 h-5 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}

function AQuestion({
    index,
    currentAnswer,
    setCurrentAnswer,
    isInputValid,
    setIsInputValid,
}: any) {
    const question = questions[index];

    async function handleChange(e: any) {
        if (question.pattern) {
            if (new RegExp(question.pattern).test(e.target.value)) {
                setIsInputValid(true);
            } else {
                setIsInputValid(false);
            }
            setCurrentAnswer(e.target.value);
        } else {
            if (!isInputValid) {
                setIsInputValid(true);
            }
            setCurrentAnswer(e.target.value);
        }
    }

    async function handleError(e: any) {
        console.log(e);
    }

    return (
        <>
            <div className="block self-start mb-5">
                <h2 className="text-3xl font-black text-transparent bg-gradient-to-br bg-clip-text from-blue-500 to-cyan-400">
                    {question.text}
                </h2>
                <CSSTransition
                    in={
                        (!isInputValid &&
                            currentAnswer.length > 0 &&
                            question.errorMessage) as boolean
                    }
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                >
                    <p className="self-end font-bold text-sm bg-clip-text text-transparent bg-gradient-to-br from-[#fa211a] to-[#d41017] ml-3">
                        {question.errorMessage}
                    </p>
                </CSSTransition>
            <input
                type={question.inputType}
                className="text-white mt-3 dark:text-black dark:bg-white bg-moreLight font-semibold rounded-lg py-1.5 px-2 w-2/3 placeholder-white dark:placeholder-black"
                placeholder={question.placeholder}
                value={currentAnswer}
                onChange={handleChange}
                min={question.min}
            />
            </div>
        </>
    );
}
