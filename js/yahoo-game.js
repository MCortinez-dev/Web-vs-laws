<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game World | Caso Yahoo!</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/yahoo-game.css">
</head>
<body>

    <!-- Header (Consistente con index.html) -->
    <header class="site-header">
        <a href="index.html" class="logo" aria-label="Ir al inicio de Game World">
            <img src="assets/favicon/favicon-32x32.png" alt="" class="logo-icon" width="32" height="32">
            <span class="logo-text">Game World</span>
        </a>
        <nav class="main-nav" aria-label="Navegación principal">
            <ul>
                <li><a href="index.html#carousel">Promociones</a></li>
                <li><a href="index.html#ruleta">Ruleta</a></li>
                <li><a href="index.html#contacto">Contacto</a></li>
            </ul>
        </nav>
        <div class="auth-actions">
            <a href="panel.html" class="btn btn-secondary">Iniciar sesión</a>
            <a href="register.html" class="btn btn-primary">Registrate</a>
        </div>
    </header>

    <main class="yahoo-container">
        <header class="game-header">
            <h1>Caso Yahoo!: La Cronología de una Brecha</h1>
            <p>Avanzá por la línea de tiempo cumpliendo las acciones de cada hito para entender la caída de un gigante.</p>
        </header>

        <!-- HUD / Indicador de Año y Misión -->
        <div class="game-hud">
            <span class="year-badge">📅 AÑO: <span id="current-year">2010</span></span>
            <span class="mission-title" id="mission-title">Hito: Adquisición de Associated Content</span>
        </div>

        <!-- Barra de progreso / Línea de tiempo -->
        <nav class="timeline-nav">
            <button class="step-btn active" data-step="2010">2010</button>
            <button class="step-btn" data-step="2012">2012</button>
            <button class="step-btn" data-step="2013">2013</button>
            <button class="step-btn" data-step="2014">2014</button>
            <button class="step-btn" data-step="2016">2016</button>
            <button class="step-btn" data-step="2017">2017</button>
            <button class="step-btn" data-step="2018">2018</button>
            <button class="step-btn" data-step="2019">2019</button>
        </nav>

        <!-- Tablero de Juego (Izquierda vs Derecha) -->
        <section class="versus-stage">
            <!-- Izquierda: Yahoo -->
            <div class="entity-box">
                <img src="assets/yahoo/yahoo-logo.svg" alt="Yahoo">
                <p>Yahoo!</p>
            </div>

            <div class="vs-separator">⚡</div>

            <!-- Derecha: Elemento interactivo / Empresa o Evento -->
            <div class="entity-box" id="drop-target">
                <img src="assets/yahoo/associated-content.svg" alt="Associated Content">
                <p>Associated Content ($100M)</p>
            </div>
        </section>

        <!-- Pantalla Retro / Terminal MS-DOS para logs e historia -->
        <section class="retro-tv" style="margin-top: 20px;">
            <p id="terminal-text">> [SISTEMA INICIALIZADO] Año 2010: Yahoo adquiere Associated Content por $100 millones.</p>
            <p>> [ADVERTENCIA] La plataforma arrastraba fallas de seguridad internas sin resolver...</p>
        </section>

        <!-- Panel de explicación legal/técnica -->
        <aside class="legal-feedback" id="legal-feedback" style="margin-top: 20px;">
            <h3>⚖️ Impacto Legal y Regulatorio</h3>
            <p id="feedback-text">Completá la acción del año 2010 para avanzar en la cronología.</p>
        </aside>
    </main>

    <!-- Footer (Consistente con index.html) -->
    <footer class="site-footer">
        <p class="footer-aviso"><strong>Proyecto educativo</strong> sobre protección de datos personales y regulaciones de Internet.</p>
        <p class="footer-copyright">&copy; 2026 Game World - Todos los derechos reservados</p>
    </footer>

    <!-- Archivo JavaScript principal del juego -->
    <script src="js/yahoo-game.js"></script>
</body>
</html>