<template>
<f7-page>
    <f7-navbar title="Управление насосом" back-link="Back" sliding ></f7-navbar>
    <f7-list media-list>
        <f7-list-item title="Насос" after="<i class='icon icon-pump'>">

            <!--            <div slot="root" class='icon icon-meter'></div>-->
            <div slot="inner">
                <div style="margin-top: 6px">
                    <f7-label class="labelin">Время вкл.</f7-label>
                    <f7-input type="number" :value="pump.dpms" v-model.number="pump.dpms" placeholder="Введите время импульса насоса (1/1000 сек)"></f7-input>
                    <f7-label class="labelin">Время выкл.</f7-label>
                    <f7-input type="number" :value="pump.dpdp" v-model.number="pump.dpdp" placeholder="Время между импульсами (1/1000 сек)"></f7-input>
                </div>
            </div>
            <f7-grid>
                <f7-col width="50">
                    <p>
                        <f7-button big fill v-on:click="on">Старт</f7-button>
                    </p>
                </f7-col>
                <f7-col width="50">
                    <p>
                        <f7-button big fill v-on:click="off">Стоп</f7-button>
                    </p>
                </f7-col>
                <f7-col width="100">
                    <p>
                        <f7-button fill v-on:click="reverse">Реверс ({{dirname.properites[pump.dir].name}})</f7-button>
                    </p>
                </f7-col>
            </f7-grid>
        </f7-list-item>
    </f7-list>
</f7-page>
</template>

<script>
 
    var direction = {
                    OUT: 0,
                    IN: 1,
                    properites: {
                        0: {name: 'OUT'},
                        1: {name: 'IN'}
                    }
                };
    
    export default {
        data () {
            return {
                pump: {
                    dpms: 150, dpdp: 800,
                    state: 0,
                    dir: direction.OUT
                },
                dirname: direction,

            }
        },
        components: {
        },
        created: function() {
                this.$store.state.connection.send(JSON.stringify({get: "work", p: [2]}));    
        },
        methods: {
            send: function() {
                this.$store.state.connection.send(JSON.stringify({...this.pump, get: "pump"}));     
            },
            on: function() {
                this.pump.state = 1;
                this.send();
            },
            off: function() {
                this.pump.state = 0;
                this.send();
            },
            reverse: function() {
                if (this.pump.dir === direction.OUT)
                    this.pump.dir = direction.IN;
                else
                    this.pump.dir = direction.OUT;
                this.send();
            },
/*            back: function () {
                this.$store.state.connection.send(JSON.stringify({get: "work", p: [0]}));           
            }*/
        },
        beforeDestroy: function() {
            this.$store.state.connection.send(JSON.stringify({get: "work", p: [0]}));                     
        },        
    }
</script>

<style>
    
</style>