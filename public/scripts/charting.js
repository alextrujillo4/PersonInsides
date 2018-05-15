
    var ctx = document.getElementById("myChart").getContext('2d');

    var openness;
    var conscientiousness;
    var extraversion;
    var agreeableness;
    var emotionalRange;

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

    function getImportantText(big5Array) {

      console.log ("Entro en la funcion GETIMPORTANTTEXT");
      console.log (big5Array);
    	var top1;
    	var top2;
    	//0: (H,H) 1: (H,L) 2: (L,L) 3: (L,H)
    	var pair;
    	var arrHiLo = [0,0];

    	// llena un arreglo para ver si cada valor es alto o bajo
    	for (var i = 0; i < big5Array.length; i++) {
    		if (big5Array[i].percentile > 0.5)
    			arrHiLo[i] = 1;
    		else
    			arrHiLo[i] = 0;
    	}
    	//modifica los valores para ser distancia del punto medio
    	for (var i = 0; i < big5Array.length; i++) {
    		big5Array[i] = Math.abs(big5Array[i].percentile - 0.5);
    		console.log(big5Array[i]);
    	}

    	top1 = 0;
    	top2 = 0;

        var high1 = 0;
        var high2 = 0;

    	// Separa las posiciones del mas grande y segundo mas grande
        for (var i = 0; i < big5Array.length; i++) {
          if (big5Array[i] > high1) {
            high2 = high1;
    		top2 = top1;
            high1 = big5Array[i];
    		top1 = i;
          } else if (big5Array[i] > high2) {
            high2 = big5Array[i];
    		top2 = i;
          }
        }

    	//Define las posiciones de la matriz 3D
    	if (arrHiLo[top1] == 1 && arrHiLo[top2] == 1){
    		pair = 0;
    	} else if (arrHiLo[top1] == 1 && arrHiLo[top2] == 0) {
    		pair = 1;
    	} else if (arrHiLo[top1] == 0 && arrHiLo[top2] == 0) {
    		pair = 2;
    	} else if (arrHiLo[top1] == 0 && arrHiLo[top2] == 1) {
    		pair = 3;
    	}

	//Regresa los 3 valores
// return myArrF[top12][top1][pair];
    return myArrF[top2][top1][pair];
}

    $.ajax({

            url: "/LastProfile",
            cache : true,
            type : "POST",
            crossDomain: true,
            dataType : "json",

            error : function(errorMessage, textStatus, errorThrown) {
                console.log(errorMessage);
                console.log(textStatus);
                console.log(errorThrown);
                console.log("EL AJAX RECIBIO ERROR");
                var openness = 0;
                var conscientiousness = 0;
                var extraversion = 0;
                var agreeableness = 0;
                var emotionalRange = 0;
            },

            success: function(dataReceived){

                    //console.log("Data that was received from the server: " + dataReceived.personality[0].name);
                    //console.log("Data received from the server, but I wont show it to you. Just kidding: " );
                    //console.log("All data" + dataReceived.personality[10].percentile);


                    console.log("Data: " + dataReceived.personality[0].percentile);
                    console.log("Data: " + dataReceived.personality[1].percentile);
                    console.log("Data: " + dataReceived.personality[2].percentile);
                    console.log("Data: " + dataReceived.personality[3].percentile);
                    console.log("Data: " + dataReceived.personality[4].percentile);

                    var openness = dataReceived.personality[0].percentile;
                    var conscientiousness = dataReceived.personality[1].percentile;
                    var extraversion = dataReceived.personality[2].percentile;
                    var agreeableness = dataReceived.personality[3].percentile;
                    var emotionalRange = dataReceived.personality[4].percentile;

                    //$("#insightsDescription").html(getImportantText(dataReceived.personality));



                    //Grafica de big5
                    var myChart = new Chart(ctx, {
                        type: 'radar',
                        data: {
                            labels: ["Apertura", "Consciencia", "Extroversión", "Amabilidad", "Estabilidad emocional"],
                            datasets: [{
                                label: 'Personalidad',
                                data: [openness, conscientiousness, extraversion, agreeableness, emotionalRange],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255,99,132,1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero:true
                                    }
                                }]
                            }
                        }
                    });

                    // SQUARE CHART STARTS //
                    //Grafica de valores
                    Highcharts.chart('container2', {
                        series: [{
                            type: "treemap",
                            layoutAlgorithm: 'stripes',
                            alternateStartingDirection: true,
                            levels: [{
                                level: 1,
                                layoutAlgorithm: 'sliceAndDice',
                                dataLabels: {
                                    enabled: true,
                                    align: 'left',
                                    verticalAlign: 'top',
                                    style: {
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                        textShadow: 'none'
                                    }
                                }
                            }],
                            data: [{
                                id: 'A',
                                name: 'Conservador',
                                color: "#009688"
                            }, {
                                id: 'B',
                                name: 'Apertura al Cambio',
                                color: "#2196F3"
                            }, {
                                id: 'C',
                                name: 'Hedonismo',
                                color: '#EC9800'
                            }, {
                                id: 'D',
                                name: 'Mejoramiento Autónomo',
                                color: '#F44336'
                            }, {
                                id: 'E',
                                name: 'Trascender',
                                color: '#8BC34A'
                            }, {
                                parent: 'A',
                                name: dataReceived.values[0].percentile*100 + "<h1>%</h1>",
                                value: dataReceived.values[0].percentile*100
                            }, {
                                parent: 'B',
                                name: dataReceived.values[1].percentile*100 + "<h1>%</h1>",
                                value: dataReceived.values[1].percentile*100
                            }, {
                                parent: 'C',
                                name: dataReceived.values[2].percentile*100 + "<h1>%</h1>",
                                value: dataReceived.values[2].percentile*100
                            }, {
                                parent: 'D',
                                name: dataReceived.values[3].percentile*100 + "<h1>%</h1>",
                                value: dataReceived.values[3].percentile*100
                            }, {
                                parent: 'E',
                                name: dataReceived.values[4].percentile*100 + "<h1>%</h1>",
                                value: dataReceived.values[4].percentile*100
                            }]
                        }],
                        title: {
                            text: 'Valores'
                        }
                    });

                    // SQUARE CHARTS ENDS //


                    // BUBBLE CHARTS STARTS //
                    //Grafica de necesidades
                    Highcharts.chart('container3', {

                      chart: {
                        type: 'bubble',
                        plotBorderWidth: 1,
                        zoomType: 'xy'
                      },

                      legend: {
                        enabled: false
                      },

                      title: {
                        text: 'Necesidades'
                      },

                      xAxis: {
                        gridLineWidth: 0,
                        tickColor: 'white',
                        title: null,
                        labels: {
                          enabled: false
                        },
                      },

                      yAxis: {
                        gridLineWidth: 0,
                        startOnTick: false,
                        endOnTick: false,
                        title: null,
                        labels: {
                          enabled: false
                        },
                        maxPadding: 0.2,
                      },

                      tooltip: {
                        useHTML: true,
                        headerFormat: '<table>',
                        pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
                          '<tr><th></th><td>{point.z}%</td></tr>',
                        footerFormat: '</table>',
                        followPointer: true
                      },

                      plotOptions: {
                        series: {
                          dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                          }
                        }
                      },

                      series: [{
                        data: [
                          { x: 0, y: 0, z: dataReceived.needs[0].percentile*100, name: 'Retos', country: 'Retos', color: '#FF5722' },
                          { x: 5, y: 5, z: dataReceived.needs[1].percentile*100, name: 'Reservarse', country: 'Reservarse', color: '#FF9800'},
                          { x: 10, y: 10, z: dataReceived.needs[2].percentile*100, name: 'Curiosidad', country: 'Curiosidad', color: '#E91E63'},
                          { x: 15, y: 15, z: dataReceived.needs[3].percentile*100, name: 'Emoción', country: 'Emoción', color: '#FFEB3B'},
                          { x: 20, y: 20, z: dataReceived.needs[4].percentile*100, name: 'Armonía', country: 'Armonía', color: '#673AB7'},
                          { x: 25, y: 25, z: dataReceived.needs[5].percentile*100, name: 'Ideales', country: 'Ideales', color: '#8BC34A'},
                          { x: 30, y: 30, z: dataReceived.needs[6].percentile*100, name: 'Libertad', country: 'Libertad', color: '#4CAF50'},
                          { x: 35, y: 35, z: dataReceived.needs[7].percentile*100, name: 'Amor', country: 'Amor', color: '#009688'},
                          { x: 40, y: 40, z: dataReceived.needs[8].percentile*100, name: 'Práctico', country: 'Práctico', color: '#00BCD4'},
                          { x: 45, y: 45, z: dataReceived.needs[9].percentile*100, name: 'Expresivo', country: 'Expresivo', color: '#9C27B0'},
                          { x: 50, y: 50, z: dataReceived.needs[10].percentile*100, name: 'Estabilidad', country: 'Estabilidad', color: '#2196F3'},
                          { x: 55, y: 55, z: dataReceived.needs[11].percentile*100, name: 'Estructura', country: 'Estructura', color: '#3F51B5'},
                        ]
                      }]

                    });

                    // BUBBLE CHARTS ENDS //

            }

        });
