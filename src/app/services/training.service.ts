import { Injectable } from '@angular/core';
import { TrainingCapsule } from '../models/training.model';

export const PDF_DATA = {
  CIBERSEGURIDAD: [
    "P1: Introducción - La ciberseguridad es una responsabilidad compartida entre todos los colaboradores del Retailer Peruano. En el contexto del año 2026, donde los ataques digitales son más sofisticados y frecuentes, la protección de la información corporativa, de clientes y de socios estratégicos es crítica para la continuidad del negocio. Este documento establece lineamientos claros y actualizados que deben ser comprendidos y cumplidos por todo el personal, independientemente de su rol o nivel jerárquico. La falta de cumplimiento puede generar riesgos financieros, legales y reputacionales para la organización.",
    "P2: Gestión de Contraseñas Seguras - Las contraseñas constituyen la primera línea de defensa frente a accesos no autorizados. Todas las contraseñas corporativas deben tener un mínimo de 16 caracteres e incluir letras mayúsculas, minúsculas, números y al menos un símbolo Unicode. Está estrictamente prohibido reutilizar contraseñas anteriores o usar la misma contraseña en sistemas personales y corporativos. Se recomienda el uso de gestores de contraseñas aprobados por la empresa para asegurar un almacenamiento cifrado y seguro.",
    "P3: Phishing y Correos Sospechosos - El phishing sigue siendo uno de los principales vectores de ataque en entornos corporativos. Todo correo sospechoso, enlaces desconocidos o archivos adjuntos no esperados deben ser reportados inmediatamente utilizando el botón 'Reportar Incidente' en Outlook. La rapidez en el reporte es vital para que el equipo de seguridad informática (SOC) pueda bloquear la amenaza a nivel global antes de que afecte a otros usuarios.",
    "P4: Seguridad de Hardware y Dispositivos - La integridad de los equipos corporativos es fundamental. Queda terminantemente prohibido conectar dispositivos USB personales, discos duros externos o cualquier dispositivo no autorizado por el departamento de IT a las laptops o equipos de escritorio de la empresa. Estos dispositivos pueden contener malware que se propague automáticamente al entrar en contacto con la red corporativa.",
    "P5: Redes y Trabajo Remoto - El acceso a la información desde fuera de las oficinas centrales debe realizarse exclusivamente a través de la VPN GlobalProtect oficial. Está prohibido el uso de redes Wi-Fi públicas o abiertas sin el uso de la VPN. Todo tráfico de red debe estar cifrado para evitar la interceptación de datos sensibles por parte de actores malintencionados.",
    "P6: Autenticación de Doble Factor (MFA) - El uso de la autenticación de doble factor es obligatorio para todas las aplicaciones y servicios corporativos. El token dinámico generado por la aplicación Microsoft Authenticator es personal e intransferible. Nunca se debe proporcionar este código a terceros, ni siquiera si alguien alega ser del equipo de soporte técnico o de la gerencia de IT.",
    "P7: Ingeniería Social - Los atacantes suelen utilizar técnicas de manipulación psicológica para engañar a las personas para obtener información confidencial. Nunca se deben proporcionar datos de clientes, accesos o información interna a través de llamadas telefónicas, mensajes o correos no validados. Ante cualquier duda, se debe verificar la identidad del solicitante mediante los canales oficiales establecidos por la empresa.",
    "P8: Política de Escritorio Limpio - La política de 'Escritorio Limpio' es fundamental para evitar fugas de información. Está prohibido dejar contraseñas, accesos o información sensible anotada en post-its, libretas o papeles visibles. Al finalizar la jornada laboral, todo documento físico debe guardarse de forma segura y el equipo debe bloquearse.",
    "P9: Actualizaciones y Parches de Seguridad - Las actualizaciones del sistema operativo y aplicaciones corporativas son obligatorias. Todos los equipos deben reiniciarse cada martes para permitir la instalación de parches de seguridad. Estas actualizaciones corrigen vulnerabilidades críticas que pueden ser explotadas por atacantes. Retrasar o evitar los reinicios incrementa significativamente el riesgo de incidentes.",
    "P10: Gestión de Emergencias - Ransomware - Ante un incidente de secuestro de datos (Ransomware), el colaborador debe apagar inmediatamente el equipo y comunicarse con el anexo 911. No se debe intentar reiniciar, formatear ni pagar rescates. Una respuesta rápida y coordinada es clave para minimizar el impacto y recuperar la operación de forma segura."
  ],
  HOSTIGAMIENTO: [
    "P1: Introducción y Marco Legal - El hostigamiento sexual laboral constituye una vulneración grave de los derechos fundamentales de la persona, afectando la dignidad, la integridad, la igualdad y el derecho a un ambiente de trabajo seguro. En el Perú, este fenómeno es abordado desde un marco normativo robusto (Ley N.º 30364) que impone obligaciones claras a las empresas, así como mecanismos de prevención, atención, sanción y reparación.",
    "P2: Definiciones y Tipos - Se entiende por hostigamiento sexual toda conducta de naturaleza sexual o sexista, no deseada, que afecta la dignidad o crea un entorno hostil. Tipos: 1. Quid pro quo (condicionamiento de beneficios). 2. Ambiental (conductas reiteradas que generan un entorno hostil). Sujetos: Víctima, persona denunciada, empleador y Comité de Intervención.",
    "P3: Comité de Intervención Frente al Hostigamiento Sexual - El Comité es el órgano encargado de recibir denuncias, investigar y proponer sanciones. Debe estar formado por 4 miembros: 2 representantes de los trabajadores y 2 del empleador, garantizando siempre la paridad de género (50% hombres y 50% mujeres).",
    "P4: Medidas de Protección a la Víctima - Una vez presentada la denuncia, el empleador tiene un plazo máximo de 24 horas para dictar medidas de protección. Estas pueden incluir la rotación del presunto hostigador, la suspensión temporal del mismo o la licencia con goce de haber para la víctima.",
    "P5: Procedimientos en Trabajo Remoto y Presencial - La ley protege al trabajador independientemente de su modalidad. Las medidas de protección y la investigación se mantienen vigentes para el teletrabajo. Se puede aplicar el cambio de área o la suspensión de accesos remotos del denunciado para evitar el contacto digital.",
    "P6: Prohibiciones Expresas: Revictimización y Careo - Está terminantemente prohibido exponer a la víctima a interrogatorios innecesarios o cuestionar su conducta personal. Asimismo, no se permite el careo entre la persona denunciante y la denunciada bajo ninguna circunstancia, para evitar mayor daño emocional.",
    "P7: Etapas de la Investigación Interna - El proceso consta de: 1. Evaluación preliminar (admisión de la denuncia). 2. Investigación (recopilación de pruebas). 3. Informe final (determinación de responsabilidad). Se aplica el criterio de razonabilidad y valoración integral de la prueba.",
    "P8: Régimen Sancionador - Las faltas se clasifican en Leve, Grave y Muy Grave. Según la gravedad, las sanciones pueden ir desde una amonestación escrita hasta la resolución del contrato de trabajo (despido) para el hostigador, sin perjuicio de las acciones legales penales.",
    "P9: Prevención y Capacitación - La empresa debe realizar capacitaciones anuales obligatorias para todo el personal. Además, es deber de la organización difundir constantemente las políticas de tolerancia cero y promover una cultura organizacional basada en el respeto y el liderazgo ético.",
    "P10: Seguimiento y Compliance - El sistema de cumplimiento (Compliance) integra indicadores como el número de denuncias, tiempos de respuesta y medidas adoptadas. La auditoría periódica asegura que los protocolos se cumplan estrictamente según la normativa vigente."
  ],
  SOSTENIBILIDAD: [
    "P1: Introducción a la Sostenibilidad ESG - La sostenibilidad empresarial es un pilar estratégico que integra la responsabilidad ambiental, social y económica. El documento desarrolla el Plan Cero Plásticos alineado con estándares ESG, economía circular y políticas internas de métricas verdes.",
    "P2: Marco Normativo y ISO 14001 - La gestión de residuos sólidos se rige por leyes nacionales y estándares internacionales como la ISO 14001. El objetivo es la mejora continua del desempeño ambiental mediante la identificación y control de impactos.",
    "P3: Objetivos del Plan Cero Plásticos - El plan busca reducir al mínimo el uso de plásticos de un solo uso y fomentar hábitos responsables. Aplica a todas las sedes, personal y proveedores que interactúen con la organización.",
    "P4: Clasificación de Residuos - Tachos Rojos - Los tachos de color rojo están destinados exclusivamente a Residuos Peligrosos o E-waste. Esto incluye equipos electrónicos, baterías, cartuchos de tóner y cualquier material con componentes químicos peligrosos.",
    "P5: Clasificación de Residuos - Tachos Azules y Blancos - Tachos Azules: destinados a papel y cartón limpio. Tachos Blancos: destinados a plásticos limpios y secos (como botellas PET). La segregación correcta es vital para el proceso de reciclaje posterior.",
    "P6: Segregación en la Fuente - Es responsabilidad individual de cada colaborador realizar la segregación correcta en su puesto de trabajo. No se debe mezclar residuos orgánicos con materiales reciclables, ya que esto contamina el lote y evita su reaprovechamiento.",
    "P7: Prohibición de Envases de un Solo Uso - Queda prohibido el ingreso y uso de vasos descartables, cubiertos plásticos y sorbetes en todas las sedes corporativas. Se promueve el uso de envases reutilizables y materiales biodegradables.",
    "P8: Régimen de Penalizaciones y Bono Verde - El sistema interno de Métricas Verdes evalúa el desempeño ambiental. El uso reiterado de envases prohibidos (más de 3 veces al mes) genera un descuento directo en el bono de métricas verdes del colaborador.",
    "P9: Monitoreo y Reportes de Sostenibilidad - Se lleva un registro estricto del volumen de residuos reciclados y la reducción de plásticos. Estos resultados se integran en los reportes anuales de sostenibilidad (Reportes ESG) presentados a los accionistas.",
    "P10: Mejora Continua e Innovación - El Plan Cero Plásticos se revisa semestralmente para incorporar nuevas tecnologías verdes y alianzas con empresas de reciclaje certificadas, asegurando que la empresa se mantenga a la vanguardia de la gestión ambiental."
  ],
  IADEVELOPER:  [
    "P1: Introducción a la IA en Desarrollo - La Inteligencia Artificial es un pilar fundamental del software moderno que permite automatizar tareas, generar código e incrementar la productividad de los developers.",
    "P2: Asistentes de Programación con IA - Estas herramientas ayudan a escribir, refactorizar y comprender código analizando el contexto del proyecto. Incluyen funciones como autocompletado, detección de errores y generación de pruebas unitarias.",
    "P3: Modelos de Lenguaje (LLM) - Los LLM son el núcleo de las herramientas modernas, permitiendo generar código, documentación técnica y resolver problemas complejos. Es esencial interactuar con ellos mediante prompts y APIs.",
    "P4: Frameworks de Machine Learning - Frameworks como TensorFlow y PyTorch permiten construir y entrenar modelos de IA. Conocer estas herramientas amplía las capacidades técnicas del developer más allá del desarrollo tradicional.",
    "P5: Herramientas de IA para Testing - La aplicación de IA en testing genera casos de prueba automáticos y detecta patrones de fallos. Esto reduce el esfuerzo manual, prioriza pruebas críticas y aumenta la cobertura del aseguramiento de calidad",
    "P6: IA para Análisis de Código y Seguridad - El análisis estático y dinámico asistido por IA ayuda a detectar vulnerabilidades y malas prácticas. Es clave para garantizar un desarrollo seguro y el cumplimiento de estándares.",
    "P7: Herramientas de IA para DevOps - En el ámbito de DevOps, la IA se utiliza para predecir fallos en sistemas, optimizar los pipelines de CI/CD y mejorar la observabilidad general de la infraestructura.",
    "P8: IA para Documentación Técnica - La generación automática de documentación es una aplicación valorada que permite mantener la información técnica actualizada y comprensible, reduciendo la carga administrativa.",
    "P9: Herramientas de IA para Productividad - Estas herramientas incluyen la gestión inteligente de tareas y el análisis de requerimientos, brindando soporte crucial en la toma de decisiones técnicas dentro de los proyectos.",
    "P10: Conclusiones y Competencia Clave - Incorporar la IA es una estrategia vital para el developer moderno. [cite_start]No es una ventaja opcional, sino una competencia clave para mantenerse relevante en la industria del software."
  ]
}

@Injectable({ providedIn: 'root' })
export class TrainingService {

  private modules = [
    { id: 0, titulo: 'Ciberseguridad Corporativa 2026', paginas: PDF_DATA.CIBERSEGURIDAD },
    { id: 1, titulo: 'Hostigamiento Sexual Laboral', paginas: PDF_DATA.HOSTIGAMIENTO },
    { id: 2, titulo: 'Sostenibilidad y Residuos', paginas: PDF_DATA.SOSTENIBILIDAD }
  ];

  private modulesSchedule = [
    { id: 0, titulo: 'Herramienta IA para Developers', paginas: PDF_DATA.IADEVELOPER }
  ];

  getModulesList(): any[] {
    return this.modules.map(m => m.titulo);
  }

getManual(index: number) {
  return  (index >= 3) ? this.modulesSchedule[0] : this.modules[index];
}

}