export class UI_Helper {
    createElement(name, classes = undefined, id = undefined) {
        let ele = document.createElement(name);
        if (classes) {
            classes=classes.trim();
            classes = classes.split(' ');
            for (let i = 0; i < classes.length; i++)
                ele.classList.add(classes[i]);
        }
        if (id) ele.setAttribute('id', id);
        return ele;
    }
    nestElements(...eles) {
        for (let i = eles.length - 1; i > 0; i--)
            eles[i - 1].append(eles[i]);
        return eles[0];
    }
    clearDiv(div) {
        while (div.children.length > 0) div.removeChild(div.children[0]);
    }
    addLoader() {
        $('#loader').fadeIn(200);
        $('body').css('overflow', 'hidden');
    }
    removeLoader() {
        $('#loader').fadeOut(200);
        $('body').css('overflow', 'visible');
    }
}