import React, { useState, useRef } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ReferenceLine, Area, ComposedChart
} from 'recharts';
import { CheckCircle, Flag, Calendar, Target, TrendingUp, Award, ChevronLeft, ChevronRight, Info, Star, X, BookOpen, AlertCircle, Lightbulb, Zap, Rocket } from 'lucide-react';

const App = () => {
  const scrollRef = useRef(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Данные для радара навыков
  const skillData = [
    { 
      subject: 'Грамматика', 
      A: 30, B: 65, 
      tasks: 'Задания 19–25', 
      advice: 'Обрати внимание на исключения в образовании степеней сравнения и формы неправильных глаголов.',
      tip: 'Не зубри таблицу глаголов целиком! Учи по 5 штук в день и сразу придумывай с ними предложения про своих друзей. Так запомнится в разы быстрее! 🧠✨'
    },
    { 
      subject: 'Лексика', 
      A: 40, B: 70, 
      tasks: 'Задания 26–31', 
      advice: 'Фокус на устойчивых словосочетаниях (collocations) и управлении глаголов (предлоги).',
      tip: 'Заведи привычку учить слова не по отдельности, а парами. Не просто "decision", а "make a decision". Это спасет тебя в заданиях на пропуски! 🔗🔥'
    },
    { 
      subject: 'Аудирование', 
      A: 20, B: 55, 
      tasks: 'Задания 1–9', 
      advice: 'Учись выделять ключевые слова-синонимы, которые заменяют фразы из вопроса в аудиозаписи.',
      tip: 'Слушай любимые подкасты или смотри видео на английском. Главное — привыкнуть к разным акцентам. 🎧🌍'
    },
    { 
      subject: 'Говорение', 
      A: 25, B: 60, 
      tasks: 'Устная часть', 
      advice: 'Работай над беглостью: старайся делать меньше пауз-хезитаций и использовать вводные слова.',
      tip: 'Записывай свои ответы на диктофон и слушай их. Сначала будет странно, но это лучший способ услышать свои "эээ" и исправить их! 🎤😎'
    },
    { 
      subject: 'Чтение', 
      A: 50, B: 80, 
      tasks: 'Задания 10–18', 
      advice: 'В задании 11 следи за структурно-смысловыми связями, а не только за переводом слов.',
      tip: 'Не пытайся перевести каждое слово. Ищи зацепки (местоимения, союзы), которые связывают части текста!'
    },
    { 
      subject: 'Письмо', 
      A: 35, B: 65, 
      tasks: 'Письменная часть', 
      advice: 'Соблюдай строгий формат эссе-рассуждения и не забывай про логические переходы между абзацами.',
      tip: 'Твоё эссе — это скелет. Сначала построй кости (план и связки), а потом наращивай мясо (аргументы). И не забывай про формальный стиль — никаких "I\'m"! ✍️🌟'
    },
  ];

  const getStatusColor = (percent) => {
    if (percent <= 40) return { text: 'text-red-600', bg: 'bg-red-500', border: 'border-red-100', lightBg: 'bg-red-50' };
    if (percent <= 60) return { text: 'text-orange-600', bg: 'bg-orange-500', border: 'border-orange-100', lightBg: 'bg-orange-50' };
    if (percent <= 75) return { text: 'text-yellow-600', bg: 'bg-yellow-500', border: 'border-yellow-100', lightBg: 'bg-yellow-50' };
    return { text: 'text-emerald-600', bg: 'bg-emerald-500', border: 'border-emerald-100', lightBg: 'bg-emerald-50' };
  };

  // Расширенные данные для графика баллов
  const scoreHistory = [
    { name: 'Сент', score: 45, ideal: 45, note: 'Стартовая диагностика' },
    { name: 'Окт', score: 52, ideal: 55, note: 'Времена группы Simple' },
    { name: 'Ноя', score: 65, ideal: 68, note: 'Словообразование' },
    { name: 'Дек', score: 78, ideal: 75, note: 'Эссе и Reading' },
    { name: 'Янв', score: null, ideal: 82, note: 'Прогноз: Passive Voice' },
    { name: 'Фев', score: null, ideal: 88, note: 'Прогноз: Speaking Part' },
  ];

  const milestones = [
    { title: "Точка A: Диагностика", date: "Сентябрь", status: "completed", done: "Выявлен текущий уровень (A2+), определены основные пробелы в грамматике и лексике.", desc: "Уровень A2 — страх говорения; слабые места: фразовые глаголы, структура писем. Требуется база времен." },
    { title: "Блок: Present, Past, Future Tenses", date: "Октябрь", status: "completed", done: "Уверенное использование Past Simple и Present Continuous. Исчезли ошибки в согласовании подлежащего и сказуемого.", desc: "Past Simple/Perfect, структуры рассказа. Отработать: маркеры времени и неправильные глаголы." },
    { title: "Пробник №1", date: "Октябрь", status: "completed", done: "Успешное выполнение раздела Reading (80% верных ответов). Хороший темп работы с текстом.", desc: "55/100 — слабые: Listening, Phrasal verbs. Нужно больше практики на слух." },
    { title: "Блок: Listening + Note-taking", date: "Ноябрь", status: "current", done: "Умение выделять главную мысль в коротких аудио-сообщениях. Пополнение словаря синонимами.", desc: "Стратегии, работа с диалогами. Фокус: вычленение ключевой информации при быстром темпе речи." },
    { title: "Пробник №2", date: "Ноябрь", status: "upcoming", futurePlan: "Разбор стратегий Matching: учимся игнорировать лишнюю информацию в аудио. Тренировка логических связок для раздела Reading." },
    { title: "Блок: Словообразование + Collocations", date: "Декабрь", status: "upcoming", futurePlan: "Интерактивный квиз по аффиксам. Мастер-класс: как превратить глагол в существительное или прилагательное за 2 секунды." },
    { title: "Пробник №3", date: "Декабрь", status: "upcoming", futurePlan: "Анализ типичных ошибок в Use of English. Лайфхаки: как угадать пропущенное слово по контексту и грамматическому окружению." },
    { title: "Рубеж: Writing (эссе)", date: "Январь", status: "upcoming", futurePlan: "Пошаговый конструктор эссе: от сильного тезиса до аргументации. Практика использования Linking Words уровня B2+." },
    { title: "Пробник №4", date: "Январь", status: "upcoming", futurePlan: "Фокус на критериях оценивания. Разбор 'идеального эссе' и работа над логикой абзацев." },
    { title: "Блок: Фразовые глаголы + Лексика B2", date: "Февраль", status: "upcoming", futurePlan: "Погружение в идиомы. Темы: Экология и Технологии. Составляем личный словарь фраз для устной части." },
    { title: "Пробник №5", date: "Февраль", status: "upcoming", futurePlan: "Тренировка Speaking под таймер. Учимся описывать картинки и сравнивать их, используя продвинутую грамматику." },
    { title: "Экзамен. Стратегии и тайминг", date: "Март", status: "upcoming", futurePlan: "Марафон по тайм-менеджменту: распределяем 180 минут экзамена максимально эффективно. Учимся находить 'дистракторы' в тестах." },
    { title: "Пробник №6", date: "Март", status: "upcoming", futurePlan: "Работа над внимательностью. Отработка заполнения бланков ответов без помарок и технических ошибок." },
    { title: "Финальный интенсив", date: "Апрель", status: "upcoming", futurePlan: "Blitz-повторение: Conditionals, Inversion, Passive Voice. Решение самых сложных кейсов из открытого банка заданий." },
    { title: "Пробник №7 (генеральная репетиция)", date: "Апрель", status: "upcoming", futurePlan: "Полная имитация экзамена: от входа в аудиторию до сдачи бланка. Психологический настрой на высокий результат." },
    { title: "Точка B: Финал", date: "Май", status: "upcoming", futurePlan: "Финальное напутствие. Проверка 'тревожного чемоданчика' знаний. Мы готовы к 90+!" },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 300 : scrollLeft + 300;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleLabelClick = (label) => {
    const skill = skillData.find(s => s.subject === label);
    if (skill) {
      setSelectedSkill(skill);
    }
  };

  const CustomTick = ({ payload, x, y, textAnchor, ...rest }) => {
    return (
      <text
        {...rest}
        x={x}
        y={y}
        textAnchor={textAnchor}
        className="fill-slate-500 text-[12px] font-medium cursor-pointer hover:fill-blue-500 hover:font-bold transition-all"
        onClick={() => handleLabelClick(payload.value)}
      >
        {payload.value}
      </text>
    );
  };

  // Кастомный Tooltip для графика баллов
  const CustomScoreTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-xl border border-slate-700 text-sm">
          <p className="font-black text-blue-400 mb-1">{data.name}</p>
          <p className="font-bold">Балл: <span className="text-white">{data.score || '—'}</span></p>
          <p className="text-[11px] text-slate-400 mt-1 leading-tight">{data.note}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Шапка отчета */}
        <header className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Дашборд прогресса: Александр П.</h1>
            <p className="text-slate-500 italic">Курс: Подготовка к ЕГЭ (11 класс)</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-2xl flex items-center gap-2 font-medium">
              <Calendar size={18} />
              <span>9 месяцев обучения</span>
            </div>
          </div>
        </header>

        {/* Секция: Карта маршрута */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 overflow-hidden relative">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-8">
            <Flag className="text-blue-500" /> Карта маршрута
          </h2>

          <div className="relative flex items-start">
            <button 
              onClick={() => scroll('left')}
              className="mt-1 p-2 rounded-full bg-slate-50 hover:bg-blue-500 hover:text-white text-slate-400 transition-all z-20 shadow-sm shrink-0 border border-slate-100"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex-1 relative overflow-hidden mx-[-12px]">
              <div className="absolute top-[21px] left-0 right-0 h-1 bg-slate-100 z-0"></div>
              
              <div 
                ref={scrollRef}
                className="flex overflow-x-auto gap-12 no-scrollbar scroll-smooth relative z-10 px-8 py-0 overflow-y-hidden"
                style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
              >
                {milestones.map((m, idx) => (
                  <div key={idx} className="flex flex-col items-center min-w-[200px] text-center group relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 z-10 transition-all duration-500 mb-4 ${
                      m.status === 'completed' ? 'bg-green-500 border-green-100 text-white shadow-lg' :
                      m.status === 'current' ? 'bg-blue-500 border-blue-100 text-white animate-pulse shadow-lg scale-110' :
                      'bg-white border-slate-100 text-slate-300'
                    }`}>
                      {m.status === 'completed' ? <CheckCircle size={20} /> : <Target size={20} />}
                    </div>
                    
                    <div className="w-[200px] cursor-pointer">
                      <p className="font-bold text-sm text-slate-900 mb-1 leading-tight">{m.title}</p>
                      <p className="text-[10px] text-blue-500 font-bold uppercase tracking-wider mb-2">{m.date}</p>
                      <div className="flex justify-center">
                        <Info size={16} className={`opacity-40 group-hover:opacity-100 transition-opacity ${m.status === 'current' ? 'text-blue-500' : 'text-slate-400'}`} />
                      </div>
                    </div>

                    <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] max-w-[90vw] p-6 bg-slate-900 text-white rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.6)] z-[9999] pointer-events-none border border-slate-700">
                      <div className="flex items-center gap-3 mb-4 border-b border-slate-700 pb-4 text-left">
                        <div className={`p-2 rounded-xl shrink-0 ${m.status === 'completed' ? 'bg-green-500' : 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]'}`}>
                          <Target size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase font-black tracking-widest">{m.date}</p>
                            <p className="font-bold text-lg text-blue-400 leading-tight">{m.title}</p>
                        </div>
                      </div>

                      {m.futurePlan ? (
                        <div>
                          <p className="font-black mb-2 text-[10px] uppercase tracking-[0.2em] text-blue-400 flex items-center gap-1 text-left">
                            <Star size={10} fill="currentColor" /> Что ждет на занятии:
                          </p>
                          <p className="leading-relaxed text-sm text-slate-200 text-left bg-blue-900/30 p-3 rounded-lg border border-blue-800/50">
                            {m.futurePlan}
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="mb-4">
                            <p className="font-black mb-2 text-[10px] uppercase tracking-[0.2em] text-blue-400 flex items-center gap-1 text-left">
                              <Star size={10} fill="currentColor" /> Уже получается:
                            </p>
                            <p className="leading-relaxed text-sm text-slate-200 text-left bg-blue-900/30 p-2 rounded-lg border border-blue-800/50">{m.done}</p>
                          </div>
                          <div>
                            <p className="font-black mb-2 text-[10px] uppercase tracking-[0.2em] text-slate-500 flex items-center gap-1 text-left">
                              Над чем поработать:
                            </p>
                            <p className="leading-relaxed text-sm text-slate-200 text-left">{m.desc}</p>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="fixed inset-0 bg-slate-950/20 backdrop-blur-[2px] z-[9998] invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => scroll('right')}
              className="mt-1 p-2 rounded-full bg-slate-50 hover:bg-blue-500 hover:text-white text-slate-400 transition-all z-20 shadow-sm shrink-0 border border-slate-100"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-8 italic uppercase tracking-widest">Листайте стрелками • Наведите на этап для деталей</p>
        </section>

        {/* Секции: Анализ навыков и Динамика баллов */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="text-blue-500" /> Анализ навыков
            </h2>
            <p className="text-xs text-slate-400 mb-4 italic">Нажми на название навыка, чтобы увидеть детали</p>
            <div className="h-64 md:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={<CustomTick />}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Диагностика" dataKey="A" stroke="#cbd5e1" fill="#cbd5e1" fillOpacity={0.4} />
                  <Radar name="Текущий уровень" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Tooltip cursor={false} content={() => null} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-slate-300 rounded-full"></span> Диагностика</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-500 rounded-full"></span> Текущий уровень</div>
            </div>

            {selectedSkill && (
              <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm rounded-3xl p-8 flex flex-col animate-in fade-in zoom-in duration-200">
                <button 
                  onClick={() => setSelectedSkill(null)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">{selectedSkill.subject}</h3>
                    <p className="text-blue-500 font-bold text-sm uppercase tracking-wider">{selectedSkill.tasks}</p>
                  </div>
                </div>
                <div className="space-y-6 flex-1 overflow-y-auto pr-2 no-scrollbar">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                      <p className="text-[10px] text-slate-400 uppercase font-black mb-1">На старте</p>
                      <p className="text-xl font-bold text-slate-400">{selectedSkill.A}%</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-center">
                      <p className="text-[10px] text-blue-400 uppercase font-black mb-1 tracking-wider">Сейчас</p>
                      <p className="text-xl font-bold text-blue-600">{selectedSkill.B}%</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className={`flex items-center gap-2 ${getStatusColor(selectedSkill.B).text}`}>
                      <CheckCircle size={18} />
                      <p className="font-bold text-sm uppercase tracking-wide">Текущий прогресс:</p>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${getStatusColor(selectedSkill.B).bg} transition-all duration-1000`} style={{ width: `${selectedSkill.B}%` }}></div>
                    </div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 space-y-2">
                    <div className="flex items-center gap-2 text-orange-600">
                      <AlertCircle size={18} />
                      <p className="font-bold text-sm uppercase tracking-wide">На что обратить внимание:</p>
                    </div>
                    <p className="text-sm text-orange-900 leading-relaxed">{selectedSkill.advice}</p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 space-y-2 relative overflow-hidden group">
                    <div className="absolute -right-2 -bottom-2 text-indigo-200/50 transform -rotate-12 group-hover:scale-110 transition-transform">
                      <Lightbulb size={64} />
                    </div>
                    <div className="flex items-center gap-2 text-indigo-600 relative z-10">
                      <Lightbulb size={18} />
                      <p className="font-bold text-sm uppercase tracking-wide">Совет от учителя Майи:</p>
                    </div>
                    <p className="text-sm text-indigo-900 leading-relaxed italic relative z-10">{selectedSkill.tip}</p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* ОБНОВЛЕННЫЙ БЛОК: Динамика баллов */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <TrendingUp size={200} />
            </div>

            <div className="flex justify-between items-start mb-6 relative z-10">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Award className="text-blue-500" /> Прогноз и динамика баллов
              </h2>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Текущий прогноз</span>
                <span className="text-3xl font-black text-blue-600 leading-none">88+</span>
              </div>
            </div>

            <div className="h-64 md:h-72 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={scoreHistory}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} 
                    dy={10}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 10}} 
                  />
                  <Tooltip content={<CustomScoreTooltip />} />
                  
                  {/* Фоновая область для идеального трека */}
                  <Area 
                    type="monotone" 
                    dataKey="ideal" 
                    stroke="none" 
                    fill="url(#scoreGradient)" 
                    activeDot={false}
                  />

                  {/* Идеальный трек (цель) */}
                  <Line 
                    type="monotone" 
                    dataKey="ideal" 
                    stroke="#94a3b8" 
                    strokeWidth={2} 
                    strokeDasharray="5 5"
                    dot={false}
                    activeDot={false}
                  />

                  {/* Реальный прогресс */}
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#3b82f6" 
                    strokeWidth={4} 
                    dot={{ r: 6, fill: '#3b82f6', strokeWidth: 3, stroke: '#fff' }} 
                    activeDot={{ r: 8, strokeWidth: 0 }}
                    connectNulls={false}
                  />

                  {/* Линия цели */}
                  <ReferenceLine 
                    y={90} 
                    stroke="#10b981" 
                    strokeDasharray="3 3" 
                    label={{ position: 'right', value: 'Цель 90+', fill: '#10b981', fontSize: 10, fontWeight: 700 }} 
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Карточки аналитики под графиком */}
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-500">
                  <Zap size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Прирост</p>
                  <p className="text-lg font-bold text-slate-700">+33 балла</p>
                </div>
              </div>
              <div className="p-4 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                  <Rocket size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-blue-200 font-black uppercase tracking-wider">Темп</p>
                  <p className="text-lg font-bold">Выше плана</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-start gap-3">
              <div className="mt-1">
                <Lightbulb className="text-indigo-500" size={18} />
              </div>
              <p className="text-[12px] text-indigo-900 leading-relaxed font-medium">
                Александр, твой текущий темп <span className="text-indigo-600 font-bold">на 12% выше среднего</span> по потоку. Если удержим фокус на Speaking, планка в 90 баллов станет реальностью уже к марту.
              </p>
            </div>
          </section>
        </div>

        {/* Статистика внизу */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Уроков пройдено', value: '24', color: 'bg-blue-50 text-blue-600' },
            { label: 'Выучено слов', value: '450+', color: 'bg-purple-50 text-purple-600' },
            { label: 'Выполнено ДЗ', value: '92%', color: 'bg-emerald-50 text-emerald-600' },
            { label: 'Средний балл теста', value: '78', color: 'bg-orange-50 text-orange-600' },
          ].map((stat, i) => (
            <div key={i} className={`p-4 rounded-3xl ${stat.color} text-center`}>
              <p className="text-xs uppercase font-bold opacity-70 mb-1">{stat.label}</p>
              <p className="text-2xl font-black">{stat.value}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default App;
