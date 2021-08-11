const stateStack = [];

export function filterObject(obj, predicate) {
    return Object.fromEntries(Object.entries(obj).filter(predicate));
}

export function scaleAnimationOnResize(ctx, scale) {
    const saved = ctx.canvas.toDataURL();

    ctx.canvas.width *= scale.x;
    ctx.canvas.height *= scale.y;

    const img = new Image();
    img.onload = () => {
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            0,
            0,
            ctx.canvas.width,
            ctx.canvas.height
        );
        img.src = saved;
    };
}

export function getScale(ctx) {
    return {
        x: window.innerWidth / ctx.canvas.width,
        y: window.innerHeight / ctx.canvas.height,
    };
}
