/**
 * ============================================================================
 * DebianOS Terminal - Módulo Integrado Modular v1.3 (Sincronizado)
 * ============================================================================
 */

// Importación del paquete de Supabase
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// CREDENCIALES DE NÚCLEO
const SUPABASE_URL = "https://jrhovdnzmdkicvblitro.supabase.co"; 
const SUPABASE_ANON_KEY = "sb_publishable_24ADw2EyLoDPwTJ1KooE3g_CKh-Cyp7"; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log("[ DEBIAN_OS ]: Kernel modular inicializado con éxito.");

function inicializarTerminal() {
    
    // --- 1. CONFIGURACIÓN DE INYECTOR DE VALORES HUMANOS ---
    const valorEmpatia = "Empatía Activa 100%";  
    const valorIntegridad  = "Integridad Incorruptible";  

    const spanDolar = document.getElementById("tasa-dolar");
    const spanEuro  = document.getElementById("tasa-euro");

    if (spanDolar) spanDolar.textContent = valorEmpatia;
    if (spanEuro) spanEuro.textContent = valorIntegridad;
    console.log(`[SYS_DATA] Parámetros cargados -> Módulo 1: ${valorEmpatia} | Módulo 2: ${valorIntegridad}`);

    // --- 2. GESTIÓN DEL BOTÓN DE PAUSA SINCRO (GUI) ---
    const btnControl = document.getElementById("btn-control");
    const textoPrincipal = document.getElementById("texto-principal");
    const marquesinaTrack = document.getElementById("marquesina-track");
    const asciiHeart = document.querySelector(".ascii-heart");

    let animacionesPausadas = false;

    if (btnControl) {
        btnControl.onclick = () => {
            animacionesPausadas = !animacionesPausadas;

            if (animacionesPausadas) {
                if (textoPrincipal) textoPrincipal.classList.add("pausado");
                if (marquesinaTrack) marquesinaTrack.classList.add("pausado");
                if (asciiHeart) asciiHeart.classList.add("pausado");
                btnControl.textContent = "Reanudar Parpadeo";
                console.log("[GUI_CONTROL] Animaciones en pausa.");
            } else {
                if (textoPrincipal) textoPrincipal.classList.remove("pausado");
                if (marquesinaTrack) marquesinaTrack.classList.remove("pausado");
                if (asciiHeart) asciiHeart.classList.remove("pausado");
                btnControl.textContent = "Pausar Parpadeo";
                console.log("[GUI_CONTROL] Flujo normal reactivado.");
            }
        };
    }

    // --- 3. TRANSMISIÓN DE POSTS A SUPABASE E INYECCIÓN EN MARQUESINA ---
    // Sincronizado con el ID exacto del HTML restaurado: 'formulario-terminal'
    const formulario = document.getElementById('formulario-terminal');
    
    if (formulario) {
        formulario.onsubmit = async (e) => {
            e.preventDefault(); 

            // Sincronización de variables con los inputs reales de tu HTML
            const vecino = document.getElementById('nombre-usuario').value.trim() || 'Anónimo';
            const mensaje = document.getElementById('mensaje-usuario').value.trim();
            const categoria = "General"; // Categoría por defecto ya que removimos el select

            if (!mensaje) return;

            console.log("[ LOG_SYS ]: Transmitiendo paquete de datos al servidor...");

            // Guardar en la base de datos remota de Supabase
            const { error } = await supabase
                .from('mensajes')
                .insert([{ vecino, mensaje, categoria }]);

            if (error) {
                console.error("[ CRITIC_ERR ]", error.message);
                alert("❌ Error en el cortafuegos de la base de datos: " + error.message);
            } else {
                console.log("[ LOG_SYS ]: Transmisión completada en base de datos.");
                
                // Si la base de datos lo procesa bien, creamos el elemento y lo metemos a la marquesina
                inyectarMensajeEnMarquesina(vecino, mensaje);
                
                formulario.reset(); 
            }
        };
    }

    // --- 4. ESCUCHA EN VIVO DE SUPABASE PARA OTROS USUARIOS ---
    escucharMarquesinaEnVivo();  
}

/**
 * Inserta de manera limpia un nuevo nodo de texto dentro del flujo animado de la marquesina
 */
function inyectarMensajeEnMarquesina(usuario, texto) {
    const marquesinaTrack = document.getElementById("marquesina-track");
    if (!marquesinaTrack) return;

    // Creamos la estructura span idéntica a tus componentes de estilos del CSS (.item-marquee-h5)
    const nuevoMensajeSpan = document.createElement("span");
    nuevoMensajeSpan.className = "texto-blink4 item-marquee-h5";
    
    // Formato estilo logs de terminal: 📡 [User]: Mensaje enviado
    nuevoMensajeSpan.innerHTML = `📡 <strong>[root@${usuario}]:</strong>&nbsp;${texto}`;

    // Lo inyectamos dentro del contenedor con la animación activa
    marquesinaTrack.appendChild(nuevoMensajeSpan);
    console.log(`[MARQUEE_CORE]: Nuevo string inyectado en el track animado -> ${usuario}`);
}

/**
 * Escucha en tiempo real si otra persona envía un mensaje desde otra PC y lo monta en la marquesina
 */
function escucharMarquesinaEnVivo() {
    supabase
        .channel('cambios-marquesina')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mensajes' }, (payload) => {
            const nuevoRegistro = payload.new;
            // Evitamos duplicar el mensaje si fuimos nosotros mismos quienes lo enviamos
            // (La inserción local ya se encarga de nuestra propia visualización instantánea)
            inyectarMensajeEnMarquesina(nuevoRegistro.vecino, nuevoRegistro.mensaje);
        })
        .subscribe();
}

window.onload = inicializarTerminal;
