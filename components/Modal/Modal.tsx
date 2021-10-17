import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

interface IModal {
    isOpen: boolean;
    onClose: Function;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: IModal) {
    const [isBrowser, setIsBrowser] = useState(false);

    const handleCloseClick = (e: any) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = (
        <CSSTransition
            in={isOpen}
            timeout={350}
            classNames="fade"
            unmountOnExit
        >
            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                <div
                    onClick={handleCloseClick}
                    className="absolute top-0 left-0 flex w-full h-full"
                ></div>
                {children}
            </div>
        </CSSTransition>
    );

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    if (isBrowser) {
        return createPortal(
            modalContent,
            document.getElementById("modal-root") as HTMLElement
        );
    } else {
        return null;
    }
}
