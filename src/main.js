// Import Vue
import Vue from 'vue'

// Import F7
import Framework7 from 'framework7'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

// Import F7 iOS Theme Styles
/*import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
*/
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

Vue.use(VueAxios, axios);

// Init F7 Vue Plugin
Vue.use(Framework7Vue);

/*import socketio from 'socket.io-client'
import VueSocketio from 'vue-socket.io'
export const SocketInstance = socketio('ws://'+'192.168.1.233'+':81', {transports: ['websocket'], reconnection: true, reconnectionDelay: 350});

Vue.use(VueSocketio, SocketInstance);*/

/*import VueWebsocket from "vue-websocket";
Vue.use(VueWebsocket, "ws://192.168.1.233:81", {
	reconnection: true, reconnectionDelay: 250, transports: ['websocket']});*/



// Init App
var MainApp = new Vue({
    el: '#app',
    template: '<app/>',
    // Init Framework7 by passing parameters here
    framework7: {
        root: '#app',
        /* Uncomment to enable Material theme: */
        material: true,
        materialPageLoadDelay: 20,
        routes: Routes,
    },
    
    data: function() {
        return {
            
            uri: document.location.host,
            connection: { type: Boolean, default: false },
            config: {
                manual: {
                    pump: {dpms: null, dpdp: null} 
                },
                pumping:{
                    time: null,
                    pump: {dpms: null, dpdp: null}
                },
                trip:{
                    smart: {adxl: false, prediction: null},
                    sensor: {extsp: false, imp: 16},
                    presets: [
                        {trip_m: 2000, dp_num: 5, imptripm: null},
                        {trip_m: 1500, dp_num: 2, imptripm: null},
                        {trip_m: null, dp_num: null, imptripm: null},
                        {trip_m: null, dp_num: null, imptripm: null},
                    ],
                    pump: {dpms: null, dpdp: null},
                    wheel: {dia: 17, width: 150, height: 70, lenght: null}
                },
                time:{
                    smart: {adxl: false, trail: true, prediction: null},
                    presets: [
                        {dp_time: null, dp_num: null, trail: null},
                        {dp_time: null, dp_num: null, trail: null},
                        {dp_time: null, dp_num: null, trail: null},
                        {dp_time: null, dp_num: null, trail: null},
                    ],
                    pump: {dpms: null, dpdp: null},
                }
            },
            tripM: [] // для пересчета м в км
        }
    },
    // Register App Component
    components: {
        app: App
    },
    created: function () {
        console.log('created');
        this.fetchConfig();
    },
    methods: {
        fetchConfig: function() {
                var self = this;
                this.axios.get('http://'+self.$root.uri+'/config.json', {timeout: 1000}).then(
                                (response) => {
                                    console.log('OK get config.json');
                                    if (response.status === 200) {
                                        self.config = response.data;
                                        self.connection = true;
                                        self.tripM[0] = self.config.trip.presets[0].trip_m / 1000;
                                        self.tripM[1] = self.config.trip.presets[1].trip_m / 1000;
                                    }
                                })
                            .catch(
                                (response) => {
                                    console.log('ERROR get config.json');
                                    self.connection = false;
                                    self.tripM[0] = self.config.trip.presets[0].trip_m / 1000;
                                    self.tripM[1] = self.config.trip.presets[1].trip_m / 1000;
                                })
        },
        saveConfig: function() {
            console.log(this.config);
                var self = this;
                var blob = new Blob([JSON.stringify(self.config)]);
                const dataF = new FormData();

                dataF.append('data', new File([blob], '/config.json', { type: 'application/json' } ));
                
                this.axios.post('http://'+self.$root.uri+'/config', dataF, {timeout: 1000, headers: { 'Content-Type': 'multipart/form-data' }}).then(
                    (response) => {})
                .catch(
                (response) => {
                    self.connection = false;
                })    
        },
    }
});
