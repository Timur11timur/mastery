## Атрибуты
- **v-bind:** - привязка к переменной. Короткий вариант просто **:**  
    *в style и class передаются объекты*
- **v-html** - привязка к переменной с интерпретацией html
- **v-if, v-else-if, v-else** - условия
- **v-show** - изменяет display
- **v-for** - цикл foreach :key - привязываем
- **v-on:click** - привязка ивента. Короткий вариант просто **@**  
  *если не передавать аргумент в функцию, то будет получен event первым аргументом, чтобы передать принудительно - передаем **$event** *
- **v-model** - двухсторонняя связь с переменной

## Ивенты
- @click
- @dblclick
- @submit
- @mouseover
- @mouseleave
- @mousemove
- @keyup.enter
- @keydown
- @keypress

#### Модифаеры
    .prevent    
    .once  
    .stop  
    .capture    
    .self - только на элементе, не потомках  
    .passive  
    .lazy - значение уходят дальше толко когда элемент теряет фокус
    .right - олько правая кнопка
    .alt - с зажатой ALT

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

in  Composition API:
```
import { ref } from 'vue'

export default {
  setup() {
    const p = ref(null)

    return {
      p
    }
  }
}
```


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

### Slot
`<template v-slot:links>`
`<slot name="links"></slot>`

## Teleport
блок не внутри div c id="app"
`<div class="modals"></div>`
внутри vue файла в template
`<teleport to=".modals"></teleport>`


# Использование сторонних плагинов
В main.js `import Module from 'module'`
`Vue.use(Module)`

# Lifecycle hooks
- beforeCreate, 
- created,
- beforeMounted,
- mounted, 
- beforeUpdate, 
- updated, 
- beforeDestroy, 
- destroyed 

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

**Привязываем ссылку по имени компонента**  
`<router-link :to="{ name: 'About'} ">About</router-link>`

### Параметры роута
`/blog/:id` в компоненте получить `this.$route.params.id`  
`<router-link :to="{ name: 'JobDelails', params: { id: job.id }}">`  
если в роутах прописать `props: true`, то в компоненте `props: ['id']`

### Redirect
in route/index.js
```
{
    path: '/all-jobs',
    redirect: '/jobs'
}
```

### 404 Page
создаём компонент, например NotFound.vue
in route/index.js
```
{
    path: '/:catchAll(.*)',
    name: NotFound,
    component: NotFound,
  }
```

### ходим по истории и редирект
в любом компоненте:
```
<button @click="redirect">Redirect</button>
<button @click="back">Go back</button>
<button @click="forward">Go forward</button>

  methods: {
    redirect() {
      this.$router.push({ name: 'Home' })
    },
    back() {
      this.$router.go(-1)
    },
    forward() {
      this.$router.go(1)
    }
  }
```


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

### Modules
in file `store/modules/name.js`:
```
export const state = { ... }
export const mutations = { ... }
export const actions = { ... }
export const getters = { ... }
```
in file `store/store.js`:
```
   import * as name from '@/store/modules/name.js'
    
   modules: {
       name
   }
```

#### namespace
in file `store/modules/name.js`:
export const namespase = true;

dispatch('name/action', 'name', { root: true })


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

# Json-server
`npm install json-server`  
создаем файл db.json  
`json-server --watch db.json`

# Composition API

```
export default {
    setup() {
        //data
        
        //methods
        
        //computed
        
        //lifecycle hooks
    }
}
```
Пример
```
setup() {
    let name = 'mario'
    let age = 30    
    const handleClick = () => {
      console.log('you clicked me')
    }
    
    return {
      name: name,
      age,
      handleClick
    }
}
```
Данные не реактивны и появляются до beforeCreated

сделать их:
```
import { ref } from 'vue'

export default {
  name: 'Home',
  setup() {
    const name = ref('mario')

    const handleClick = () => {
     name.value = 'luigi'
    }

    return {
      name,
      handleClick,
      p
    }
  }
}
```

*reactive* то же что и *ref* но не нужно писать *.value* и имеет недостатки

#### Computed in Composition API
пример поиска
```
<template>
  <div class="home">
    <input type="text" v-model="search">
    <p> search term - {{ search }}</p>
    <div v-for="name in matchingNames" :key="name">{{ name }}</div>
  </div>
</template>

<script>
import { ref,computed } from 'vue'

export default {
  name: 'Home',
  setup() {
    const search = ref('')
    const names = ref(['mario', 'yoshi', 'luigi', 'toad', 'bowser', 'koopa', 'peach'])

    const matchingNames = computed(() => {
      return names.value.filter((name) => name.includes(search.value))
    })

    return {
      names,
      search,
      matchingNames,
    }
  }
}
</script>
```
#### watch and watchEffect
```
import { watch, watchEffect } from 'vue'

export default {
  setup() {
    const search = ref('')
    watch(search, () => {
      console.log('watch')
    })
    watchEffect(() => {
      console.log('watchEffect function ran', search.value)
    })
    return { search }
}
```

**Stop watching**
```
    <button @click="hangleClick"></button>
    ...
    
    const stopEffect = watchEffect(...)

    const hangleClick = () => {
      stopEffect()
    }
    
    return {stopEffect, hangleClick}
```
#### props in Composition API
```
props: ['post'],
setup(props) { ... }
```
#### Lifecycle hooks in Composition API
Если они внутри setup() нужно добавлять приставку on
```
import  {onMounted, onUnmounted } from 'vue'
export default {
  setup(props) {
    onMounted(() => console.log('component mounted'))
    onUnmounted(() => console.log('component unmounted'))   
  }
```

# Анимация

##`<transition>`

при заходе на страницу:  
***.enter-from***  
***.enter-to***  
***.enter-active***

при покидании страницы:
***.leave-from***  
***.leave-to***  
***.leave-active***

можно добавить имя `<transition name="timur">` тогда все с префиксом `.timur-enter-from{}`

атрибуты `mode="out-in"` и `mode="in-out"` устанавливает очередь между двумя элементами `v-if/v-else`

## <transition-group tag="ul">
то же что и у transition, но есть еще класс:  
*.move*

для наглядности работы move при удалении даем элементу position: absolute  
`.list-leave-active { position: absolute }`

Если добавить атрибут ***appear***, то анимация воспроизводится при первом появлении - при загрузке
`<transition-group tag="ul" name="list" appear>`

Enter hooks:
***before-enter***
***enter***
***after-enter***

Leave hooks:
***before-leave***
***leave***
***after-leave***

```
<transition
    @before-enter="beforeEnter"
    @after-leave="afterLeave"
```
в функцию можно прокинуть сам элемент **el**
```
const beforeLeave = (el) => {
    el.style.color = 'green'
}
```