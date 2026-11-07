document.addEventListener('DOMContentLoaded', () => {
    // 1. Gestión de Audio de Fondo con Botón Dedicado
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

    // Generador de efectos de sonido sintéticos (Bips, Alertas, Éxito) nativos
    function reproducirSonido(tipo = 'bip') {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            if (tipo === 'bip') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
                gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.15);
            } else if (tipo === 'alerta') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, audioCtx.currentTime);
                osc.frequency.linearRampToValueAtTime(80, audioCtx.currentTime + 0.3);
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
            // AudioContext bloqueado si no hubo interacción previa
        }
    }

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
                    terminalText.innerHTML = "> [ÉXITO] Associated Content incorporado como Yahoo Voices[cite: 2, 3].<br>> [ALERTA] Se heredaron fallas internas de seguridad no resueltas[cite: 2, 3].";
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
                terminalText.innerHTML = "> [2012] Yahoo Voices sufre ataque por inyección SQL[cite: 2, 3].<br>> [CRÍTICO] 450.000 contraseñas expuestas en texto plano[cite: 2, 3].";
                
                document.getElementById('btn-atacar-2012').addEventListener('click', () => {
                    reproducirSonido('alerta');
                    // Desaparecen botón e icono SQL y aparece el hacker con diálogo
                    document.getElementById('action-2012').innerHTML = `
                        <div class="dialog-bubble">
                            💻 <strong>¡Robé tus contraseñas!</strong><br>Estaban totalmente sin cifrar en la base de datos[cite: 2, 3].
                        </div>
                    `;
                    document.getElementById('hacker-box').querySelector('.bubble-inner').innerHTML = `<span style="font-size:2rem;">🦹‍♂️</span>`;
                    terminalText.innerHTML = "> [BRECHA CONFIRMADA] Extracción de 450.000 credenciales sin cifrar[cite: 2, 3].<br>> [VIOLACIÓN] Incumplimiento grave del deber de seguridad[cite: 2, 3].";
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
                terminalText.innerHTML = "> [2013] Sustracción masiva de información en la infraestructura[cite: 2, 3].<br>> [TÉCNICO] Uso del vulnerable algoritmo hash MD5[cite: 2, 3].";
                
                document.getElementById('btn-md5').addEventListener('click', () => {
                    reproducirSonido('alerta');
                    document.getElementById('action-2013').innerHTML = `
                        <div class="dialog-bubble global-alert">
                            🌐 <strong>¡ALERTA GLOBAL!</strong><br>3 mil millones de cuentas comprometidas en todo el mundo[cite: 2, 3].
                        </div>
                    `;
                    document.getElementById('world-box').classList.add('md5-glow');
                    document.getElementById('world-box').querySelector('.bubble-inner').innerHTML = `<span style="font-size:2rem;">🌍</span>`;
                    terminalText.innerHTML = "> [CRACKED] Ataque masivo exitoso sobre hashes MD5[cite: 2, 3].<br>> [HISTÓRICO] La mayor brecha de seguridad de la historia[cite: 2, 3].";
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
                terminalText.innerHTML = "> [2014] Campaña de phishing dirigida a un empleado[cite: 2, 3].<br>> [INTRUSIÓN] Acceso inicial a la red corporativa[cite: 2, 3].";
                
                document.getElementById('btn-phishing').addEventListener('click', () => {
                    reproducirSonido('alerta');
                    document.getElementById('action-2014').innerHTML = `
                        <div class="dialog-bubble shake-animation" style="border-color: #ef4444;">
                            😱 <strong>¡Hice clic sin querer!</strong><br>Facilité el acceso al sistema interno de Yahoo[cite: 2, 3].
                        </div>
                    `;
                    const empBox = document.getElementById('employee-box');
                    empBox.classList.add('shake-animation');
                    empBox.querySelector('.bubble-inner').innerHTML = `<span style="font-size:2rem;">😰</span>`;
                    empBox.querySelector('p').textContent = "Empleado Asustado";
                    terminalText.innerHTML = "> [ACCESO TOTAL] Credenciales corporativas comprometidas[cite: 2, 3].<br>> [OPERACIÓN] Hackers sustraen datos de la UDB y generan cookies falsas[cite: 2, 3].";
                });
                break;

            case '2016':
                gameStage.innerHTML = `
                    <div class="entity-bubble">
                        <div class="bubble-inner"><img src="assets/yahoo/yahoo-logo.svg" alt="Yahoo"></div>
                        <p>Yahoo Negocio</p>
                    </div>
                    <div class="vs-separator" id="action-2016">
                        <button id="btn-verizon" class="btn btn-primary pulse-btn">🤝 Firmar Venta ($4.830M)</button>
                    </div>
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #3b82f6;"><span style="font-size:2rem;">📡</span></div>
                        <p>Verizon</p>
                    </div>
                `;
                terminalText.innerHTML = "> [JULIO 2016] Verizon acuerda comprar el negocio operativo por $4.830M[cite: 2, 3].<br>> [OCULTO] La brecha de 2013 aún no se había revelado públicamente[cite: 2, 3].";
                
                document.getElementById('btn-verizon').addEventListener('click', () => {
                    reproducirSonido('alerta');
                    document.getElementById('action-2016').innerHTML = `
                        <div class="dialog-bubble global-alert">
                            📰 <strong>¡ESCÁNDALO!</strong><br>Se revela públicamente la brecha masiva 3 años después[cite: 2, 3].
                        </div>
                    `;
                    terminalText.innerHTML = "> [REVELACIÓN] Verizon se entera de los hackeos masivos ocultos[cite: 2, 3].<br>> [CRISIS] El valor y la confianza en la operación se derrumban[cite: 2, 3].";
                });
                break;

            case '2017':
                gameStage.innerHTML = `
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #10b981;"><span style="font-size:2rem;">💼</span></div>
                        <p>Altaba Inc.</p>
                    </div>
                    <div class="vs-separator" id="action-2017">
                        <button id="btn-renegociar" class="btn btn-warning pulse-btn">📉 Aplicar Descuento de $350M</button>
                    </div>
                    <div class="entity-bubble">
                        <div class="bubble-inner" style="border-color: #3b82f6;"><span style="font-size:2rem;">📡</span></div>
                        <p>Verizon / Oath</p>
                    </div>
                `;
                terminalText.innerHTML = "> [2017] Verizon exige renegociar el valor de compra por las fallas de seguridad[cite: 2, 3].<br>> [DIVISIÓN] Nace Altaba Inc. para gestionar pasivos[cite: 2, 3].";
                
                document.getElementById('btn-renegociar').addEventListener('click', () => {
                    reproducirSonido('exito');
                    document.getElementById('action-2017').innerHTML = `
                        <div class="dialog-bubble" style="border-color: #10b981;">
                            ✅ <strong>¡Compra Rebajada!</strong><br>Precio final fijado en $4.480M (-$350M)[cite: 2, 3].
                        </div>
                    `;
                    terminalText.innerHTML = "> [RENEGOCIACIÓN EXITOSA] El costo de la negligencia recae en Altaba[cite: 2, 3].<br>> [CIERRE] Se formaliza la venta a Verizon y el arresto de los hackers[cite: 2, 3].";
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
                terminalText.innerHTML = "> [2018] La SEC sanciona a Altaba con $35M por ocultar ciberataques[cite: 2, 3].<br>> [ACUERDOS] $80M accionistas, $29M directores y $117.5M usuarios[cite: 2, 3].";
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
                terminalText.innerHTML = "> [JUNIO 2019] AAIP sanciona a Yahoo! Argentina con $105.000 pesos[cite: 2, 3].<br>> [CAUSA] Cifrado deficiente en copias de seguridad y omisión de baja[cite: 2, 3].";
                break;
        }
    }
});