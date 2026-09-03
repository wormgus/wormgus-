/**
 * ============================================================================
 * DebianOS Terminal - Módulo Integrado Modular v1.3 (Sincronizado)
 * ============================================================================
 */

// 1. IMPORTACIÓN REPARADA (Se especifica la ruta exacta del cliente de Supabase)
import { createClient } from 'https://esm.sh';

// CREDENCIALES DE NÚCLEO
const SUPABASE_URL = "https://jrhovdnzmdkicvblitro.supabase.co"; 

// ⚠️ ATENCIÓN: Borra este texto de abajo y pega tu clave REAL de Supabase (La que empieza por eyJ...)
const SUPABASE_ANON_KEY = "sb_publishable_24ADw2EyLoDPwTJ1KooE3g_CKh-Cyp7"; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log("[ DEBIAN_OS ]: Kernel modular inicializado con éxito.");

function inicializarTerminal() {
    
    // --- 2. CONFIGURACIÓN DE INYECTOR DE VALORES HUMANOS ---
    const valorEmpatia = "Empatía Activa 100%";  
    const valorIntegridad  = "Integridad Incorruptible";  

    const spanDolar = document.getElementById("tasa-dolar");
    const spanEuro  = document.getElementById("tasa-euro");

    if (spanDolar) spanDolar.textContent = valorEmpatia;
    if (spanEuro) spanEuro.textContent = valorIntegridad;
    console.log(`[SYS_DATA] Parámetros cargados -> Módulo 1: ${valorEmpatia} | Módulo 2: ${valorIntegridad}`);


    // --- 3. GESTIÓN ÚNICA DEL BOTÓN DE PAUSA SINCRO (GUI) ---
    const btnControl = document.getElementById("btn-control");
    const textoPrincipal = document.getElementById("texto-principal");
    const marquesinaTrack = document.getElementById("marquesina-track");
    
    // Captura segura de los elementos del corazón ASCII
    const asciiHeart = document.querySelector(".ascii-heart");
    const asciiLabel = document.querySelector(".ascii-heart-label");

    let animacionesPausadas = false;

    if (btnControl) {
        btnControl.onclick = () => {
            animacionesPausadas = !animacionesPausadas;

            if (animacionesPausadas) {
                if (textoPrincipal) textoPrincipal.classList.add("pausado");
                if (marquesinaTrack) marquesinaTrack.classList.add("pausado");
                if (asciiHeart) asciiHeart.classList.add("pausado");
                if (asciiLabel) asciiLabel.classList.add("pausado");
                btnControl.textContent = "Reanudar Parpadeo";
                console.log("[GUI_CONTROL] Animaciones en pausa.");
            } else {
                if (textoPrincipal) textoPrincipal.classList.remove("pausado");
                if (marquesinaTrack) marquesinaTrack.classList.remove("pausado");
                if (asciiHeart) asciiHeart.classList.remove("pausado");
                if (asciiLabel) asciiLabel.classList.remove("pausado");
                btnControl.textContent = "Pausar Parpadeo";
                console.log("[GUI_CONTROL] Flujo normal reactivado.");
            }
        };
    }

    // --- 4. TRANSMISIÓN DE POSTS A SUPABASE ---
    const formulario = document.getElementById('formulario-comunal');
    
    if (formulario) {
        formulario.onsubmit = async (e) => {
            e.preventDefault(); 

            const vecino = document.getElementById('nickname').value.trim() || 'Anónimo';
            const mensaje = document.getElementById('mensaje').value.trim();
            const categoria = document.getElementById('categoria').value;

            if (!mensaje) return;

            console.log("[ LOG_SYS ]: Transmitiendo paquete de datos...");

            const { error } = await supabase
                .from('mensajes')
                .insert([{ vecino, mensaje, categoria }]);

            if (error) {
                console.error("[ CRITIC_ERR ]", error.message);
                alert("❌ Error en el cortafuegos de la base de datos: " + error.message);
            } else {
                formulario.reset(); 
                console.log("[ LOG_SYS ]: Transmisión completada.");
            }
        };
    }

    // --- 5. CARGA DE MENSAJES Y COMPONENTES ---
    cargarMensajes();      
    escucharMuroEnVivo();  
}

// ==========================================
// FUNCIONES DE SOPORTE PARA EL MURO COMUNAL
// ==========================================
async function cargarMensajes() {
    const contenedorMuro = document.getElementById("muro-posts");
    if (!contenedorMuro) return;

    const { data: mensajes, error } = await supabase
        .from("mensajes")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        contenedorMuro.innerHTML = `<p style="color: #ff0000;">❌ Falló la sincronización comunal.</p>`;
        return;
    }

    if (!mensajes || mensajes.length === 0) {
        contenedorMuro.innerHTML = `<p class="sys-msg" style="color: #888; font-style: italic;">[ VACÍO ] No hay transmisiones en el sector.</p>`;
        return;
    }

    contenedorMuro.innerHTML = "";
    mensajes.forEach(msg => {
        contenedorMuro.innerHTML += crearTemplateMensaje(msg);
    });
}

function escucharMuroEnVivo() {
    const contenedorMuro = document.getElementById("muro-posts");
    if (!contenedorMuro) return;

    supabase
        .channel('cambios-muro')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mensajes' }, (payload) => {
            const mensajePorDefecto = contenedorMuro.querySelector('.sys-msg');
            if (mensajePorDefecto) {
                contenedorMuro.innerHTML = "";
            }
            const nuevoHtml = crearTemplateMensaje(payload.new);
            contenedorMuro.insertAdjacentHTML("afterbegin", nuevoHtml);
        })
        .subscribe();
}

function crearTemplateMensaje(msg) {
    const fecha = new Date(msg.created_at).toLocaleTimeString('es-VE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    let emoji = "📢";
    if (msg.categoria && msg.categoria.includes("Alerta")) emoji = "⚠️";
    if (msg.categoria && msg.categoria.includes("Servicios")) emoji = "🚰";
    if (msg.categoria && msg.categoria.includes("Propuesta")) emoji = "💡";

    return `
        <div class="post-item" style="border-top: 1px dashed #00ff00; padding: 10px 0; font-family: monospace;">
            <p style="color: #00ff00; margin: 2px 0;">
                <strong>[${fecha}] Broadcast de root@${msg.vecino}</strong> 
                <span style="color: #ffff00; background-color: #222; padding: 2px 5px; font-size: 0.85em; border-radius: 3px; margin-left: 10px;">${emoji} ${msg.categoria}</span>
            </p>
            <p style="color: #ffffff; margin: 5px 0 0 15px; white-space: pre-wrap;">>> ${msg.mensaje}</p>
        </div>
    `;
}

window.onload = inicializarTerminal;
