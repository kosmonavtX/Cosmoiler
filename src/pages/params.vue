<template>
<f7-page>
    <f7-navbar title="Телеметрия" back-link="Back" sliding></f7-navbar>
    <f7-grid no-gutter v-if="this.$store.state.modejson.mode !== 0">
        <f7-col>
            <f7-card title="Режим" :content="mode" :footer="NamePreset"></f7-card>
        </f7-col>
        <f7-col>
            <f7-card title="Датчик" :content="TypeSensor">
                <f7-card-footer>{{sensor_footer}}</f7-card-footer>
            </f7-card>
        </f7-col>
    </f7-grid>
    <f7-grid no-gutter v-if="this.$store.state.modejson.mode === 1">
        <f7-col>
            <f7-card title="Скорость" :content="Speed" :footer="AvgSpeed"></f7-card>
        </f7-col>
        <f7-col>
            <f7-card title="Одометр" :content="Odo" footer="remains м"></f7-card>
        </f7-col>

    </f7-grid>
    <f7-grid no-gutter v-if="this.$store.state.modejson.mode === 1">



        <f7-col>
            <f7-card title="Насос" :content="Non">
<!--                <f7-card-footer>
                    <f7-button raised fill color="red">Сброс</f7-button>
                </f7-card-footer>-->

            </f7-card>

        </f7-col>
        <f7-col>
            <f7-card title="напряжение" :content="Voltage"></f7-card>
        </f7-col>
    </f7-grid>
    <f7-grid no-gutter>


    </f7-grid>
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
                    this.mode = 'ПО ПРОБЕГУ';
                    break;
                case 2:
                    this.mode = 'ПО ВРЕМЕНИ';
                    break;
                case 3:
                    this.mode = 'РУЧНОЕ';
                    break;                    
            }  
            switch (this.$store.state.params.preset) {
                case 0: 
                    return 'Город';
                    break;
                case 1:
                    return 'Трасса';
                    break;
            }
        },
        Speed: function () {
            return this.$store.state.params.speed + " км/ч";
        },
        AvgSpeed: function () {
            return this.$store.state.params.avgspeed + " км/ч";
        },
        Odo: function () {
            return Number(this.$store.state.params.odo / 1000).toFixed(1) + " км";
        },
        Voltage: function () {
            console.info(this.$store.state.params.voltage)
            var tmp = (this.$store.state.params.voltage) / 1024;
            if (tmp < 0) tmp = 0;
            tmp = tmp / this.$store.state.params.kvolt;
            return Number(tmp).toFixed(2) + " В";
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
        TypeSensor: function () {
            if (this.$store.state.config.trip.sensor.gps === true)
            {
                this.sensor_footer = this.$store.state.params.lat + "d " +                         this.$store.state.params.lon;
                return "ГНСС";
            }
            else {
                this.sensor_footer = this.$store.state.params.imp;
                if (this.$store.state.modejson.mode === 2)
                {
                    this.sensor_footer = this.$store.state.config.time.presets[0].dp_time + " сек";
                    return "Таймер"       
                }
                 
                else
                    return "Импульсный"
            }
        },
    },
    
    methods: {
        fetchParams: function () {
            this.interval = setInterval(() => {
                this.$store.state.connection.send(JSON.stringify({get: "telemetry"}));    
            }, 750);
        },
    },    
    beforeDestroy: function () {
        clearInterval(this.interval);
    }
}
</script>