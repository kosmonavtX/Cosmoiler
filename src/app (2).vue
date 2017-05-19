<template>
<!-- App -->
<div id="app">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Left Panel -->
    <f7-panel left reveal layout="dark">
        <f7-view id="left-panel-view" navbar-through :dynamic-navbar="true">
            <f7-navbar v-if="$theme.ios" title="Left Panel" sliding></f7-navbar>
            <f7-pages>
                <f7-page>
                    <f7-navbar v-if="$theme.material" title="Left Panel" sliding></f7-navbar>
                    <f7-block inner>
                        <p>Left panel content goes here</p>
                    </f7-block>
                    <f7-block-title>Load page in panel</f7-block-title>
                    <f7-list>
                        <f7-list-item link="/about/" title="About"></f7-list-item>
                        <f7-list-item link="/form/" title="Form"></f7-list-item>
                    </f7-list>
                    <f7-block-title>Load page in main view</f7-block-title>
                    <f7-list>
                        <f7-list-item link="/about/" title="About" link-view="#main-view" link-close-panel></f7-list-item>
                        <f7-list-item link="/form/" title="Form" link-view="#main-view" link-close-panel></f7-list-item>
                    </f7-list>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-panel>

    <!-- Right Panel -->
    <f7-panel right cover layout="dark">
        <f7-view id="right-panel-view" navbar-through :dynamic-navbar="true">
            <f7-navbar v-if="$theme.ios" title="Right Panel" sliding></f7-navbar>
            <f7-pages>
                <f7-page>
                    <f7-navbar v-if="$theme.material" title="Right Panel" sliding></f7-navbar>
                    <f7-block>
                        <p>Right panel content goes here</p>
                    </f7-block>
                    <f7-block-title>Load page in panel</f7-block-title>
                    <f7-list>
                        <f7-list-item link="/about/" title="About"></f7-list-item>
                        <f7-list-item link="/form/" title="Form"></f7-list-item>
                    </f7-list>
                    <f7-block-title>Load page in main view</f7-block-title>
                    <f7-list>
                        <f7-list-item link="/about/" title="About" link-view="#main-view" link-close-panel></f7-list-item>
                        <f7-list-item link="/form/" title="Form" link-view="#main-view" link-close-panel></f7-list-item>
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
                <f7-nav-center sliding>Framework7</f7-nav-center>
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
                            <f7-link icon="icon-logo-pict" icon-size="32px"></f7-link>
                        </f7-nav-left>
                        <f7-nav-center sliding>CosmOiler</f7-nav-center>
                        <f7-nav-right>
                            <f7-link icon="icon-bars" open-panel="right"></f7-link>
                        </f7-nav-right>
                    </f7-navbar>


                    <!--              <f7-chip v-if="connection" text="Connected" bg="green" color="white"></f7-chip>
              <f7-chip v-else text="Нет связи с блоком управления" bg="red"></f7-chip>-->

                    <!-- Page Content -->
                    <div v-if="true">
   <!--                     <f7-grid>
                            <f7-col width="100">
                                <f7-chip text="ПОДКЛЮЧЕНО!" bg="green" color="white"></f7-chip>
                            </f7-col>
                        </f7-grid> -->                      
                        
                        <f7-block-title>Выберите режим работы</f7-block-title>
                        <f7-list media-list>
                            <f7-list-item title="По пробегу..." media="<i class='icon icon-meter'></i>" link="/trip/" :badge="badgeName0" badge-color="green" subtitle="Смазывать через заданное расстояние...">
                            </f7-list-item>
                            <f7-list-item title="По времени..." media="<i class='icon icon-time'></i>" link="/time/" :badge="badgeName1" badge-color="green" subtitle="Смазывать через заданное расстояние...">
                            </f7-list-item>
                            <f7-list-item title="Вручную..." media="<i class='icon icon-right-hand'></i>" link="/manual/" :badge="badgeName2" badge-color="green" subtitle="Смазывать через заданное расстояние...">
                            </f7-list-item>
                            <f7-list-item title="Прокачка..." media="<i class='icon icon-repeat'></i>" link="/form/" :badge="badgeName3" badge-color="green" subtitle="Смазывать через заданное расстояние...">
                            </f7-list-item>
                        </f7-list>
                        <f7-button fill v-on:click="send">Button Fill</f7-button>
                    </div>
                    <div class="preload" v-else="connection">
                        <f7-grid>
                            <f7-col width="100">
                                <p>Подключение к Cosmoiler...</p>
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
    <f7-popup id="popup">
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
    </f7-popup>

    <!-- Login Screen -->
    <f7-login-screen id="login-screen">
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
    </f7-login-screen>

</div>
</template>

<script>
    //import VueWebsocket from "vue-websocket"

    // var modes;

    export default {

        //  var modes;
    
        data: function() {
            return {
                modes: {
                    mode: null
                },
                connection: this.$root.connection,
/*                connection: {
                    type: Boolean,
                    default: false
                },*/
                //uri: {debug: '192.168.1.233', work: document.location.host }
            }
        },
        created: function() {
            console.log('app cteated');
            console.log(this.$root.uri.debug);
            this.fetchModes();
            /*        Vue.use(VueWebsocket, "ws://192.168.1.233:81", {
            	       reconnection: true, reconnectionDelay: 250, transports: ['websocket']});*/
        },
        computed: {

            badgeName0: function() {
                if (this.modes.mode == 0)
                    return "ВКЛЮЧЕНО"
                else
                    return ""
            },
            badgeName1: function() {
                if (this.modes.mode == 1)
                    return "ВКЛЮЧЕНО"
                else
                    return ""
            },
            badgeName2: function() {
                if (this.modes.mode == 2)
                    return "ВКЛЮЧЕНО"
                else
                    return ""
            },
            badgeName3: function() {
                if (this.modes.mode == 3)
                    return "ВКЛЮЧЕНО"
                else
                    return ""
            }
        },
        methods: {
            fetchModes: function() {
                var self = this;

                self.connection = false;
                /*        setInterval(() => {
                            
                            this.axios.get("http://192.168.1.233/mode.json").then(
                            (response) => {
                                console.log(response);
                                console.log(response.status);
                                self.modes = response.data;
                            }, 
                            (err) => {
                                console.log(err);
                                //self.badge.text = "ВЫКЛ";
                                //self.modes.mode = 3;
                                self.modes.mode = null;
                                self.connection = false;
                            })}, 500);*/
                
                setInterval(() => {

                        this.axios.get('http://'+self.$root.uri.work+'/mode.json', {timeout: 1000}).then(
                                (response) => {
                                    console.log(response);
                                    console.log(response.status);
                                    if (response.status === 200) {
                                        self.modes = response.data;
                                        self.connection = true;
                                    }
                                })
                            .catch(
                                (response) => {
                                    console.log(response);

                                    //self.badge.text = "ВЫКЛ";
                                    //self.modes.mode = 3;
                                    self.modes.mode = null;
                                    self.connection = false;
                                })
                    },
                    750);
            },
            
            send: function() {
                var self = this;
                const dt = JSON.stringify({"data":{"value":"gdfg1df2g2121dgfdg"}});
                var blob = new Blob([JSON.stringify({"data":{"value":"3334343"}})]);
                const data = new FormData();

                data.append('data', new File([blob], '/my.json', { type: 'application/json' } ));
                
                this.axios.post('http://'+self.$root.uri.debug+'/config', data, {timeout: 1000, headers: { 'Content-Type': 'multipart/form-data' }}).then(
                    (response) => {
                        console.log(response);
                    })
                .catch(
                (response) => {
                    console.log('error');
                })
                    
            },
        }

        /*    socket:{
                events: {
                    connect: function() {
                        console.log('socket connected')
                   
                    },
                    changed(msg) {
        				console.log("Something changed: " + msg);
                    }
                }
            }*/
    }

</script>
