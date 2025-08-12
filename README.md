# Proyecto Frontend — Panel de Calidad del Aire

[![Angular](https://img.shields.io/badge/Angular-20.1.2-red?logo=angular)](https://angular.io/)
[![Node](https://img.shields.io/badge/Node.js-20.5.0-green?logo=node.js)](https://nodejs.org/)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen?logo=githubactions)](#)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.2.2-blue)](#)

---

## 📋 Descripción
Aplicación frontend desarrollada en **Angular 20** para la visualización de datos de calidad del aire en tiempo real.  
Incluye gráficos, animaciones y gestión dinámica de sensores y mediciones.

---

## 📦 Requisitos previos
- [Node.js](https://nodejs.org/) >= 24.5.0
- [Angular CLI](https://angular.io/cli) >= 20.1.2
- npm o yarn como gestor de paquetes

---

## 🚀 Instalación y uso

### 1️⃣ Clonar repositorio
```bash
git clone https://github.com/usuario/proyecto-frontend.git
cd proyecto-frontend
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

### 4️⃣ Ejectuar tests
```bash
npm test
```

### 5️⃣ Compliar para produccion
```bash
npm run build
# la aplicacion esta compilanda en la carpeta /dist
```

---

## 🏗️ Estructura del proyecto
```bash
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

## 🔧 Mas dependencias
```bash
    "ngx-skeleton-loader": "^11.2.1",
    "postcss": "^8.5.6",
    "rxjs": "~7.8.0",
    "tailwindcss": "^4.1.11",
    "tslib": "^2.3.0",
    "zone.js": "~0.15.0"
```

---

## 🔗 Backend
```bash
#enlace al repo del backend
https://github.com/Danny-MNXONLINE/backend-climadata
```

---

## Future Features and additions
<ul>
 <li>Documentation, actual documentation is on its way</li> 
  <li>add more locations, now limited to Canary Islands</li>
</ul>
