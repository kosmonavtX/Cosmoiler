<template>
    <f7-page>
        <f7-navbar :title="this.$t('menu.telemetry')" back-link="Back" sliding></f7-navbar>

        <div v-if=this.$store.state.connect>
            <!--Mode = 0 and GNSS = true-->
  <!--           <div v-if="flag1">
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
            </div> -->

            <!--Mode = 1-->
            <div v-if="TRIP_MODE">
                <!--Импульсный-->
               <!--  <div v-if="fTRIPIMP"> -->
                <div v-if="TRIP_IMP">
                    <f7-grid no-gutter>
                        <f7-col>
                            <f7-card :title="this.$t('telemetry.mode.title')" :content="nameMode" :footer="namePreset">
                            </f7-card>
                        </f7-col>
                        <f7-col>
                            <f7-card :title="this.$t('telemetry.sensor.title')" :content="IMP_sensor_content" :footer="this.$i18n.translate('settings.sensor.impulse')"></f7-card>
                        </f7-col>
                    </f7-grid>
                </div>
                <!-- GNSS -->
                <div v-if="TRIP_GPSFIX && !TRIP_IMP">
                    <f7-grid no-gutter>
                        <!--                     РЕЖИМ -->
                        <f7-col>
                            <f7-card :title="this.$t('telemetry.mode.title')" :content="nameMode" :footer="namePreset">
                            </f7-card>
                        </f7-col>
                    </f7-grid>
                    <f7-grid>
                        <!--                     ДАТЧИК -->
                        <f7-col>
                            <f7-card :title="this.$t('telemetry.sensor.title')" :content="GPS_sensor_content"
                                :footer="this.$t('telemetry.sensorGNSS.footer')"></f7-card>
                        </f7-col>
                    </f7-grid>
                </div>
                <div>
                    <f7-grid no-gutter>
                        <!--                 СКОРОСТЬ -->
                        <f7-col>
                            <f7-card :title="this.$t('telemetry.speed.title')" :content="Speed" :footer="AvgSpeed">
                            </f7-card>
                        </f7-col>
                        <!--                 ОДОМЕТР -->
                        <f7-col>
                            <f7-card :title="this.$t('telemetry.odo.title')" :content="Odo" :footer="RemainsGNSS">
                            </f7-card>
                        </f7-col>
                    </f7-grid>
                    <f7-grid no-gutter>
                        <!--                 НАСОС -->
                        <f7-col>
                            <f7-card :title="this.$t('telemetry.pump.title')" :content="Non"></f7-card>
                        </f7-col>
                        <!--                 НАПРЯЖЕНИЕ -->
                        <f7-col>
                            <f7-card :title="this.$t('telemetry.volt.title')" :content="Voltage"></f7-card>
                        </f7-col>
                    </f7-grid>
                </div>

            </div>

            <!--Mode = 2-->
            <div v-show="TIMER_MODE">
                <f7-grid no-gutter>
                    <f7-col>
                        <f7-card :title="this.$t('telemetry.mode.title')" :content="nameMode" :footer="namePreset">
                        </f7-card>
                    </f7-col>
                    <f7-col>
                        <f7-card :title="this.$t('telemetry.sensor.title')" :content="TIMER_sensor_content"
                            :footer="this.$i18n.translate('telemetry.sensor.time.footer')">
                            <!--<f7-card-footer></f7-card-footer>-->
                        </f7-card>
                    </f7-col>
                </f7-grid>
                    <f7-grid no-gutter>
                        <!--                 НАСОС -->
                        <f7-col>
                            <f7-card :title="this.$t('telemetry.pump.title')" :content="Non"></f7-card>
                        </f7-col>
                        <!--                 НАПРЯЖЕНИЕ -->
                        <f7-col>
                            <f7-card :title="this.$t('telemetry.volt.title')" :content="Voltage"></f7-card>
                        </f7-col>
                    </f7-grid>
            </div>

            <!--Mode = 3-->
         <!--    <div v-show="fMANUAL"> -->
            <div v-show="MANUAL_MODE">
                    <f7-grid no-gutter>
                        <f7-col>
                            <f7-card :title="this.$t('telemetry.mode.title')" :content="nameMode">
                            </f7-card>
                        </f7-col>
                        <f7-col>
                            <f7-card :title="this.$t('telemetry.sensor.title')" :content="this.$i18n.translate('telemetry.manual.button')" ></f7-card>
                        </f7-col>
                    </f7-grid>
                    <f7-grid no-gutter>
                        <!--                 НАСОС -->
                        <f7-col>
                            <f7-card :title="this.$t('telemetry.pump.title')" :content="Non"></f7-card>
                        </f7-col>
                        <!--                 НАПРЯЖЕНИЕ -->
                        <f7-col>
                            <f7-card :title="this.$t('telemetry.volt.title')" :content="Voltage"></f7-card>
                        </f7-col>
                    </f7-grid>
            </div>
            <!-- Выключено -->
            <div v-show="OFF_MODE">
                <div v-if="GPS_FIX">
                    <f7-grid>
                        <!--                     ДАТЧИК -->
                        <f7-col>
                            <f7-card :title="this.$t('telemetry.sensor.title')" :content="GPS_sensor_content"
                                :footer="this.$t('telemetry.sensorGNSS.footer')"></f7-card>
                        </f7-col>
                    </f7-grid>
                </div>
                    <f7-grid no-gutter>
                        <!--                 НАПРЯЖЕНИЕ -->
                        <f7-col>
                            <f7-card :title="this.$t('telemetry.volt.title')" :content="Voltage"></f7-card>
                        </f7-col>
                    </f7-grid>
            </div>
        </div>
    </f7-page>
</template>

<script>
/* import func from '../../vue-temp/vue-editor-bridge'; */
    export default {
        data() {
            return {
                interval: null,
               // sensor_footer: null,
                mode: null,
            }
        },

        created: function () {
            this.fetchParams();
        },
        computed: {
            nameMode: function () {
                switch (this.$store.state.params.mod) {
                    case 1:
                        return this.$i18n.translate('mode.trip.title').toUpperCase();
                    case 2:
                        return this.$i18n.translate('mode.time.title').toUpperCase();
                    case 3:
                        return this.$i18n.translate('mode.manual.title').toUpperCase();
                    case 5:
                        return this.$i18n.translate('mode.time.title').toUpperCase();

                }
            },
            namePreset: function () {
                switch (this.$store.state.params.preset) {
                    case 0:
                        return this.$i18n.translate('settings.presets.city');
                    case 1:
                        return this.$i18n.translate('settings.presets.way');
                    case 2:
                        return this.$i18n.translate('settings.presets.user');
                }
            },
            Speed: function () {
                return this.$store.state.params.speed + this.$i18n.translate('telemetry.speed.unit');
            },
            AvgSpeed: function () {
                return this.$store.state.params.avgspeed + this.$i18n.translate('telemetry.speed.unitavg');
            },
            Odo: function () {
                return Number(this.$store.state.params.odo / 1000).toFixed(1) + this.$i18n.translate(
                    'telemetry.odo.unit1');
            },
            Voltage: function () {
                debug.info(this.$store.state.params.voltage)
                var volt = this.$store.state.params.voltage; // + this.$store.state.config.correctionADC;
                var tmp = (volt) / 1024;
                if (tmp < 0) tmp = 0;
                tmp = tmp / this.$store.state.params.kvolt;
                tmp = 0.838 * tmp + 0.354;
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
            RemainsGNSS: function () {
                if (this.TRIP_IMP) {
                    let imp = this.$store.state.params.imp;
                    let sensor = this.$store.state.trip.trip.sensor.imp;
                    let lwhl = this.$store.state.trip.trip.wheel.lenght;
                    return Number(((imp * lwhl) / sensor) / 1000).toFixed(0) + this.$i18n.translate(
                        'telemetry.odo.unit2');
                }
                else
                    return this.$store.state.params.trip + this.$i18n.translate('telemetry.odo.unit2');
            },
            RemainsIMP: function () {
                /*   if (this.$store.state.trip.trip.sensor.gnss)
                      return this.$store.state.params.trip + this.$i18n.translate('telemetry.odo.unit2');
                  else */
                {

                }
            },
            TRIP_MODE: function () {
                return (this.$store.state.params.mod === 1)
            },
            TRIP_IMP: function() {
                return (!this.$store.state.trip.trip.sensor.gnss || !this.$store.state.gnssPresent)
            },
            TRIP_GPSFIX: function () {
                return (this.GPS_FIX && this.$store.state.trip.trip.sensor.gnss)
            },
            TIMER_MODE: function() {
                return ((this.$store.state.params.mod === 2) || (this.$store.state.params.mod === 5))
            },
            MANUAL_MODE: function() {
                return this.$store.state.params.mod === 3
            },
            OFF_MODE: function() {
                return this.$store.state.params.mod === 0
            },
            GPS_FIX: function() {
                return this.$store.state.params.fix
            },
            GPS_sensor_content: function () {
                let lat = parseFloat(this.$store.state.params.lat).toFixed(5);
                let lon = parseFloat(this.$store.state.params.lon).toFixed(5);
                if (lat < 0) lat = "S" + lat;
                else
                    lat = "N" + lat;
                if (lon < 0) lon = "W" + lon;
                else
                    lon = "E" + lon;
                // let txt = "Error";
                // if ((lat != 0) && (lon != 0))
                let txt = lat + ", " + lon;
                return txt;
            },
            IMP_sensor_content: function() {
                let txt = this.$store.state.params.imp;
                return txt;
            },
            TIMER_sensor_content: function() {
                    var myDate = new Date(0, 0, 0);
                   // debug.log(this.$store.state.params.time);
                   // debug.log(myDate);
                    myDate.setMilliseconds(this.$store.state.params.time);
                    myDate = myDate.toTimeString().replace(/.*(\d{2}:\d{2}).*/, "$1");
                    /*                        min.toFixed(0,2) + ":" + (this.$store.state.params.time/1000).toFixed(0) + " сек";*/
                    return myDate;
            },
            TypeSensor: function () {
                /*             if (this.flagTrip) {
                                //if (this.$store.state.trip.trip.sensor.gnss)
                                if (this.flagGNSSView) {
                                    let lat = parseFloat(this.$store.state.params.lat).toFixed(5);
                                    let lon = parseFloat(this.$store.state.params.lon).toFixed(5);
                                    if (lat < 0) lat = "S" + lat;
                                    else
                                        lat = "N" + lat;
                                    if (lon < 0) lon = "W" + lon;
                                    else
                                        lon = "E" + lon;
                                    this.sensor_footer = lat + ", " + lon;
                                     return this.$i18n.translate('settings.sensor.gnss');
                                }
                                else */
/*                 {
                    this.sensor_footer = this.$store.state.params.imp;
                    return this.$i18n.translate('settings.sensor.impulse');
                } */

                // }
                if (this.flagTime) {
                    /*                    this.sensor_footer = this.$store.state.config.time.presets[0].dp_time + " сек";*/



                }
                if (this.flagMan) {
                    return this.$i18n.translate('telemetry.manual.button');
                }

            },

        },

        methods: {
            fetchParams: function () {
                this.interval = setInterval(() => {
                    this.$store.state.connection.send(JSON.stringify({
                        cmd: "telemetry"
                    }));
                }, 1000);
            },
        },
        beforeDestroy: function () {
            clearInterval(this.interval);
        },
/*         befireCreated: function() {
            this.fetchParams();
        } */
    }
</script>
