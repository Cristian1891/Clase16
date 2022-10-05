// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
    console.log(forms)
  
    console.log(Array.from(forms)) 
    // Loop over them and prevent submission
    forms.forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
          Swal.fire({
            imageUrl: '../img/logo.png',
            imageHeight: 80,
            imageWidth: 80,
            background: '#be1e24',
            width: 300,
            title: `<h5 class="text-warning">Error al completar el formulario de contacto.
            Verifique los datos ingresados.</h5>`,
            showConfirmButton: true,
          })
        }
        else{
        event.preventDefault()
        const enviarSolicitud = document.getElementById('enviar-solicitud');
        let nombre = document.getElementById('nombre');
        let apellido = document.getElementById('apellido');
        let email = document.getElementById('email');
        let telefono = document.getElementById('telefono');
        let sucursal = document.getElementById('suc');
        
        // event.preventDefault();//evitamos que se ejecute la funcion predeterminada por defecto del evento

        enviarSolicitud.value = 'Procesando...';

        //Enviamos informacion en forma de parametros a traves de la url
        let params = {
            user_id: 'user_id',
            service_id: 'service_id',
            template_id: 'template_id',
            template_params: {
            nombre: nombre.value,
            apellido: apellido.value,
            email: email.value,
            telefono: telefono.value,
            sucursal: sucursal.value,
            }
        };
    
        let headers = {
            'Content-type': 'application/json'/*Tenemos la propiedad Content-type, con el valor que nos indica
            la documentacion de la API*/
        };
    
        //Definimos el segundo parametro opcional del fetch de tipo object en el cual transferimos datos en formato JSON
        let options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(params)
        };
    
        fetch('https://api.emailjs.com/api/v1.0/email/send', options)
        .then(async (httpResponse) => {//Con async-await esperamos a que se resuelva la promesa para continuar con la siguiente instruccion
            if (httpResponse.ok) {
                

                setTimeout(() => {
                    enviarSolicitud.value = 'Enviar';
                    Swal.fire({
                        imageUrl: '../img/logo.png',
                        imageHeight: 80,
                        imageWidth: 80,
                        background: '#be1e24',
                        width: 300,
                        title: '<h5 class="text-warning">Formulario enviado</h5>',
                        showConfirmButton: true,
                    }).then(function () {
                        window.location.href = "../index.html";
                    })

                }, 2000);


            } else {
                const text = await httpResponse.text();
                return await Promise.reject(text);
            }
        })
        .catch((error) => {
            enviarSolicitud.value = 'Enviar';
            console.log(error)
            Swal.fire({
                imageUrl: '../img/logo.png',
                imageHeight: 80,
                imageWidth: 80,
                background: '#be1e24',
                width: 300,
                title: `<h5 class="text-warning">No se pudo realizar el envio del formulario. Intente nuevamente.</h5>`,
                showConfirmButton: true,
              })
        });
        }
        
            
        
        
        
        form.classList.add('was-validated')
      }, false)
    })
})()