////
// vue + vuex + vue-router のwebpackなしサンプル（コピペでできる）
// https://www.softel.co.jp/blogs/tech/archives/4425
//
// Vue3 に対応させる



//// 0
//
// モジュールシステムを使っている場合 (例: vue-cli 経由で)、Vue と VueRouter をインポートし、
// `Vue.use(VueRouter)` を呼び出します。


//// 1
//
//  ルートコンポーネントを定義します

const Home = {
    template : '<div>Homeです。</div>'
}
const Foo = {
    template : '<div><p>Foo画面です</p>'
             + '<button class="btn btn-info" v-on:click="$store.commit(\'increment\')">'
             + 'クリックするとカウンターが増えます {{ count }}回目'
             + '</button></div>'
//    ,computed : {
//        count : function () {
//            return this.$store.state.count
//        }
//    }
}
const Bar = {
    template : '<div><p>Bar画面です</p>'
             + '<button class="btn btn-success" v-on:click="$store.commit(\'increment\')">'
             + 'クリックするとカウンターが増えます {{ count }}回目'
             + '</button></div>'
//    ,computed : {
//        count : () => return this.$store.state.count
//    }
}

//// 2
//
// ルートを定義

const routes = [
    { path : '/'   , component : Home },
    { path : '/foo', component : Foo  },
    { path : '/bar', component : Bar  }
]

//// 3
//
// ルーターインスタンスを作成して、ルートオプションを渡します

//const router = new VueRouter({
//    routes : routes // `routes: routes` の短縮表記
//})
const router = VueRouter.createRouter({
  history : VueRouter.createWebHistory(''),
  routes  : routes
})




//// 4
//
// root となるインスタンスを作成してマウント
// アプリケーション全体がルーターを認知できるように、
// ルーターをインジェクトすることを忘れないこと

//const app = new Vue({
//  router
//}).$mount('#app')





const store = new Vuex.Store({
    state     : {
        count: 0
    },
    mutations : {
        increment(state) {
            state.count++
        }
    }
})

const Navigation = {
    template   : '<nav class="nav bg-light mb-3">'
               + '<router-link to="/" class="nav-link">Home</router-link>'
               + '<router-link to="/foo" class="nav-link">Foo</router-link>'
               + '<router-link to="/bar" class="nav-link">Bar</router-link>'
               + '</nav>'
}
const Footer ={
    template   : '<footer class="fixed-bottom bg-light p-3">フッター</footer>',
}

const App ={
    template   : '<div><Navigation/><div class="container-fluid"><router-view/></div><Footer/></div>',
    components : {
        Navigation,
        Footer
    },
    computed   : {
        count () {
            return this.$store.state.count
        }
    }
}

//new Vue(
//    {
//        el         : '#app',
//        router     : router,
//        store      : store,
//        template   : '<App/>',
//        components : {App}
//    }
//)


const app = Vue.createApp(App)
app.use(router)
app.use(store)

app.mount('#app')
