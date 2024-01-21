export function createMarkerImage(avatarUrl: string): Promise<string> {
	const pinUrl = '/markers/player-white.png';
	return new Promise((resolve, reject) => {
		// Create a new canvas and get its context
		const canvas = document.createElement('canvas');
		canvas.width = 100;
		canvas.height = 100;
		const context = canvas.getContext('2d');

		// Load the user's avatar and the generic map pin image
		const avatarImg = new Image();
		avatarImg.crossOrigin = 'anonymous';
		avatarImg.src = avatarUrl;

		avatarImg.onload = () => {
			const mapPinImg = new Image();
			mapPinImg.crossOrigin = 'anonymous';
			mapPinImg.src = pinUrl;
			mapPinImg.onload = () => {
				// Draw the map pin on the canvas
				context?.drawImage(mapPinImg, 0, 0, canvas.width, canvas.height);

				// Draw the avatar on the map pin
				const avatarSize = Math.min(canvas.width, canvas.height) / 2;
				const avatarX = (canvas.width - avatarSize) / 2;
				const avatarY = (canvas.height - avatarSize) / 4;
				context?.beginPath();
				context?.arc(
					avatarX + avatarSize / 2,
					avatarY + avatarSize / 2,
					avatarSize / 2,
					0,
					Math.PI * 2
				);
				context?.clip();

				context?.drawImage(avatarImg, avatarX, avatarY, avatarSize, avatarSize);

				// Convert the canvas to a data URL and resolve the Promise
				resolve(canvas.toDataURL());
			};
			mapPinImg.onerror = reject;
		};
		avatarImg.onerror = reject;
	});
}
