/**
 * ============================================================================
 * DebianOS Terminal - Módulo Integrado Modular v1.1
 * ============================================================================
 */

import { createClient } from 'https://unpkg.com';

// 1. CREDENCIALES DE NÚCLEO
const SUPABASE_URL = "https://supabase.co"; 
const SUPABASE_ANON_KEY = "sb_publishable_24ADw2EyLoDPwTJ1KooE3g_CKh-Cyp7"; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log("[ DEBIAN_OS ]: Kernel modular inicializado con éxito.");

// Usamos una función directa de arranque en lugar de anidar múltiples DOMContentLoaded
function inicializarTerminal() {
    
    // --- 2. CONFIGURACIÓN DE TASAS OFICIALES BCV ---
    const dolarBCV = "794.99";  
    const euroBCV  = "922.69";  

    const spanDolar = document.getElementById("tasa-dolar");
    const spanEuro  = document.getElementById("tasa-euro");

    if (spanDolar) spanDolar.textContent = dolarBCV;
    if (spanEuro) spanEuro.textContent = euroBCV;
    console.log(`[SYS_DATA] Tasas cargadas -> Dólar: ${dolarBCV} Bs. | Euro: ${euroBCV} Bs.`);

    // --- 3. GESTIÓN ÚNICA DEL BOTÓN DE PAUSA (GUI) ---
    const btnControl = document.getElementById("btn-control");
    const textoPrincipal = document.getElementById("texto-principal");
    const marquesinaTrack = document.getElementById("marquesina-track");

    let animacionesPausadas = false;

    if (btnControl) {
        btnControl.onclick = () => {
            animacionesPausadas = !animacionesPausadas;

            if (animacionesPausadas) {
                if (textoPrincipal) textoPrincipal.classList.add("pausado");
                if (marquesinaTrack) marquesinaTrack.classList.add("pausado");
                btnControl.textContent = "Reanudar Parpadeo";
                console.log("[GUI_CONTROL] Animaciones en pausa.");
            } else {
                if (textoPrincipal) textoPrincipal.classList.remove("pausado");
                if (marquesinaTrack) marquesinaTrack.classList.remove("pausado");
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

            const vecino = document.getElementById('nombre').value.trim() || 'Anónimo';
            const mensaje = document.getElementById('mensaje').value.trim();
            const categoria = document.getElementById('categoria').value;

            if (!mensaje) return;

            console.log("[ LOG_SYS ]: Transmitiendo paquete de datos...");

            const { error } = await supabase
                .from('mensajes')
                .insert([{ vecino, mensaje, categoria }]);

            if (error) {
                console.error("[ CRITIC_ERR ]", error.message);
                alert("❌ Error en el cortafuegos de la base de datos.");
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
    const contenedorMuro = document.getElementById("muro-mensajes");
    if (!contenedorMuro) return;

    const { data: mensajes, error } = await supabase
        .from("mensajes")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        contenedorMuro.innerHTML = `<p style="color: #ff0000;">❌ Falló la sincronización comunal.</p>`;
        return;
    }

    if (mensajes.length === 0) {
        contenedorMuro.innerHTML = `<p style="color: #888; font-style: italic;">[ VACÍO ] No hay transmisiones en el sector.</p>`;
        return;
    }

    contenedorMuro.innerHTML = "";
    mensajes.forEach(msg => {
        contenedorMuro.innerHTML += crearTemplateMensaje(msg);
    });
}

function escucharMuroEnVivo() {
    const contenedorMuro = document.getElementById("muro-mensajes");
    if (!contenedorMuro) return;

    supabase
        .channel('cambios-muro')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mensajes' }, (payload) => {
            if (contenedorMuro.innerText.includes("Esperando") || contenedorMuro.innerText.includes("[ VACÍO ]")) {
                contenedorMuro.innerHTML = "";
            }
            const nuevoHtml = crearTemplateMensaje(payload.new);
            contenedorMuro.insertAdjacentHTML("afterbegin", nuevoHtml);
        })
        .subscribe();
}

function crearTemplateMensaje(msg) {
    const fecha = new Date(msg.created_at).toLocaleDateString('es-VE', {
        hour: '2-digit',
        minute: '2-digit'
    });

    let emoji = "📢";
    if (msg.categoria === "Alerta") emoji = "⚠️";
    if (msg.categoria === "Servicios") emoji = "🚰";
    if (msg.categoria === "Propuesta") emoji = "💡";

    return `
        <div class="post-comunal">
            <div class="post-header">
                <span class="post-user">🤖 @${msg.vecino}</span>
                <span class="post-badge">${emoji} ${msg.categoria}</span>
                <span class="post-date">${fecha}</span>
            </div>
            <div class="post-texto">${msg.mensaje}</div>
        </div>
    `;
}

// Ejecución segura del núcleo al cargar la ventana
window.onload = inicializarTerminal;
