document.addEventListener('DOMContentLoaded', () => {
    // 1. Gestión de Audio de Fondo
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

    // Reproductor de efectos sintéticos nativos (Bips, Alertas, Éxito)
    function reproducirSonido(tipo = 'bip') {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            if (tipo === 'bip') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.15);
            } else if (tipo === 'alerta') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(160, audioCtx.currentTime);
                osc.frequency.linearRampToValueAtTime(70, audioCtx.currentTime + 0.3);
                gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.3);
            } else if (tipo === 'exito') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(440, audioCtx.currentTime);
                osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1);
                gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.3);
            }
        } catch (e) {
            // Contexto inactivo si no hubo clic inicial
        }
    }

    // 2. Navegación e Historia
    const stepButtons = document.querySelectorAll('.step-btn');
    const terminalText = document.getElementById('terminal-text');
    const gameStage = document.getElementById('game-stage');
    const timelineFill = document.getElementById('timeline-fill');

    function actualizarBarraProgreso(index) {
        const totalSteps = stepButtons.length;
        const porcentaje = (index / (totalSteps - 1)) * 100;
        timelineFill.style.width = `${Math.max(10, porcentaje)}%`;
    }

    stepButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            stepButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const year = button.getAttribute('data-step');
            actualizarBarraProgreso(index);
            reproducirSonido('bip');

            cargarHitoEscenario(year);
        });
    });

    // Componente visual para Yahoo con el logo de AC detrás
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
                    reproducirSonido('exito');
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
                    <div class="vs-separator" id="action-2012">
                        <button id="btn-atacar-2012" class="btn btn-danger pulse-btn">💥 Simular SQL Injection</button>
                    </div>
                    <div class="entity-bubble" id="hacker-box">
                        <div class="bubble-inner" style="border-color: #ef4444;"><span style="font-size:2rem;">🔓</span></div>
                        <p>Hacker / SQL</p>
                    </div>
                `;
                terminalText.innerHTML = "> [2012] Yahoo Voices sufre ataque por inyección SQL.<br>> [CRÍTICO] 450.000 contraseñas expuestas en texto plano.";
                
                document.getElementById('btn-atacar-2012').addEventListener('click', () => {
                    reproducirSonido('alerta');
                    document.getElementById('action-2012').innerHTML = `
                        <div class="dialog-bubble">
                            💻 <strong>¡Robé tus contraseñas!</strong><br>Estaban completamente sin cifrar en la base de datos.
                        </div>
                    `;
                    document.getElementById('hacker-box').querySelector('.bubble-inner').innerHTML = `<span style="font-size:2rem;">🦹‍♂️</span>`;
                    terminalText.innerHTML = "> [BRECHA CONFIRMADA] Extracción de 450.000 credenciales en texto plano.<br>> [VIOLACIÓN] Incumplimiento grave del deber de seguridad.";
                });
                break;

            case '2013':
                gameStage.innerHTML = `
                    ${yahooConAC}
                    <div class="vs-separator" id="action-2013">
                        <button id="btn-md5" class="btn btn-warning pulse-btn">⚡ Revelar Brecha Masiva</button>
                    </div>
                    <div class="entity-bubble" id="world-box">
                        <div class="bubble-inner" style="border-color: #eab308;"><span style="font-size:2rem;">🔑</span></div>
                        <p>Hash MD5 (Débil)</p>
                    </div>
                `;
                terminalText.innerHTML = "> [2013] Sustracción masiva de información en la infraestructura.<br>> [TÉCNICO] Uso del vulnerable algoritmo hash MD5.";
                
                document.getElementById('btn-md5').addEventListener('click', () => {
                    reproducirSonido('alerta');
                    document.getElementById('action-2013').innerHTML = `
                        <div class="dialog-bubble global-alert">
                            🌐 <strong>¡ALERTA GLOBAL!</strong><br>3 mil millones de cuentas comprometidas en todo el mundo.
                        </div>
                    `;
                    document.getElementById('world-box').classList.add('md5-glow');
                    document.getElementById('world-box').querySelector('.bubble-inner').innerHTML = `<span style="font-size:2rem;">🌍</span>`;
                    terminalText.innerHTML = "> [CRACKED] Ataque masivo exitoso sobre hashes MD5.<br>> [HISTÓRICO] La mayor brecha de seguridad de la historia.";
                });
                break;

            case '2014':
                gameStage.innerHTML = `
                    ${yahooConAC}
                    <div class="vs-separator" id="action-2014">
                        <button id="btn-phishing" class="btn btn-danger pulse-btn">📧 Abrir Phishing</button>
                    </div>
                    <div class="entity-bubble" id="employee-box">
                        <div class="bubble-inner" style="border-color: #3b82f6;"><span style="font-size:2rem;">👨‍💼</span></div>
                        <p>Empleado de Yahoo</p>
                    </div>
                `;
                terminalText.innerHTML = "> [2014] Campaña de phishing dirigida a un empleado.<br>> [INTRUSIÓN] Acceso inicial a la red corporativa.";
                
                document.getElementById('btn-phishing').addEventListener('click', () => {
                    reproducirSonido('alerta');
                    document.getElementById('action-2014').innerHTML = `
                        <div class="dialog-bubble shake-animation" style="border-color: #ef4444;">
                            😱 <strong>¡Hice clic sin querer!</strong><br>Facilité el acceso al sistema interno de Yahoo.
                        </div>
                    `;
                    const empBox = document.getElementById('employee-box');
                    empBox.classList.add('shake-animation');
                    empBox.querySelector('.bubble-inner').innerHTML = `<span style="font-size:2rem;">😰</span>`;
                    empBox.querySelector('p').textContent = "Empleado Asustado";
                    terminalText.innerHTML = "> [ACCESO TOTAL] Credenciales corporativas comprometidas.<br>> [OPERACIÓN] Hackers sustraen datos de la UDB y generan cookies falsas.";
                });
                break;

            case '2016':
                gameStage.innerHTML = `
                    ${yahooConAC}
                    <div class="vs-separator" id="action-2016">
                        <button id="btn-verizon" class="btn btn-primary pulse-btn">🤝 Firmar Acuerdo ($4.830M)</button>
                    </div>
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #ef4444;">
                            <img src="assets/yahoo/verizon.jpg" alt="Verizon" class="verizon-img">
                        </div>
                        <p>Verizon Communications</p>
                    </div>
                `;
                terminalText.innerHTML = "> [JULIO 2016] Verizon acuerda comprar el negocio operativo de Yahoo por $4.830M.<br>> [OCULTO] La brecha masiva de 2013 aún se mantenía en secreto.";
                
                document.getElementById('btn-verizon').addEventListener('click', () => {
                    reproducirSonido('alerta');
                    document.getElementById('action-2016').innerHTML = `
                        <div class="dialog-bubble global-alert">
                            📰 <strong>¡ESCÁNDALO!</strong><br>Yahoo revela públicamente la brecha masiva 3 años después.
                        </div>
                    `;
                    terminalText.innerHTML = "> [REVELACIÓN] Verizon descubre que la brecha afectó a 3.000 millones de usuarios.<br>> [CRISIS] Verizon amenaza con cancelar la compra si no hay rebaja.";
                });
                break;

            case '2017':
                gameStage.innerHTML = `
                    <div class="entity-bubble" id="yahoo-transform">
                        <div class="bubble-inner"><img src="assets/yahoo/yahoo-logo.svg" alt="Yahoo"></div>
                        <p id="label-yahoo">Yahoo!</p>
                    </div>
                    <div class="vs-separator" id="action-2017">
                        <button id="btn-renegociar" class="btn btn-warning pulse-btn">📉 Aplicar Descuento $350M</button>
                    </div>
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #3b82f6;">
                            <img src="assets/yahoo/verizon.jpg" alt="Verizon" class="verizon-img">
                        </div>
                        <p>Verizon (Oath)</p>
                    </div>
                `;
                terminalText.innerHTML = "> [2017] Se exige la rebaja del precio de compra por las fallas de seguridad ocultas.<br>> [ACCION] Aplicá el descuento para concretar la escisión.";
                
                document.getElementById('btn-renegociar').addEventListener('click', () => {
                    reproducirSonido('exito');
                    // Animación de transformación de Yahoo a Altaba Inc.
                    const yBox = document.getElementById('yahoo-transform');
                    yBox.classList.add('morph-altaba');
                    yBox.querySelector('.bubble-inner').innerHTML = `<span style="font-size:2rem;">💼</span>`;
                    document.getElementById('label-yahoo').textContent = "Altaba Inc.";

                    document.getElementById('action-2017').innerHTML = `
                        <div class="dialog-bubble" style="border-color: #10b981;">
                            ✅ <strong>¡Venta Cerrada!</strong><br>Precio rebajado a $4.480M. Nace Altaba Inc. para absorber juicios.
                        </div>
                    `;
                    terminalText.innerHTML = "> [RENEGOCIACIÓN EXITOSA] Verizon absorbe el negocio operativo como Oath.<br>> [ESCISIÓN] Lo que quedó de Yahoo se rebautiza como Altaba Inc.";
                });
                break;

            case '2018':
                gameStage.innerHTML = `
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #10b981;"><span style="font-size:2rem;">💼</span></div>
                        <p>Altaba Inc. (Yahoo)</p>
                    </div>
                    <div class="vs-separator" id="action-2018">
                        <button id="btn-sancionar-2018" class="btn btn-danger pulse-btn">⚖️ Recibir Sanciones SEC</button>
                    </div>
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #f59e0b;"><span style="font-size:2rem;">🏛️</span></div>
                        <p>SEC & Justicia EE.UU.</p>
                    </div>
                `;
                terminalText.innerHTML = "> [2018] La SEC y los tribunales evalúan sanciones contra la junta de Altaba.<br>> [ACCION] Ejecutar resoluciones judiciales.";
                
                document.getElementById('btn-sancionar-2018').addEventListener('click', () => {
                    reproducirSonido('alerta');
                    document.getElementById('action-2018').innerHTML = `
                        <div class="dialog-bubble global-alert">
                            💸 <strong>$152.5M en Multas</strong><br>$35M SEC por ocultamiento + $117.5M usuarios y accionistas.
                        </div>
                    `;
                    terminalText.innerHTML = "> [SANCIÓN SEC] Primera multa histórica a una empresa por ocultar un ciberataque a inversores.<br>> [ACUERDO] $117.5M destinados al fondo de compensación de usuarios.";
                });
                break;

            case '2019':
                gameStage.innerHTML = `
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #a855f7;"><span style="font-size:2rem;">💻</span></div>
                        <p>Yahoo! Argentina S.R.L.</p>
                    </div>
                    <div class="vs-separator" id="action-2019">
                        <button id="btn-aaip" class="btn btn-danger pulse-btn">🏛️ Aplicar Dictamen AAIP</button>
                    </div>
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #38bdf8;"><span style="font-size:2rem;">🇦🇷</span></div>
                        <p>AAIP Argentina</p>
                    </div>
                `;
                terminalText.innerHTML = "> [JUNIO 2019] La Agencia de Acceso a la Información Pública analiza el caso en Argentina.<br>> [ACCION] Aplicar resolución regulatoria.";
                
                document.getElementById('btn-aaip').addEventListener('click', () => {
                    reproducirSonido('alerta');
                    document.getElementById('action-2019').innerHTML = `
                        <div class="dialog-bubble" style="border-color: #38bdf8;">
                            🇦🇷 <strong>Sanción $105.000 ARS</strong><br>Multa por backups sin cifrar y no informar la baja registral.
                        </div>
                    `;
                    terminalText.innerHTML = "> [SANCIÓN AAIP] Infracción al Art. 9 de la Ley 25.326 por copias de seguridad en tar/gzip sin cifrar.<br>> [PRECEDENTE] Primer caso en Argentina sancionado por brechas técnicas de seguridad.";
                });
                break;

            case '2026':
                gameStage.innerHTML = `
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #64748b;"><span style="font-size:2rem;">🏛️</span></div>
                        <p>Altaba Liquidación</p>
                    </div>
                    <div class="vs-separator">
                        <div class="dialog-bubble" style="border-color: #64748b;">
                            💀 <strong>Cascarón Financiero</strong><br>Entidad sin operaciones, dedicada solo a vender activos y liquidar pasivos legales.
                        </div>
                    </div>
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #38bdf8;"><span style="font-size:2rem;">⚖️</span></div>
                        <p>Estado Actual</p>
                    </div>
                `;
                terminalText.innerHTML = "> [ESTADO ACTUAL 2026] Yahoo! original dejó de existir como empresa operativa.<br>> [CONCLUSION] La negligencia técnica y la falta de transparencia destruyeron a un gigante pionero de la Web.";
                reproducirSonido('bip');
                break;
        }
    }
});