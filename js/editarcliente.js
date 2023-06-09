import { obtenerCliente, editarCliente } from "./API.js";
import { mostrarAlerta, validar } from './funciones.js'

(function () {

  const nombreInput = document.querySelector('#nombre');
  const telefonoInput = document.querySelector('#telefono');
  const emailInput = document.querySelector('#email');
  const empresaInput = document.querySelector('#empresa');
  const idInput = document.querySelector('#id');

  document.addEventListener('DOMContentLoaded', async () => {

    const parametrosURL = new URLSearchParams(window.location.search);
    const idCliente = parseInt( parametrosURL.get('id'));

    const cliente = await obtenerCliente(idCliente);
    mostrarCliente(cliente);

    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validarFormulario);

  });

  function mostrarCliente(cliente) {
    const { nombre, email, empresa, telefono, id } = cliente;

    nombreInput.value = nombre;
    empresaInput.value = empresa;
    telefonoInput.value = telefono;
    emailInput.value = email;
    idInput.value = id;
  }

  function validarFormulario(e) {
    e.preventDefault();

    const cliente = {
      nombre: nombreInput.value,
      email: emailInput.value,
      telefono: telefonoInput.value,
      empresa: empresaInput.value,
      id: parseInt(idInput.value)
    }

    if(validar(cliente)){
      mostrarAlerta('Todos los campos son obligatorios');
      return;
    }

    editarCliente(cliente);
  }
})();
