import $ from 'jquery'
import '../css/index.less'
import '../css/index.css'

$(function () {
    $('body').append('<h2>Hello</h2>')
    $('body').append('<h2>Hello</h2>')
    $('body').append('<h2>Hello</h2>')
    $('body').append('<h2>Hello</h2>')
});


class Person {
    static info = 'Tom'
}

console.log(Person.info)


import Nav from '../components/Nav.vue'
import Vue from 'vue'


const vm = new Vue({
    el: '#app',
    render: h => h(Nav)
})