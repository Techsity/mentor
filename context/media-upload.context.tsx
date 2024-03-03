import React, { memo, useCallback, useContext, useEffect } from "react";

type MediaMetadataType = {
	filename: string;
	size: number;
	type: string;
};

type MediaUploadContext = {
	id?: string;
	file: File | null;
	metadata: MediaMetadataType;
};

interface VideoUploadContextType {
	files: MediaUploadContext[];
	uploadResource: (media: MediaUploadContext) => void;
	getResource: (id: string) => void;
	updateResource: (id: string, media: Partial<MediaUploadContext>) => void;
	deleteResource: (id: string) => void;
}

const defaultContext: VideoUploadContextType = {
	files: [],
	deleteResource: (id) => {},
	getResource: (id) => {},
	updateResource(id, media) {},
	uploadResource(media) {},
};

const VideoUploadContext = React.createContext<VideoUploadContextType>(defaultContext);

const VideoContextComp = ({ children }: { children?: React.ReactNode }) => {
	const [files, setFiles] = React.useState<MediaUploadContext[]>([]);

	const uploadResource = useCallback((media: MediaUploadContext) => {
		// Todo: check for duplicate before storing
		setFiles((prevFiles) => [...prevFiles, media]);
		console.log({ media });
	}, []);

	const getResource = useCallback((id: string) => {
		const file = files.find((file) => file.id === id);
		return file || null;
	}, []);

	const updateResource = useCallback((id: string, updatedMedia: Partial<MediaUploadContext>) => {
		setFiles((prevFiles) => prevFiles.map((file) => (file.id === id ? { ...file, ...updatedMedia } : file)));
	}, []);

	const deleteResource = useCallback((id: string) => {
		setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
	}, []);

	return (
		<VideoUploadContext.Provider value={{ files, uploadResource, getResource, updateResource, deleteResource }}>
			<>{children}</>
		</VideoUploadContext.Provider>
	);
};

export const VideoUploadProvider = memo(VideoContextComp);

export const useVideoUploadContext = () => {
	return useContext(VideoUploadContext);
};
