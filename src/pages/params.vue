<template>
<f7-page>
    <f7-navbar :title="this.$t('menu.telemetry')" back-link="Back" sliding></f7-navbar>

<!--Mode = 0 and GNSS = true-->
    <div v-if="flag1">
        <f7-card :title="this.$t('telemetry.sensor.title')" :content="this.$t('telemetry.sensor.content')">
            <f7-card-footer>{{sensor_footer}}</f7-card-footer>
        </f7-card>
        <f7-grid no-gutter>
            <f7-col>
                <f7-card :title="this.$t('telemetry.speed.title')" :content="Speed"></f7-card>
            </f7-col>
            <f7-col>
                <f7-card :title="this.$t('telemetry.volt.title')" :content="Voltage"></f7-card>
            </f7-col>

        </f7-grid>
    </div>

<!--Mode = 1-->
    <div v-if="flagTrip">
        <!--Импульсный-->
        <div v-if="!this.$store.state.config.trip.sensor.gnss">
            <f7-grid no-gutter>
                <f7-col>
                    <f7-card :title="this.$t('telemetry.mode.title')" :content="mode" :footer="NamePreset"></f7-card>
                </f7-col>
                <f7-col>
                    <f7-card :title="this.$t('telemetry.sensor.title')" :content="this.sensor_footer" :footer="TypeSensor">
                    </f7-card>
                </f7-col>
            </f7-grid>
        </div>
        <!-- GNSS -->
        <div v-if="this.$store.state.config.trip.sensor.gnss">
            <f7-grid no-gutter>
                <f7-col>
                    <f7-card :title="this.$t('telemetry.mode.title')" :content="mode" :footer="NamePreset"></f7-card>
                </f7-col>
            </f7-grid>
            <f7-grid>
                <f7-col>
                    <f7-card :title="this.$t('telemetry.sensor.title')" :content="this.sensor_footer" :footer="TypeSensor"></f7-card>
                </f7-col>
            </f7-grid>
        </div>
        <f7-grid no-gutter>
            <f7-col>
                <f7-card :title="this.$t('telemetry.speed.title')" :content="Speed" :footer="AvgSpeed"></f7-card>
            </f7-col>
            <f7-col>
                <f7-card :title="this.$t('telemetry.odo.title')" :content="Odo" :footer="Remains"></f7-card>
            </f7-col>
        </f7-grid>
        <f7-grid no-gutter>
            <f7-col>
                <f7-card :title="this.$t('telemetry.pump.title')" :content="Non"></f7-card>
            </f7-col>
            <f7-col>
                <f7-card :title="this.$t('telemetry.volt.title')" :content="Voltage"></f7-card>
            </f7-col>
        </f7-grid>

    </div>

<!--Mode = 2-->
    <div v-if="flagTime">
        <f7-grid no-gutter>
            <f7-col>
                <f7-card :title="this.$t('telemetry.mode.title')" :content="mode" :footer="NamePreset"></f7-card>
            </f7-col>
            <f7-col>
                <f7-card :title="this.$t('telemetry.sensor.title')" :content="this.sensor_footer" :footer="TypeSensor">
                    <!--<f7-card-footer></f7-card-footer>-->
                </f7-card>
            </f7-col>
        </f7-grid>
        <f7-grid no-gutter>
            <f7-col>
                <f7-card :title="this.$t('telemetry.pump.title')" :content="Non"></f7-card>
            </f7-col>
            <f7-col>
                <f7-card :title="this.$t('telemetry.volt.title')" :content="Voltage"></f7-card>
            </f7-col>
        </f7-grid>
    </div>

<!--Mode = 3-->
    <div v-if="flagMan">
        <f7-grid no-gutter>
            <f7-col>
                <f7-card :title="this.$t('telemetry.mode.title')" :content="mode" :footer="NamePreset"></f7-card>
            </f7-col>
            <f7-col>
                <f7-card :title="this.$t('telemetry.sensor.title')" :content="TypeSensor">
                    <!--<f7-card-footer>{{sensor_footer}}</f7-card-footer>-->
                </f7-card>
            </f7-col>
        </f7-grid>
        <f7-grid no-gutter>
            <f7-col>
                <f7-card :title="this.$t('telemetry.pump.title')" :content="Non"></f7-card>
            </f7-col>
            <f7-col>
                <f7-card :title="this.$t('telemetry.volt.title')" :content="Voltage"></f7-card>
            </f7-col>
        </f7-grid>
    </div>
</f7-page>
</template>

<script>
    
    
export default {
    data () {
        return {
            interval: null,
            sensor_footer: null,
            mode: null,
        }
    },
    
    created: function () {
        this.fetchParams();
    },
    computed: {
        NamePreset: function () {
            let nm = null;
            switch (this.$store.state.modejson.mode) {
                case 1:
                    this.mode = this.$i18n.translate('mode.trip.title').toUpperCase();
                    break;
                case 2:
                    this.mode = this.$i18n.translate('mode.time.title').toUpperCase();;
                    break;
                case 3:
                    this.mode = this.$i18n.translate('mode.manual.title').toUpperCase();;
                    break;                    
            }  
            switch (this.$store.state.params.preset) {
                case 0: 
                    return this.$i18n.translate('settings.presets.city');
                    break;
                case 1:
                    return this.$i18n.translate('settings.presets.way');
                    break;
            }
        },
        Speed: function () {
            return this.$store.state.params.speed + this.$i18n.translate('telemetry.speed.unit');
        },
        AvgSpeed: function () {
            return this.$store.state.params.avgspeed + this.$i18n.translate('telemetry.speed.unitavg');
        },
        Odo: function () {
            return Number(this.$store.state.params.odo / 1000).toFixed(1) + this.$i18n.translate('telemetry.odo.unit1');
        },
        Voltage: function () {
            debug.info(this.$store.state.params.voltage)
            var volt = this.$store.state.params.voltage;// + this.$store.state.config.correctionADC;
            var tmp = (volt) / 1024;
            if (tmp < 0) tmp = 0;
            tmp = tmp / this.$store.state.params.kvolt;
            tmp = 0.838*tmp + 0.354;
            return Number(tmp).toFixed(1) + this.$i18n.translate('telemetry.volt.unit');
        },
        Sp: function () {
            return this.$store.state.params.sp + '';
        },
        Imp: function () {
            return this.$store.state.params.imp + '';
        },
        Non: function () {
            return this.$store.state.params.non + '';
        },
        Remains: function() {
            let imp = this.$store.state.params.imp;
            let sensor = this.$store.state.config.trip.sensor.imp;
            let lwhl = this.$store.state.config.trip.wheel.lenght;
            return Number(((imp*lwhl)/sensor)/1000).toFixed(0) + this.$i18n.translate('telemetry.odo.unit2');  
        },
        flag1: function() {
            return (this.$store.state.params.mode === 0) && (this.$store.state.config.gnss)
        },
        flagTrip: function() {
            return (this.$store.state.params.mode === 1)
        },
        flagTime: function() {
            return this.$store.state.params.mode === 2
        },    
        flagMan: function() {
            return this.$store.state.params.mode === 3
        },         
        TypeSensor: function () {
            if (this.flagTrip) {
                if (this.$store.state.config.trip.sensor.gnss) {
                    let lat = this.$store.state.params.lat;
                    let lon = this.$store.state.params.lon;
                    if (lat < 0) lat = "S" + lat;
                    if (lon < 0) lon = "W" + lon;
                    this.sensor_footer = lat + ", " + lon;
                     return this.$i18n.translate('settings.sensor.gnss');
                }
                else {
                    this.sensor_footer = this.$store.state.params.imp;
                    return this.$i18n.translate('settings.sensor.impulse');
                }
                    
            }
            if (this.flagTime) {
/*                    this.sensor_footer = this.$store.state.config.time.presets[0].dp_time + " сек";*/
                
                
                var myDate = new Date(0, 0, 0);
                myDate.setMilliseconds(this.$store.state.params.time);
                myDate = myDate.toTimeString().replace(/.*(\d{2}:\d{2}).*/, "$1");

                    this.sensor_footer = myDate;
/*                        min.toFixed(0,2) + ":" + (this.$store.state.params.time/1000).toFixed(0) + " сек";*/
                    return this.$i18n.translate('mode.time.title'); 
            }
            if (this.flagMan) {
                 return this.$i18n.translate('telemetry.manual.button');    
            }
                    
    },

    },
    
    methods: {
        fetchParams: function () {
            this.interval = setInterval(() => {
                this.$store.state.connection.send(JSON.stringify({cmd: "telemetry"}));    
            }, 1000);
        },
    },    
    beforeDestroy: function () {
        clearInterval(this.interval);
    }
}
</script>