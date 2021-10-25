import { useEffect, useState } from "react";
import { FaEthereum, FaBitcoin } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";

export default function Donate() {
    return (
        <div className="flex flex-col items-center flex-1 w-11/12 animate-fadeIn">
            <h2 className="self-start mt-12 text-4xl font-extrabold dark:text-white">
                donate
            </h2>
            <div className="flex flex-col items-center justify-center flex-1 w-11/12">
                <div className="flex flex-col items-start">
                    <DonationType
                        type="ethereum"
                        address="0xee61C516C9E4468E6F2C4Eb53b8520aDb68c0634"
                    />
                    <DonationType
                        type="bitcoin"
                        address="3LBuiwFYAbnE3DayqVZftkHpFmFsCRTvjC"
                    />
                    <DonationType
                        type="solana"
                        address="ELL2uxweAAx83QZyEfWEZwa8ZHEyNG2N2nYhkxzyAwcZ"
                    />
                </div>
            </div>
        </div>
    );
}

function DonationType({ type, address }: any) {
    const [didCopy, setDidCopy] = useState(false);

    function getImageForType() {
        switch (type) {
            case "bitcoin":
                return <FaBitcoin size={28} color="#f2a900" />;
            case "ethereum":
                return <FaEthereum size={28} color="#5c6ac0" />;
            case "solana":
                return <img src="/solana.png" className="w-6 mr-1" />;
            default:
                break;
        }
    }

    useEffect(() => {
        if (didCopy) {
            setTimeout(() => {
                setDidCopy(false);
            }, 3000);
        }
    }, [didCopy]);

    return (
        <div className="flex items-center justify-start mb-2">
            <p className="font-2xl">{getImageForType()}</p>
            <div
                onClick={() => {
                    navigator.clipboard.writeText(address);
                    setDidCopy(true);
                }}
                className="relative flex px-2 py-1 ml-2 font-bold transition-opacity duration-300 bg-white rounded-lg shadow-md cursor-pointer hover:opacity-50"
            >
                <p>{address}</p>
                <CSSTransition
                    in={didCopy}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                >
                    <p
                        className="absolute z-10 text-center bg-white"
                        style={{ width: "calc(100% - 16px)" }}
                    >
                        copied
                    </p>
                </CSSTransition>
            </div>
        </div>
    );
}
