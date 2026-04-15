// -----------------------------------------------------------------------------
//  rendering_core_reference.d.ts
//  Updated TypeScript definitions for the improved Renderer2D
//  (retained-mode, sprites, groups, tweening, animation loop)
// -----------------------------------------------------------------------------

declare type TweeningProperties = {
    positions?: {
        x?: number;
        y?: number;
    };
    sizing?: {
        w?: number;
        h?: number;
    };
};

/** Base drawable that all render objects (quads & groups) share */
declare interface Drawable {
    x: number;
    y: number;
    visible: boolean;
}

/** A single textured or colored rectangle/sprite */
declare class RenderQuad implements Drawable {
    x: number;
    y: number;
    w: number;
    h: number;
    color: [number, number, number, number];
    texture: WebGLTexture | null;
    visible: boolean;

    // Internal UVs (you can change these for sprite-sheet slicing)
    uvs: { left: number; top: number; right: number; bottom: number };
}

/** Group for collective positioning of many children */
declare class RenderGroup implements Drawable {
    x: number;
    y: number;
    visible: boolean;
    readonly children: (RenderQuad | RenderGroup)[];

    add(child: RenderQuad | RenderGroup): void;
    remove(child: RenderQuad | RenderGroup): void;
}

/** The main renderer – now implements the full modern API */
declare abstract class ReferenceRendererCore2D {
    /** Load an image (URL or HTMLImageElement) into a WebGL texture */
    loadTexture(source: string | HTMLImageElement): Promise<WebGLTexture>;

    /** Create a solid-colored rectangle */
    createRect(
        x: number,
        y: number,
        w: number,
        h: number,
        color?: [number, number, number, number]
    ): RenderQuad;

    /** Create a textured sprite */
    createSprite(
        x: number,
        y: number,
        w: number,
        h: number,
        texture: WebGLTexture,
        tint?: [number, number, number, number]
    ): RenderQuad;

    /** Create a group that can hold other quads or groups */
    createGroup(x?: number, y?: number): RenderGroup;

    /** Add any drawable (quad or group) to the top-level scene */
    addToScene(drawable: RenderQuad | RenderGroup): void;

    /** Remove a drawable from the top-level scene */
    removeFromScene(drawable: RenderQuad | RenderGroup): void;

    /**
     * Animate position and/or size of any object (quad or group).
     * Returns a Promise that resolves when the tween finishes.
     */
    TweenSelected(
        object: RenderQuad | RenderGroup | undefined,
        target: TweeningProperties,
        durationMs?: number
    ): Promise<void>;

    /** Call every frame to advance all active tweens/animations */
    update(): void;

    /**
     * Render the entire scene (clears, batches by texture, draws).
     * Call this after update() in an animation loop.
     */
    render(width: number, height: number): void;

    /**
     * OPTIONAL: start a **full** animation loop setup automatically (call this ONCE)     
     * Pass a callback if running logic before render().
     */
    startAnimationLoop(onBeforeRender?: (deltaMs: number) => void): void;
}
