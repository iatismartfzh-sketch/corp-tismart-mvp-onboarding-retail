import { PreguntaExamen } from '../services/openai-examen.service';

export const EXAMENES_DUMMY: Record<string, PreguntaExamen[]> = {
  'Ciberseguridad Corporativa 2026': [
    {
      "pregunta": "¿Quién es responsable de la ciberseguridad según los lineamientos del Retailer Peruano en 2026?",
      "keywords": [
        "todos", "colaboradores", "personal", "compartida"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Debes reforzar la pág. 1, sección Introducción sobre responsabilidad compartida."
    },
    {
      "pregunta": "¿Cuál es el requisito mínimo obligatorio para una contraseña corporativa segura?",
      "keywords": ["16", "caracteres", "unicode", "símbolo"],
      "respuestaCorrecta": 1,
      "feedback": "Debes reforzar la pág. 2, sección Gestión de Contraseñas Seguras."
    },
    {
      "pregunta": "¿Cuál es la acción correcta ante la recepción de un correo sospechoso?",
      "keywords": [
        "Eliminar el correo inmediatamente sin reportarlo",
        "Reportarlo usando el botón 'Reportar Incidente' en Outlook"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Debes reforzar la pág. 3, sección Phishing y Correos Sospechosos."
    },
    {
      "pregunta": "¿Qué práctica está prohibida respecto al uso de dispositivos externos?",
      "keywords": [
        "Conectar USB personales a equipos corporativos",
        "Usar únicamente dispositivos autorizados por IT"
      ],
      "respuestaCorrecta": 0,
      "feedback": "Debes reforzar la pág. 4, sección Seguridad de Hardware y Dispositivos."
    },
    {
      "pregunta": "¿Cómo debe realizarse el acceso remoto a los sistemas corporativos?",
      "keywords": [
        "Mediante cualquier red Wi-Fi disponible",
        "Exclusivamente a través de la VPN GlobalProtect"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Debes reforzar la pág. 5, sección Redes y Trabajo Remoto."
    },
    {
      "pregunta": "¿Cuál es una regla clave sobre el uso del código MFA?",
      "keywords": [
        "Puede compartirse con soporte técnico si es necesario",
        "Es personal e intransferible y no debe compartirse"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Debes reforzar la pág. 6, sección Autenticación de Doble Factor (MFA)."
    },
    {
      "pregunta": "¿Cuál es la acción correcta frente a una solicitud no validada de información interna?",
      "keywords": [
        "Entregar la información si parece urgente",
        "Verificar la identidad por canales oficiales antes de responder"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Debes reforzar la pág. 7, sección Ingeniería Social."
    },
    {
      "pregunta": "¿Qué práctica viola la política de Escritorio Limpio?",
      "keywords": [
        "Guardar documentos físicos al finalizar la jornada",
        "Dejar contraseñas anotadas en post-its visibles"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Debes reforzar la pág. 8, sección Política de Escritorio Limpio."
    },
    {
      "pregunta": "¿Por qué es obligatorio reiniciar los equipos cada martes?",
      "keywords": [
        "Para mejorar el rendimiento del equipo",
        "Para instalar parches de seguridad que corrigen vulnerabilidades"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Debes reforzar la pág. 9, sección Actualizaciones y Parches de Seguridad."
    },
    {
      "pregunta": "¿Cuál es la primera acción ante un incidente de ransomware?",
      "keywords": [
        "Apagar inmediatamente el equipo y llamar al anexo 911",
        "Reiniciar el equipo para verificar si el problema persiste"
      ],
      "respuestaCorrecta": 0,
      "feedback": "Debes reforzar la pág. 10, sección Gestión de Emergencias - Ransomware."
    }
  ],
    'Hostigamiento Sexual Laboral': [
    {
      "pregunta": "¿Qué derecho fundamental se ve directamente vulnerado por el hostigamiento sexual laboral según la Ley 30364?",
      "keywords": [
        "El derecho a la productividad empresarial",
        "El derecho a la dignidad y a un ambiente de trabajo seguro"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Revisa la pág. 1, sección Introducción y Marco Legal sobre derechos fundamentales afectados."
    },
    {
      "pregunta": "¿Cuál de las siguientes situaciones corresponde al tipo de hostigamiento sexual 'quid pro quo'?",
      "keywords": [
        "Conductas reiteradas que generan un ambiente laboral hostil",
        "Condicionar beneficios laborales a favores de naturaleza sexual"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Revisa la pág. 2, sección Definiciones y Tipos, especialmente la clasificación de hostigamiento."
    },
    {
      "pregunta": "¿Cómo debe estar conformado el Comité de Intervención frente al Hostigamiento Sexual?",
      "keywords": [
        "Por 3 miembros designados por el empleador",
        "Por 4 miembros con paridad de género entre empleador y trabajadores"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Revisa la pág. 3, sección Comité de Intervención y requisitos de conformación."
    },
    {
      "pregunta": "¿En qué plazo máximo el empleador debe dictar medidas de protección tras una denuncia?",
      "keywords": [
        "Dentro de las 24 horas",
        "Dentro de los 5 días hábiles"
      ],
      "respuestaCorrecta": 0,
      "feedback": "Revisa la pág. 4, sección Medidas de Protección a la Víctima."
    },
    {
      "pregunta": "¿La protección frente al hostigamiento sexual aplica en modalidad de trabajo remoto?",
      "keywords": [
        "No, solo aplica al trabajo presencial",
        "Sí, aplica independientemente de la modalidad laboral"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Revisa la pág. 5, sección Procedimientos en Trabajo Remoto y Presencial."
    },
    {
      "pregunta": "¿Qué práctica está expresamente prohibida durante el proceso de investigación?",
      "keywords": [
        "El careo entre la persona denunciante y la denunciada",
        "La recopilación de pruebas documentales"
      ],
      "respuestaCorrecta": 0,
      "feedback": "Revisa la pág. 6, sección Prohibiciones Expresas: Revictimización y Careo."
    },
    {
      "pregunta": "¿Cuál es la última etapa del proceso de investigación interna por hostigamiento sexual?",
      "keywords": [
        "La investigación y recopilación de pruebas",
        "La emisión del informe final con determinación de responsabilidad"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Revisa la pág. 7, sección Etapas de la Investigación Interna."
    },
    {
      "pregunta": "¿Cuál es la sanción máxima que puede imponerse ante una falta muy grave de hostigamiento sexual?",
      "keywords": [
        "Amonestación escrita",
        "Resolución del contrato de trabajo (despido)"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Revisa la pág. 8, sección Régimen Sancionador."
    },
    {
      "pregunta": "¿Con qué frecuencia mínima deben realizarse las capacitaciones obligatorias sobre hostigamiento sexual?",
      "keywords": [
        "Cada dos años",
        "De manera anual para todo el personal"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Revisa la pág. 9, sección Prevención y Capacitación."
    },
    {
      "pregunta": "¿Cuál es uno de los indicadores clave que evalúa el sistema de Compliance en hostigamiento sexual?",
      "keywords": [
        "El número de ventas mensuales",
        "Los tiempos de respuesta ante las denuncias"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Revisa la pág. 10, sección Seguimiento y Compliance."
    }
  ],
    'Sostenibilidad y Residuos': [
    {
      "pregunta": "¿Cuál es el enfoque estratégico del Plan Cero Plásticos dentro del marco ESG?",
      "keywords": [
        "Reducir costos operativos sin considerar impactos ambientales",
        "Integrar responsabilidad ambiental, social y económica alineada a estándares ESG"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Página 1: Revisa la Introducción a la Sostenibilidad ESG y la integración de los tres pilares."
    },
    {
      "pregunta": "¿Cuál es el objetivo principal de aplicar la norma ISO 14001 en la gestión de residuos?",
      "keywords": [
        "Cumplir requisitos legales sin evaluación de impactos",
        "Lograr la mejora continua mediante la identificación y control de impactos ambientales"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Página 2: Refuerza el Marco Normativo y el enfoque de mejora continua de ISO 14001."
    },
    {
      "pregunta": "¿A quiénes aplica obligatoriamente el Plan Cero Plásticos?",
      "keywords": [
        "Solo al personal administrativo de la sede principal",
        "A todas las sedes, colaboradores y proveedores que interactúan con la organización"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Página 3: Revisa los Objetivos del Plan y su alcance organizacional."
    },
    {
      "pregunta": "¿Qué tipo de residuos deben depositarse exclusivamente en los tachos rojos?",
      "keywords": [
        "Plásticos limpios y papel reciclable",
        "Residuos peligrosos y residuos electrónicos (E-waste)"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Página 4: Repasa la Clasificación de Residuos correspondiente a los Tachos Rojos."
    },
    {
      "pregunta": "¿Cuál es la combinación correcta de residuos para los tachos azul y blanco?",
      "keywords": [
        "Azul: papel y cartón limpio / Blanco: plásticos limpios y secos",
        "Azul: residuos orgánicos / Blanco: papel y cartón"
      ],
      "respuestaCorrecta": 0,
      "feedback": "Página 5: Refuerza la Clasificación de Residuos en Tachos Azules y Blancos."
    },
    {
      "pregunta": "¿Por qué está prohibido mezclar residuos orgánicos con reciclables?",
      "keywords": [
        "Porque incrementa el volumen total de residuos",
        "Porque contamina el lote y evita su reaprovechamiento"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Página 6: Revisa la sección Segregación en la Fuente y sus implicancias."
    },
    {
      "pregunta": "¿Qué práctica está expresamente prohibida en todas las sedes corporativas?",
      "keywords": [
        "El uso de envases reutilizables",
        "El ingreso y uso de vasos, cubiertos y sorbetes plásticos descartables"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Página 7: Repasa la Prohibición de Envases de un Solo Uso."
    },
    {
      "pregunta": "¿Cuándo se aplica una penalización al bono de Métricas Verdes del colaborador?",
      "keywords": [
        "Al usar envases prohibidos más de 3 veces en un mes",
        "Al usar cualquier envase plástico una sola vez"
      ],
      "respuestaCorrecta": 0,
      "feedback": "Página 8: Refuerza el Régimen de Penalizaciones y el criterio de reincidencia."
    },
    {
      "pregunta": "¿Para qué se utilizan los registros del volumen de residuos reciclados?",
      "keywords": [
        "Solo para control interno operativo",
        "Para la elaboración de reportes ESG presentados a los accionistas"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Página 9: Revisa la sección Monitoreo y Reportes de Sostenibilidad."
    },
    {
      "pregunta": "¿Con qué frecuencia se revisa el Plan Cero Plásticos para asegurar la mejora continua?",
      "keywords": [
        "De manera semestral incorporando innovación y alianzas certificadas",
        "Únicamente cuando la normativa lo exige"
      ],
      "respuestaCorrecta": 0,
      "feedback": "Página 10: Refuerza la sección de Mejora Continua e Innovación."
    }
  ],
  'Herramienta IA para Developers': [
    {
      "pregunta": "¿Cuál es el principal beneficio de usar herramientas de IA en el desarrollo de software según la introducción?",
      "keywords": [
        "Incrementar la productividad y reducir tiempos de entrega",
        "Eliminar por completo la necesidad de revisiones humanas"
      ],
      "respuestaCorrecta": 0,
      "feedback": "Debes reforzar la pág 1, sección Introducción a la IA en el desarrollo de software"
    },
    {
      "pregunta": "¿Qué función clave cumplen los asistentes de programación con IA?",
      "keywords": [
        "Sustituir a los equipos de ciberseguridad",
        "Sugerir código, detectar errores y generar pruebas"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Debes reforzar la pág 2, sección Asistentes de Programación con IA"
    },
    {
      "pregunta": "¿Por qué los LLM son relevantes desde un enfoque de seguridad?",
      "keywords": [
        "Porque permiten generar exploits automáticamente",
        "Porque ayudan a comprender, generar y analizar código y documentación"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Debes reforzar la pág 3, sección Modelos de Lenguaje (LLM)"
    },
    {
      "pregunta": "¿Cuál es la ventaja principal de conocer frameworks de Machine Learning para un developer?",
      "keywords": [
        "Ampliar capacidades técnicas para construir y desplegar modelos",
        "Reemplazar completamente el desarrollo tradicional"
      ],
      "respuestaCorrecta": 0,
      "feedback": "Debes reforzar la pág 4, sección Frameworks de Machine Learning"
    },
    {
      "pregunta": "¿Cómo contribuye la IA al proceso de testing de software?",
      "keywords": [
        "Eliminando la necesidad de pruebas",
        "Generando automáticamente casos de prueba y detectando patrones de fallos"
      ],
      "respuestaCorrecta": 1,
      "feedback": "Debes reforzar la pág 5, sección IA para Testing"
    },
    {
      "pregunta": "¿Qué aporta la IA al análisis de código y la seguridad?",
      "keywords": [
        "Detección de vulnerabilidades y malas prácticas",
        "Creación de código sin validación alguna"
      ],
      "respuestaCorrecta": 0,
      "feedback": "Debes reforzar la pág 6, sección IA para Análisis de Código y Seguridad"
    },
    {
      "pregunta": "¿Cuál es un uso clave de la IA en DevOps?",
      "keywords": [
        "Predecir fallos y optimizar pipelines CI/CD",
        "Eliminar la necesidad de monitoreo"
      ],
      "respuestaCorrecta": 0,
      "feedback": "Debes reforzar la pág 7, sección Herramientas de IA para DevOps"
    },
    {
      "pregunta": "¿Por qué la IA es valiosa para la documentación técnica?",
      "keywords": [
        "Porque mantiene la documentación actualizada automáticamente",
        "Porque reemplaza los controles de seguridad"
      ],
      "respuestaCorrecta": 0,
      "feedback": "Debes reforzar la pág 8, sección IA para Documentación Técnica"
    },
    {
      "pregunta": "¿Qué tipo de tareas mejoran las herramientas de productividad con IA?",
      "keywords": [
        "Gestión de tareas y análisis de requerimientos",
        "Exclusivamente tareas de hacking ético"
      ],
      "respuestaCorrecta": 0,
      "feedback": "Debes reforzar la pág 9, sección Herramientas de IA para Productividad"
    },
    {
      "pregunta": "¿Cuál es la conclusión principal sobre el uso de IA para developers?",
      "keywords": [
        "Es una competencia clave para mantenerse relevante",
        "Es una moda temporal sin impacto real"
      ],
      "respuestaCorrecta": 0,
      "feedback": "Debes reforzar la pág 10, sección Conclusiones"
    }
  ]

};