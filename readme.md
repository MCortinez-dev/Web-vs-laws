# 🎮 Game World | Plataforma Educativa Web & Leyes de Datos

> Proyecto académico interactivo desarrollado en **HTML5, CSS3 modular y JavaScript vainilla**, enfocado en la concientización sobre la privacidad en Internet, la seguridad informática y las normativas de protección de datos personales (con especial foco en la **Ley 25.326 de Argentina**).

---

## 👥 Equipo de Desarrollo y Colaboradores

* **Docente a cargo:** *(Nombre del Profesor/a)*
* **Jimena Quenallata** – [@jimenaquenallata](https://github.com/jimenaquenallata)
* **Damián Domínguez** – [@Damianmdominguez](https://github.com/Damianmdominguez)
* **Germán Bisutti** – [@German-Bisutti](https://github.com/German-Bisutti)
* **Matías Cortínez** – [@MCortinez-dev](https://github.com/MCortinez-dev)

---

## 🎯 ¿Qué es Game World?

**Game World** es una plataforma web didáctica simulada que combina el entretenimiento visual (minijuegos interactivos, ruleta de premios y carruseles) con casos de estudio reales sobre ciberseguridad y derecho informático. El objetivo principal es demostrar de forma lúdica cómo una mala gestión de bases de datos o la recolección excesiva de información personal vulnera los derechos de los usuarios.

### 🌟 Características Principales:
* **Cronología Interactiva del Caso Yahoo:** Un recorrido visual e interactivo (desde 2010 hasta 2026) que detalla la mayor brecha de datos de la historia, las consecuencias de los hashes MD5 débiles, inyecciones SQL, la venta a Verizon y las multas regulatorias de la SEC y la AAIP (Argentina).
* **Simulación de Recolección de Datos:** Formularios educativos que alertan sobre los peligros de solicitar datos sensibles (grupo sanguíneo, religión) sin cumplir con el principio de finalidad de la Ley 25.326.
* **Panel de Usuario y Minijuegos:** Área interactiva local con almacenamiento en `localStorage` y un minijuego de agilidad ("Atrapá al gato").

---

## 📂 Estructura del Proyecto

```text
D:.
|   caso-yahoo.html
|   index.html
|   panel.html
|   register.html
|   
+---assets
|   +---carousel
|   |       slide-01.jpg
|   |       slide-02.jpg
|   |       slide-03.jpg
|   +---favicon
|   |       apple-touch-icon.png
|   |       favicon-16x16.png
|   |       favicon-32x32.png
|   +---gato
|   |   +---geisha
|   |   |       frame_01.png ... frame_06.png
|   |   \---ninja
|   |           frame_01.png ... frame_06.png
|   +---juego
|   |       cat.svg
|   |       fondo-juego.jpg
|   +---ruleta
|   |       ruleta.png
|   +---screenshots
|   |       screen-1.png
|   |       screen-2.png
|   \---yahoo
|           associated-content.svg
|           verizon.jpg
|           yahoo-game.mp3
|           yahoo-logo.svg
|   
+---components
|       footer.html
|       header.html
|   
+---css
|       auth.css
|       base.css
|       components.css
|       home.css
|       panel.css
|       variables.css
|       yahoo-game.css
|   
\---js
        include-components.js
        main.js
        panel.js
        register.js
        yahoo-game.js
```

---

## 📸 Capturas de Pantalla

| Inicio (`index.html`) | Caso Yahoo! (`caso-yahoo.html`) |
| :---: | :---: |
| ![Inicio Game World](screenshoots/screen-1.png) | ![Caso Yahoo!](docs/screenshoot-2.png) |
	
## ⚖️ Marco Legal y Normativa Aplicada

El proyecto analiza y ejemplifica los artículos clave de la legislación vigente:

    Ley 25.326 de Protección de Datos Personales (Argentina): Tratamiento de datos sensibles (Art. 2 y 7), principio de finalidad y proporcionalidad (Art. 4), consentimiento informado (Art. 5 y 6), deber de seguridad (Art. 9) y derecho de supresión (Art. 16).

    AAIP (Agencia de Acceso a la Información Pública): Sanciones y precedentes sobre copias de seguridad deficientes.

    Jurisprudencia Internacional: Caso Google Spain (Derecho al olvido) y análisis financiero/legal del colapso operativo de Yahoo e incorporación a Altaba Inc.

---

## 🚀 Despliegue y Ejecución Local

    1. Clonar el repositorio:
    
    ```Bash
    git clone [https://github.com/tu-usuario/WebVsLaws.git](https://github.com/tu-usuario/WebVsLaws.git)
    ```

    2. Abrir la carpeta del proyecto en tu editor de código (como VS Code).
    3. Levantar un servidor local (por ejemplo, utilizando la extensión Live Server) para permitir la carga dinámica de los componentes de header.html y footer.html.