## Атрибуты
- v-bind: - привязка к переменной. Короткий вариант просто :  
    *в style и class передаются объекты*
- v-html - привязка к переменной с интерпретацией html
- v-if, v-else-if, v-else - кондитионалы
- v-show - изменяет display
- v-for - цикл foreach :key - привязываем
- v-on:click - привязка ивента. Короткий вариант просто @
- v-model - двухсторонняя связь с переменной

## Ивенты
- @click
- @dblclick
- @submit
- @mouseover
- @mousemove
- @keyup.enter

#### Модифаеры
    .prevent    
    .once  
    .stop  
    .capture    
    .self - только на элементе, не потомках  
    .passive  
    .lazy - значение уходят дальше толко когда элемент теряет фокус

## Части 
- data - пул с переменными
- methods - пул с методами
- computed - подготовленные данные, отрабатывает когда изменяются использованные переменные
- components - объявляем импортированные компоненты
- mixins:[]
- filters
- directives
- все Lifecycle hooks

### части у компонента
- props:[] - принимаемые параметры
- template - темплейт
- data() - то же самое что data:

```
Vue.component('name', {
    template: "<p>Component</p>"
});
```
 
data во Vue - обьект, а в компоненте - функция возвращающая обьект

### Refs  
в template `<div ref="myObj">Some text</div>`  
во Vue `this.$refs.myObj.innerText`

#Vue CLI
npm i -g @vue/cli  
vue create project-name  

## Регистрация компонента
- глобально в main.js:  
    `import Ninjas from "./components/Ninjas.vue";`  
    `Vue.component('ninjas', Ninjas);`  
- локально в любом компоненте внетри тега script  
    `import Ninjas from "./components/Ninjas.vue";`  
    `components: { 'ninjas': Ninjas }`
  
#### Динамические компоненты
`<component :="wichComponent"></component>`  
Если мы хотим сохранять данные в компоненте при переключении на него назад - его нужно обернуть в `<keep-alive></keep-alive>` 

### Валидация props
```
props: {
    name-of-props: {
        type: Array,
        required: true
    }
}
```
Props type of *array* or *object* при изменении внутри меняется глобально, a *string* *integer* or *boolean* только локально 


## Events
Инициация `this.$emit('name-event', 'Data for passing');`  
Отлов `<div v-on:name-event="handlerMethod($event)">`   
Обработка 
```
methods: {
    handlerMethod: function(data) {
        this.varible = data;
    }
}
```

### Event Bus
В main.js `export const bus = new Vue();`  
Где нужно использовать `import { bus } form '../main.js'`  
Инициация `bus.$emit('name-event', 'Data for passing');`  
Отлов и обработка
```
created(){
    bus.$on('name-event', (data) => {
            this.varible = data;
         }
    );
}
```

# Использование сторонних плагинов
В main.js `import Module from 'module'`
`Vue.use(Module)`

# Lifecycle hooks
beforeCreate, created, beforeMounted, mounted, beforeUpdate, updated, beforeDestroy, destroyed 

# Filters
`<h1>{{ title | to-uppercase }}</h1>`
Глобально
```
Vue.filter('to-uppercase', function(value){
    return value.toUpperCase();
})
```

Локально:
```
filters: {
    'to-uppercase': function(value){
        return value.toUpperCase();
    }
}
```
то же самое:
```
filters: {
    toUppercase(value){
        return value.toUpperCase();
    }
}
```


# Directives
- v-custom="binding" - кастомный атрибут, можно без равно части  

`<h1 v-custom:column="binding">Text</h1>`
Глобально
```
Vue.directive('custom', {
   bind(el, binding, vnode){
    el.style.color = "#000"
  }   
})
```
`if (binding.arg == 'column')`

Локально:
```
directives: {
    'custom': {
        bind(el, binding, vnode){
            el.style.color = "#000"
        } 
    }
}
```

## Mixins (trait)
для примера извлечем computed
file - mixins/searchMixin.js
```
export default {
    computed: {
        ...
    }
}
```
использование  
`import searchMixin form '../mixins/searchMixin'`  
`mixins: [searchMixin]`

# Routing
`npm i vue-router --save`   
- в main.js  
`import VueRouter form 'vue-router`     
`Vue.use(VueRouter);`
```
    import Routes from './routes'
    const router = new VueRouter({
        routes: Routes
    });
```  
*и добавить где регистрируется Vue*
```
    new Vue({
        el: '#app',
        render: h => h(App),
        router
    })
```

- file - mixins/routes.js
```
    import showBlogs from './components/showBlogs.vue'
    export default [
        { path: '/', component: showBlogs },
        { path: '/add', component: ... }
    ]
```
- в App.vue
`<router-view>`

чтобы избавится от # в адресной строке нужно настроить перенаправление на сервере   
и добавить во `new VueRouter ({ mode: 'history', ... })`

**Добавить ссылки:**
`<router-link to="/">Home</router-link>`
если добавить атрибут `exact`, то будет активна только когда на ней, а не на потомках

### Параметры роута
`/blog/:id` в компоненте получить `this.$route.params.id`


# JS function
.slice(0, 10) - взять только первые 10  
.pop()  
.push()  

#### example of search
`<div v-for="blog in filteredBlogs"></div>`
```
computed: {
    filteredBlogs: function () {
        return this.blogs.filter((blog) => {
            return blog.title.match(this.search);
        });
    }
}
```

# VueX
`npm install vuex --save`

in file `store/store.js`:
```
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
    }
})
```

in file `main.js`:
```
import { store } from './store/store'

new Vue({
  store: store,
  ...
})
```
usage
```
 computed: {
    products() {
      return this.$store.state.products;
    }
  }
```

### Getters
in file `store/store.js`:
```
   getters: {
        saleProducts: state => {
            let saleProducts = state.products.map(product => {
                return {
                    name: '**' + product.name + '**',
                    price: product.price / 2
                }
            })
            return saleProducts;
        }
    }
```
usage
```
 computed: {
    saleProducts() {
      return this.$store.getters.saleProducts;
    }
  }
```

### Mutations
in file `store/store.js`:
```
   mutations: {
        reducePrice: state => {
            state.products.forEach(product => {
                product.price -= 1;
            });
        }
    }
```
usage
```
 methods: {
    reducePrice: function (){
      this.$store.commit('reducePrice');
    }
  }
```

если в `store/store.js` включен `strict:true`, то изменения работают только через мутаторы

### Actions
in file `store/store.js`:
```
  actions: {
        reducePrice: contex => {
            setTimeout(function(){
                contex.commit('reducePrice')
            }, 2000);
        }
    }
```
usage
```
 reducePriceThroughAction: function (){
      this.$store.dispatch('reducePrice');
    }
```

в мутациях и акшенах можно слать параметры
usage
```
  this.$store.dispatch('reducePrice', param);
```
in file `store/store.js`:
```
  actions: {
        reducePrice: (contex, amount) => {
            setTimeout(function(){
                contex.commit('reducePrice', amount)
            }, 2000);
        }
    }
```

### Mapping Actions & Getters
usage
```
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    
    
    computed: {
        ...mapGetters([
            'saleProducts'
        ])
    },
    methods: {
        ...mapActions([
            'reducePrice'
        ])
    }
```
Это будет работать только после обработки babel
