function createElement(tagName, options) {
    let elem = document.createElement(tagName);

    if(options.appendTo) {
        let parent = options.appendTo;
        if(typeof options.appendTo === 'string') {
            parent = ge(options.appendTo);
        }
        parent.append(elem);
    }

    if(options.attrs) {
        for(let attr in options.attrs) {
            elem[attr] = options.attrs[attr];
        }
    }

    if(options.content) {
        let text = [options.content];
        if(Array.isArray(options.content)) {
            text = options.content;
        }

        text.forEach(item => {
            if(typeof item === 'string') {
                elem.innerHTML = item;
            } else {
                elem.append(item)
            }
        })
    }

    if(options.events) {
        for(let event in options.events) {
            elem.addEventListener(event, options.events[event]);
        }
    }

    return elem;
}

function asyncAlert (text) {

    return new Promise(resolve => {
        const parent = document.querySelector('body');
        const alert = createElement('div', {
            attrs: { className: 'alert__body'},
            appendTo: parent,
            content: [
                createElement('div', {
                    attrs: { className: 'alert__questions'},
                    content: text
                }),
                createElement('button', {
                    attrs: { className: 'alert__close'},
                    content: 'X',
                    events: {
                        click: () => {
                            alert.remove();
                        }
                    }
                }),
                createElement('button', {
                    attrs: { className: 'alert__btn'},
                    content: 'Ok',
                    events: {
                        click: () => {
                            alert.remove();
                            resolve();
                        }
                    }
                })
            ]
        })
    })
}

function asyncConfirm(text){
    return new Promise((resolve, reject) => {
        const parent = document.querySelector('body');
        const confirm = createElement('div', {
            attrs: { className: 'confirm__body'},
            appendTo: parent,
            content: [
                createElement('p', {
                    attrs: { className: 'confirm__questions'},
                    content: text
                }),
                createElement('button', {
                    attrs: { className: 'confirm__close'},
                    content: 'X',
                    events: {
                        click: () => {
                            confirm.remove();
                            reject();
                        }
                    }
                }),
                createElement('button', {
                    attrs: { className: 'confirm__btn'},
                    content: 'Ok',
                    events: {
                        click: () => {
                            confirm.remove();
                            resolve();
                        }
                    }
                }),
                createElement('button', {
                    attrs: { className: 'confirm__btnClose'},
                    content: 'Close',
                    events: {
                        click: () => {
                            confirm.remove();
                            reject();
                        }
                    }
                })
            ]
        });
    })
}

asyncConfirm('Do you want to open alert window?')
    .then(() => asyncAlert('Do you want to close alert window?'))
    .catch(() => alert('Why did you do this?'));




 