export default function Loader() {
    const $loader = document.createElement('div');
    $loader.classList.add('loader');
    $loader.innerHTML = `
        <h3>Loading...</h3>
        <img src="app/assets/loader.gif"/>
    `;
    return $loader;
}