export function DatePicker(type) {

    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth()<10?0:''}${date.getMonth()}-${date.getDay()<10?0:''}${date.getDay()}`;

    this.$container = document.createElement('span');
    const $label = document.createElement('label');
    const $input = document.createElement('input');

    $label.setAttribute('for', type);
    $label.innerHTML = type + ' date:';
    $input.type = 'date';
    $input.id = type;
    $input.value = today;
    $input.name = 'trip-' + type;
    $input.addEventListener('change', (e) => {
        this.$container.dispatchEvent(new CustomEvent('changeDate', {detail: e.target.value}))
    });

    this.$container.appendChild($label);
    this.$container.appendChild($input);

}
