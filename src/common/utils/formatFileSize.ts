export const formatFileSize = (size: number): string => {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	let unitIndex = 0;
	let formattedSize = size;

	while (formattedSize >= 1024 && unitIndex < units.length - 1) {
		formattedSize /= 1024;
		unitIndex++;
	}

	return `${formattedSize.toFixed(2)} ${units[unitIndex]}`;
};
