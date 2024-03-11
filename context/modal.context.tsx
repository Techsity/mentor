import classNames from "classnames";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

export interface ModalProps {
	closeOnBackgroundClick?: boolean;
	animate?: boolean;
}

interface ModalContextType {
	modalContent: ReactNode | null;
	openModal: (content: ReactNode, props?: ModalProps) => void;
	closeModal: () => void;
}

interface ModalProviderProps {
	children: ReactNode;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
	const [modalContent, setModalContent] = useState<ReactNode | null>(null);
	const [closeOnBackgroundClick, setCloseOnBackgroundClick] = useState<boolean>(true);
	const [animate, setAnimate] = useState<boolean>(true);

	const openModal = (content: ReactNode, props?: ModalProps) => {
		if (props && props.closeOnBackgroundClick !== undefined) {
			setCloseOnBackgroundClick(Boolean(props.closeOnBackgroundClick));
			setAnimate(Boolean(props.animate));
		} else {
			setCloseOnBackgroundClick(true);
			setAnimate(true);
		}
		setModalContent(content);
	};

	const closeModal = () => {
		setModalContent(null);
	};

	const stopPageScrolling = () => {
		if (modalContent) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "auto";
	};

	useEffect(() => {
		stopPageScrolling();
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [modalContent]);

	return (
		<ModalContext.Provider value={{ modalContent, openModal, closeModal }}>
			{children}
			{modalContent && (
				<ModalContainer {...{ closeModal, closeOnBackgroundClick, animate }}>{modalContent}</ModalContainer>
			)}
		</ModalContext.Provider>
	);
};

const ModalContainer = ({ children, closeModal, closeOnBackgroundClick, animate }: any) => {
	const handleBackgroundClick = () => {
		if (closeOnBackgroundClick) closeModal();
	};
	return (
		<div className="flex justify-center items-center m-auto">
			<div
				onClick={handleBackgroundClick}
				className="fixed top-0 left-0 z-40 bg-black/50 backdrop-blur-sm h-screen w-screen"
			/>
			<div className="flex justify-center items-center z-50 fixed h-auto w-auto top-28">
				<div
					className={classNames(
						animate ? "animate__animated animate__bounceIn animate__fast" : "",
						"relative",
					)}>
					<div
						className="text-3xl text-black cursor-pointer flex items-end justify-end w-full"
						onClick={closeModal}>
						&times;
					</div>
					{children}
				</div>
			</div>
		</div>
	);
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) throw new Error("useModal must be used within a ModalProvider");

	return context;
};
