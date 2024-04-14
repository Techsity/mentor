import React, { Fragment, ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import Progressbar from "../atom/loader/ProgressBar";
import Sidebar from "./sidebar";
import { ModalProvider } from "../../../context/modal.context";
import { NotificationsContextProvider } from "../../../context/notification.context";
import { SocketContextProvider } from "../../../context/socket-io.context";

const LayoutContainer = ({ children }: { children: ReactNode }) => {
	return (
		<Fragment>
			<SocketContextProvider>
				<ModalProvider>
					<NotificationsContextProvider>
						<Progressbar />
						<Sidebar />
						<Navbar />
						<div className="relative">{children}</div>
						<Footer />
					</NotificationsContextProvider>
				</ModalProvider>
			</SocketContextProvider>
		</Fragment>
	);
};

export default LayoutContainer;
