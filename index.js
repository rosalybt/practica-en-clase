
const tipo = document.querySelector('#tipo')
const color = document.querySelector('#color')
const filtro = document.querySelector('#filtro')

const productos = [
  {
    nombre: 'Zapato negro',
    tipo: 'zapato',
    color: 'negro',
    img: './img/taco-negro.jpg',
  },
  {
    nombre: 'Zapato azul',
    tipo: 'zapato',
    color: 'azul',
    img: './img/taco-azul.jpg',
  },
  {
    nombre: 'Bota negra',
    tipo: 'bota',
    color: 'negro',
    img: './img/bota-negra.jpg',
  },
  {
    nombre: 'Bota azul',
    tipo: 'bota',
    color: 'azul',
    img: './img/bota-azul.jpg',
  },
  {
    nombre: 'Zapato rojo',
    tipo: 'zapato',
    color: 'rojo',
    img: './img/zapato-rojo.jpg',
  },
];

let nuevaBusqueda = []
const form = document.forms[0];
const listado = document.getElementById('lista-de-productos');



const mostrarProductosHTML = (array) => {

  if (array.length != 0) {
    listado.innerHTML = ''
    array.forEach(calzado => {
      listado.innerHTML += `
        <div class="contenedorProducto">
        <div class="foto"><img src="${calzado.img}"></div>
        <div class="titulo">${calzado.nombre}</div>
        </div>`;

    })

  } else {
    listado.innerHTML = 'no hay productos relacionados a su busqueda'
  }


}

mostrarProductosHTML(productos)




const parametrosDeBusquedaValidos = () => {
  if ((tipo.value != '' && color.value != '') || filtro.value != '') {
    return true
  }
  return false
}

const validarSelects = () => {

  return productos.filter((producto) => {

    if (tipo.value && color.value) {
      return producto.color == color.value && producto.tipo == tipo.value
    } else if (tipo.value) {
      return producto.tipo == tipo.value
    }
    else if (color.value) {
      return producto.color == color.value
    } else {
      return producto
    }


  })


}


const validarInput = (array) => {
  return array.filter(producto => {

    if (filtro.value) {
      return producto.nombre.includes(filtro.value)
    } else {
      return producto
    }

  })


}

const filtrarBusqueda = (array) => {
  let nuevaBusqueda
  let resultadoBusqueda

  if (parametrosDeBusquedaValidos()) {
    nuevaBusqueda = validarSelects()
    resultadoBusqueda = validarInput(nuevaBusqueda)
    mostrarProductosHTML(resultadoBusqueda)

  } else {
    mostrarProductosHTML(array)
  }
};



form.onsubmit = (e) => {
  e.preventDefault();
  filtrarBusqueda(productos, tipo, color, filtro)

}

tipo.onchange = () => filtrarBusqueda(productos, tipo, color, filtro)
color.onchange = () => filtrarBusqueda(productos, tipo, color, filtro)
