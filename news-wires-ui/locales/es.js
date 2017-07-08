module.exports = (env) => {
  return {
    // Values
    '$HREF': env === 'development' ? 'http://noticias.r1b.local:3000' : 'https://noticias.r1b.solutions',
    '/privacy': '/privacidad',
    '/terms': '/términos',
    '/legal': '/legal',

    // copy / strings
    'news': 'noticias',
    'More': 'Más',
    'Error': 'Error',
    'Invalid page': 'Página no válida',
    'Wire services for everyone': 'Servicios de cable para todos',
    'terms': 'términos',
    'terms of service': 'términos de servicio',
    'terms of service copy': 'News Wires es un proyecto de hobby que no recibe financiamiento externo. Puede utilizar el sitio en cualquier sitio que desee - solo tenga en cuenta que las solicitudes automatizadas excesivas al sitio incurrirán en un costo para el autor y degradarán el servicio para otros.',
    'privacy': 'privacidad',
    'privacy policy': 'política de privacidad',
    'privacy policy copy': 'La única información que News Wires almacena sobre usted es su dirección IP pública. News Wires nunca utilizará ningún software analítico para realizar el seguimiento. En el momento de redactar este informe, News Wires no se ha visto obligado a entregar ninguna de sus datos a las fuerzas del orden',
    'Not Found': 'Extraviado',
    'legal': 'legal',
    'disclaimer copy': 'El autor no ofrece ninguna garantía con respecto a la exactitud, la imparcialidad o la integridad de cualquier informe vinculado aquí. Muchas agencias de prensa en todo el mundo están controladas por gobiernos, oligarcas y organizaciones de inteligencia. El lector debe tener cuidado de entender el clima político que rodea cada fuente de noticias que escogen leer.',
    'fair use copy': 'Los titulares y los vínculos que se muestran aquí están protegidos bajo un uso justo.'
  };
};
