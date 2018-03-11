// Import Vue
import Vue from 'vue'
// Import F7
import Framework7 from 'framework7'
// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'
// Import F7 iOS Theme Styles
/*import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'*/
// OR for Material Theme:
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
// Import App Custom Styles
import AppStyles from './css/app.less'
import './css/fontello-embedded.css'
// Import Routes
import Routes from './routes.js'
// Import App Component
import App from './app'
import store from './store/store.js'
import './ba-debug.min.js'

debug.setLevel(0);

// Init F7 Vue Plugin
Vue.use(Framework7Vue);

import translationsEn from './resources/localeEn.json'
import translationsRu from './resources/localeRu.json'

Vue.i18n.add('ru', translationsRu);
Vue.i18n.add('en', translationsEn);

Vue.i18n.set(store.state.locale);
Vue.i18n.fallback('en');

// Init App
var MainApp = new Vue({
    el: '#app',
    template: '<app/>',
    store,
    // Init Framework7 by passing parameters here
    framework7: {
        root: '#app',
        pushState : true,
        routes: Routes,
        /* Uncomment to enable Material theme: */
        material: true,
        materialPageLoadDelay: 20,
        
    },
    
    data: function() {
        return {
           // uri: document.location.host,
            //ws: null,
            //connection: { type: Boolean, default: false },
        }
    },
    // Register App Component
    components: {
        app: App
    },
});
