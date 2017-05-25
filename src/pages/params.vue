<template>
<f7-page>
    <f7-navbar title="Параметры" back-link="Back" sliding></f7-navbar>
    <f7-grid no-gutter>
        <f7-col>
            <f7-card title="Режим" :content="NamePreset"></f7-card>
        </f7-col>
    </f7-grid>
    <f7-grid no-gutter>
        <f7-col>
            <f7-card title="Скорость" :content="Speed"></f7-card>
        </f7-col>
        <f7-col>
            <f7-card title="Ср. скорость" :content="AvgSpeed"></f7-card>
        </f7-col>

    </f7-grid>
    <f7-grid no-gutter>
        <f7-col>
            <f7-card title="Одометр" :content="Odo"></f7-card>
        </f7-col>
        <f7-col>
            <f7-card title="Датчик 1" :content="Imp"></f7-card>
        </f7-col>
    </f7-grid>
    <f7-grid no-gutter>

        <f7-col>
            <f7-card title="Насос" :content="Non"></f7-card>
        </f7-col>
        <f7-col>
            <f7-card title="напряжение" :content="Voltage"></f7-card>
        </f7-col>
    </f7-grid>
</f7-page>
</template>

<script>
export default {
    data () {
        return {
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
            interval: null,
        }
    },
    
    created: function () {
        this.fetchParams();
    },
    
    computed: {
        NamePreset: function () {
            switch (this.params.preset) {
                case 0: 
                    return 'Город';
                    break;
                case 1:
                    return 'Трасса';
                    break;
            }
        },
        Speed: function () {
            return this.params.speed + " км/ч";
        },
        AvgSpeed: function () {
            return this.params.avgspeed + " км/ч";
        },
        Odo: function () {
            return Number(this.params.odo / 1000).toFixed(1) + " км";
        },
        Voltage: function () {
            var tmp = this.params.voltage / 1023;
            tmp = tmp / this.params.kvolt;
            return Number(tmp).toFixed(1) + " В";
        },
        Sp: function () {
            return this.params.sp + '';
        },
        Imp: function () {
            return this.params.imp + '';
        },
        Non: function () {
            return this.params.non + '';
        }
    },
    
    methods: {
        fetchParams: function () {
            var self = this;
            this.interval = setInterval(() => {
                this.axios.get('http://'+self.$root.uri+'/paramxml', {timeout: 2000})
                    .then(
                        (response) => {
                            if (response.status === 200) {
                                self.params = response.data;
                                self.$root.connection = true;
                            }
                    })
                    .catch(
                        (response) => {})
            }, 750);
        },
    },    
    beforeDestroy: function () {
        clearInterval(this.interval);
    }
}
</script>