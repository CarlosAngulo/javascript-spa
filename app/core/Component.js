import { Style } from './Styles.js';
export function Component({tagName, templateURL, stylesUrl}) {
    this.tagName = 'cmp-' + tagName;
    this.templateURL = templateURL;
    this.stylesUrl = stylesUrl;
}

Component.prototype.initComponent = function() {
    this.loadTemplate(this.templateURL)
    .then( res => this.$template.innerHTML = res )
}

Component.prototype.loadTemplate = function(url) {
    return fetch(url)
    .then( res => res.text())
    .then( res => this.parseTemplate(res))
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
    if (this.stylesUrl) this.style();
    this.$template = document.createElement(this.tagName);
    return this.$template;
}

Component.prototype.style = function() {
    fetch(this.stylesUrl)
    .then( res => res.text())
    .then( res => Style.getInstance().add(this.tagName, res))
}