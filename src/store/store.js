
import Vue from 'vue'
import Vuex from 'vuex'
import socket from './socket.js'
import vuexI18n from 'vuex-i18n';

Vue.use(Vuex);

function uri() {
    console.log(document.location.host)

    if (document.location.host.indexOf('localhost') + 1)
    {
        /*store.state.connect = true;*/
        return '192.168.1.150' // sn = 971186
        //return '192.168.1.224'  // sn = D7DDFB
        //return '192.168.1.89' // sn = 6904496
    }
    else
        if (document.location.host === "")
            return '192.168.4.1'
        else
            return document.location.host
}

let ws = socket.connect('ws://'+uri()+'/ws')

let interval = setInterval(function () {
      if (store.state.connection.readyState !== 1) {
          if (uri() != '192.168.4.1')
              store.state.connect = true;
        console.log('Unable to communicate with the WebSocket server.');
      }
    }, 3000)


const store = new Vuex.Store({
    state: {
        modejson: {mode: 0, preset: 0},
        config: {
                correctionADC: 0,
                gnss: false,
                pump: {dpms: null, dpdp: null},
                pumping:{
                    time: null,
                    pump: {dpms: null, dpdp: null}
                },
                trip:{
                    smart: {adxl: false, prediction: null, maxsp: 150},
                    sensor: {gnss: false, extsp: false, imp: 16},
                    presets: [
                        {trip_m: 2000, dp_num: 5, imptripm: 0},
                        {trip_m: 1500, dp_num: 2, imptripm: 0},
                    ],
                    wheel: {dia: 17, width: 150, height: 70, lenght: null}
                },
                time:{
                    smart: {adxl: false, trail: true, prediction: null},
                    presets: [
                        {dp_time: null, dp_num: null, trail: null},
                        {dp_time: null, dp_num: null, trail: null},
                    ],
                },
                manual: {
                    pump: {dpms: null, dpdp: null}
                }
        },
        system: {bright: 32, wifi: {connect: false, ssid: null, psw: null}},
        pn: {pn: null, ssid: "Cosmoiler_", psw: null},
        ver: {fw: null, hw: null},
        params: {
            preset: null,
            voltage: 0,
            sp: 0,
            imp: 0,
            odo: 0,
            speed: 0,
            maxspeed: 0,
            avgspeed: 0,
            time: 0,
            kvolt: 1,
            non: 0,
            fix: false,
            lat: 0.000000,
            lon: 0.000000,
            mod: 0,
        },
        debug: {speed: 255},
        connection: ws,
        connect: false,
        locale: window.navigator.userLanguage || window.navigator.language,
        versw: "v2.8"
    },
    mutations: {
        SET_CONFIG (state, payload) {
            state.config = payload;
            //debug.log('GET_CONFIG');
        },
        CHNG_CONFIG (state) {
            //debug.log('CHNG_CONFIG');
        },
        SET_MODE (state, payload) {
            state.modejson = payload;
            state.params.mod = state.modejson.mode;
            debug.log('SET_MODE', payload);
        },
        CHNG_MODE (state, data) {
            state.modejson.mode = data.mode;
            state.params.mod = data.mode;
            //state.modejson = { cmd:"post", param: ["/mode.json", {...state.modejson}] };
            debug.log("Chng Mode", data);
        },
        SET_VER (state, payload) {
            state.ver = payload;
        },
        SET_SYSTEM (state, payload) {
            state.system = payload
        },
        SET_PN (state, payload) {
            state.pn = payload  
        },
        SET_PARAMS (state, payload) {
            state.params = payload
        },
        CONNECT (state, connect) {
            state.connect = connect
        },
        RECONNECT (state, ws) {
            state.connection = ws
            state.connection.onmessage =
            debug.log(state.connection)
        },
        PUSH_DEBUG (state, payload) {
            state.debug.push(payload)
        },
    // Mode TRIP
        UPD_TRIP_TRIPM (state, payload) {
            //debug.log('UPD_TRIP');
            state.config.trip.presets[payload.preset].trip_m = payload.data * 1000;
        },
        UPD_TRIP_DPNUM (state, payload) {
            state.config.trip.presets[payload.preset].dp_num = payload.data;
        },
        UPD_TRIP_DPMS (state, value) {
            state.config.pump.dpms = value.data
        },
        UPD_TRIP_DPDP (state, value) {
            state.config.pump.dpdp = value.data
        },
        UPD_TRIP_WHEEL_D (state, value) {
            state.config.trip.wheel.dia = value.data
        },
        UPD_TRIP_WHEEL_W (state, value) {
            state.config.trip.wheel.width = value.data
        },
        UPD_TRIP_WHEEL_H (state, value) {
            state.config.trip.wheel.height = value.data
        },
        UPD_TRIP_SENSOR_EXTSP (state, value) {
            state.config.trip.sensor.extsp = value.data
        },
        UPD_TRIP_SENSOR_IMP (state, value) {
            state.config.trip.sensor.imp = value.data
        },
        UPD_TRIP_MAXSP (state, value) {
            state.config.trip.smart.maxsp = value.data 
        },
        CALC_IMPTRIPM (state) {
            debug.log('CALC_IMPTRIPM')
            /* вычисление длины окружности колеса */
            let dm = state.config.trip.wheel.dia*25.4;
            let hm = state.config.trip.wheel.height * state.config.trip.wheel.width/100;
            let Len = (dm + 2 * hm)*3.14159;
            state.config.trip.wheel.lenght = Len;
            for (let i = 0; i<2; i++)
            {
                let a = state.config.trip.sensor.imp * state.config.trip.presets[i].trip_m / (state.config.trip.wheel.lenght/1000);
                state.config.trip.presets[i].imptripm = parseInt(a.toFixed(), 10);
            }
        },
        SET_SENSOR_GNSS (state) {
            state.config.trip.sensor.gnss = true;
            //state.config.gnss = true;
        },
        SET_GNSS (state, payload) {
            state.config.gnss = payload.main_gnss;
        },
        SET_SENSOR_IMP (state) {
            state.config.trip.sensor.gnss = false;
        },
    // Mode TIME
        UPD_TIME_DPTIME (state, payload) {
            debug.log(payload);
            state.config.time.presets[payload.preset].dp_time = payload.data
        },
        UPD_TIME_DPNUM (state, payload) {
            state.config.time.presets[payload.preset].dp_num = payload.data
        },
        UPD_TIME_DPMS (state, value) {
            state.config.pump.dpms = value
        },
        UPD_TIME_DPDP (state, value) {
            state.config.pump.dpdp = value
        },
    // Mode MANUAL
        UPD_MAN_DPMS (state, value) {
            state.config.manual.pump.dpms = value
        },
        UPD_MAN_DPDP (state, value) {
            state.config.manual.pump.dpdp = value
        },
    // System
        UPD_UPDATE_SSID (state, value) {
            state.system.wifi.ssid = value
        },
        UPD_UPDATE_PSW (state, value) {
            state.system.wifi.psw = value
        },
        UPD_SYS_BRIGHT (state, value) {
            state.system.bright = (value * (255/100)).toFixed(0);
        },
        CHNG_SYSTEM (state) {
            state.system = { cmd: "post", param: ["/system.json", {...state.system}] }
        },
    // PN
        UPD_PN_SSID (state, value) {
            state.pn.ssid = value  
        },
        UPD_PN_PSW (state, value) {
            state.pn.psw = value
        },
    // DEBUG
        UPD_DBG_SPEED (state, value) {
            state.debug.speed = value;  
        },
    },
    actions: {
        // Сохранение файла config.json
        changeConfig ({commit}) {
            commit('CHNG_CONFIG');
            socket.send(store.state.connection, JSON.stringify({ cmd: "post", param: ["/config.json", {...store.state.config}] }));
        },
        // 1. Команда на изменение режима
        // 2. Сохранение файла mode.json
        changeMode ({commit}, data) {
            commit('CHNG_MODE', data);
            socket.send(store.state.connection, JSON.stringify({ cmd:"post", param: ["/mode.json", {...store.state.modejson}] }));
            socket.send(store.state.connection, JSON.stringify({cmd: "get", param: ["/mode.json"]}));
        },
        // Сохранение файла system.json
        changeSystem ({commit}) {
           // commit('CHNG_SYSTEM');
            socket.send(store.state.connection, JSON.stringify({cmd: "post", param: ["/system.json",{...store.state.system}]}));

        },
        changePn () {
            socket.send(store.state.connection, JSON.stringify({cmd: "post", param: ["/pn.json", {...store.state.pn}]}));
        },
        // Команда на обновление ПО
        Update () {
            debug.log('UPDATE');
            socket.send(store.state.connection, JSON.stringify({cmd: "update"}));
        },
        // Команда BRIGHT - яркость светодиода
        Bright (data) {
            //commit('UPD_SYS_BRIGHT', data);
            socket.send(store.state.connection, JSON.stringify({cmd:"bright", param: store.state.system.bright}));
        },
        Speed (data) {
            socket.send(store.state.connection, JSON.stringify({cmd:"debug", param: store.state.debug.speed}));  
        },
        reconnect ({commit}) {
            debug.log('reconnect')
/*            socket.disconnect(store.state.connection)
            debug.log(store.state.connection)
            commit('RECONNECT', socket.connect('ws://'+uri()+'/ws'))*/
            //store.state.connection = socket.connect('ws://'+uri()+'/ws')
        }
    }
})

Vue.use(vuexI18n.plugin, store);

export default store

/*function sleep(ms) {
ms += new Date().getTime();
while (new Date() < ms){}
}*/

store.state.connection.onmessage = function(message) {
    try {
        store.commit('CONNECT', true);
       // store.commit('PUSH_DEBUG', message.data);
        let incoming = JSON.parse(message.data);
        debug.log("Incoming", incoming);
        if ("config" in incoming) {
            store.commit('SET_CONFIG', incoming);
        }
        else if ("mode" in incoming) {
            store.commit('SET_MODE', incoming);
        }
        else if ("ver" in incoming) {
            store.commit('SET_VER', incoming);
        }
        else if ("wifi" in incoming) {
            store.commit('SET_SYSTEM', incoming)
        }
        else if ("voltage" in incoming) {
            store.commit('SET_PARAMS', incoming)
        }
        else if ("main_gnss" in incoming) {
            store.commit("SET_GNSS", incoming);
            debug.log("GNSS: ", incoming.main_gnss)
        }
        else if ("pn" in incoming) {
            store.commit("SET_PN", incoming);
        }
    }
    catch(e) {
        debug.log('Error, either a bug or this isn\'t valid JSON: ', message.data)
    }
}

store.state.connection.onerror = function(error) {
    debug.log('Sorry, but there\'s a problem with your connection or the server is down.');
    debug.log(error);
    store.commit('CONNECT', false);
}

store.state.connection.onclose = function(event) {
    store.commit('CONNECT', false)
    if (event.wasClean)
        debug.log('OK close connection')
    else {
        debug.log('Error close connection!');
        store.commit('CONNECT', false)
    setTimeout(function(){
        ws = socket.connect('ws://'+uri()+'/ws')
    }, 5000);
    }
}
store.state.connection.onopen = function () {
    debug.log('Connection to socket server opened.')
    store.commit('CONNECT', true)
      // Send user, and any notes held locally so the socket server can store to distribute to future new connections
}
