export class DidYouKnowHandler {
    constructor() {
        this.facts = {
            everyone: [],
            gmOnly: [],
        };
    }

    register(moduleId, facts = { everyone: [], gmOnly: [] }) {
        facts.everyone.forEach(fact => {
            this.facts.everyone.push({
                moduleId,
                fact,
            });
        });
        facts.gmOnly.forEach(fact => {
            this.facts.gmOnly.push({
                moduleId,
                fact,
            });
        });
    }

    generateFact(){
        debugger
        const everyoneFact = this.facts.everyone[Math.floor(Math.random() * this.facts.everyone.length)];
        const gmOnlyFact = this.facts.gmOnly[Math.floor(Math.random() * this.facts.gmOnly.length)];
        const fact = game?.user?.isGM ? (Math.random() > 0.5 ? gmOnlyFact : everyoneFact) : everyoneFact;
        this.currentFact = fact;
    }

    static injectFact(wrapped, ...args) {
        wrapped(...args);
        const loader = document.getElementById("loading");
        const fact = DidYouKnow.currentFact;
        $(loader).find(".did-you-know-fact").remove();
        if(fact){
            const factHtml = $(`
            <div class="did-you-know-fact">
            <h3><i class="fas fa-lightbulb"></i> ${game.i18n.localize("didyouknow.loading.title")}</h3>
            <h1></h1>
            <h1>${fact.fact}</h1>
            <h4>${game.i18n.localize("didyouknow.loading.module")} ${game.modules.get(fact.moduleId).data.title}</h4>
            </div>
            `);
            loader.appendChild(factHtml[0]);
        }
    }
}