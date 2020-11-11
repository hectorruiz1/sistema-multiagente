/*Autores
    Nikola Dyulgerov
    Ramón Jesús Martínez
    Cristian Petrov */


//Lista de compradores 
var compradores = [
    {id:1, ip: "192.168.1.106", puerto: 80, ipMonitor: "192.168.1.110", puertoMonitor: 80, listaCompra: [{id_producto: 1, cantidad: 4}], listaTiendas: [{id_tienda: 2, ip_tienda: "192,168.1.5"}], dineroGastado: 0, tiempoConsumido: 0 },
    {id:2, ip: "192.168.1.106", puerto: 80, ipMonitor: "192.168.1.110", puertoMonitor: 80, listaCompra: [{id_producto: 3, cantidad: 3}], listaTiendas: [{id_tienda: 1, ip_tienda: "192,168.1.2"}], dineroGastado: 0, tiempoConsumido: 0 }
];


//Función principal para controlar eventos
$(document).ready(
    function () {
        $('#panel').hide();
        $('#enviar').click(
            //Inicializamos los clientes, escondemos el panel de inicio y se construye dinámicamente el panel de los compradores lanzados
            function (e) {
                e.preventDefault();
                $('#monitor').hide(); 
                $('#panel').show();
                console.log("Aqui")
                crearTabCompradores();
            }
        );
        console.log("Lista compra", $("#comprador1 .card-body#listaCompra").html());
    }
    
)

// Crea los compradores al pulsar el botón de enviar 
function crearCompradores() {

    //Recogemos los valores de los campos
    const ipComprador = $('#ipComprador').val();
    const ipMonitor = $('#ipMonitor').val();
    const numCompradores = $('#numCompradores').val();

    //Establecemos los puertos por defecto 
    const puerto = 80;

    //Creamos la lista de compradores
    // for (let i = 0; i < numCompradores; i++) {
    //     const comprador = new Comprador(ipComprador, puerto, ipMonitor, puerto);
    //     comprador.push(comprador);
    //     //comprador.run();
    // }

    //Creamos la tabla de compradores
    crearTabCompradores();
}

function crearTabCompradores() {
    compradores.forEach(
        function (c, i) {

            //Primero recogemos el contenido
            var contenido = $('#TabContenido');

            //Como queremos mostrar la información del primer comprador por defecto, distinguimos la primera iteración de las demas. La estructura es la misma, tan solo cambian algunos atributos
            //En los dos casos añadimos primeramente un tab para el cliente y después creamos el panel al que añadir la información a desplegar de este
            if( i == 0){
                $('#TabCompradores').append('<li class="nav-item"><a class="nav-link active" id="comprador' + c.id + '-tab" href="#comprador' + c.id + '" data-toggle="tab" role="tab"  aria-selected="true">Comprador '+ c.id + '</a></li>');
                var $panel = $( '<div class="tab-pane fade show active" id="comprador' + c.id + '" role="tabpanel" aria-labelledby="cliente-tab"></div>');
            } else {
                $('#TabCompradores').append('<li class="nav-item"><a class="nav-link" id="comprador' + c.id + '-tab" href="#comprador' + c.id + '" data-toggle="tab" role="tab"  aria-selected="true">Comprador '+ c.id + '</a></li>');
                var $panel = $( '<div class="tab-pane fade" id="comprador' + c.id + '" role="tabpanel" aria-labelledby="cliente-tab"></div>');
            }

            //Ahora creamos la información a mostrar y la tarjeta que la almacenerá
            var $card = $('<div class="card-body"><h2 class="card-title text-left mt-2 mb-4">'+ c.id +'</h2><hr></div>');
            var $listaCompra = $('<div class="row"><div class="col-sm-3"><h6 class="mb-0">Lista Compra</h6></div> <div id="listaCompra" class="col-sm-9 text-secondary">' + JSON.stringify(c.listaCompra, null, 2)+'</div></div><hr>');
            var $listaTiendas = $('<div class="row"><div class="col-sm-3"><h6 class="mb-0">Lista Tiendas</h6></div> <div id="listaTiendas" class="col-sm-9 text-secondary">' +JSON.stringify(c.listaTiendas, null, 2) +'</div></div><hr>');
            var $precioTotal = $('<div class="row"><div class="col-sm-3"><h6 class="mb-0">Precio Total</h6></div> <div id="dineroGastado" class="col-sm-9 text-secondary">' + c.dineroGastado +'</div></div><hr>');
            var $tiempo = $('<div class="row"><div class="col-sm-3"><h6 class="mb-0">Tiempo Invertido</h6></div> <div id="tiempoConsumido" class="col-sm-9 text-secondary">' + c.tiempoConsumido +'</div></div><hr>');
            var $log = $('<div class="input-group"><div class="input-group-prepend"><span class="input-group-text">Log</span></div><textarea id="log" class="form-control" aria-label="With textarea" disabled></textarea></div>');

            //Insertamos los contenido, respetando la jerarquía de elementos
            $card.append($listaCompra, $listaTiendas, $precioTotal, $tiempo, $log);
            $panel.append($card);
            contenido.append($panel);
        }
    );
}

// Tiene que ser llamada por los compradores cada vez que realicen una accion
function actualizaInformacion (id) {
    
}
