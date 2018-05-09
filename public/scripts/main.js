// ARRAY //
var myArrF = [
    [ // Cordialidad/Amabilidad //
        [ // Cordialidad/Amabilidad //
            "N/A", // High-High //
            "N/A", // High-Low //
            "N/A", // Low-High //
            "N/A"  // Low-Low //
        ],
        [ // Responsabilidad //
            "Dependiente, responsable, de confianza, educado, considerado", // High-High //
            "No pretencioso, moderado", // High-Low //
            "Firme, estricto, rigido", // Low-High //
            "Inprudente, incooperativo, no fidedigno, desconfiado, desconsiderado"  // Low-Low //
        ],
        [ // Extrovertido //
            "Social, energetico, entusiasta, comunicativo, viva", // High-High //
            "Pacifico, humilde, sumiso, timido, obediente", // High-Low //
            "Dogmatico, fuerte, dominador, jactancioso, mandón", // Low-High //
            "Escéptico, preocupado por otros, solitario, poco comunicativo, antisocial"  // Low-Low //
        ],
        [ // Estabilidad Emocional //
            "Emocional, crédulo, afectivo, sensible, blando", // High-High //
            "Paciente, relajado, poco exigente, aterrizado", // High-Low //
            "Temperamental, irritable, peleonero, impaciente, gruñón", // Low-High //
            "frío, insensible, poco afectivo, desapasionado"  // Low-Low //
        ],
        [ // Apertura a la Experiencia //
            "Tdealista, diplomatico, profundo, tactico, genial", // High-High //
            "Simple, dependiente", // High-Low //
            "Perspicaz, ecentrico, individual", // Low-High //
            "Grocero, sin tacto, brusco, mente pequeña, cruel"  // Low-Low //
        ]
    ],
    [ // Responsabilidad //
        [ // Cordialidad/Amabilidad //
            "Ayudador, cooperativo, considerado, respetuoso, cortés", // High-High //
            "Firme, estricto, rigido", // High-Low //
            "No pretencioso, moderado", // Low-High //
            "Desconsiderado, descortés, desconfianza, falta de cooperación, inconsciente"  // Low-Low //
        ],
        [ // Responsabilidad //
            "N/A", // High-High //
            "N/A", // High-Low //
            "N/A", // Low-High //
            "N/A"  // Low-Low //
        ],
        [ // Extrovertido //
            "Activo, Competitivo, persistente, ambicioso, útil", // High-High //
            "Reservado, serio, discreto, cauteloso, con principios", // High-Low //
            "Bullicioso, dañoso, exhibicionista, gregario, expresivo", // Low-High //
            "indirecto, apagado, lento, impersistente, vago"  // Low-Low //
        ],
        [ // Estabilidad Emocional //
            "Particular, nervioso", // High-High //
            "Racional, objetivo, estable, logico, decisivo", // High-Low //
            "Compulsivo, curioso, egoísta, olvidadizo, impulsivo", // Low-High //
            "Informal, sencillo"  // Low-Low //
        ],
        [ // Apertura a la Experiencia //
            "Analitico, perceptivo, informativo, articulado, digno", // High-High //
            "Convencional, tradicional", // High-Low //
            "Poco convencional, peculiar", // Low-High //
            "Poca imaginación, imprudente, ilogico, inmaduro, desorganizado"  // Low-Low //
        ]
    ],
    [ // Extrovertido //
        [ // Cordialidad/Amabilidad //
            "Efervecente, feliz, amigable,alegre,  jovial", // High-High //
            "Obstinado, abrupto, crudo, peleonero, rudo", // High-Low //
            "Corazon de pollo, agradable, servicial, humilde, indulgente,", // Low-High //
            "Cinico, preocupado por otros, reclusivo, desprende fácil de cosas, impersonal"  // Low-Low //
        ],
        [ // Responsabilidad //
            "Ambicioso, alerta, firme, útil, competitivo", // High-High //
            "Revoltoso, bullicioso, temerario, despreocupado, demostrativo ", // High-Low //
            "Cauteloso, confiado, puntual, formal, ahorrativo", // Low-High //
            "Indeciso, sin objetivo, evasivo, débil, sin ambioción"  // Low-Low //
        ],
        [ // Extrovertido //
            "N/A", // High-High //
            "N/A", // High-Low //
            "N/A", // Low-High //
            "N/A"  // Low-Low //
        ],
        [ // Estabilidad Emocional //
            "Excitable, expresivo, coqueto, explosivo, extravagante", // High-High //
            "Inconciente, cansado, infatigable", // High-Low //
            "Guardado, inseguro, displicente, reservado, pesimista", // Low-High //
            "Modesto, sin excitación, plácido, tranquilo"  // Low-Low //
        ],
        [ // Apertura a la Experiencia //
            "Mundano, teatral, elocuente, inquisitivo, intenso", // High-High //
            "Rollero, inmoral, pomposo", // High-Low //
            "Introspectivo, mediatico, contemplador, auto-observador, interiorizado", // Low-High //
            "Predesible, sin imaginación, sombrío, apático, poco aventurero"  // Low-Low //
        ]
    ],
    [ // Estabilidad Emocional //
        [ // Cordialidad/Amabilidad //
            "Sentimental, afectivo, sensible, blando, apasionado ", // High-High //
            "Criticón, egoísta, malhumorado, antagonista, enojón", // High-Low //
            "Generoso, placentero, tolerante, pacifico, flexible", // Low-High //
            "Insensible, sin afecto, sin pasión, frío"  // Low-Low //
        ],
        [ // Responsabilidad //
            "Particular, nervioso", // High-High //
            "Atolondrado, inconsistente, erratico, egoísta, olvidadizo, impulsivo", // High-Low //
            "Completo, estable, consistente, disciplinado, logico", // Low-High //
            "Informal, sencillo"  // Low-Low //
        ],
        [ // Extrovertido //
            "Versátil, expresivo, coqueto, explosivo, extravagante", // High-High //
            "Guardado, reservado, pesimista, cobarde", // High-Low //
            "Confiado, audaz, asegura, desihibido, valiente", // Low-High //
            "modesto, sin excitación, plácido, tranquilo, sedado"  // Low-Low //
        ],
        [ // Estabilidad Emocional //
            "N/A", // High-High //
            "N/A", // High-Low //
            "N/A", // Low-High //
            "N/A"  // Low-Low //
        ],
        [ // Apertura a la Experiencia //
            "Apasionado, excitado, sensual", // High-High //
            "Molestable, irritable, aprensivo", // High-Low //
            "Creativo, inteligente, versátil, perspicaz, inventivo", // Low-High //
            "Imperturbable, insensible"  // Low-Low //
        ]
    ],
    [ // Apertura a la Experiencia //
        [ // Cordialidad/Amabilidad //
            "Genial, tactico, diplomatico, profundo, idealista", // High-High //
            "Perspicaz, excentrico, individual", // High-Low //
            "Simple, dependiente", // Low-High //
            "Grocero, sin tacto, brusco, mente pequeña, cruel"  // Low-Low //
        ],
        [ // Responsabilidad //
            "Sofisticado, perfeccionsta, industrioso, digno, refinado", // High-High //
            "Poco convencional, peculiar", // High-Low //
            "Convencional, tradicional", // Low-High //
            "Imprudente, ilogico, inmaduro, desorganizado, flojo"  // Low-Low //
        ],
        [ // Extrovertido //
            "Expresivo, honesto, dramatico, espontáneo, ingenioso", // High-High //
            "Introspectivo, mediatico, contemplador, auto-observador, interiorizado", // High-Low //
            "Rollero, inmoral, pomposo", // Low-High //
            "Predesible, sombrío, dócil, pasivo, apático, poco aventurero"  // Low-Low //
        ],
        [ // Estabilidad Emocional //
            "Apasionado, excitado, sensual", // High-High //
            "Creativo, inteligente, versátil, perspicaz, muy sentido", // High-Low //
            "Molestable, irritable, aprensivo", // Low-High //
            "Imperturbable, insensible"  // Low-Low //
        ],
        [ // Apertura a la Experiencia //
            "N/A", // High-High //
            "N/A", // High-Low //
            "N/A", // Low-High //
            "N/A"  // Low-Low //
        ]
    ]
];

alert(myArrF[0][1][2]);
