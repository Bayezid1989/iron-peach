export function createMarkerImage(avatarUrl: string): Promise<string> {
  const pinUrl = "/markers/player-white.png";
  return new Promise((resolve, reject) => {
    // Create a new canvas and get its context
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    const context = canvas.getContext("2d");

    // Load the user's avatar and the generic map pin image
    const avatarImg = new Image();
    avatarImg.crossOrigin = "anonymous";
    avatarImg.src = avatarUrl;

    avatarImg.onload = () => {
      const mapPinImg = new Image();
      mapPinImg.crossOrigin = "anonymous";
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
          Math.PI * 2,
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

export const createPulsingDot = (map: mapboxgl.Map) => {
  const size = 140;

  return {
    width: size,
    height: size,
    data: new Uint8ClampedArray(size * size * 4),
    context: null as CanvasRenderingContext2D | null,

    // When the layer is added to the map,
    // get the rendering context for the map canvas.
    onAdd: function () {
      const canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext("2d");
    },

    // Call once before every frame where the icon will be used.
    render: function () {
      const duration = 1000;
      const t = (performance.now() % duration) / duration;

      const radius = (size / 2) * 0.3;
      const outerRadius = (size / 2) * 0.7 * t + radius;
      const context = this.context;
      if (context) {
        // Draw the outer circle.
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
          this.width / 2,
          this.height / 2,
          outerRadius,
          0,
          Math.PI * 2,
        );
        context.fillStyle = `rgba(255, 255, 255, ${1 - t})`;
        context.fill();

        // Draw the inner circle.
        // context.beginPath();
        // context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        // context.fillStyle = "rgba(255, 100, 100, 1)";
        // context.strokeStyle = "white";
        // context.lineWidth = 2 + 4 * (1 - t);
        // context.fill();
        // context.stroke();

        // Update this image's data with data from the canvas.
        this.data = context.getImageData(0, 0, this.width, this.height).data;
      }

      // Continuously repaint the map, resulting
      // in the smooth animation of the dot.
      map.triggerRepaint();

      // Return `true` to let the map know that the image was updated.
      return true;
    },
  };
};
