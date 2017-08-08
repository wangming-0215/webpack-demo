import "./main.css";
import component from "./component";
import { Component } from "react";

console.log(Component);

let demoComponent = component("another");

document.body.appendChild(demoComponent);
