    
export const Style = (function () {
    var instance;
    
    function createInstance() {
        return new StyleFactory();
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

function StyleFactory() {
    this.style = document.createElement('style');
    this.objStyle = {};
    document.head.appendChild(this.style);
}

StyleFactory.prototype.add = function(tagName, cssSegment) {
    let newCssSegmengt = '\n'+ cssSegment;
    newCssSegmengt = newCssSegmengt.replace(/:host.+?\{/g, ' {');
    newCssSegmengt = newCssSegmengt.replace(/\n.+?\{/g, (m) => tagName + m.replace(/\n/, ' '));
    newCssSegmengt = newCssSegmengt.replace(/\r?\n|\r|\t/g, '');
    if (!this.objStyle[tagName]) {
        this.objStyle[tagName] = newCssSegmengt;
    }
    this.style.innerText = Object.values(this.objStyle).join('\t');
}
