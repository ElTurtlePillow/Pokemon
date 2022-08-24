export const withGrid = (n) =>  {
    return n * 32;
}

export const asGridCoords = (x, y) => {
    return `${x * 32}, ${y * 32}`
}

export const nextPosition = (initialX, initialY, direction) => {
    let x = initialX;
    let y = initialY;
    const size = 32;
    if (direction === 'left') {
        x -= size;
    } else if (direction === 'right') {
        x += size;
    } else if (direction === 'up') {
        y -= size;
    } else if (direction === "down") {
        y += size;
    }
    return { x , y };
}

export const loadWall = (mapCollision) =>  {
    const boundaries = [];
		for (let i = 0; i < mapCollision.length; i += 64) {
			const mapCollisionArray = [];
			mapCollisionArray.push(mapCollision.slice(i, 64 + i));

			let k = (i / 64);
			mapCollisionArray.forEach((row, i) => {
				row.forEach((symbol, j) => {
					if (symbol !== 0) boundaries.push([asGridCoords(j, k), true]);
				});
			});
		}
		const boundariesObj = Object.fromEntries(boundaries);
		return boundariesObj;
}

export const emitEvent = (name, detail) => {
    const event = new CustomEvent(name, {
        detail
    });
    document.dispatchEvent(event);
}