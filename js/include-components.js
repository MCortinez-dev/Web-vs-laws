// js/include-components.js
// Carga dinámicamente el header y el footer para evitar repetir HTML en cada página.
document.addEventListener("DOMContentLoaded", async () => {
    const loadHTML = async (selector, filePath) => {
        const element = document.querySelector(selector);
        if (!element) return;
        
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`No se pudo cargar ${filePath}`);
            element.innerHTML = await response.text();
        } catch (error) {
            console.error("Error al incluir componente:", error);
        }
    };

    // Inyectamos las partes fijas en los placeholders correspondientes
    await loadHTML("#header-container", "components/header.html");
    await loadHTML("#footer-container", "components/footer.html");
});