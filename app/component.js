// import styles from './main.css';

// export default (text = "hello world") => {
//     const element = document.createElement("div");
//     element.innerHTML = text;
//     // element.className = styles.redButton;
//     element.className = "fa fa-hand-spock-o fa-lg";
//     return element;
// };

// dynamic import
// export default () => {
//     const element = document.createElement("div");
//     element.className = "fa fa-hand-spock-o fa-lg";
//     element.innerHTML = "Hello World";

//     element.onclick = () => {
//         import("./lazy")
//             .then(lazy => {
//                 element.textContent = lazy.default;
//             })
//             .catch(err => {
//                 console.error(err);
//             });
//     };
//     return element;
// };

// require.ensure()
export default () => {
    const element = document.createElement("div");
    element.className = "pure-button";
    element.innerHTML = "Hello World!";
    element.onclick = () => {
        require.ensure([], require => {
            element.textContent = require("./lazy").default;
        });
    };
    return element;
};
