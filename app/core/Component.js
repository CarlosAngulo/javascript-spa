
export function Component(metadata) {
    this.templateURL = metadata.templateURL;
    this.tagName = 'cmp-' + metadata.tagName;
}

Component.prototype.initComponent = function() {
    this.loadTemplate(this.templateURL)
    .then( res => this.$template.innerHTML = res)
}

Component.prototype.loadTemplate = function(url) {
    return fetch(url)
    .then(res => res.text())
    .then(res => this.parseTemplate(res))
}

Component.prototype.parseTemplate = function(templ) {
    this.templateContent = templ;
    return templ.replace(/\${{.+?\}}/g, (m) => this[m.replace(/\${{/g, '').replace(/\}}/g, '')]);
}

Component.prototype.update = function(content) {
    for (const key in content) {
        if (Object.hasOwnProperty.call(content, key) && Object.hasOwnProperty.call(this, key)) {
            this[key] = content[key];
        }
    }
    this.$template.innerHTML = this.parseTemplate(this.templateContent);
}

Component.prototype.render = function() {
    this.$template = document.createElement(this.tagName);
    return this.$template;
}