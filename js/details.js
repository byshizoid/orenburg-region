// Функционал страниц детальной информации
document.addEventListener('DOMContentLoaded', function() {
    // Получаем ID из URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Определяем тип страницы (населенный пункт или производство)
    const isSettlement = window.location.pathname.includes('settlement-details');
    const isIndustry = window.location.pathname.includes('industry-details');

    // Данные о населенных пунктах
    const settlementsData = {
        orenburg: {
            name: 'Оренбург',
            type: 'Город',
            population: '572 188',
            district: 'Оренбургский',
            founded: '1743',
            description: 'Оренбург - административный центр Оренбургской области, крупный промышленный и культурный центр. Город расположен на реке Урал, в месте впадения в неё реки Сакмары. Оренбург является важным транспортным узлом, через который проходят железнодорожные и автомобильные магистрали федерального значения.',
            history: 'Оренбург был основан в 1743 году как крепость для защиты юго-восточных границ Российской империи. В XVIII-XIX веках город был важным торговым центром между Европой и Азией. В советский период Оренбург стал крупным промышленным центром, особенно после открытия месторождений природного газа.',
            economy: {
                industries: [
                    'Нефтегазовая промышленность',
                    'Машиностроение',
                    'Пищевая промышленность',
                    'Строительство'
                ]
            },
            attractions: [
                {
                    name: 'Пешеходный мост',
                    description: 'Символ города, соединяющий Европу и Азию',
                    image: 'orenburg-pedestrian.jpg'
                },
                {
                    name: 'Драматический театр',
                    description: 'Один из старейших театров России',
                    image: 'orenburg-drama.jpg'
                },
                {
                    name: 'Краеведческий музей',
                    description: 'Крупнейший музей области',
                    image: 'orenburg-museum.jpg'
                }
            ],
            transport: {
                public: [
                    'Троллейбусы',
                    'Автобусы',
                    'Маршрутные такси'
                ],
                intercity: [
                    'Железнодорожный вокзал',
                    'Международный аэропорт',
                    'Автовокзал'
                ]
            }
        },
        orsk: {
            name: 'Орск',
            type: 'Город',
            population: '189 195',
            district: 'Орский',
            founded: '1735',
            description: 'Орск - второй по величине город Оренбургской области, крупный промышленный центр. Город расположен в южной части Уральских гор, на реке Урал. Орск является важным транспортным узлом и центром цветной металлургии.',
            history: 'Орск был основан в 1735 году как крепость Оренбург. В 1740 году крепость была перенесена на новое место, а на старом месте возник город Орск. В XIX веке город стал важным торговым центром, а в советский период развился как крупный промышленный центр.',
            economy: {
                industries: [
                    'Цветная металлургия',
                    'Машиностроение',
                    'Пищевая промышленность',
                    'Строительство'
                ]
            },
            attractions: [
                {
                    name: 'Крепость',
                    description: 'Исторический центр города',
                    image: 'orsk-fortress.jpg'
                },
                {
                    name: 'Драматический театр',
                    description: 'Культурный центр города',
                    image: 'orsk-theater.jpg'
                },
                {
                    name: 'Краеведческий музей',
                    description: 'Музей истории города',
                    image: 'orsk-museum.jpg'
                }
            ],
            transport: {
                public: [
                    'Трамваи',
                    'Автобусы',
                    'Маршрутные такси'
                ],
                intercity: [
                    'Железнодорожный вокзал',
                    'Аэропорт',
                    'Автовокзал'
                ]
            }
        },
        novotroitsk: {
            name: 'Новотроицк',
            type: 'Город',
            population: '87 517',
            district: 'Новотроицкий',
            founded: '1945',
            description: 'Новотроицк - город металлургов, основанный в годы Великой Отечественной войны. Город расположен на реке Урал, вблизи границы с Казахстаном. Новотроицк является одним из крупнейших центров металлургической промышленности России.',
            history: 'Новотроицк был основан в 1945 году в связи со строительством Орско-Халиловского металлургического комбината. Город быстро развивался как промышленный центр, став одним из важнейших металлургических центров страны.',
            economy: {
                industries: [
                    'Черная металлургия',
                    'Машиностроение',
                    'Строительство',
                    'Пищевая промышленность'
                ]
            },
            attractions: [
                {
                    name: 'Парк культуры и отдыха',
                    description: 'Центральный парк города',
                    image: 'novotroitsk-park.jpg'
                },
                {
                    name: 'Дворец культуры металлургов',
                    description: 'Культурный центр города',
                    image: 'novotroitsk-palace.jpg'
                },
                {
                    name: 'Краеведческий музей',
                    description: 'Музей истории города',
                    image: 'novotroitsk-museum.jpg'
                }
            ],
            transport: {
                public: [
                    'Автобусы',
                    'Маршрутные такси'
                ],
                intercity: [
                    'Железнодорожный вокзал',
                    'Автовокзал'
                ]
            }
        },
        gai: {
            name: 'Гай',
            type: 'Город',
            population: '37 621',
            district: 'Гайский',
            founded: '1959',
            description: 'Гай - город горняков, основанный в связи с разработкой Гайского медно-колчеданного месторождения. Город расположен в восточной части Оренбургской области. Гай является центром горнодобывающей промышленности.',
            history: 'Гай был основан в 1959 году как рабочий поселок при строительстве горно-обогатительного комбината. В 1979 году поселок получил статус города. Город развивался как центр горнодобывающей промышленности.',
            economy: {
                industries: [
                    'Горнодобывающая промышленность',
                    'Цветная металлургия',
                    'Строительство',
                    'Пищевая промышленность'
                ]
            },
            attractions: [
                {
                    name: 'Озеро Гайское',
                    description: 'Искусственное озеро в центре города',
                    image: 'gai-lake.jpg'
                },
                {
                    name: 'Парк культуры и отдыха',
                    description: 'Центральный парк города',
                    image: 'gai-park.jpg'
                },
                {
                    name: 'Краеведческий музей',
                    description: 'Музей истории города',
                    image: 'gai-museum.jpg'
                }
            ],
            transport: {
                public: [
                    'Автобусы',
                    'Маршрутные такси'
                ],
                intercity: [
                    'Железнодорожный вокзал',
                    'Автовокзал'
                ]
            }
        },
        sorochinsk: {
            name: 'Сорочинск',
            type: 'Город',
            population: '27 842',
            district: 'Сорочинский',
            founded: '1737',
            description: 'Сорочинск - город в центральной части Оренбургской области, известный своей ярмаркой. Город расположен на реке Самара. Сорочинск является центром сельскохозяйственного района.',
            history: 'Сорочинск был основан в 1737 году как крепость. В XIX веке город стал известен благодаря Сорочинской ярмарке, которая была одной из крупнейших в России. Город развивался как торговый центр.',
            economy: {
                industries: [
                    'Сельское хозяйство',
                    'Пищевая промышленность',
                    'Строительство',
                    'Торговля'
                ]
            },
            attractions: [
                {
                    name: 'Сорочинская ярмарка',
                    description: 'Традиционная ярмарка',
                    image: 'sorochinsk-fair.jpg'
                },
                {
                    name: 'Свято-Троицкий собор',
                    description: 'Православный храм',
                    image: 'sorochinsk-church.jpg'
                },
                {
                    name: 'Краеведческий музей',
                    description: 'Музей истории города',
                    image: 'sorochinsk-museum.jpg'
                }
            ],
            transport: {
                public: [
                    'Автобусы',
                    'Маршрутные такси'
                ],
                intercity: [
                    'Железнодорожный вокзал',
                    'Автовокзал'
                ]
            }
        },
        buzuluk: {
            name: 'Бузулук',
            type: 'Город',
            population: '82 904',
            district: 'Бузулукский',
            founded: '1736',
            description: 'Бузулук - город в западной части Оренбургской области, расположенный на реке Самара. Город является важным транспортным узлом и центром нефтедобывающей промышленности. Рядом с городом находится уникальный природный объект - Бузулукский бор.',
            history: 'Бузулук был основан в 1736 году как крепость на Самарской военной линии. В XIX веке город стал важным торговым центром и железнодорожным узлом. В XX веке получил развитие как центр нефтедобычи.',
            economy: {
                industries: [
                    'Нефтедобывающая промышленность',
                    'Машиностроение',
                    'Пищевая промышленность',
                    'Лесная промышленность'
                ]
            },
            attractions: [
                {
                    name: 'Бузулукский бор',
                    description: 'Уникальный лесной массив, национальный парк',
                    image: 'buzuluk-1.jpg'
                },
                {
                    name: 'Никольский собор',
                    description: 'Православный храм XIX века',
                    image: 'buzuluk-2.jpg'
                },
                {
                    name: 'Краеведческий музей',
                    description: 'Музей истории города и края',
                    image: 'buzuluk-3.jpg'
                }
            ],
            transport: {
                public: [
                    'Автобусы',
                    'Маршрутные такси'
                ],
                intercity: [
                    'Железнодорожный вокзал',
                    'Автовокзал'
                ]
            }
        },
        kvarkeno: {
            name: 'Кваркено',
            type: 'Поселок городского типа',
            population: '5 234',
            district: 'Кваркенский',
            founded: '1927',
            description: 'Кваркено - поселок городского типа, административный центр Кваркенского района. Поселок расположен в восточной части Оренбургской области. Кваркено является центром сельскохозяйственного района.',
            history: 'Кваркено было основано в 1927 году как центр Кваркенского района. Поселок развивался как административный и сельскохозяйственный центр.',
            economy: {
                industries: [
                    'Сельское хозяйство',
                    'Пищевая промышленность',
                    'Строительство',
                    'Торговля'
                ]
            },
            attractions: [
                {
                    name: 'Природный парк',
                    description: 'Парк с уникальной природой',
                    image: 'kvarkeno-nature.jpg'
                },
                {
                    name: 'Озеро Кваркенское',
                    description: 'Природное озеро',
                    image: 'kvarkeno-lake.jpg'
                },
                {
                    name: 'Краеведческий музей',
                    description: 'Музей истории поселка',
                    image: 'kvarkeno-museum.jpg'
                }
            ],
            transport: {
                public: [
                    'Автобусы',
                    'Маршрутные такси'
                ],
                intercity: [
                    'Автовокзал'
                ]
            }
        },
        tyulgan: {
            name: 'Тюльган',
            type: 'Поселок городского типа',
            population: '9 876',
            district: 'Тюльганский',
            founded: '1929',
            description: 'Тюльган - поселок городского типа, административный центр Тюльганского района. Поселок расположен в северной части Оренбургской области. Тюльган является центром сельскохозяйственного района.',
            history: 'Тюльган было основано в 1929 году как центр Тюльганского района. Поселок развивался как административный и сельскохозяйственный центр.',
            economy: {
                industries: [
                    'Сельское хозяйство',
                    'Пищевая промышленность',
                    'Строительство',
                    'Торговля'
                ]
            },
            attractions: [
                {
                    name: 'Горы Тюльганские',
                    description: 'Природный памятник',
                    image: 'tyulgan-mountains.jpg'
                },
                {
                    name: 'Парк культуры и отдыха',
                    description: 'Центральный парк поселка',
                    image: 'tyulgan-park.jpg'
                },
                {
                    name: 'Краеведческий музей',
                    description: 'Музей истории поселка',
                    image: 'tyulgan-museum.jpg'
                }
            ],
            transport: {
                public: [
                    'Автобусы',
                    'Маршрутные такси'
                ],
                intercity: [
                    'Автовокзал'
                ]
            }
        }
    };

    // Данные о производствах
    const industriesData = {
        gazprom: {
            name: 'Газпром добыча Оренбург',
            type: 'Нефтегазовая отрасль',
            location: 'Оренбург',
            founded: '1974',
            employees: '5000+',
            description: 'Газпром добыча Оренбург - крупнейшее газодобывающее предприятие Оренбургской области, специализирующееся на добыче и переработке природного газа. Предприятие является частью ПАО "Газпром" и играет важную роль в обеспечении энергетической безопасности страны.',
            history: 'Предприятие было создано в 1974 году в связи с открытием Оренбургского газоконденсатного месторождения. В 1979 году был введен в эксплуатацию газоперерабатывающий завод, а в 1980 году началась промышленная добыча газа. За годы работы предприятие внесло значительный вклад в развитие газовой промышленности России.',
            production: {
                products: [
                    'Природный газ',
                    'Газовый конденсат',
                    'Сера техническая',
                    'Гелий'
                ],
                capacity: [
                    'Добыча газа: 45 млрд м³/год',
                    'Переработка газа: 40 млрд м³/год',
                    'Производство серы: 1.2 млн тонн/год'
                ]
            },
            technologies: [
                'Автоматизированные системы управления производством',
                'Экологически безопасные методы добычи и переработки',
                'Инновационные решения в области энергоэффективности'
            ],
            social: [
                'Поддержка образовательных учреждений',
                'Развитие спортивной инфраструктуры',
                'Программы по охране окружающей среды',
                'Создание новых рабочих мест'
            ],
            contacts: {
                phone: '+7 (3532) 77-77-77',
                email: 'info@gazprom-orenburg.ru',
                address: 'г. Оренбург, ул. Газпромовская, 1'
            }
        },
        orsk: {
            name: 'Орский завод металлоконструкций',
            type: 'Металлургическая промышленность',
            location: 'Орск',
            founded: '1935',
            employees: '800+',
            description: 'Орский завод металлоконструкций - одно из крупнейших предприятий Оренбургской области по производству металлоконструкций различного назначения. Завод специализируется на изготовлении строительных металлоконструкций, мостовых конструкций и промышленного оборудования.',
            history: 'Завод был основан в 1935 году и начал свою работу с производства простых металлических конструкций. За годы работы предприятие значительно расширило ассортимент продукции и модернизировало производственные мощности.',
            production: {
                products: [
                    'Строительные металлоконструкции',
                    'Мостовые конструкции',
                    'Промышленное оборудование',
                    'Металлические опоры'
                ],
                capacity: [
                    'Производство металлоконструкций: 50000 тонн/год',
                    'Обработка металла: 30000 тонн/год'
                ]
            },
            technologies: [
                'Современное сварочное оборудование',
                'Автоматизированные линии производства',
                'Системы контроля качества'
            ],
            social: [
                'Обучение молодых специалистов',
                'Социальная поддержка сотрудников',
                'Участие в городских проектах',
                'Экологические программы'
            ],
            contacts: {
                phone: '+7 (3537) 44-44-44',
                email: 'info@orsk-metal.ru',
                address: 'г. Орск, ул. Металлургов, 15'
            }
        },
        novotroitsk: {
            name: 'Новотроицкий металлургический комбинат',
            type: 'Черная металлургия',
            location: 'Новотроицк',
            founded: '1955',
            employees: '10000+',
            description: 'Новотроицкий металлургический комбинат - градообразующее предприятие Новотроицка, один из крупнейших производителей стали в России. Комбинат производит широкий ассортимент металлопродукции.',
            history: 'Комбинат был основан в 1955 году как часть программы развития металлургической промышленности СССР. За годы работы предприятие стало одним из ключевых производителей стали в стране.',
            production: {
                products: [
                    'Чугун',
                    'Сталь',
                    'Прокат',
                    'Металлопродукция'
                ],
                capacity: [
                    'Производство стали: 4 млн тонн/год',
                    'Производство проката: 3 млн тонн/год'
                ]
            },
            technologies: [
                'Доменное производство',
                'Конвертерное производство',
                'Прокатные станы',
                'Экологические технологии'
            ],
            social: [
                'Поддержка образования',
                'Развитие городской инфраструктуры',
                'Экологические программы',
                'Социальные программы для сотрудников'
            ],
            contacts: {
                phone: '+7 (3537) 66-66-66',
                email: 'info@ntmk.ru',
                address: 'г. Новотроицк, ул. Заводская, 1'
            }
        },
        gai: {
            name: 'Гайский ГОК',
            type: 'Горнодобывающая промышленность',
            location: 'Гай',
            founded: '1959',
            employees: '6000+',
            description: 'Гайский горно-обогатительный комбинат - крупнейшее предприятие Оренбургской области по добыче и обогащению медной руды. Комбинат является градообразующим предприятием города Гай.',
            history: 'Комбинат начал свою работу в 1959 году после открытия Гайского месторождения медно-колчеданных руд. За годы работы предприятие стало одним из крупнейших производителей меди в России.',
            production: {
                products: [
                    'Медная руда',
                    'Медный концентрат',
                    'Цинковый концентрат',
                    'Драгоценные металлы'
                ],
                capacity: [
                    'Добыча руды: 9 млн тонн/год',
                    'Производство концентрата: 100 тыс. тонн/год'
                ]
            },
            technologies: [
                'Современные методы добычи',
                'Обогатительное оборудование',
                'Системы экологического контроля'
            ],
            social: [
                'Развитие городской среды',
                'Поддержка образования',
                'Экологические программы',
                'Социальная защита работников'
            ],
            contacts: {
                phone: '+7 (35362) 2-22-22',
                email: 'info@ggok.ru',
                address: 'г. Гай, ул. Промышленная, 1'
            }
        },
        orenburg_milk: {
            name: 'Оренбургский молочный комбинат',
            type: 'Пищевая промышленность',
            location: 'Оренбург',
            founded: '1965',
            employees: '500+',
            description: 'Оренбургский молочный комбинат - крупное предприятие пищевой промышленности, специализирующееся на производстве молочной продукции. Комбинат производит широкий ассортимент молочных продуктов.',
            history: 'Комбинат был основан в 1965 году и за годы работы стал одним из ведущих производителей молочной продукции в регионе. Предприятие постоянно модернизирует производство и расширяет ассортимент.',
            production: {
                products: [
                    'Молоко',
                    'Кисломолочные продукты',
                    'Сыры',
                    'Масло'
                ],
                capacity: [
                    'Переработка молока: 200 тонн/сутки',
                    'Производство молочной продукции: 150 тонн/сутки'
                ]
            },
            technologies: [
                'Современные линии переработки',
                'Системы контроля качества',
                'Холодильное оборудование'
            ],
            social: [
                'Поддержка местных фермеров',
                'Экологические программы',
                'Социальные программы',
                'Благотворительность'
            ],
            contacts: {
                phone: '+7 (3532) 55-55-55',
                email: 'info@orenmilk.ru',
                address: 'г. Оренбург, ул. Молочная, 2'
            }
        },
        buzuluk_oil: {
            name: 'Бузулукский нефтеперерабатывающий завод',
            type: 'Нефтяная промышленность',
            location: 'Бузулук',
            founded: '1970',
            employees: '1200+',
            description: 'Бузулукский нефтеперерабатывающий завод - предприятие нефтеперерабатывающей промышленности, специализирующееся на переработке нефти и производстве нефтепродуктов.',
            history: 'Завод был построен в 1970 году для переработки нефти, добываемой в Оренбургской области. За годы работы предприятие модернизировало производство и увеличило мощности.',
            production: {
                products: [
                    'Бензин',
                    'Дизельное топливо',
                    'Мазут',
                    'Битум'
                ],
                capacity: [
                    'Переработка нефти: 3 млн тонн/год',
                    'Производство бензина: 1 млн тонн/год'
                ]
            },
            technologies: [
                'Современные технологии переработки',
                'Системы очистки',
                'Экологический контроль'
            ],
            social: [
                'Развитие региона',
                'Экологические программы',
                'Поддержка образования',
                'Социальные проекты'
            ],
            contacts: {
                phone: '+7 (35342) 7-77-77',
                email: 'info@buzuluk-oil.ru',
                address: 'г. Бузулук, ул. Нефтяников, 1'
            }
        },
        orsk_mash: {
            name: 'Орский машиностроительный завод',
            type: 'Машиностроение',
            location: 'Орск',
            founded: '1941',
            employees: '2000+',
            description: 'Орский машиностроительный завод - крупное предприятие машиностроительной отрасли, специализирующееся на производстве оборудования для нефтегазовой промышленности.',
            history: 'Завод был основан в 1941 году после эвакуации оборудования из западных регионов СССР. За годы работы предприятие стало одним из ведущих производителей нефтегазового оборудования.',
            production: {
                products: [
                    'Буровое оборудование',
                    'Нефтепромысловое оборудование',
                    'Запасные части',
                    'Металлоконструкции'
                ],
                capacity: [
                    'Производство оборудования: 10000 единиц/год',
                    'Обработка металла: 20000 тонн/год'
                ]
            },
            technologies: [
                'Современные станки с ЧПУ',
                'Автоматизированные линии',
                'Системы контроля качества'
            ],
            social: [
                'Подготовка специалистов',
                'Социальная поддержка',
                'Развитие города',
                'Экологические программы'
            ],
            contacts: {
                phone: '+7 (3537) 33-33-33',
                email: 'info@ormash.ru',
                address: 'г. Орск, ул. Машиностроителей, 1'
            }
        },
        sorochinsk_grain: {
            name: 'Сорочинский элеватор',
            type: 'Сельское хозяйство',
            location: 'Сорочинск',
            founded: '1950',
            employees: '200+',
            description: 'Сорочинский элеватор - крупное предприятие по хранению и переработке зерна. Элеватор играет важную роль в обеспечении продовольственной безопасности региона.',
            history: 'Элеватор был построен в 1950 году для хранения и переработки зерна, выращиваемого в Оренбургской области. За годы работы предприятие модернизировало оборудование и увеличило мощности хранения.',
            production: {
                products: [
                    'Хранение зерна',
                    'Мука',
                    'Комбикорма',
                    'Крупы'
                ],
                capacity: [
                    'Хранение зерна: 100000 тонн',
                    'Производство муки: 200 тонн/сутки'
                ]
            },
            technologies: [
                'Современное элеваторное оборудование',
                'Системы контроля качества',
                'Автоматизированный учет'
            ],
            social: [
                'Поддержка сельхозпроизводителей',
                'Развитие региона',
                'Создание рабочих мест',
                'Благотворительность'
            ],
            contacts: {
                phone: '+7 (35346) 4-44-44',
                email: 'info@sorochinsk-elevator.ru',
                address: 'г. Сорочинск, ул. Элеваторная, 1'
            }
        }
    };

    // Функция обновления данных на странице населенного пункта
    function updateSettlementData(data) {
        // Обновляем основную информацию
        document.getElementById('settlementName').textContent = data.name;
        document.getElementById('settlementTitle').textContent = data.name;
        document.getElementById('settlementType').textContent = data.type;
        document.getElementById('settlementPopulation').textContent = data.population;
        document.getElementById('settlementDistrict').textContent = data.district;
        document.getElementById('settlementFounded').textContent = data.founded;
        document.getElementById('settlementDescription').textContent = data.description;
        document.getElementById('settlementHistory').textContent = data.history;

        // Получаем ID города для изображений
        const cityId = id; // Используем ID из URL

        // Обновляем главное изображение
        const mainImage = document.getElementById('mainImage');
        mainImage.src = `images/settlements/${cityId}.jpg`;
        mainImage.alt = data.name;

        // Обновляем миниатюры
        const thumbs = document.querySelectorAll('.gallery-thumbs img');
        thumbs.forEach((thumb, index) => {
            const imageSrc = index === 0 
                ? `images/settlements/${cityId}.jpg` 
                : `images/settlements/${cityId}-${index}.jpg`;
            thumb.src = imageSrc;
            thumb.alt = `${data.name} - изображение ${index + 1}`;
        });

        // Добавляем обработчики событий для миниатюр
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Убираем класс active у всех миниатюр
                thumbs.forEach(t => t.classList.remove('active'));
                // Добавляем класс active к выбранной миниатюре
                this.classList.add('active');
                // Обновляем главное изображение
                mainImage.src = this.src;
                mainImage.alt = this.alt;
            });
        });

        // Обновляем экономику
        const economyList = document.querySelector('#settlementEconomy ul');
        economyList.innerHTML = data.economy.industries.map(industry => `<li>${industry}</li>`).join('');

        // Обновляем достопримечательности
        const attractionsGrid = document.getElementById('settlementAttractions');
        const majorCities = ['orenburg', 'orsk', 'novotroitsk', 'gai'];
        const isMajorCity = majorCities.includes(id);

        attractionsGrid.innerHTML = `
            <div class="attractions-list">
                ${data.attractions.map(attraction => {
                    if (isMajorCity) {
                        return `
                            <div class="attraction-card with-image">
                                <img src="images/attractions/${attraction.image}" alt="${attraction.name}">
                                <div class="attraction-content">
                                    <h3>${attraction.name}</h3>
                                    <p class="attraction-description">${attraction.description}</p>
                                </div>
                            </div>
                        `;
                    } else {
                        return `
                            <div class="attraction-card text-only">
                                <h3>${attraction.name}</h3>
                                <p class="attraction-description">${attraction.description}</p>
                            </div>
                        `;
                    }
                }).join('')}
            </div>
        `;

        // Добавляем эффекты при наведении
        const cards = document.querySelectorAll('.attraction-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('active');
            });
            card.addEventListener('mouseleave', function() {
                this.classList.remove('active');
            });
        });

        // Обновляем транспорт
        const transportInfo = document.getElementById('settlementTransport');
        transportInfo.innerHTML = `
            <p>В городе развита сеть общественного транспорта:</p>
            <ul>${data.transport.public.map(item => `<li>${item}</li>`).join('')}</ul>
            <p>Междугороднее сообщение:</p>
            <ul>${data.transport.intercity.map(item => `<li>${item}</li>`).join('')}</ul>
        `;
    }

    // Функция обновления данных на странице производства
    function updateIndustryData(data, id) {
        document.getElementById('industryName').textContent = data.name;
        document.getElementById('industryTitle').textContent = data.name;
        document.getElementById('industryType').textContent = data.type;
        document.getElementById('industryLocation').textContent = data.location;
        document.getElementById('industryFounded').textContent = data.founded;
        document.getElementById('industryEmployees').textContent = data.employees;
        document.getElementById('industryDescription').textContent = data.description;
        document.getElementById('industryHistory').textContent = data.history;

        // Обновляем изображение предприятия
        const mainImage = document.getElementById('mainImage');
        mainImage.src = `images/industries/${id}.jpg`;
        mainImage.alt = data.name;

        // Обновляем производство
        const productionInfo = document.getElementById('industryProduction');
        productionInfo.innerHTML = `
            <p>Основные виды продукции:</p>
            <ul>${data.production.products.map(product => `<li>${product}</li>`).join('')}</ul>
            <p>Производственные мощности:</p>
            <ul>${data.production.capacity.map(capacity => `<li>${capacity}</li>`).join('')}</ul>
        `;

        // Обновляем технологии
        const technologiesInfo = document.getElementById('industryTechnologies');
        technologiesInfo.innerHTML = `
            <p>На предприятии применяются современные технологии:</p>
            <ul>${data.technologies.map(tech => `<li>${tech}</li>`).join('')}</ul>
        `;

        // Обновляем социальную ответственность
        const socialInfo = document.getElementById('industrySocial');
        socialInfo.innerHTML = `
            <p>Предприятие активно участвует в социальном развитии региона:</p>
            <ul>${data.social.map(item => `<li>${item}</li>`).join('')}</ul>
        `;

        // Обновляем контакты
        const contactsInfo = document.getElementById('industryContacts');
        contactsInfo.innerHTML = `
            <p><i class="fas fa-phone"></i> Телефон: ${data.contacts.phone}</p>
            <p><i class="fas fa-envelope"></i> Email: ${data.contacts.email}</p>
            <p><i class="fas fa-map-marker-alt"></i> Адрес: ${data.contacts.address}</p>
        `;
    }

    // Обновляем данные на странице в зависимости от типа и ID
    if (isSettlement && settlementsData[id]) {
        updateSettlementData(settlementsData[id]);
    } else if (isIndustry && industriesData[id]) {
        updateIndustryData(industriesData[id], id);
    }
}); 