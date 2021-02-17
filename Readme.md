## Атрибуты
- v-bind: - привязка к переменной. Короткий вариант просто :  
    *в style и class передаются объекты*
- v-html - привязка к переменной с интерпретацией html
- v-if, v-else-if, v-else - кондитионалы
- v-show - изменяет display
- v-for - цикл foreach  :key - привязываем
- v-on:click - привязка ивента. Короткий вариант просто @
- v-model - двухсторонняс связь с переменной

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


## Части 
- data - пул с переменными
- methods - пул с методами
- computed - подготовленные данные, отрабатывает когда изменяются использованные переменные
- mounted - выполняется после добавления компонента на страницу
- components - объявляем импортированные компоненты

## Компонент
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
