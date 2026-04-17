// rendering_core_reference.d.ts
declare namespace TweeningVariants {
    type QaudTweening = {
        positions?: { x?: number; y?: number };
        sizing?: { w?: number; h?: number };
        rotation?: number;
    };
    type GroupTweening = {
        positions?: { x?: number; y?: number };
        rotation?: number;
    };
}

declare interface Drawable {
    x: number;
    y: number;
    visible: boolean;
    rotation: number;
}

declare class InterfaceRenderQuad implements Drawable {
    x: number; y: number; w: number; h: number;
    color: [number, number, number, number];
    texture: WebGLTexture | null;
    visible: boolean;
    rotation: number;
    uvs: { left: number; top: number; right: number; bottom: number };
    updateVisiblility(requestedVisiblity?: boolean): void;
}

declare class RenderGroup implements Drawable {
    x: number; y: number;
    visible: boolean;
    rotation: number;
    readonly children: (InterfaceRenderQuad | RenderGroup)[];
    add(child: InterfaceRenderQuad | RenderGroup): void;
    remove(child: InterfaceRenderQuad | RenderGroup): void;
}

declare abstract class ReferenceRendererCore2D {
    loadTexture(source: string | HTMLImageElement): Promise<WebGLTexture>;
    loadSVGTexture(svgString: string, targetWidth?: number, targetHeight?: number): Promise<WebGLTexture>;

    createRect(x: number, y: number, w: number, h: number, color?: [number, number, number, number]): InterfaceRenderQuad;
    createSprite(x: number, y: number, w: number, h: number, texture: WebGLTexture, tint?: [number, number, number, number]): InterfaceRenderQuad;
    createGroup(x?: number, y?: number): RenderGroup;

    applyToRendering(drawable: InterfaceRenderQuad | RenderGroup): void;
    removeFromScene(drawable: InterfaceRenderQuad | RenderGroup): void;

    // /** 
    //  * Tween position and/or size of any object (quad or group)
    //  * - For InterfaceRenderQuad: supports positions, sizing, rotation
    //  * - For RenderGroup: supports positions, rotation only
    //  */
    TweenSelected<T extends InterfaceRenderQuad | RenderGroup>(
        object: T | undefined,
        target: T extends InterfaceRenderQuad ? TweeningVariants.QaudTweening : TweeningVariants.GroupTweening,
        threadFunction?: () => void,
        durationMs?: number
    ): any;

    update(): void;
    render(width: number, height: number): void;
    startAnimationLoop(onBeforeRender?: (deltaMs: number) => void): void;
}

declare type FontFamilyLetterVariants = { lower?: string; upper?: string; };
declare type PreBuiltFontFamilyVectors = {
    1: FontFamilyLetterVariants;
    2: FontFamilyLetterVariants;
};

/**
 * ---
 * [...]
 */
declare abstract class RenderingTextFontStorage {
    IntegratedFontFamilyVectors: PreBuiltFontFamilyVectors;
}

declare abstract class RenderingTextUtility {

}
