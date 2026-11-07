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
                alert("No se pudo reproducir el archivo de audio. Verificá que exista en assets/yahoo/yahoo-game.mp3");
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
    const currentYearSpan = document.getElementById('current-year');
    const missionTitle = document.getElementById('mission-title');
    const terminalText = document.getElementById('terminal-text');
    const gameStage = document.getElementById('game-stage');
    const timelineFill = document.getElementById('timeline-fill');

    function actualizarBarraProgreso(index) {
        const totalSteps = stepButtons.length;
        const porcentaje = (index / (totalSteps - 1)) * 100;
        timelineFill.style.width = `${Math.max(12, porcentaje)}%`;
    }

    // Navegación por la línea de tiempo
    stepButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            stepButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const year = button.getAttribute('data-step');
            currentYearSpan.textContent = year;
            actualizarBarraProgreso(index);

            cargarHitoEscenario(year);
        });
    });

    function cargarHitoEscenario(year) {
        switch(year) {
            case '2010':
                missionTitle.textContent = "Adquisición de Associated Content";
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
                terminalText.innerHTML = "> [2010] Yahoo adquiere Associated Content por $100M (Yahoo Voices)[cite: 2, 3].<br>> [ADVERTENCIA] Presioná 'Comprar' para fusionar las marcas.";
                
                document.getElementById('btn-comprar').addEventListener('click', () => {
                    // Ahora ambos logos quedan juntos del lado izquierdo (fusionados)
                    gameStage.innerHTML = `
                        <div style="display: flex; gap: 15px; align-items: center; justify-content: center; grid-column: span 3;">
                            <div class="entity-bubble">
                                <div class="bubble-inner"><img src="assets/yahoo/yahoo-logo.svg" alt="Yahoo"></div>
                                <p>Yahoo!</p>
                            </div>
                            <span style="font-size: 2rem; color: #38bdf8; font-weight: bold;">+</span>
                            <div class="entity-bubble">
                                <div class="bubble-inner"><img src="assets/yahoo/associated-content.svg" alt="Associated Content"></div>
                                <p>Yahoo Voices</p>
                            </div>
                        </div>
                    `;
                    terminalText.innerHTML = "> [ÉXITO] Compra completada. Associated Content integrado como Yahoo Voices bajo la estructura de Yahoo[cite: 2, 3].<br>> [ALERTA] Se heredaron fallas internas de seguridad no resueltas[cite: 2, 3].";
                });
                break;

            case '2012':
                missionTitle.textContent = "1er Ataque Documentado";
                gameStage.innerHTML = `
                    <div class="entity-bubble">
                        <div class="bubble-inner"><img src="assets/yahoo/yahoo-logo.svg" alt="Yahoo"></div>
                        <p>Yahoo Voices</p>
                    </div>
                    <div class="vs-separator">
                        <button id="btn-atacar-2012" class="btn btn-danger pulse-btn">💥 Simular SQL Injection</button>
                    </div>
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #ef4444;"><span style="font-size:2rem;">🔓</span></div>
                        <p>Hacker / SQL</p>
                    </div>
                `;
                terminalText.innerHTML = "> [2012] Yahoo Voices sufre ataque por inyección SQL[cite: 2, 3].<br>> [CRÍTICO] 450.000 contraseñas expuestas en TEXTO PLANO[cite: 2, 3].";
                
                document.getElementById('btn-atacar-2012').addEventListener('click', () => {
                    terminalText.innerHTML = "> [BRECHA CONFIRMADA] Extracción de 450.000 credenciales sin cifrar[cite: 2, 3].<br>> [VIOLACIÓN] Incumplimiento grave del deber de seguridad (Art. 9 Ley 25.326)[cite: 2, 3].";
                });
                break;

            case '2013':
                missionTitle.textContent = "Filtración Masiva (3 Mil Millones)";
                gameStage.innerHTML = `
                    <div class="entity-bubble">
                        <div class="bubble-inner"><img src="assets/yahoo/yahoo-logo.svg" alt="Yahoo"></div>
                        <p>Base de Datos (UDB)</p>
                    </div>
                    <div class="vs-separator">
                        <span style="font-size: 1.5rem; color: #ef4444; font-weight:bold;">⚠️ 3.000 Millones</span>
                    </div>
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #eab308;"><span style="font-size:2rem;">🔑</span></div>
                        <p>Hash MD5 (Débil)</p>
                    </div>
                `;
                terminalText.innerHTML = "> [2013] Sustracción masiva de información de más de mil millones de cuentas (3 mil millones totales)[cite: 2, 3].<br>> [TÉCNICO] Uso del algoritmo hash MD5, vulnerable a ataques de fuerza bruta[cite: 2, 3].";
                break;

            case '2014':
                missionTitle.textContent = "El Clic Fatal / Phishing";
                gameStage.innerHTML = `
                    <div class="entity-bubble">
                        <div class="bubble-inner"><img src="assets/yahoo/yahoo-logo.svg" alt="Yahoo"></div>
                        <p>Red Corporativa</p>
                    </div>
                    <div class="vs-separator">
                        <button id="btn-phishing" class="btn btn-danger pulse-btn">📧 Clic en Phishing</button>
                    </div>
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #ef4444;"><span style="font-size:2rem;">🕵️‍♂️</span></div>
                        <p>Hackers FSB Ruso</p>
                    </div>
                `;
                terminalText.innerHTML = "> [2014] Campaña de phishing dirigida a un empleado de Yahoo[cite: 2, 3].<br>> [INTRUSIÓN] Acceso a la UDB y fabricación de cookies falsas de autenticación[cite: 2, 3].";
                
                document.getElementById('btn-phishing').addEventListener('click', () => {
                    terminalText.innerHTML = "> [ACCESO TOTAL] Credenciales corporativas comprometidas[cite: 2, 3].<br>> [OPERACIÓN] Suplantación de al menos 6.500 cuentas de alto interés[cite: 2, 3].";
                });
                break;

            case '2016':
                missionTitle.textContent = "Venta a Verizon y Revelación";
                gameStage.innerHTML = `
                    <div class="entity-bubble">
                        <div class="bubble-inner"><img src="assets/yahoo/yahoo-logo.svg" alt="Yahoo"></div>
                        <p>Yahoo Negocio</p>
                    </div>
                    <div class="vs-separator">
                        <span style="font-size: 1.5rem; color: #38bdf8; font-weight:bold;">🤝 USD 4.830M</span>
                    </div>
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #3b82f6;"><span style="font-size:2rem;">📡</span></div>
                        <p>Verizon Communications</p>
                    </div>
                `;
                terminalText.innerHTML = "> [JULIO 2016] Verizon acuerda comprar el negocio operativo por $4.830M[cite: 2, 3].<br>> [SEPTIEMBRE 2016] Revelación pública de la brecha de 2013, 3 años después[cite: 2, 3].";
                break;

            case '2017':
                missionTitle.textContent = "Renegociación y Altaba";
                gameStage.innerHTML = `
                    <div class="entity-bubble">
                        <div class="bubble-inner"><img src="assets/yahoo/yahoo-logo.svg" alt="Yahoo"></div>
                        <p>Altaba Inc.</p>
                    </div>
                    <div class="vs-separator">
                        <button id="btn-descuento" class="btn btn-warning pulse-btn">📉 Aplicar Descuento $350M</button>
                    </div>
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #10b981;"><span style="font-size:2rem;">💼</span></div>
                        <p>Verizon / Oath</p>
                    </div>
                `;
                terminalText.innerHTML = "> [2017] Verizon rebaja la compra en $350M (Precio final: $4.480M)[cite: 2, 3].<br>> [NACIMIENTO] El resto de Yahoo pasa a llamarse Altaba Inc[cite: 2, 3].";
                
                document.getElementById('btn-descuento').addEventListener('click', () => {
                    terminalText.innerHTML = "> [RENEGOCIACIÓN EXITOSA] Precio final fijado en $4.480 millones[cite: 2, 3].<br>> [ESTRUCTURA] Cierre de venta y creación de Altaba Inc[cite: 2, 3].";
                });
                break;

            case '2018':
                missionTitle.textContent = "Sanción SEC y Demandas";
                gameStage.innerHTML = `
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #f59e0b;"><span style="font-size:2rem;">🏛️</span></div>
                        <p>Multa SEC ($35M)</p>
                    </div>
                    <div class="vs-separator">
                        <span style="font-size: 1.3rem; color: #ef4444; font-weight:bold;">⚖️ USD 152.5M Total</span>
                    </div>
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #ef4444;"><span style="font-size:2rem;">👥</span></div>
                        <p>Demandas Colectivas</p>
                    </div>
                `;
                terminalText.innerHTML = "> [2018] La SEC sanciona a Altaba con $35M por ocultar ciberataques a inversores[cite: 2, 3].<br>> [ACUERDOS] $80M accionistas, $29M directores y $117.5M fondo para usuarios[cite: 2, 3].";
                break;

            case '2019':
                missionTitle.textContent = "Sanción en Argentina (AAIP)";
                gameStage.innerHTML = `
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #38bdf8;"><span style="font-size:2rem;">🇦🇷</span></div>
                        <p>AAIP Argentina</p>
                    </div>
                    <div class="vs-separator">
                        <span style="font-size: 1.3rem; color: #00ff66; font-weight:bold;">💰 $105.000 ARS</span>
                    </div>
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #a855f7;"><span style="font-size:2rem;">🔒</span></div>
                        <p>Backups sin cifrar</p>
                    </div>
                `;
                terminalText.innerHTML = "> [JUNIO 2019] AAIP sanciona a Yahoo! Argentina con $105.000 pesos[cite: 2, 3].<br>> [CAUSA] Cifrado deficiente en copias de seguridad (tar/gzip) y no informar baja[cite: 2, 3].";
                break;
        }
    }
});