function createElement(tagName, options) {
    let element = document.createElement(tagName);

    element.className = options.attrs.className;

    // if(options.appendTo) {
    //     let parent = options.appendTo;
    //     if(typeof options.appendTo === 'string') {
    //         parent = ge(options.appendTo);
    //     }
    //     parent.append(element);
    // }

    if(options.attrs) {
        for(let attr in options.attrs) {
            element[attr] = options.attrs[attr];
        }
    }

    if(options.content) {
        let text = [options.content];
        if(Array.isArray(options.content)) {
            text = options.content;
        }

        text.forEach(item => {
            if(typeof item === 'string') {
                element.innerHTML = item;
            } else {
                element.append(item);
            }
        })
    }

    if(options.events) {
        for(let event in options.events) {
            element.addEventListener(event, options.events[event]);
        }
    }

    return element;
}


function Slider(options) {
    this.container = document.querySelector(options.container);
    this.imageUrls = options.imageUrls;
    this.direction = options.direction;
    this.duration = options.duration;


    this.createElements();
    this.play();
}

Slider.prototype.createElements = function () {

    const sliderElement = createElement('div', {
        appendTo: this.container,
        attrs: { className: 'slider' }
    });

    const sliderControlElement = createElement('div', {
        appendTo: sliderElement,
        attrs: { className: 'slider-controls'}
    });

    const buttonLeft = createElement('button', {
        appendTo: sliderControlElement,
        attrs: { className: 'slider-control left' },
        content: createElement('i', {
            attrs: { className: 'fas fa-angle-left'}
        }),
        events: {
            click: () => this.sliderLeft(),
        }

    });
    const buttonRight = createElement('button', {
        appendTo: sliderControlElement,
        attrs: { className: 'slider-control right' },
        content: createElement('i', {
            attrs: { className: 'fas fa-angle-right'}
        }),
        events: {
            click: () => this.sliderRight(),
        }
    });

    const pointsElements = this.imageUrls.map(url => createElment('span', { attrs: { className: 'slider-point'}}));

    const pointsElementsItem = createElement('div', {
        appendTo: sliderControlElement,
        attrs: { className: 'slider-point'}
    });

};

Slider.prototype.play = function () {};
Slider.prototype.pause = function () {};
Slider.prototype.slideLeft = function () {};
Slider.prototype.slideRight = function () {};
Slider.prototype.slideTo = function () {};

const imageUrls = [
    'https://media.familyminded.com/3b/0d/3b0d80ed89394877a47899a513ca04bd.jpeg',
    'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2016/11/29092111/AdobeStock_94435211-800x600.jpeg',
    'https://media.familyminded.com/ce/39/ce39903185b44964b9db839467e92260.jpg',
];

const slider1 = new Slider({
    container: '#slider1',
    imageUrls: imageUrls,
    duration: 10000,
    direction: 'left'
});
