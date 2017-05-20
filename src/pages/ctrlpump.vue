<template>
<f7-page>
    <f7-navbar title="Управление насосом" back-link="Back" sliding v-on:back-click="back"></f7-navbar>
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
                    dpms: 50, dpdp: 800,
                    state: 0,
                    dir: direction.OUT
                },
                dirname: direction,

            }
        },
        components: {
        },
        created: function() {
                var self = this;
                this.axios.get('http://'+self.$root.uri+'/work', {
                    params: {state: 2} // SETTINGS
                }, {timeout: 1000}).then(
                    (response) => {})
                .catch(
                (response) => {
                    self.connection = false;
                })              
        },
        methods: {
            send: function() {
                var self = this;
                this.axios.get('http://'+self.$root.uri+'/pump', {params:{
                    state: self.pump.state,
                    dpms: self.pump.dpms,
                    dpdp: self.pump.dpdp,
                    dir: self.pump.dir
                }}, {timeout: 1000}).then(
                    (response) => {})
                .catch(
                (response) => {
                    self.connection = false;
                })                
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
            back: function () {
                var self = this;
                this.axios.get('http://'+self.$root.uri+'/work', {params: {state: 0 /* AUTOMATIC*/}}, {timeout: 1000}).then(
                    (response) => {})
                .catch(
                (response) => {
                    self.connection = false;
                })               
            }
        },
    }
</script>

<style>
    
</style>