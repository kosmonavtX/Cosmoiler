<template>
<f7-page>
    <f7-navbar title="Управление насосом" back-link="Back" sliding ></f7-navbar>
    <f7-list media-list>
        
                            <f7-card>
                    <f7-card-header>
                        <div class="item-media">
                            <i :style="{'font-size': sizeIconPump+'px'}" class='icon icon-pump'></i>
                            <p class="text-icon">Насос</p>
                        </div>
                    </f7-card-header>
                    <f7-card-content>

                   <div :style="stylediv">

                    <f7-label class="labelin">Время вкл: {{pump.dpms}} мсек</f7-label>
                    <f7-input 
                              color="green"
                                          type="range" 
                                          min="100" max="1000" step="10" 
                                          v-model="pump.dpms">
                    </f7-input>
                    <f7-label class="labelin">Время выкл: {{pump.dpdp}} мсек</f7-label>
                    <f7-input 
                              color="red"
                                          type="range" 
                                          :min="50" :max="2000" step="10" 
                              :value="pump.dpdp"
                                          v-model="pump.dpdp">
                    </f7-input>
                    
                </div>                     
                        
                        
                     <f7-grid>
                <f7-col width="50">
                    <p>
                        <f7-button big raised color="green" fill v-on:click="on">Старт</f7-button>
                    </p>
                </f7-col>
                <f7-col width="50">
                    <p>
                        <f7-button big raised color="red" fill v-on:click="off">Стоп</f7-button>
                    </p>
                </f7-col>
                <f7-col width="100">
                    <p>
                        <f7-button raised fill color="gray" v-on:click="reverse">Реверс ({{dirname.properites[pump.dir].name}})</f7-button>
                    </p>
                </f7-col>
            </f7-grid>               
                        
                    </f7-card-content>
                </f7-card>
            
<!--        <f7-list-item title="Насос" after="<i class='icon icon-pump'>">-->

            <!--            <div slot="root" class='icon icon-meter'></div>-->
<!--            <div slot="inner">
                <div :style="stylediv">

                    <f7-label class="labelin">Время вкл: {{pump.dpms}} мсек</f7-label>
                    <f7-input 
                                          type="range" 
                                          min="100" max="1000" step="10" 
                                          v-model="pump.dpms">
                    </f7-input>
                    <f7-label class="labelin">Время выкл: {{pump.dpdp}} мсек</f7-label>
                    <f7-input 
                                          type="range" 
                                          :min="50" :max="2000" step="10" 
                              :value="pump.dpdp"
                                          v-model="pump.dpdp">
                    </f7-input>
                    
                </div>
            </div>
            <f7-grid>
                <f7-col width="50">
                    <p>
                        <f7-button big raised fill v-on:click="on">Старт</f7-button>
                    </p>
                </f7-col>
                <f7-col width="50">
                    <p>
                        <f7-button big raised fill v-on:click="off">Стоп</f7-button>
                    </p>
                </f7-col>
                <f7-col width="100">
                    <p>
                        <f7-button raised fill v-on:click="reverse">Реверс ({{dirname.properites[pump.dir].name}})</f7-button>
                    </p>
                </f7-col>
            </f7-grid>-->
        <!--</f7-list-item>-->
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
                    dpms: 500, dpdp: 500,
                    state: 0,
                    dir: direction.OUT
                },
                dirname: direction,
                stylediv: 'margin-top: 6px', 
                sizeIconPump: 40,
            }
        },
        created: function() {
                this.$store.state.connection.send(JSON.stringify({cmd: "work", param: 2}))   
        },
        methods: {
            send: function() {
                this.$store.state.connection.send(JSON.stringify({cmd: "pump", param: [this.pump.state, this.pump.dpms, this.pump.dpdp, this.pump.dir]}));     
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
            this.$store.state.connection.send(JSON.stringify({cmd: "work", param: 0}));                     
        },        
    }
</script>

<style>
    
</style>