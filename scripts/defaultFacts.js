export function registerDefault(){
    debugger
    let defaultPlayer = game.i18n.translations.didyouknow.playerFacts;
    let defaultGM = game.i18n.translations.didyouknow.gmFacts;
    const moduleFacts = game.i18n.translations.didyouknow.moduleFacts;

    for(const [k,v] of Object.entries(moduleFacts)){
        if(!game.modules.get(k)?.active) continue;
        defaultPlayer = defaultPlayer.concat(v.playerFacts);
        defaultGM = defaultGM.concat(v.gmFacts);
    }

    DidYouKnow.register("didyouknow", {
        everyone: defaultPlayer,
        gmOnly: defaultGM,
    })
}