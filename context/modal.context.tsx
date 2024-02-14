import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

export interface ModalProps {
	children?: ReactNode;
	closeOnBackgroundClick?: boolean;
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

	const openModal = (content: ReactNode, props?: ModalProps) => {
		if (props && props.closeOnBackgroundClick !== undefined)
			setCloseOnBackgroundClick(Boolean(props.closeOnBackgroundClick));
		else setCloseOnBackgroundClick(true);
		console.log({ closeOnBackgroundClick, props });
		setModalContent(content);
	};

	const closeModal = () => setModalContent(null);

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
				<ModalContainer {...{ closeModal, closeOnBackgroundClick }}>{modalContent}</ModalContainer>
			)}
		</ModalContext.Provider>
	);
};

const ModalContainer = ({ children, closeModal, closeOnBackgroundClick }: any) => {
	const handleBackgroundClick = () => {
		if (closeOnBackgroundClick) closeModal();
	};
	return (
		<div
			onClick={handleBackgroundClick}
			className="fixed top-0 left-0 z-50 bg-black/50 backdrop-blur-sm h-screen w-screen">
			<div className="flex justify-center items-center h-full">
				<div className="animate__animated animate__bounceIn animate__fast">{children}</div>
			</div>
		</div>
	);
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) throw new Error("useModal must be used within a ModalProvider");

	return context;
};
