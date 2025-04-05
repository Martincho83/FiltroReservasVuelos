# Mundo UI

Proyecto que suar React + TypeScript + Vite + Material UI para usar de ejemplo de como se van a comunicar una UI con un Back End y de paso aprender varias cosas de javascript

## Demo

![](./paises.gif)

Aquí tienes un resumen para el archivo README.md que describe el trabajo realizado en el proyecto "Gestión Mundo":

---

# **Grupo "Testigos del Bitcoin**
Integrantes:
- Facundo Mentoro
- Eduardo Arizza
- Gonzalo Arizza
- Sandra Romero
- Martín Alejandro Lamas

# **Tarea (2-4)**

Este proyecto es una aplicación desarrollada en React y TypeScript que permite visualizar información detallada de países utilizando datos de la API de Rest Countries. La aplicación ha sido adaptada para trabajar con la nueva versión de la API (`https://restcountries.com/v3.1/all`) y se han incorporado nuevas funcionalidades y mejoras.

---

## **Características Principales**
- **Visualización de países:** Muestra información detallada de cada país, incluyendo:
  - Nombre común y oficial.
  - Bandera.
  - Área en kilómetros cuadrados.
  - Continente.
  - Población.
  - Zonas horarias.
  - Países limítrofes.
- **Filtrado por subregión:** Permite filtrar los países por subregión geográfica.
- **Interfaz interactiva:** Diseño responsivo utilizando Material-UI.

---

## **Cambios Realizados**
1. **Migración de datos:**
   - Se migraron los datos de la API antigua a un archivo local `paises2.json`.
   - Se corrigieron inconsistencias en los datos y se validó su estructura.

2. **Incorporación de nuevos atributos:**
   - **A nivel cabecera:** Se agregó el área del país.
   - **A nivel detalle:** Se agregaron las zonas horarias y los países limítrofes.

3. **Corrección de errores:**
   - Se manejaron valores `undefined` en propiedades opcionales como `borders`, `nativeName`, y `idd`.
   - Se filtraron países con datos incompletos para evitar errores al renderizar.

4. **Mejoras en el código:**
   - Se actualizó el tipo `Country` para incluir todas las propiedades necesarias.
   - Se implementaron buenas prácticas de desarrollo con TypeScript y React.

---

## **Estructura del Proyecto**
- **`public/data/paises2.json`:** Archivo JSON con los datos de los países.
- **components:** Contiene los componentes principales:
  - `CardCountry`: Muestra la información detallada de un país.
  - `ListCardCountry`: Lista los países y permite aplicar filtros.
  - `Filters`: Permite filtrar los países por subregión.
  - `Country`: Define el tipo `Country` utilizado en la aplicación.

---

## **Capturas de Pantalla**
### Vista Principal
![Vista Principal](./principal.png)

### Detalle de un País

![Detalle de un País](./pais.png)

---