import { DidYouKnowHandler } from './main.js';
import { registerDefault } from './defaultFacts.js';

Hooks.on("i18nInit", () => {
    libWrapper.register("didyouknow","SceneNavigation.displayProgressBar", DidYouKnowHandler.injectFact,"WRAPPER");
    globalThis.DidYouKnow = new DidYouKnowHandler();
    Hooks.call("didYouKnowReady", globalThis.DidYouKnow);
    globalThis.DidYouKnow.generateFact();
    $(document).on("click", ".did-you-know-fact", () => {
        globalThis.DidYouKnow.generateFact();
    })
})

Hooks.on("didYouKnowReady", (didYouKnow) => {
    registerDefault();
})

Hooks.on("canvasInit", () => {
    globalThis.DidYouKnow?.generateFact();
})