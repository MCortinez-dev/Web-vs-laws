document.addEventListener('DOMContentLoaded', () => {
    // 1. Gestión de Audio con Botón Dedicado
    const backgroundMusic = new Audio('assets/yahoo/yahoo-game.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.4;
    
    const btnAudio = document.getElementById('btn-audio');
    let isPlaying = false;

    btnAudio.addEventListener('click', () => {
        if (!isPlaying) {
            backgroundMusic.play().then(() => {
                isPlaying = true;
                btnAudio.textContent = "🔊 Música: ON";
                btnAudio.classList.remove('btn-secondary');
                btnAudio.classList.add('btn-primary');
            }).catch(e => {
                console.log("Error al reproducir audio:", e);
            });
        } else {
            backgroundMusic.pause();
            isPlaying = false;
            btnAudio.textContent = "🎵 Música: OFF";
            btnAudio.classList.remove('btn-primary');
            btnAudio.classList.add('btn-secondary');
        }
    });

    // 2. Elementos del DOM
    const stepButtons = document.querySelectorAll('.step-btn');
    const terminalText = document.getElementById('terminal-text');
    const gameStage = document.getElementById('game-stage');
    const timelineFill = document.getElementById('timeline-fill');

    function actualizarBarraProgreso(index) {
        const totalSteps = stepButtons.length;
        const porcentaje = (index / (totalSteps - 1)) * 100;
        timelineFill.style.width = `${Math.max(12, porcentaje)}%`;
    }

    // Función para disparar partículas de datos robados hacia el hacker/derecha
    function dispararPaqueteDatos() {
        const stageRect = gameStage.getBoundingClientRect();
        const packet = document.createElement('div');
        packet.classList.add('data-packet');
        packet.style.top = `${stageRect.height / 2}px`;
        packet.style.left = `120px`;
        gameStage.appendChild(packet);
        setTimeout(() => packet.remove(), 1000);
    }

    // Navegación por la línea de tiempo
    stepButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            stepButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const year = button.getAttribute('data-step');
            actualizarBarraProgreso(index);

            cargarHitoEscenario(year);
        });
    });

    // Componente visual reutilizable para Yahoo que incluye el logo de AC integrado detrás/al lado
    const yahooConAC = `
        <div class="entity-bubble" style="position: relative;">
            <div class="bubble-inner"><img src="assets/yahoo/yahoo-logo.svg" alt="Yahoo"></div>
            <div style="position: absolute; bottom: 25px; right: -5px; width: 45px; height: 45px; border-radius: 50%; background: #1a1a2e; border: 2px solid #3b3b5c; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 8px rgba(0,0,0,0.6);">
                <img src="assets/yahoo/associated-content.svg" alt="AC" style="max-width: 25px;">
            </div>
            <p>Yahoo Voices</p>
        </div>
    `;

    function cargarHitoEscenario(year) {
        switch(year) {
            case '2010':
                gameStage.innerHTML = `
                    <div class="entity-bubble" id="yahoo-bubble">
                        <div class="bubble-inner"><img src="assets/yahoo/yahoo-logo.svg" alt="Yahoo"></div>
                        <p>Yahoo!</p>
                    </div>
                    <div class="vs-separator" id="stage-action-area">
                        <button id="btn-comprar" class="btn btn-primary pulse-btn">🤝 Comprar ($100M)</button>
                    </div>
                    <div class="entity-bubble" id="ac-bubble">
                        <div class="bubble-inner"><img src="assets/yahoo/associated-content.svg" alt="Associated Content"></div>
                        <p>Associated Content</p>
                    </div>
                `;
                terminalText.innerHTML = "> [2010] Yahoo adquiere Associated Content por $100M.<br>> [ADVERTENCIA] Presioná 'Comprar' para integrar la empresa.";
                
                document.getElementById('btn-comprar').addEventListener('click', () => {
                    gameStage.innerHTML = `
                        <div style="display: flex; gap: 20px; align-items: center; justify-content: center; grid-column: span 3;">
                            ${yahooConAC}
                            <span style="font-size: 1.5rem; color: #38bdf8; font-weight: bold;">➔ Integrado con éxito</span>
                        </div>
                    `;
                    terminalText.innerHTML = "> [ÉXITO] Associated Content incorporado como Yahoo Voices.<br>> [ALERTA] Se heredaron fallas internas de seguridad no resueltas.";
                });
                break;

            case '2012':
                gameStage.innerHTML = `
                    ${yahooConAC}
                    <div class="vs-separator">
                        <button id="btn-atacar-2012" class="btn btn-danger pulse-btn">💥 Simular SQL Injection</button>
                    </div>
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #ef4444;"><span style="font-size:2rem;">🔓</span></div>
                        <p>Hacker / SQL</p>
                    </div>
                `;
                terminalText.innerHTML = "> [2012] Yahoo Voices sufre ataque por inyección SQL.<br>> [CRÍTICO] 450.000 contraseñas expuestas en texto plano.";
                
                document.getElementById('btn-atacar-2012').addEventListener('click', () => {
                    dispararPaqueteDatos();
                    setTimeout(dispararPaqueteDatos, 300);
                    terminalText.innerHTML = "> [BRECHA] Extracción de 450.000 credenciales sin cifrar.<br>> [VIOLACIÓN] Incumplimiento del deber de seguridad.";
                });
                break;

            case '2013':
                gameStage.innerHTML = `
                    ${yahooConAC}
                    <div class="vs-separator">
                        <button id="btn-md5" class="btn btn-warning pulse-btn">⚡ Forzar Ataque MD5</button>
                    </div>
                    <div class="entity-bubble md5-glow">
                        <div class="bubble-inner" style="border-color: #eab308;"><span style="font-size:2rem;">🔑</span></div>
                        <p>Hash MD5 (Débil)</p>
                    </div>
                `;
                terminalText.innerHTML = "> [2013] Sustracción masiva de información de 3 mil millones de cuentas.<br>> [TÉCNICO] Uso del vulnerable algoritmo hash MD5.";
                
                document.getElementById('btn-md5').addEventListener('click', () => {
                    dispararPaqueteDatos();
                    setTimeout(dispararPaqueteDatos, 200);
                    setTimeout(dispararPaqueteDatos, 500);
                    terminalText.innerHTML = "> [CRACKED] Ataque de fuerza bruta exitoso sobre hashes MD5 débiles.<br>> [ALERTA] La brecha más grande de la historia digital.";
                });
                break;

            case '2014':
                gameStage.innerHTML = `
                    ${yahooConAC}
                    <div class="vs-separator">
                        <button id="btn-phishing" class="btn btn-danger pulse-btn">📧 Clic en Phishing</button>
                    </div>
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #ef4444;"><span style="font-size:2rem;">🕵️‍♂️</span></div>
                        <p>Hackers FSB Ruso</p>
                    </div>
                `;
                terminalText.innerHTML = "> [2014] Campaña de phishing dirigida a un empleado de Yahoo.<br>> [INTRUSIÓN] Acceso a la UDB y fabricación de cookies falsas.";
                
                document.getElementById('btn-phishing').addEventListener('click', () => {
                    dispararPaqueteDatos();
                    terminalText.innerHTML = "> [ACCESO TOTAL] Credenciales corporativas comprometidas.<br>> [OPERACIÓN] Suplantación de cuentas clave de interés.";
                });
                break;

            case '2016':
                gameStage.innerHTML = `
                    ${yahooConAC}
                    <div class="vs-separator">
                        <span style="font-size: 1.3rem; color: #38bdf8; font-weight:bold;">🤝 USD 4.830M</span>
                    </div>
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #3b82f6;"><span style="font-size:2rem;">📡</span></div>
                        <p>Verizon Communications</p>
                    </div>
                `;
                terminalText.innerHTML = "> [JULIO 2016] Verizon acuerda comprar el negocio operativo por $4.830M.<br>> [SEPTIEMBRE 2016] Revelación pública de la brecha de 2013.";
                break;

            case '2017':
                gameStage.innerHTML = `
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #10b981;"><span style="font-size:2rem;">💼</span></div>
                        <p>Altaba Inc.</p>
                    </div>
                    <div class="vs-separator">
                        <button id="btn-descuento" class="btn btn-warning pulse-btn">📉 Aplicar Descuento $350M</button>
                    </div>
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #3b82f6;"><span style="font-size:2rem;">📡</span></div>
                        <p>Verizon / Oath</p>
                    </div>
                `;
                terminalText.innerHTML = "> [2017] Verizon rebaja la compra en $350M (Precio final: $4.480M).<br>> [NACIMIENTO] El resto de Yahoo pasa a llamarse Altaba Inc.";
                
                document.getElementById('btn-descuento').addEventListener('click', () => {
                    terminalText.innerHTML = "> [RENEGOCIACIÓN] Precio final fijado en $4.480 millones.<br>> [ESTRUCTURA] Creación de Altaba Inc. para pasivos.";
                });
                break;

            case '2018':
                gameStage.innerHTML = `
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #f59e0b;"><span style="font-size:2rem;">🏛️</span></div>
                        <p>Multa SEC ($35M)</p>
                    </div>
                    <div class="vs-separator">
                        <span style="font-size: 1.2rem; color: #ef4444; font-weight:bold;">⚖️ USD 152.5M Total</span>
                    </div>
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #ef4444;"><span style="font-size:2rem;">👥</span></div>
                        <p>Demandas Colectivas</p>
                    </div>
                `;
                terminalText.innerHTML = "> [2018] La SEC sanciona a Altaba con $35M por ocultar ciberataques.<br>> [ACUERDOS] $80M accionistas, $29M directores y $117.5M usuarios.";
                break;

            case '2019':
                gameStage.innerHTML = `
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #38bdf8;"><span style="font-size:2rem;">🇦🇷</span></div>
                        <p>AAIP Argentina</p>
                    </div>
                    <div class="vs-separator">
                        <span style="font-size: 1.2rem; color: #00ff66; font-weight:bold;">💰 $105.000 ARS</span>
                    </div>
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #a855f7;"><span style="font-size:2rem;">🔒</span></div>
                        <p>Backups sin cifrar</p>
                    </div>
                `;
                terminalText.innerHTML = "> [JUNIO 2019] AAIP sanciona a Yahoo! Argentina con $105.000 pesos.<br>> [CAUSA] Cifrado deficiente en copias de seguridad y omisión de baja.";
                break;
        }
    }
});