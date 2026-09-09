/**
 * ============================================================================
 * DebianOS Terminal - Módulo Integrado Modular v1.3 (Sincronizado)
 * ============================================================================
 */

// EL PARCHE FINAL: Unimos el dominio con el paquete exacto del cliente de Supabase
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// CREDENCIALES DE NÚCLEO
const SUPABASE_URL = "https://jrhovdnzmdkicvblitro.supabase.co"; 

// ⚠️ ATENCIÓN: Borra este texto de abajo y pega tu clave REAL de Supabase (La que empieza por eyJ...)
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
    // ACOPLADO A TUS IDS ORIGINALES: 'formulario-comunal'
    const formulario = document.getElementById('formulario-comunal');
    
    if (formulario) {
        console.log("[ DEBIAN_OS ]: Formulario original detectado y enlazado.");
        formulario.onsubmit = async (e) => {
            e.preventDefault(); 

            // Captura usando 'nickname' y 'mensaje' como los tienes en el HTML
            const usuarioInput = document.getElementById('nickname').value.trim() || 'Anónimo';
            const mensajeInput = document.getElementById('mensaje').value.trim();

            if (!mensajeInput) return;

            console.log("[ LOG_SYS ]: Transmitiendo paquete de datos al servidor...");

            // Guardamos en Supabase mapeando el nickname del HTML hacia la columna 'vecino' de tu DB
            const { error } = await supabase
                .from('mensajes')
                .insert([{ 
                    vecino: usuarioInput, 
                    mensaje: mensajeInput
                }]);

            if (error) {
                console.error("[ CRITIC_ERR ]", error.message);
                alert("❌ Error en el cortafuegos de la base de datos: " + error.message);
            } else {
                console.log("[ LOG_SYS ]: Transmisión completada en base de datos.");
                
                // Inyectamos de inmediato el mensaje en el flujo móvil de la marquesina
                inyectarMensajeEnMarquesina(usuarioInput, mensajeInput);
                
                formulario.reset(); 
            }
        };
    } else {
        console.error("[ CRITIC_ERR ]: El script no encontró '#formulario-comunal' en la página.");
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

    // Lo metemos dentro del contenedor móvil para que ruede horizontalmente con el CSS
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
            const autor = nuevoRegistro.vecino || 'Anónimo';
            inyectarMensajeEnMarquesina(autor, nuevoRegistro.mensaje);
        })
        .subscribe();
}

// CORRECCIÓN DE DISPARO: Asegura la ejecución inmediata en arquitecturas de módulos (GitHub Pages)
if (document.readyState === "complete" || document.readyState === "interactive") {
    inicializarTerminal();
} else {
    document.addEventListener("DOMContentLoaded", inicializarTerminal);
}
