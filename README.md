# Frontend — Panel de Calidad del Aire

[![Angular](https://img.shields.io/badge/Angular-20.1.2-red?logo=angular)](https://angular.io/)
[![Node](https://img.shields.io/badge/Node.js-24.5.0-green?logo=node.js)](https://nodejs.org/)
![Test Workflow](https://github.com/Danny-MNXONLINE/frontend-climadata/actions/workflows/tests.yml/badge.svg)
[![Version](https://img.shields.io/badge/version-0.3.0-blue)](#)

---

<a href="https://github.com/Danny-MNXONLINE/frontend-climadata">Climadata</a> © 2025 by <a href="https://github.com/Danny-MNXONLINE">Danny Belloli</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;">

---

## Screenshots

| Panel principal Desktop | Panel principal Desktop (aside) |
| --- | --- |
| <img src="public/screenshots/panel-desktop.png" width="400"> | <img src="public/screenshots/panel-desktop-aside.png" width="400"> |

| Panel principal móvil | Panel principal móvil (aside) |
| --- | --- |
| <img src="public/screenshots/panel-mobile.png" width="400"> | <img src="public/screenshots/panel-mobile-aside.png" width="400"> |

| Login desktop | Login móvil |
| --- | --- |
| <img src="public/screenshots/login-desktop.png" width="400"> | <img src="public/screenshots/login-mobile.png" width="400"> |



## 📋 Descripción
Aplicación frontend desarrollada en **Angular 20** para la visualización de datos de calidad del aire en tiempo real.  
Incluye gráficos, animaciones y gestión dinámica de sensores y mediciones.

---

## 📦 Requisitos previos
- [Node.js](https://nodejs.org/) >= 24.5.0
- [Angular CLI](https://angular.dev/tools/cli) >= 20.1.2
- npm o yarn como gestor de paquetes

---

## 🚀 Instalación y uso

### 1️⃣ Clonar repositorio
```bash
git clone https://github.com/Danny-MNXONLINE/frontend-climadata.git
cd frontend-climadata
```

### 2️⃣ Instalar dependencias
```bash
npm install
npm update
```

### 3️⃣ Iniciar servidor de desarrollo
```bash
npm run start
```

### 4️⃣ Ejecutar test
```bash
npm test
```

### 5️⃣ Compilar para produccion
```bash
npm run build
# la aplicacion esta compilada en la carpeta /dist
```

---

## 🏗️ Estructura del proyecto
```
src/
 ├── app/                  # Componentes, servicios y lógica principal
 │    ├── components/      # Componentes de UI
 │    ├── services/        # Servicios y lógica
 |    ├── layouts/         # Layouts
 │    └── app.module.ts
 ├── assets/               # Imágenes, fuentes, estilos globales
 ├── environments/         # Configuración de entornos
 ├── index.html
 └── main.ts
```

---

## 🔧 Más dependencias
```json
    "ngx-skeleton-loader": "^11.2.1",   #libreria de esqueleto de carga
    "rxjs": "~7.8.0",                   #para realizar peticiones http
    "tailwindcss": "^4.1.11",           #tailwind
```

---

## 🔗 Backend
https://github.com/Danny-MNXONLINE/backend-climadata


---

## Futuras funcionalidades y novedades
<ul>
 <li>Documentación</li> 
  <li>Añadir más localidades, por ahora limitado a las Islas Canarias</li>
</ul>
