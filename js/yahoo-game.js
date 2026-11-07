document.addEventListener('DOMContentLoaded', () => {
    const moneyBill = document.getElementById('money-bill');
    const targetZone = document.getElementById('target-associated');
    const yahooLogo = document.getElementById('yahoo-logo');
    const feedbackText = document.getElementById('feedback-text');

    // Eventos Drag & Drop
    moneyBill.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', 'money');
    });

    targetZone.addEventListener('dragover', (e) => {
        e.preventDefault(); // Permitir el soltado
    });

    targetZone.addEventListener('drop', (e) => {
        e.preventDefault();
        
        // Esconder el billete y cambiar el diseño visual
        moneyBill.style.display = 'none';
        targetZone.classList.add('fused');
        targetZone.innerHTML = `<p>✅ <strong>Yahoo Voices creado</strong></p>`;
        
        // Fusionar visualmente las marcas
        yahooLogo.classList.add('expanded');

        // Actualizar feedback legal
        feedbackText.innerHTML = `
            <strong>Infracción / Riesgo:</strong> Se adquirió la plataforma por USD 100M[cite: 2, 3]. 
            Sin embargo, la infraestructura arrastrava serias fallas de seguridad no auditadas 
            que derivarían en el ataque de 2012[cite: 2, 3].
        `;
    });
});