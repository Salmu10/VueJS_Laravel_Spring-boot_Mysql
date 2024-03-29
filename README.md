<h1>CASAL</h1>

<p style="text-align: justify">Bienvenidos a CASAL.<br>
  
Un proyecto realizado por el alumno <a href="https://github.com/Salmu10">Salva Muñoz Úbeda</a> en el 2do curso de DAW en el <a href="https://portal.edu.gva.es/iestacio/">IES L'estació</a>.<br>
  
Este proyecto trata sobre una página web de un restaurante con menú degustación, donde el cliente se puede registrar para reservar una mesa.</p>
<hr>
  
<h2>FUNCIONES</h2>
 
<p>La web contiene un total de 5 secciones.<p>
  
<h3>Home</h3>
<p>En la sección del Home, el usuario tiene su primera impresión de la web, el cual puede observar un carrusel de las categorias que dispone la página, y filtar las mesas por ellas. Además, contiene una imagen del menú que proporciona el restaurante.<br>
La opción del carrusel, tienen un salto al módulo de reservas aplicando el filtro de la categoría seleccionada.</p>
<ul>
  <li>Carrusel de categorias</li>
</ul>

<h3>Search</h3>
<p>El módulo de search, esta presente tanto en el home como en la sección de reservas de la aplicación. En él, se puede buscar también por la categoria de la mesa. Este motor de búsqueda, redirige a la sección de reservas,aplicando el filtro deseado.</p>

<h3>Login</h3>
<p>La aplicación web, consta también, de un módulo de login donde el usuario puede crear una cuenta, e iniciar sesión con ella. Consta además, de una sección de perfil, donde el usuario puede ver las reservas que ha relizado y también puede cancelar la reserva si así lo desea. Además, también hay una función de administrador, donde, cuando el que ha iniciado sesión es un administrador, puede realizar distintas funcionalidades adicionales, como crear categorias, mesas o usuarios, además de editar los ya existentes o incluso borrarlas. También puede confirmar las reservas realizadas por los clientes.</p>
<ul>
  <li>Register</li>
  <li>Login</li>
  <li>Profile</li>
  <li>Dashboard</li>
</ul>
<p>Además el login tiene un token mediante JWT en el que va verificando durante el uso de la web si hay<br>
un usuario conectado.</p>
 
<h3>Reserve</h3>
<p>Este es el módulo más importante de toda la web, en el se puede ver la lista de las mesas de las que dispone el restaurante y además se puede filtrar esta lista y la lista se encuentra paginada. También puede entrar en la mesa deseada y realiza una reserva de esta, viendo, con un datepicker, los dias en los que esa mesa esta disponible. Para poder realizar la reserva, el usuario debe estar logeado.</p>
<ul>
  <li>Lista de mesas</li>
  <li>Filtros</li>
  <li>Reserva de la mesa</li>
  <li>Paginación</li>
</ul>

<hr>

<h2>PUESTA EN MARCHA</h2>

<p>La principal peculiaridad de este proyecto es que consta de dos servidores, laravel y spring-boot, para separar las funciones que realiza un administrador (laravel), del cliente (spring-boot).</p>
<p>Es necesario crear el fichero .env en la carpeta de servidor.</p>
<p>Tener instalado las siguientes herramientas:<br>

- Laravel v9<br>
- Spring-boot v2.7.6<br>
- Vue v3<br>
- MySQL</p>


<h3>BACKEND</h3>
<h4>Laravel</h4>
<ol>
  <li>cd Backend/Laravel</li>
  <li>php artisan key:generate</li>
  <li>php artisan jwt:secret</li>
  <li>php artisan serve</li>
</ol>

<h4>Spring-boot</h4>
<ol>
  <li>cd Backend/spring-boot</li>
  <li>php artisan key:generate</li>
  <li>php artisan jwt:secret</li>
  <li>mvn spring-boot:run</li>
</ol>

<h3>FRONTEND</h3>
<ol>
  <li>cd Frontend/Vue</li>
  <li>npm install</li>
  <li>npm run dev</li>
</ol>


<hr>

<h2>LIBRERÍAS</h2>

<p>Lista de librerías utilizadas en este proyecto:</p>

<ul>
  <li><a href="https://www.npmjs.com/package/vue-toastr">Toastr</a></li>
  <li><a href="https://fontawesome.com/">Font Awesome</a></li>
  <li><a href="https://avatars.dicebear.com/">DiceBear Avatars</a></li>
  <li><a href="https://vcalendar.io/">Datepicker</a></li>
  <li><a href="https://www.npmjs.com/package/vue3-pagination">Pagination</a></li>
</ul>