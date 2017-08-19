<template>
<!-- App -->
<div id="app">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Right Panel -->
    <f7-panel right cover layout="dark">
        <f7-view id="right-panel-view" navbar-through :dynamic-navbar="true">
            <f7-navbar v-if="$theme.ios" sliding></f7-navbar>
            <f7-pages>
                <f7-page>
                    <f7-navbar v-if="$theme.material" sliding></f7-navbar>
                    <f7-list>
                        <f7-list-item link="/params/" link-view="#main-view"  title="Параметры" link-close-panel></f7-list-item>
                        <f7-list-item link="/ctrlpump/" link-view="#main-view" link-close-panel title="Управление насосом"></f7-list-item>
                        <f7-list-item link="/system/" link-view="#main-view"  title="Система" link-close-panel></f7-list-item>
  
                        <f7-list-item link="/about/" title="О Cosmoiler"></f7-list-item>
                    </f7-list>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-panel>

    <!-- Main Views -->
    <f7-views>
        <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
            <!-- iOS Theme Navbar -->
            <f7-navbar v-if="$theme.ios">
                <f7-nav-left>
                    <f7-link icon="icon-bars" open-panel="left"></f7-link>
                </f7-nav-left>
                <f7-nav-center sliding>CosmOiler</f7-nav-center>
                <f7-nav-right>
                    <f7-link icon="icon-bars" open-panel="right"></f7-link>
                </f7-nav-right>
            </f7-navbar>
            <!-- Pages -->
            <f7-pages>
                <f7-page>
                    <!-- Material Theme Navbar -->
                    <f7-navbar v-if="$theme.material">
                        <f7-nav-left>
                            <f7-link icon="icon-cosmoiler-logo_pict_font2" icon-size="32px"></f7-link>
                        </f7-nav-left>
                        <f7-nav-center sliding>CosmOiler</f7-nav-center>
                        <f7-nav-right v-if=this.$store.state.connect>
                            <f7-link icon="icon-bars" open-panel="right"></f7-link>
                        </f7-nav-right>
                    </f7-navbar>

                    
                    <!--              <f7-chip v-if="connection" text="Connected" bg="green" color="white"></f7-chip>
              <f7-chip v-else text="Нет связи с блоком управления" bg="red"></f7-chip>-->
                    <!-- Page Content -->
                   <!-- <div v-if="connection">-->
                    <div v-if=this.$store.state.connect>
                        <!--                     <f7-grid>
                            <f7-col width="100">
                                <f7-chip text="ПОДКЛЮЧЕНО!" bg="green" color="white"></f7-chip>
                            </f7-col>
                        </f7-grid> -->
                        
<!--<f7-button v-on:click="test">Test</f7-button>-->
                        
                        <f7-block-title>Выберите режим работы {{asd}} </f7-block-title>
                        <f7-list media-list>
                            <f7-list-item swipeout title="По пробегу..." media="<i class='icon icon-meter'></i>" link="#" :badge="badgeName1" badge-color="green" subtitle="Смазывать через заданное расстояние...">
                            <f7-swipeout-actions>
                                <f7-swipeout-button close color="purple" id="trip" v-on:click="ctrlMode($event)">{{messonoff[0]}}</f7-swipeout-button>
                                <f7-swipeout-button href="/trip/" color="teal">Настройки</f7-swipeout-button>     
                            </f7-swipeout-actions>
                            </f7-list-item>
                            <f7-list-item swipeout title="По времени..." media="<i class='icon icon-time'></i>" link="#" :badge="badgeName2" badge-color="green" subtitle="Смазывать через заданное время...">
                            <f7-swipeout-actions>
                                <f7-swipeout-button close color="purple" id="time" v-on:click="ctrlMode($event)">{{messonoff[1]}}</f7-swipeout-button>
                                <f7-swipeout-button href="/time/" color="teal">Настройки</f7-swipeout-button>
                            </f7-swipeout-actions>
                            </f7-list-item>
                            <f7-list-item swipeout title="Вручную..." media="<i class='icon icon-right-hand'></i>" link="#" :badge="badgeName3" badge-color="green" subtitle="Смазывать вручную...">
                            <f7-swipeout-actions>
                                <f7-swipeout-button close color="purple" id="manual" v-on:click="ctrlMode($event)">{{messonoff[2]}}</f7-swipeout-button>
                                <f7-swipeout-button href="/manual/" color="teal">Настройки</f7-swipeout-button>
                            </f7-swipeout-actions>                                 
                            </f7-list-item>                         
                            <f7-list-item v-if="false" swipeout title="Прокачка..." media="<i class='icon icon-repeat'></i>" link="#" :badge="badgeName4" badge-color="green" subtitle="Прокачать систему...">
                                <f7-swipeout-actions>
                                    <f7-swipeout-button close color="purple" id="pumping" v-on:click="ctrlMode($event)">{{messonoff[3]}}</f7-swipeout-button>
                                </f7-swipeout-actions>
                            </f7-list-item>
                        </f7-list>
                    </div>
                    <div class="preload" v-else=this.$store.state.connect>
                        <f7-grid>
                            <f7-col width="100">
                                <p>Подключение к Cosmoiler... {{asd}} </p>
                            </f7-col>
                            <f7-col width="100">
                                <f7-preloader color="blue" size="40px"></f7-preloader>
                            </f7-col>
                        </f7-grid>
                    </div>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-views>

    <!-- Popup -->
<!--    <f7-popup id="popup">
        <f7-view navbar-fixed>
            <f7-pages>
                <f7-page>
                    <f7-navbar title="Popup">
                        <f7-nav-right>
                            <f7-link close-popup>Close</f7-link>
                        </f7-nav-right>
                    </f7-navbar>
                    <f7-block>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, architecto. Cupiditate laudantium rem nesciunt numquam, ipsam. Voluptates omnis, a inventore atque ratione aliquam. Omnis iusto nemo quos ullam obcaecati, quod.</f7-block>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-popup>-->

    <!-- Login Screen -->
<!--    <f7-login-screen id="login-screen">
        <f7-view>
            <f7-pages>
                <f7-page login-screen>
                    <f7-login-screen-title>Login</f7-login-screen-title>
                    <f7-list form>
                        <f7-list-item>
                            <f7-label>Username</f7-label>
                            <f7-input name="username" placeholder="Username" type="text"></f7-input>
                        </f7-list-item>
                        <f7-list-item>
                            <f7-label>Password</f7-label>
                            <f7-input name="password" type="password" placeholder="Password"></f7-input>
                        </f7-list-item>
                    </f7-list>
                    <f7-list>
                        <f7-list-button title="Sign In" close-login-screen></f7-list-button>
                        <f7-list-label>
                            <p>Click Sign In to close Login Screen</p>
                        </f7-list-label>
                    </f7-list>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-login-screen>-->

</div>
</template>

<script>
    export default {
        data: function() {
            return {
                messonoff: ['','','',''],
                asd: document.location.host
            }
        },
        computed: {

            badgeName1: function() { // trip
                if (this.$store.state.modejson.mode == 1) {
                    this.messonoff[0] = 'ВЫКЛ';
                    return "ВКЛЮЧЕНО";
                }
                else {
                    this.messonoff[0] = 'ВКЛ';
                    return "";
                }
            },
            badgeName2: function() { // time
                if (this.$store.state.modejson.mode == 2) {
                    this.messonoff[1] = 'ВЫКЛ';
                    return "ВКЛЮЧЕНО";
                }
                else {
                    this.messonoff[1] = 'ВКЛ';
                    return "";
                }
            },
            badgeName3: function() { // manual
                if (this.$store.state.modejson.mode == 3) {
                    this.messonoff[2] = 'ВЫКЛ';
                    return "ВКЛЮЧЕНО";
                }
                else {
                    this.messonoff[2] = 'ВКЛ';
                    return "";
                }
            },
            badgeName4: function() { // pumping
                if (this.$store.state.modejson.mode == 4) {
                    this.messonoff[3] = 'ВЫКЛ';
                    return "ВКЛЮЧЕНО";
                }
                else {
                    this.messonoff[3] = 'ВКЛ';
                    return ""
                }
            },
        },
        methods: {
/*            Управление режимами*/
            ctrlMode: function(event) {
                console.log(this.$store.state.modejson.mode);
                if (this.$store.state.modejson.mode != null) {
                        switch(event.currentTarget.id) {
                                case 'trip': 
                                    if (this.$store.state.modejson.mode === 1)
                                        this.$store.dispatch('changeMode', {mode:0})
                                    else
                                        this.$store.dispatch('changeMode', {mode:1})
                                    break;
                                case 'time': 
                                    if (this.$store.state.modejson.mode === 2)
                                        this.$store.dispatch('changeMode', {mode:0})
                                    else
                                        this.$store.dispatch('changeMode', {mode:2})
                                    break;
                                case 'manual':
                                    if (this.$store.state.modejson.mode === 3)
                                        this.$store.dispatch('changeMode', {mode:0})
                                    else
                                        this.$store.dispatch('changeMode', {mode:3})                       
                                    break;
                                case 'pumping':
                                    if (this.$store.state.modejson.mode === 4)
                                        this.$store.dispatch('changeMode', {mode:0})
                                    else
                                        this.$store.dispatch('changeMode', {mode:4})
                                    break;
                        };
                }
            },
    }
    }

</script>
