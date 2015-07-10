import Widget from "./Widget.js"

import { getAddressSceneContent } from '../../core/codemirror/yaml-tangram.js';

export default class DropDownMenu extends Widget {
    constructor(manager, datum){
        super(manager,datum);

        if (datum.options) {
            this.options = datum.options;
        }

        if (datum.source) {
            this.source = datum.source;
        }
    }

    create(keyPair, cm) {
        let el = document.createElement('select');
        el.className = 'tangram-play-widget tangram-play-widget-dropdown';

        if (this.options) {
            for (let i = 0; i < this.options.length; i++) {
                let newOption = document.createElement('option');

                newOption.value = String(keyPair.pos.line) + "-" + String(keyPair.index);

                if (keyPair.value === this.options[i]) {
                    newOption.selected = true;
                }
                newOption.innerHTML= this.options[i];
                el.appendChild(newOption);
            }
        }

        if (this.source) {
            let obj = getAddressSceneContent(this.manager.tangram_play.scene, this.source);
            let keys = (obj) ? Object.keys(obj) : {};

            for (let j = 0; j < keys.length; j++) {
                let newOption = document.createElement('option');
                newOption.value = String(keyPair.pos.line) + "-" + String(keyPair.index);

                if (keyPair.value === keys[j]) {
                    newOption.selected = true;
                }
                newOption.innerHTML= keys[j];
                el.appendChild(newOption);
            }
        }
        
        el.addEventListener('change', function (e) {
            cm.tangram_play.setValue(cm.tangram_play.getKeyForStr(el.options[el.selectedIndex].value), el.options[el.selectedIndex].innerHTML );
        });
        return this.wrap(el,keyPair);
    }
};