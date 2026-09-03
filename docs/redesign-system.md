# Sistema de diseño y producción — Defensa Penal Córdoba

## Objetivo

Mantener la claridad, la proporción y el rendimiento de Sucesiones Córdoba como referencia, con una identidad propia para defensa penal: sobria, firme, directa y profesional.

## Diagnóstico de partida

- La interfaz cargaba `styles.css`, `site.css`, `visual-tune.css` y una hoja crítica embebida. Las reglas repetidas definían distintos colores, radios, espaciados y tamaños para los mismos componentes.
- En móvil, la hoja completa se activaba después de cargar mediante `media="print"` y `onload`. La medición de referencia registró CLS 0,190 y 29 KB de CSS no utilizado.
- El JavaScript era nativo, pero el HTML conservaba el contrato `data-bs-*` de Bootstrap. El menú principal no se cerraba al tocar fuera, no respondía a Escape y los dropdowns usaban enlaces `href="#"` como botones.
- Home y benchmark compartían imagen y silueta de hero. Defensa Penal no tenía una identidad visual suficientemente diferenciada.

## Decisiones del sistema

### Visual

- Azul tinta como color institucional principal.
- Bronce como acento limitado a jerarquía, foco y acciones prioritarias.
- Georgia para títulos y tipografía de sistema para texto e interfaz; sin fuentes externas.
- Bordes de 3–6 px en lugar de tarjetas muy redondeadas.
- Sombras reservadas para navegación, fotografía y capas flotantes.
- Secciones con composiciones distintas: listas editoriales, filas de servicio y bloques divididos. No repetir una cuadrícula de tarjetas para todo.
- Hero tipográfico sin imagen de fondo para diferenciar la marca y reducir LCP.

### Navegación

- JavaScript nativo y una sola estrategia de estado (`is-open`).
- Botones semánticos para dropdowns; sin atributos `data-bs-*`.
- Cierre por segundo toque, enlace, toque fuera, tecla Escape y cambio de breakpoint.
- Estados `aria-expanded`, foco visible y objetivos táctiles de al menos 42–44 px.

### Páginas internas

- Orden fijo: breadcrumb, contexto, H1, respuesta rápida, acciones, firma profesional compacta, contenido, FAQ y CTA final.
- Ancho de lectura máximo de 900 px.
- H1 fluido con límite móvil para evitar cortes y bloques excesivos.
- FAQ con `details/summary`, sin JavaScript, conservando `FAQPage` en JSON-LD.

### Producción

- Una única hoja cargada: `assets/css/site.min.css`.
- `assets/css/site.css` es la fuente legible del sistema.
- Sin Bootstrap CSS, Bootstrap JS, fuentes remotas ni iconos externos.
- JavaScript único y diferido para navegación, estado del header y analítica de CTA.
- Imágenes profesionales con variantes de 240 y 640 px.

## Invariantes SEO

- No cambiar URLs ni permalinks.
- Conservar títulos, descripciones, H1 y contenido jurídico de las landings.
- Conservar canonical, sitemap, robots, schema LegalService, FAQPage y BreadcrumbList.
- Mantener los enlaces internos principales en navegación, home, contenido y footer.

## Matriz de QA

- Viewports: 390 px, tablet, notebook y escritorio.
- Navegación: abrir/cerrar, dropdowns, fuera, Escape, cambio de breakpoint y navegación por teclado.
- Contenido: H1, respuesta rápida, tablas, listas, blockquotes, FAQ y CTA.
- Contacto: WhatsApp, teléfono, email y enlaces internos.
- Visual: overflow horizontal, superposición, cortes, saltos de layout y foco visible.
- Rendimiento: LCP, FCP, TBT y CLS en móvil y escritorio.
