import classNames from "classnames";
import { useRouter } from "next/router";
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback, useMemo } from "react";

export interface ModalProps {
	closeOnBackgroundClick?: boolean;
	animate?: boolean;
	containerClassName?: string;
	showCloseIcon?: boolean;
}

interface ModalContextType {
	modalContent: ReactNode | null;
	openModal: (content: ReactNode, props?: ModalProps) => void;
	closeModal: () => void;
}

interface ModalProviderProps {
	children: ReactNode;
}

interface ModalContainerProps {
	children: ReactNode;
	closeModal: () => void;
	closeOnBackgroundClick: boolean;
	animate: boolean;
	showCloseIcon?: boolean;
	className?: string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
	const router = useRouter();
	const [modalContent, setModalContent] = useState<ReactNode | null>(null);
	const [closeOnBackgroundClick, setCloseOnBackgroundClick] = useState<boolean>(true);
	const [animate, setAnimate] = useState<boolean>(false);
	const [containerClassName, setContainerClassName] = useState<string>("");
	const [showCloseIcon, setShowCloseIcon] = useState<boolean>(true);

	const openModal = (content: ReactNode, props?: ModalProps) => {
		if (props) {
			if (props.closeOnBackgroundClick !== undefined)
				setCloseOnBackgroundClick(Boolean(props.closeOnBackgroundClick));
			if (props.containerClassName && props.containerClassName !== undefined)
				setContainerClassName(String(props.containerClassName));
			if (props.showCloseIcon !== undefined) {
				if (props.showCloseIcon == false) setShowCloseIcon(false);
				else setShowCloseIcon(true);
			}
			setAnimate(Boolean(props.animate));
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

	useEffect(() => {
		router.events.on("routeChangeStart", closeModal);
		return () => {
			router.events.off("routeChangeStart", closeModal);
		};
	}, [router]);

	return (
		<ModalContext.Provider value={{ modalContent, openModal, closeModal }}>
			{children}
			{modalContent && (
				<ModalContainer
					{...{ closeModal, showCloseIcon, closeOnBackgroundClick, animate, className: containerClassName }}>
					{modalContent}
				</ModalContainer>
			)}
		</ModalContext.Provider>
	);
};

const ModalContainer = ({
	children,
	closeModal,
	closeOnBackgroundClick,
	animate,
	className,
	showCloseIcon,
}: ModalContainerProps) => {
	const handleBackgroundClick = () => {
		if (closeOnBackgroundClick) closeModal();
	};

	return (
		<div className="flex justify-center items-center m-auto h-screen w-screen relative z-50">
			<div
				onClick={handleBackgroundClick}
				className="fixed top-0 left-0 bg-black/50 backdrop-blur-sm h-screen w-screen overflow-hidden"
			/>
			<div
				className={classNames(
					className && className !== ""
						? className
						: "flex justify-center items-center fixed h-auto w-auto top-28",
				)}>
				<div
					className={classNames(
						animate ? "animate__animated animate__fadeInDown animate__fastest" : "",
						"relative w-auto h-auto",
					)}>
					{showCloseIcon && (
						<div className="w-full flex items-center justify-center mb-2">
							<div
								className="text-3xl text-[#FFB100] cursor-pointer bg-white rounded-full w-10 h-10 flex justify-center items-center"
								onClick={() => closeModal()}>
								&times;
							</div>
						</div>
					)}
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
