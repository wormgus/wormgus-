/**
 * ============================================================================
 * DebianOS Terminal - Módulo Integrado de Control, BCV y Red Comunal v1.1
 * ============================================================================
 */

// ==========================================
// 1. NÚCLEO DE CONEXIÓN A SUPABASE CLOUD
// ==========================================
const SUPABASE_URL = "https://jrhovdnzmdkicvblitro.supabase.co"; 
const SUPABASE_ANON_KEY = "sb_publishable_24ADw2EyLoDPwTJ1KooE3g_CKh-Cyp7"; 

// Inicializamos la conexión segura global de Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log("[ DEBIAN_OS ]: Kernel conectado a la base de datos de Supabase.");


document.addEventListener("DOMContentLoaded", () => {
    
    // --- 2. CONFIGURACIÓN DE TASAS OFICIALES BCV ---
    const dolarBCV = "794.99";  
    const euroBCV  = "922.69";  

    const spanDolar = document.getElementById("tasa-dolar");
    const spanEuro  = document.getElementById("tasa-euro");

    if (spanDolar) spanDolar.textContent = dolarBCV;
    if (spanEuro) spanEuro.textContent = euroBCV;
    console.log(`[SYS_DATA] Tasas asignadas en interfaz.`);

    // --- 3. GESTIÓN DEL BOTÓN DE PAUSA DE ANIMACIONES (CORREGIDO) ---
    const btnControl = document.getElementById("btn-control");
    const textoPrincipal = document.getElementById("texto-principal");
    const marquesinaTrack = document.getElementById("marquesina-track");

    let animacionesPausadas = false;

    if (btnControl) {
        btnControl.addEventListener("click", () => {
            animacionesPausadas = !animacionesPausadas;

            if (animacionesPausadas) {
                if (textoPrincipal) textoPrincipal.classList.add("pausado");
                if (marquesinaTrack) marquesinaTrack.classList.add("pausado");
                btnControl.textContent = "Reanudar Parpadeo";
                console.log("[GUI_CONTROL] Animaciones en pausa.");
            } else {
                if (textoPrincipal) textoPrincipal.classList.remove("pausado");
                if (marquesinaTrack) marquesinaTrack.classList.remove("pausado"); // <-- FIX: Remueve 'pausado', no destruye el track
                btnControl.textContent = "Pausar Parpadeo";
                console.log("[GUI_CONTROL] Animaciones reactivadas.");
            }
        });
    }

    // --- 4. GESTIÓN DE ENVÍO DE POSTS A LA RED COMUNAL ---
    const formulario = document.getElementById('formulario-comunal');
    
    if (formulario) {
        formulario.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            const vecino = document.getElementById('nombre').value.trim() || 'Anónimo';
            const mensaje = document.getElementById('mensaje').value.trim();
            const categoria = document.getElementById('categoria').value;

            if (!mensaje) {
                alert("⚠️ La terminal no procesa mensajes vacíos.");
                return;
            }

            console.log("[ LOG_SYS ]: Transmitiendo paquete al núcleo...");

            const { error } = await supabase
                .from('mensajes')
                .insert([{ vecino, mensaje, categoria }]);

            if (error) {
                console.error("[ CRITIC_ERR ] Falló la inserción:", error.message);
                alert("❌ Error de transmisión de datos.");
            } else {
                console.log("[ LOG_SYS ]: Transmisión completada.");
                formulario.reset(); 
            }
        });
    }

    // --- 5. CARGA DEL HISTORIAL E INICIALIZACIÓN SENSOR EN VIVO ---
    cargarMensajes();
    escucharMuroEnVivo();
});

// --- FUNCIÓN HISTÓRICA: COMPILA Y PINTA EL MURO ---
async function cargarMensajes() {
    const contenedor = document.getElementById("muro-mensajes");
    if (!contenedor) return;

    const { data: mensajes, error } = await supabase
        .from("mensajes")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error histórico:", error.message);
        contenedor.innerHTML = `<p style="color: #ff0000; font-family: monospace;">[ERR] Falló la sincronización con el núcleo.</p>`;
        return;
    }

    if (mensajes.length === 0) {
        contenedor.innerHTML = `<p style="color: #444; font-style: italic; font-family: monospace;">[ VACÍO ] No hay logs comunales en el feed.</p>`;
        return;
    }

    contenedor.innerHTML = "";
    mensajes.forEach(msg => {
        contenedor.appendChild(crearElementoPost(msg));
    });
}

// --- FUNCIÓN SENSOR: ESCUCHA ACCIONES REALTIME ---
function escucharMuroEnVivo() {
    const contenedor = document.getElementById("muro-mensajes");
    if (!contenedor) return;

    supabase
        .channel("cambios-muro")
        .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "mensajes" },
            (payload) => {
                // Borra avisos de carga o vacío si existen
                if (contenedor.querySelector("p")) {
                    const primerP = contenedor.querySelector("p");
                    if (primerP.style.fontStyle === "italic" || primerP.innerText.includes("Esperando")) {
                        contenedor.innerHTML = "";
                    }
                }

                // Inyecta el nuevo post al principio del feed
                const nuevoPost = crearElementoPost(payload.new);
                contenedor.insertBefore(nuevoPost, contenedor.firstChild);
            }
        )
        .subscribe();
}

// --- MAQUETADOR DE ESTRUCTURA SEMÁNTICA PARA POSTS ---
function crearElementoPost(msg) {
    const div = document.createElement("div");
    div.className = "post-comunal"; 

    const fecha = new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    div.innerHTML = `
        <div class="post-header">
            <span>👤 @${msg.vecino}</span>
            <span class="post-categoria">${msg.categoria.toUpperCase()}</span>
        </div>
        <p class="post-texto">${msg.mensaje}</p>
        <span style="color: #333; font-size: 0.72rem; display: block; text-align: right; margin-top: 5px;">💾 LOG_TIME: ${fecha}</span>
    `;
    return div;
}
