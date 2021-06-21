import { Component } from "../../core/Component.js";

export function Segundo({title, content}) {
    this.title = title || 'hola1';
    this.content = content || 'hola2';
    this.initComponent();
}

Segundo.prototype = new Component({
    tagName: 'segundo',
    templateURL: './app/components/second/segundo.html',
    stylesUrl: './app/components/second/segundo.css',
});
