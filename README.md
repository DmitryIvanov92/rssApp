# rssApp
Test project. Singree  

- - -

#### Задание

Реализуйте на языке JavaScript простейший интерфейс для чтения RSS-каналов (в любой из версий форматов RSS или Atom, одной на выбор).

При реализации можно использовать любые готовые компоненты. Обязательно укажите явно, какие готовые компоненты были использованы, их названия и официальные сайты.

Страница приложения разделена на четыре части — список каналов (с редактированием), список сообщений в выбранном канале, просмотр выбранного сообщения, статистика.

Число каналов.

По выбранному каналу: число сообщений, число авторов.

По выбранному сообщению: круговая диаграмма относительной частоты появления букв латинского алфавита в сообщении (после приведения в нижний регистр). (Каждая буква занимает долю площади круга, равную отношению числа таких букв к общему числу букв /не символов/ в сообщении.)

- - -

#### Используемые компоненты
* [AngularJS]
    * [angular-resource]
    * [angular-route]
    * [angular-animate]
    * [angular-sanitize]
    * [angular-route-segment]
* [Bootstrap]
* [Chart.js]
* [Google Feed API]    
    
- - -
    
#### Установка приложения

```sh
$ git clone https://github.com/DmitryIvanov92/rssApp.git
$ cd rssApp
$ npm i && bower i
```
#### Запуск приложения (development mode)

```sh
$ npm start
```

#### Запуск приложения (production mode)

```sh
$ npm run dist
$ cd dist/server
$ node app
```

[AngularJS]: <http://angularjs.org>
[angular-resource]: <https://github.com/components/angular-resource>
[angular-route]: <https://github.com/angular/bower-angular-route>
[angular-animate]: <https://github.com/angular/bower-angular-animate>
[angular-sanitize]: <https://github.com/angular/bower-angular-sanitize>
[angular-route-segment]: <http://angular-route-segment.com/>
[Bootstrap]: <http://getbootstrap.com/>
[Chart.js]: <http://www.chartjs.org/>
[Google Feed API]: <https://developers.google.com/feed/v1/reference#resultJson>

[git-repo]: <https://github.com/DmitryIvanov92/rssApp.git>
