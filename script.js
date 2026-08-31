// 1. Seleccionar los elementos del DOM
const elementoBlink = document.querySelector('.texto-blink');
const botonControl = document.getElementById('btn-control');

// 2. Escuchar el evento de click en el botón
botonControl.addEventListener('click', () => {
    // Alterna la clase CSS que pausa la animación
    elementoBlink.classList.toggle('pausado');
    
    // Cambia el texto del botón según el estado actual
    if (elementoBlink.classList.contains('pausado')) {
        botonControl.textContent = 'Reanudar Parpadeo';
    } else {
        botonControl.textContent = 'Pausar Parpadeo';
    }
});



/**
 * ============================================================================
 * DebianOS Terminal - Módulo de Interfaz y Consumo de Datos Oficiales BCV
 * Código limpio de variables ajenas al marco legal financiero.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. CONTROL DE LA ANIMACIÓN DE INTERFAZ (BOTÓN DE CONTROL DE PAUSA) ---
    const btnControl = document.getElementById("btn-control");
    const textoPrincipal = document.getElementById("texto-principal");
    const marquesinaTrack = document.getElementById("marquesina-track");

    let animacionesPausadas = false;

    if (btnControl) {
        btnControl.addEventListener("click", () => {
            animacionesPausadas = !animacionesPausadas;

            if (animacionesPausadas) {
                textoPrincipal.classList.add("pausado");
                marquesinaTrack.classList.add("pausado");
                btnControl.textContent = "Reanudar Parpadeo";
                console.log("[SYS_GUI] Animaciones congeladas por petición del usuario.");
            } else {
                textoPrincipal.classList.remove("pausado");
                marquesinaTrack.classList.remove("pausado");
                btnControl.textContent = "Pausar Parpadeo";
                console.log("[SYS_GUI] Animaciones reactivadas de forma nativa.");
            }
        });
    }

    
    
    /**
 * ============================================================================
 * DebianOS Terminal - Núcleo de Lógica e Interacción (JavaScript)
 * Encargado exclusivo del comportamiento y el consumo asíncrono de APIs.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. GESTIÓN DEL BOTÓN DE PAUSA DE LA INTERFAZ DE USUARIO ---
    const btnControl = document.getElementById("btn-control");
    const textoPrincipal = document.getElementById("texto-principal");
    const marquesinaTrack = document.getElementById("marquesina-track");

    let animacionesPausadas = false;

    if (btnControl) {
        btnControl.addEventListener("click", () => {
            animacionesPausadas = !animacionesPausadas;

            if (animacionesPausadas) {
                // Inyectamos la clase de control CSS
                textoPrincipal.classList.add("pausado");
                marquesinaTrack.classList.add("pausado");
                btnControl.textContent = "Reanudar Parpadeo";
                console.log("[GUI_STATUS] Animaciones congeladas por el usuario.");
            } else {
                // Devolvemos el control al CSS nativo
                textoPrincipal.classList.remove("pausado");
                marquesinaTrack.classList.remove("pausado");
                btnControl.textContent = "Pausar Parpadeo";
                console.log("[GUI_STATUS] Animaciones cíclicas reactivadas.");
            }
        });
    }

   
   
   /**
 * ============================================================================
 * DebianOS Terminal - Módulo Lógico de Control de Interfaz y API BCV
 * Encargado exclusivo del comportamiento interactivo y consumo asíncrono.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. CONTROL DE LA ANIMACIÓN DE LA GUI (BOTÓN DE PAUSA) ---
    const btnControl = document.getElementById("btn-control");
    const textoPrincipal = document.getElementById("texto-principal");
    const marquesinaTrack = document.getElementById("marquesina-track");

    let animacionesPausadas = false;

    if (btnControl) {
        btnControl.addEventListener("click", () => {
            animacionesPausadas = !animacionesPausadas;

            if (animacionesPausadas) {
                textoPrincipal.classList.add("pausado");
                marquesinaTrack.classList.add("pausado");
                btnControl.textContent = "Reanudar Parpadeo";
                console.log("[GUI_STATUS] Efecto visual de parpadeo en pausa.");
            } else {
                textoPrincipal.classList.remove("pausado");
                marquesinaTrack.classList.remove("pausado");
                btnControl.textContent = "Pausar Parpadeo";
                console.log("[GUI_STATUS] Efecto visual cíclico reanudado.");
            }
        });
    }

   
   
  
  /**
 * ============================================================================
 * DebianOS Terminal - Módulo Lógico de Control de Interfaz y Datos Manuales
 * Encargado exclusivo de inyectar las tasas oficiales fijas y pausar la GUI.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ========================================================================
    // SECCIÓN CENTRAL DE CONFIGURACIÓN DE TASAS OFICIALES (MODIFICABLE)
    // ========================================================================
    // Modifica los valores numéricos dentro de las comillas cuando cambie el BCV:
    const dolarBCV = "794.99";  // Tasa Oficial de cierre del Dólar estadounidense
    const euroBCV  = "922.69";  // Tasa Oficial de cierre de la moneda Euro
    // ========================================================================

    // --- 1. ASIGNACIÓN INMEDIATA DE DATOS EN LA INTERFAZ (GUI) ---
    const spanDolar = document.getElementById("tasa-dolar");
    const spanEuro  = document.getElementById("tasa-euro");

    if (spanDolar) {
        spanDolar.textContent = dolarBCV;
        console.log(`[SYS_DATA] Dólar BCV asignado manualmente a la GUI: ${dolarBCV} Bs.`);
    }
    
    if (spanEuro) {
        spanEuro.textContent = euroBCV;
        console.log(`[SYS_DATA] Euro BCV asignado manualmente a la GUI: ${euroBCV} Bs.`);
    }

    // --- 2. GESTIÓN DEL BOTÓN DE PAUSA DE ANIMACIONES DE LA TERMINAL ---
    const btnControl = document.getElementById("btn-control");
    const textoPrincipal = document.getElementById("texto-principal");
    const marquesinaTrack = document.getElementById("marquesina-track");

    let animacionesPausadas = false;

    if (btnControl) {
        btnControl.addEventListener("click", () => {
            animacionesPausadas = !animacionesPausadas;

            if (animacionesPausadas) {
                // Inyección de la clase controladora de animación
                textoPrincipal.classList.add("pausado");
                marquesinaTrack.classList.add("pausado");
                btnControl.textContent = "Reanudar Parpadeo";
                console.log("[GUI_CONTROL] Animaciones cíclicas en pausa.");
            } else {
                // Retorno al flujo nativo de las hojas de estilo
                textoPrincipal.classList.remove("pausado");
                marquesinaTrack.classList.remove("pausado");
                btnControl.textContent = "Pausar Parpadeo";
                console.log("[GUI_CONTROL] Animaciones activas en terminal.");
            }
        });
    }
});


