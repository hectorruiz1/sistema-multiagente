/*
    Autores:
     - Carlos Morote García
     - Sara López Matilla
     - David Lorenzo Alfaro
     - Mª Elena Pretel Fernández
     - Daniel García Carretero
*/

// Genera la cabezara de un mensaje XML para enviar
function escribirCabecera(infoMensaje){
    
    return  "<head>" + 
                "<tipo_mensaje>" +
                    infoMensaje.tipo_mensaje +
                "</tipo_mensaje>" +

                "<tipo_emisor>" +
                    'comprador' +
                "</tipo_emisor>" +
                "<id_emisor>" +
                    infoMensaje.id_emisor + 
                "</id_emisor>" +
                "<ip_emisor>" +
                    infoMensaje.ip_emisor +
                "</ip_emisor>" +
                "<puerto_emisor>" +
                    '-1' +
                "</puerto_emisor>" +

                "<tipo_receptor>" +
                    infoMensaje.tipo_receptor +
                "</tipo_receptor>" +
                "<id_receptor>" +
                    infoMensaje.id_receptor + 
                "</id_receptor>" +
                "<ip_receptor>" +
                    infoMensaje.ip_receptor +
                "</ip_receptor>" +
                "<puerto_receptor>" +
                    infoMensaje.puerto_receptor +
                "</puerto_receptor>" +

                "<time_sent>" +
                    getTime() +
                "</time_sent>" +
            "</head>";

}

// Genera el cuerpo del mensaje XML en funcion del tipo
function escribirCuerpo(infoMensaje){

    var mensaje = "<body xsi:type=\""+infoMensaje.tipo_mensaje+"\">";

    switch (infoMensaje.tipo_mensaje){
        case 'entrada_tienda':
            mensaje += entrada_tienda(infoMensaje);
            break;

        case 'Pide_Tiendas':
            mensaje += pedir_tiendas(infoMensaje);
            break;

        default:
            alert('Error: ' + infoMensaje.tipo);
            break;
    }

    return mensaje + "</body>";
}

// Genera el mensaje XML completo
function crearMensaje(infoMensaje){

    //TODO: Cambiar modelo de mensaje cuando se tenga el completo
    mensaje="<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + 
            '<root xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation=\"TodosMensajes.xsd\">' +
                escribirCabecera(infoMensaje)+
                escribirCuerpo(infoMensaje)+
            "</root>";

    return mensaje
    // parser = new DOMParser();
    // return parser.parseFromString(mensaje,"text/xml");
}

//Obtiene la hora actual (LUNA)
function getTime(){
    var date = new Date();
    var hours = addZero(date.getHours());
    var minutes = addZero(date.getMinutes());
    var seconds = addZero(date.getSeconds());

    var time = hours + ":" + minutes + ":" + seconds;
    return time;
}

//Funcion para añadir ceros a la izquierda en caso necesario para la fecha y la hora (LUNA)
function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

// Genera cuerpo para el mensaje de entrar a tiendas
function entrada_tienda(infoMensaje){
    var mensajes = "<lista_productos>";
    for(let i=0; i<infoMensaje.productos.length; i++){
        mensajes += "<producto>" +
                        "<id_producto>" +
                            infoMensaje.productos[i].id +
                        "</id_producto>"+
                        "<cantidad>"+
                            infoMensaje.productos[i].cantidad +
                        "</cantidad>"+
                    "</producto>";
    }
    return mensajes +="</lista_productos>";
    
}

// Genera cuerpo para el mensaje para pedir tiendas TODO
function pedir_tiendas(infoMensaje){
    var mensajes = "<lista_tiendas>";
    for(let i=0; i<infoMensaje.tienda.length; i++){
        mensajes += "<tienda>" +
                        "<id_tienda>" +
                            infoMensaje.tienda[i].id +
                        "</id_tienda>"+
                        "<ip_tienda>" +
                            infoMensaje.tienda[i].id +
                        "</ip_tienda>"+
                        "<puerto>"+
                            infoMensaje.tienda[i].puerto +
                        "</puerto>"+
                    "</producto>";
    }
    return mensajes +="</lista_productos>";
}


//Funcion JQuery ajax para mandar mensajes y recibir respuesta
function enviarXML(direccion, infoMensaje, asincrono){
    var respuesta;

    $.ajax({
        url: 'http://' + direccion.replace("http://", "").replace(/\/\//g,"/"),
        data: crearMensaje(infoMensaje),
        type: 'POST',
        async: asincrono,
        dataType: 'text',
        contentType: 'text/xml',

        beforeSend: function(request){
            //TODO: Actualizar html
            console.log("Envio mensaje a: "+direccion);
        },

        // Recepcion del mensaje
        success: function(response){
            console.log("Mensaje recibido de: "+direccion);
            respuesta = leerXML(response);
            console.log("Mensaje recibido de "+direccion+" procesado");
        },

        // En caso de error
        error: function(response){
            console.log("Error enviando a "+ direccion +": "+response);
            //TODO: Actualizar html con error
        }
    });

    return respuesta;
}

// WARNING: IP global, no local
function get_IP() {
    var ipCliente;
	// Funcion jQuery que obtiene la ip de la maquina
	$.ajax({
		url: 'https://ipinfo.io/',
		async: false,
		dataType: 'json',
		contentType: 'application/j-son;charset=UTF-8',
		success: function (data) {
			ipCliente = data.ip
		}
    });
    return ipCliente;
}

// https://es.stackoverflow.com/questions/360331/url-en-ajax-jquery-3-5-1

// EJEMPLO DE COMO TIENE QUE RECIBIR LA INFORMACION LOS METODOS
// DE ESPECIAL INTERES ENVIARXML

// var infoM = {
//     tipo_mensaje: 'entrada_tienda',
//     id_emisor: 3,
//     ip_emisor: '192.168.1.4',
//     tipo_receptor: 'tienda',
//     id_receptor: 10,
//     ip_receptor: '198.161.1.1',
//     puerto_receptor: '8000',
//     productos: [
//         {id: 5, cantidad: 45},
//         {id: 13, cantidad: 100}
//     ]
// }