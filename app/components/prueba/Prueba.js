const templateURL = './app/components/prueba/prueba.html';
const tagName = 'cmp-prueba';

export function Prueba() {
    this.texto = 'hola1';
    this.image = 'hola2';
    this.init();
}

Prueba.prototype.init = function() {
    this.loadTemplate(templateURL)
    .then( res => this.$template.innerHTML = res)
}

Prueba.prototype.loadTemplate = function(url) {
    return fetch(url)
    .then(res => res.text())
    .then(res => this.parseTemplate(res))
}

Prueba.prototype.parseTemplate = function(templ) {
    this.templateContent = templ;
    console.log(templ.match(/(?<=\${{)(.*?)(?=}})/g))
    return templ.replace(/\${{.+?\}}/g, (m) => this[m.replace(/\${{/g, '').replace(/\}}/g, '')]);
    return templ.replace(/(?<=\${{)(.*?)(?=}})/g, (m) => this[m]);
}

Prueba.prototype.update = function(content) {
    for (const key in content) {
        if (Object.hasOwnProperty.call(content, key) && Object.hasOwnProperty.call(this, key)) {
            this[key] = content[key];
        }
    }
    console.log(this.parseTemplate(this.templateContent));
    this.$template.innerHTML = this.parseTemplate(this.templateContent);
}

Prueba.prototype.render = function() {
    this.$template = document.createElement(tagName);
    return this.$template;
}

// Uso:
    // const prueba1 = new Prueba();
    // const prueba2 = new Prueba();
    // $container.appendChild(prueba1.render());
    // $container.appendChild(prueba2.render());
    // setTimeout(()=>{
    //     prueba1.update({
    //         texto: 'Carlos',
    //         image: 'otro'
    //     })
    // }, 3000);