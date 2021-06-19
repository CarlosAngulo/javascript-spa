export default function ExportButton() {
    const $button = document.createElement('button');
    $button.type = 'button';
    $button.innerHTML = 'Export to Excel';
    $button.classList.add('excel-button');
    return $button;
}