import { Component } from "../../core/Component.js";

export function Prueba() {
    this.texto = 'hola1';
    this.image = 'hola2';
    this.initComponent();
}

Prueba.prototype = new Component({
    tagName: 'prueba',
    templateURL: './app/components/prueba/prueba.html',
    stylesUrl: './app/components/prueba/prueba.css'
});
