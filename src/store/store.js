
import Vue from 'vue'
import Vuex from 'vuex'
import socket from './socket.js'

Vue.use(Vuex);

function uri() {
    console.log(document.location.host)

    if (document.location.host.indexOf('localhost') + 1)
        return '192.168.4.1'
    else
        if (document.location.host === "")
            return '192.168.4.1'
        else
            return document.location.host
}

let ws = socket.connect('ws://'+uri()+'/ws')


const store = new Vuex.Store({
    state: {
        modejson: {get: "mode", mode: 0, preset: 0},
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
                        {trip_m: 2000, dp_num: 5, imptripm: 0},
                        {trip_m: 1500, dp_num: 2, imptripm: 0},
                        {trip_m: null, dp_num: null, imptripm: 0},
                        {trip_m: null, dp_num: null, imptripm: 0},
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
        status: {wifi: {connect: false, ssid: null, psw: null}},
        params: {
            preset: null,
            voltage: 0,
            sp: 0,
            imp: 0,
            odo: 0,
            speed: 0,
            maxspeed: 0,
            avgspeed: 0,
            kvolt: 1,
            non: 0,
        },
        connection: ws,
        connect: false,
    },
    mutations: {
        SET_CONFIG (state, payload) {
            state.config = payload;
            console.log('GET_CONFIG');
        },
        CHNG_CONFIG (state) {
            state.config = { ...state.config, post: "config.json" };
            console.log('CHNG_CONFIG');
        },
        SET_MODE (state, payload) {
            state.modejson = payload;
            console.log('SET_MODE');
        },
        CHNG_MODE (state, data) {
            state.modejson.mode = data.mode;
            state.modejson = { ...state.modejson, post: "mode.json" };            
            console.log(data);
        },
        SET_VER (state, payload) {
            state.ver = payload
        },
        SET_WIFI (state, payload) {
            state.status = payload
        },
        SET_PARAMS (state, payload) {
            state.params = payload
        },
        CONNECT (state, connect) {
            state.connect = connect
        },
    // Mode TRIP
        UPD_TRIP_TRIPM (state, payload) {
            console.log('UPD_TRIP');
            state.config.trip.presets[payload.preset].trip_m = payload.data * 1000;
        },
        UPD_TRIP_DPNUM (state, payload) {
            state.config.trip.presets[payload.preset].dp_num = payload.data;  
        },
        UPD_TRIP_DPMS (state, value) {
            state.config.trip.pump.dpms = value.data
        },
        UPD_TRIP_DPDP (state, value) {
            state.config.trip.pump.dpdp = value.data
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
        CALC_IMPTRIPM (state) {
            console.log('CALC_IMPTRIPM')
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
    // Mode TIME
        UPD_TIME_DPTIME (state, payload) {
            console.log(payload);
            state.config.time.presets[payload.preset].dp_time = payload.data
        },
        UPD_TIME_DPNUM (state, payload) {
            state.config.time.presets[payload.preset].dp_num = payload.data
        },
        UPD_TIME_DPMS (state, value) {
            state.config.time.pump.dpms = value
        },
        UPD_TIME_DPDP (state, value) {
            state.config.time.pump.dpdp = value
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
            state.status.wifi.ssid = value
        },
        UPD_UPDATE_PSW (state, value) {
            state.status.wifi.psw = value
        },
        CHNG_UPDATE (state) {
            state.status = { ...state.status, post: "status.json" }
        }

    },
    actions: {
        changeConfig ({commit}) {
            commit('CHNG_CONFIG');            
            socket.send(store.state.connection, JSON.stringify(store.state.config));
        },
        changeMode ({commit}, data) {
            commit('CHNG_MODE', data);            
            socket.send(store.state.connection, JSON.stringify(store.state.modejson));
            socket.send(store.state.connection, JSON.stringify({get: "mode"}));
        },
        changeStatus ({commit}) {
            commit('CHNG_UPDATE');
            socket.send(store.state.connection, JSON.stringify(store.state.status))
        },
        Update () {
            console.log('UPDATE');
            socket.send(store.state.connection, JSON.stringify({get: "update"}));
        }
    }
})

export default store

ws.onmessage = function(message) {
    try {
        store.commit('CONNECT', true);
        let incoming = JSON.parse(message.data);
        console.log(incoming);
        if ("config" in incoming) {
            store.commit('SET_CONFIG', incoming);        
        } 
        else if ("mode" in incoming) {
            store.commit('SET_MODE', incoming);           
        }
        else if ("sn" in incoming) {
            store.commit('SET_VER', incoming);
        }
        else if ("wifi" in incoming) {
            store.commit('SET_WIFI', incoming)
        }
        else if ("params" in incoming)
            store.commit('SET_PARAMS', incoming)
    }
    catch(e) {
        console.log('Error, either a bug or this isn\'t valid JSON: ', message.data)
    }
}

ws.onerror = function(error) {
    console.log('Sorry, but there\'s a problem with your connection or the server is down.');
    console.log(error);
    store.commit('CONNECT', false);
}

ws.onclose = function(event) {
    if (event.wasClean)
        console.log('OK close connection')
    else {
        console.log('Error close connection!');
        store.commit('CONNECT', false)
    }
}