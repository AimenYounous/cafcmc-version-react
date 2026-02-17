import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Quiz.css';

const QUESTIONS_DATA = [
    { q: "ما هو أول لقب فازت به المغرب في كأس إفريقيا للأمم؟", a: ["2004", "1988", "1976", "1980"], c: [2] },
    { q: "كم مرة استضافت المغرب بطولة كأس إفريقيا للأمم (شاملة 2025)؟", a: ["مرة واحدة", "مرتين", "3 مرات", "4 مرات"], c: [1] },
    { q: "من هو الهداف التاريخي للمنتخب المغربي عبر التاريخ؟", a: ["صلاح الدين بصير", "يوسف النصيري", "مروان الشماخ", "أحمد فرس"], c: [3] },
    { q: "ما أفضل إنجاز للمغرب في كأس إفريقيا بعد لقب 1976؟", a: ["المركز الثالث", "الوصافة (2004)", "ربع النهائي", "المركز الرابع"], c: [1] },
    { q: "من هو المدرب الذي قاد المغرب للفوز بكأس إفريقيا 1976؟", a: ["المهدي فاريا", "غوردون مارديسكو", "بادو الزاكي", "هنري ميشيل"], c: [1] },
    { q: "كم عدد المنتخبات في أول نسخة من كأس إفريقيا؟", a: ["3 منتخبات", "8 منتخبات", "6 منتخبات", "4 منتخبات"], c: [0] },
    { q: "ما هو أفضل ترتيب حققه المغرب في تصنيف الفيفا عبر التاريخ؟", a: ["المركز 20", "المركز 13", "المركز 10", "المركز 11"], c: [2] },
    { q: "من هو أول لاعب مغربي فاز بجائزة أفضل لاعب إفريقي؟", a: ["أحمد فرس", "التيمومي", "الزاكي", "حجي"], c: [0] },
    { q: "في أي سنة شارك المغرب لأول مرة في كأس إفريقيا؟", a: ["1976", "1986", "1972", "1970"], c: [2] },
    { q: "ما هو النادي المغربي الأكثر تتويجًا بالألقاب القارية؟", a: ["الوداد", "الرجاء", "الجيش الملكي", "بركان"], c: [1] },
    { q: "ما اسم الهيئة الإفريقية المشرفة على كرة القدم؟", a: ["الفيفا", "اليويفا", "الكونكاكاف", "الكاف"], c: [3] },
    { q: "كم مرة بلغ المنتخب المغربي نهائي كأس إفريقيا؟", a: ["مرتين", "3 مرات", "4 مرات", "مرة واحدة"], c: [0] },
    { q: "ما هو أفضل مركز حققه المغرب في كأس العالم؟", a: ["ربع النهائي", "دور الـ16", "نصف النهائي (الرابع)", "الدور الأول"], c: [2] },
    { q: "في أي مدينة يوجد ملعب محمد الخامس؟", a: ["الرباط", "مراكش", "الدار البيضاء", "طنجة"], c: [2] },
    { q: "كم عدد الفرق المشاركة في البطولة الوطنية المغربية؟", a: ["14 فريقاً", "16 فريقاً", "18 فريقاً", "20 فريقاً"], c: [1] },
    { q: "ما هما الفريقان اللذان يلعبان ديربي الدار البيضاء؟", a: ["الجيش والفتح", "الرجاء والوداد", "الماص والوداد", "الرجاء وبركان"], c: [1] },
    { q: "أي فريق مغربي فاز بدوري أبطال إفريقيا أولًا؟", a: ["الرجاء", "الوداد", "الكوكب المراكشي", "الجيش الملكي"], c: [3] },
    { q: "كم مرة فاز الوداد بدوري أبطال إفريقيا؟", a: ["مرة واحدة", "4 مرات", "3 مرات", "مرتين"], c: [2] },
    { q: "كم مرة فاز الرجاء بدوري أبطال إفريقيا؟", a: ["3 مرات", "مرتين", "4 مرات", "5 مرات"], c: [0] },
    { q: "من هم اللاعبون المغاربة الذين فازوا بدوري أبطال أوروبا؟", a: ["حكيمي", "زياش", "براهيم دياز", "الكل صحيح"], c: [0, 1, 2, 3] },
    { q: "في أي قارة يلعب المنتخب المغربي رسميًا؟", a: ["أوروبا", "آسيا", "إفريقيا", "أمريكا"], c: [2] },
    { q: "ما اسم المدرب الحالي للمنتخب المغربي (2025)؟", a: ["وحيد خليلوزيتش", "هيرفي رونار", "جمال السلامي", "وليد الركراكي"], c: [3] },
    { q: "في أي بلد أُقيمت كأس إفريقيا 1976؟", a: ["إثيوبيا", "مصر", "الكاميرون", "السودان"], c: [0] },
    { q: "كم مدة الشوط الواحد في كرة القدم؟", a: ["90 دقيقة", "30 دقيقة", "45 دقيقة", "60 دقيقة"], c: [2] },
    { q: "ما هو المنتخب الذي خسر أمامه المغرب نهائي 2004؟", a: ["مصر", "تونس", "الكاميرون", "نيجيريا"], c: [1] },
    { q: "من هو هداف المنتخب المغربي في كأس إفريقيا 2004؟", a: ["يوسف مختاري", "مروان الشماخ", "يوسف حاجي", "طلال القرقوري"], c: [0] },
    { q: "ما هو أكبر فوز للمغرب في تاريخ كأس إفريقيا؟", a: ["4-0", "3-0", "6-0", "5-1"], c: [3] },
    { q: "ما هو أول نادٍ مغربي شارك في دوري أبطال إفريقيا؟", a: ["الوداد", "الجيش الملكي", "الرجاء", "القنيطري"], c: [1] },
    { q: "في أي سنة فاز الرجاء بالأبطال دون هزيمة؟", a: ["1997", "2002", "1999", "2018"], c: [2] },
    { q: "النادي المغربي الذي فاز بالكونفدرالية أول مرة؟", a: ["الجيش الملكي", "الفتح الرباطي", "المغرب الفاسي", "الرجاء"], c: [0] },
    { q: "ما اسم الملعب الذي احتضن نهائي إفريقيا 1988؟", a: ["مولاي عبد الله", "فاس", "محمد الخامس", "أدرار"], c: [2] },
    { q: "من هو أول مدرب أجنبي للمنتخب المغربي؟", a: ["غوي كليزو", "فونطين", "مارديكو", "فاريا"], c: [0] },
    { q: "في أي نسخة أقصي المغرب بركلات الترجيح لأول مرة؟", a: ["1986", "1988", "1998", "2019"], c: [1] },
    { q: "من هو أصغر لاعب مغربي شارك في كأس إفريقيا؟", a: ["بوفال", "أشرف حكيمي", "أوناحي", "بلال الخنوس"], c: [1, 3] },
    { q: "من هو الحارس المغربي الأساسي الحالي (2025)؟", a: ["ياسين بونو", "منير المحمدي", "المهدي بنعبيد", "أنس الزنيتي"], c: [0, 1] },
    { q: "سنة دخل المغرب قائمة أفضل 10 منتخبات عالميًا؟", a: ["2022", "1986", "2004", "1998"], c: [3] },
    { q: "اللاعب الأكثر مشاركة في مباريات كأس إفريقيا؟", a: ["أحمد فرس", "بوصوفة", "نورالدين النيبت", "حكيمي"], c: [2] },
    { q: "المدرب صاحب أطول سلسلة دون هزيمة بإفريقيا للمغرب؟", a: ["وليد الركراكي", "رونار", "خليلوزيتش", "الزاكي"], c: [2] },
    { q: "أول لاعب مغربي يفوز بالأبطال كلاعب أساسي؟", a: ["أشرف حكيمي", "نورالدين النيبت", "زياش", "رضوان التاتوم"], c: [0] },
    { q: "لاعب مغربي سجّل في نصف نهائي دوري الأبطال؟", a: ["بن عطية", "حكيم زياش", "حكيمي", "مزراوي"], c: [1, 3] },
    { q: "لاعب مغربي فاز بالدوري الإيطالي مع إنتر؟", a: ["حسين خرجة", "زياش", "بنعطية", "أشرف حكيمي"], c: [3] },
    { q: "لاعب مغربي لعب نهائي الأبطال مع يوفنتوس؟", a: ["حكيمي", "مهدي بنعطية", "زياش", "بونو"], c: [1] },
    { q: "لاعب مغربي حمل شارة القيادة في نادٍ أوروبي بالأبطال؟", a: ["بنعطية", "نورالدين النيبت", "زياش", "رومان سايس"], c: [1] },
    { q: "لاعب لعب دوري الأبطال مع 3 أندية أوروبية أو أكثر؟", a: ["زياش", "حكيمي", "بنعطية", "الكل صحيح"], c: [3] },
    { q: "لاعب واجه برشلونة وريال مدريد بنفس النسخة؟", a: ["أمين حارث", "ياسين بونو", "نصير مزراوي", "عز الدين أوناحي"], c: [2] },
    { q: "أول لاعب يسجل أكثر من هدف بنسخة واحدة للأبطال؟", a: ["يوسف النصيري", "مروان الشماخ", "زياش", "براهيم دياز"], c: [1] },
    { q: "لاعب شارك في دوري الأبطال وهو أقل من 20 سنة؟", a: ["نصير مزراوي", "زياش", "أشرف حكيمي", "الخنوس"], c: [2] },
    { q: "من هو اللاعب المغربي الذي لعب للزمالك؟", a: ["بانون", "أشرف بنشرقي", "الكرتي", "أوناجم"], c: [1, 3] },
    { q: "لاعب سجّل في أبطال إفريقيا وأبطال أوروبا؟", a: ["زياش", "حكيمي", "لا أحد", "بنعطية"], c: [2] },
    { q: "اللاعب الأكثر دقائق لعب في موسم واحد للأبطال؟", a: ["أشرف حكيمي", "نورالدين النيبت", "بنعطية", "زياش"], c: [1] },
    { q: "أول لاعب مغربي يسجل هدفًا في دوري أبطال أوروبا؟", a: ["نورالدين النيبت", "حسن فاضل", "مصطفى حاجي", "الشماخ"], c: [0] },
    { q: "لاعب وصل لنهائي أبطال أوروبا مع بايرن ميونيخ؟", a: ["نصير مزراوي", "مهدي بنعطية", "زياش", "حكيمي"], c: [1] },
    { q: "لعبت لبايرن ميونيخ ويوفنتوس، من أنا؟", a: ["حكيمي", "بوصوفة", "خرجة", "مهدي بنعطية"], c: [3] },
    { q: "لاعب عاد للرجاء بعد لعبه في الدوري القطري؟", a: ["الزنيتي", "محسن متولي", "الحافيظي", "ياجور"], c: [1, 3] },
    { q: "خريج لامسيا وسجلت ضد العراق في الأولمبياد 2024؟", a: ["أخوماش", "إلياس بنصغير", "ريتشارلسون", "الزلزولي"], c: [0, 3] },
    { q: "من هو مدرب المنتخب الأولمبي الحائز على برونزية 2024؟", a: ["عموتة", "طارق سكيتيوي", "الركراكي", "الزاكي"], c: [1] },
    { q: "لعبت مع الوداد وولدت في كندا، من أنا؟", a: ["أيمن مترجي", "العملود", "ياسين بونو", "جبران"], c: [2] },
    { q: "من هو النجم المغربي الجديد المنضم من ريال مدريد (2024)؟", a: ["حكيمي", "براهيم دياز", "زياش", "أدلي"], c: [1] },
    { q: "سجلت هدفين في نهائي كأس العرب، من أنا؟", a: ["بانون", "محمد الناهيري", "الشيبي", "الحداد"], c: [1] },
    { q: "من هو هداف أولمبياد باريس 2024 برصيد 8 أهداف؟", a: ["دياز", "سفيان رحيمي", "الزلزولي", "أخوماش"], c: [1] },
    { q: "ما هو المركز الذي حققه المغرب في أولمبياد 2024؟", a: ["الرابع", "الثالث (البرونزية)", "الثاني (الفضة)", "الأول (الذهب)"], c: [1] },
    { q: "صاحب الهدف التاريخي ضد البرتغال (2022)? ", a: ["حكيم زياش", "يوسف النصيري", "سفيان بوفال", "أبوخلال"], c: [1] },
    { q: "حارس مرمى فاز بجائزة 'زامورا' الإسبانية؟", a: ["منير المحمدي", "الزاكي", "التكناوتي", "ياسين بونو"], c: [3] },
    { q: "أول فريق مغربي يفوز بدوري أبطال إفريقيا (1985)؟", a: ["الوداد", "الرجاء", "الماص", "الجيش الملكي"], c: [3] },
    { q: "سنة تأهل المغرب للدور الثاني بالمونديال لأول مرة؟", a: ["1994", "1986", "1998", "2022"], c: [1] },
    { q: "المنتخب الذي واجهه المغرب في دور الـ16 (1986)؟", a: ["ألماينا الغربية", "إنجلترا", "البرتغال", "بولندا"], c: [0] },
    { q: "كم هدفًا سجل حمد الله ليكسر الرقم القياسي التاريخي للدوري السعودي؟", a: ["20 هدفاً", "34 هدفاً", "25 هدفاً", "30 هدفاً"], c: [1] },
    { q: "لعبت للريال، دورتموند، إنتر وباريس، من أنا؟", a: ["زياش", "بنعطية", "أشرف حكيمي", "حارث"], c: [2] },
    { q: "الملعب الكبير الذي يقع في طنجة؟", a: ["أدرار", "فاس", "مولاي عبد الله", "ابن بطوطة"], c: [3] },
    { q: "سجل هدفين ضد اسكتلندا في مونديال 1998؟", a: ["كماتشو", "حجي", "صلاح الدين بصير", "شيبو"], c: [2] },
    { q: "مدرب قاد المغرب لمونديال 2018؟", a: ["الزاكي", "هيرفي رونار", "غيريتس", "خليلوزيتش"], c: [1] },
    { q: "لعبت لأرسنال وبوردو واشتهرت بالرأسيات؟", a: ["النيبت", "السعيدي", "مروان الشماخ", "القادوري"], c: [2] },
    { q: "من هو اللاعب الملقب بـ 'كماتشو'؟", a: ["عبد الجليل هدا", "صلاح الدين بصير", "أحمد فرس", "التيمومي"], c: [0] },
    { q: "إنجاز منتخب الصالات (Futsal) في التصنيف العالمي؟", a: ["المركز الأول", "المركز العاشر", "المركز السادس", "المركز الثاني"], c: [2] },
    { q: "مهندس نجاحات منتخب الصالات (المدرب)؟", a: ["عموتة", "هشام الدكيك", "السلامي", "سكيتيوي"], c: [1] },
    { q: "أول لاعبة محجبة تشارك في كأس العالم؟", a: ["غزلان الشباك", "فاطمة تاكناوت", "روزيلا", "نهيلة بنزينة"], c: [3] },
    { q: "الفريق المغربي المعروف بلقب 'الماص'? ", a: ["المغرب التطواني", "الفتح", "المغرب الفاسي", "مولاي وجدة"], c: [2] },
    { q: "سجل ركلة 'بانينكا' ضد إسبانيا (2022)؟", a: ["أشرف حكيمي", "زياش", "صابيري", "بوفال"], c: [0] },
    { q: "أين أقيمت كأس العالم للأندية 2013 (الوصافة)؟", a: ["اليابان", "الإمارات", "المغرب", "السعودية"], c: [2] },
    { q: "فاز بالكرة الذهبية الإفريقية عام 1998؟", a: ["النيبت", "بصير", "مصطفى حجي", "كماتشو"], c: [2] },
    { q: "قائد سابق لعب لديبورتيفو لاكورونيا؟", a: ["صلاح الدين بصير", "نورالدين النيبت", "حجي", "الزاكي"], c: [1] },
    { q: "نادي برتقالي فاز بالكونفدرالية مؤخرًا؟", a: ["حسنية أكادير", "أولمبيك أسفي", "طنجة", "نهضة بركان"], c: [3] },
    { q: "الهداف التاريخي للمغرب في كأس العالم؟", a: ["حجي", "يوسف النصيري", "بصير", "خيري"], c: [1] },
    { q: "انتقلت من أنجيه لمارسيليا après المونديال؟", a: ["بوفال", "أمرابط", "عز الدين أوناحي", "حارث"], c: [2] },
    { q: "كلمة شهيرة للركراكي؟", a: ["سير سير", "الكرة ضرب", "ديرو النية", "نربحو"], c: [0, 2] },
    { q: "لعبت لتشيلسي وفزت بالأبطال؟", a: ["بنعطية", "حكيمي", "مزراوي", "حكيم زياش"], c: [3] },
    { q: "سجل هدف النهائي في إفريقيا 2004؟", a: ["يوسف مختاري", "الشماخ", "حجي", "الزاكي"], c: [0] },
    { q: "النادي الإسباني السابق لياسين بونو؟", a: ["الريال", "إشبيلية", "برشلونة", "جيرونا"], c: [1, 3] },
    { q: "الفتى الذهبي (بنفيكا، كوينز بارك، ميلان)؟", a: ["كارسيلا", "بوصوفة", "عادل تاعرابت", "امرابط"], c: [2] },
    { q: "سجل هدف الفوز للوداد في نهائي 2017؟", a: ["وليد الكرتي", "بنشرقي", "أوناجم", "الحداد"], c: [0] },
    { q: "كم منتخب يتأهل من كل مجموعة بكأس إفريقيا الحالية؟", a: ["اثنان", "ثلاثة (أفضل ثوالث)", "واحد", "أربعة"], c: [0, 1] },
    { q: "لعبت لويست هام ورين (مدافع)؟", a: ["سايس", "الياميق", "بانون", "نايف أكرد"], c: [3] },
    { q: "سجل هدف 'المقصية' الشهيرة للرجاء ضد بني ملال؟", a: ["بن مالانغو", "متولي", "الحافيظي", "سفيان رحيمي"], c: [0] },
    { q: "المنتخب الذي أقصاه المغرب للتأهل لـ 2022؟", a: ["مالي", "الكاميرون", "الكونغو الديمقراطية", "غانا"], c: [2] },
    { q: "هداف الدوري اليوناني وصاحب هاتريك ضد أستون فيلا؟", a: ["العربي", "أيوب الكعبي", "النصيري", "بوفال"], c: [1] },
    { q: "فاز المغرب ببرونزية الأولمبياد سنة؟", a: ["2020", "2016", "2000", "2024"], c: [3] },
    { q: "من هو الملقب بـ 'المايسترو'؟", a: ["عبد المجيد الظلمي", "التيمومي", "الزاكي", "فرس"], c: [0] },
    { q: "أاول خصم للمغرب في مونديال 1970؟", a: ["بيرو", "ألمانيا الغربية", "بلغاريا", "البرازيل"], c: [1] },
    { q: "أفضل لاعب ناشئ في إفريقيا مؤخرًا؟", a: ["الخنوس", "الزلزولي", "إلياس بنصغير", "الصيباري"], c: [0, 2] },
    { q: "أين ستقام نهائي إفريقيا 2025 رسميًا؟", a: ["الدار البيضاء", "الرباط", "طنجة", "مراكش"], c: [1] }
];

const SPECIAL_TYPES = ['red', 'shield', 'ultra', 'plus', 'minus', 'x2', 'x0', 'phone'];

const QuizPage = () => {
    const [gameState, setGameState] = useState('home'); // home, active, over, victory
    const [score, setScore] = useState(0);
    const [playerName, setPlayerName] = useState('');
    const [nameWarning, setNameWarning] = useState(false);
    const [deck, setDeck] = useState([]);
    const [availableQuestions, setAvailableQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [timer, setTimer] = useState(30);
    const [inventory, setInventory] = useState(Array(8).fill(false));
    const [stats, setStats] = useState({ shields: 0, ultraLives: 0, phoneStock: 0 });
    const [modalType, setModalType] = useState(null); // question, feed, over, bravo, victory
    const [feedback, setFeedback] = useState({ title: '', msg: '', type: '' });
    const [hiddenOptions, setHiddenOptions] = useState([]);

    const audioRef = useRef({
        flip: new Audio('https://www.soundjay.com/misc/sounds/swish-2.mp3'),
        correct: new Audio('https://www.soundjay.com/misc/sounds/magic-chime-02.mp3'),
        wrong: new Audio('https://www.soundjay.com/misc/sounds/fail-trombone-01.mp3'),
        special: new Audio('https://www.soundjay.com/misc/sounds/magic-chime-01.mp3'),
        win: new Audio('https://www.soundjay.com/human/sounds/applause-01.mp3'),
        start: new Audio('/assets/Referee_Whistle.mp3'),
        tick: new Audio('/assets/Clock_Ticking.mp3'),
        dima: new Audio('/assets/dima.mp3')
    });

    const timerInterval = useRef(null);

    const playAudio = (key) => {
        const audio = audioRef.current[key];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log("Audio play failed:", e));
        }
    };

    const stopAudio = (key) => {
        const audio = audioRef.current[key];
        if (audio) audio.pause();
    };

    const [leaderboard, setLeaderboard] = useState([]);
    const [isYouthMode, setIsYouthMode] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('m_scores_2025');
        if (saved) {
            setLeaderboard(JSON.parse(saved));
        }
    }, []);

    const saveLeaderboard = (newEntry) => {
        let records = JSON.parse(localStorage.getItem('m_scores_2025') || '[]');
        let existing = records.find(r => r.name === newEntry.name);

        if (existing) {
            if (newEntry.score > existing.score) {
                existing.score = newEntry.score;
            }
        } else {
            records.push(newEntry);
        }

        records.sort((a, b) => b.score - a.score);
        const top10 = records.slice(0, 10);
        setLeaderboard(top10);
        localStorage.setItem('m_scores_2025', JSON.stringify(top10));
    };

    const initGrid = useCallback((queries, youthMode = false) => {
        if (queries.length === 0) {
            setGameState('victory');
            setModalType('victory');
            playAudio('dima');
            return;
        }

        const totalCards = 27;
        let newDeck = [];
        let questionsCopy = [...queries];

        if (youthMode) {
            let activeQs = questionsCopy.splice(0, 4);
            newDeck = [
                ...activeQs.map(q => ({ type: 'trivia', data: q, flipped: false, preFlipped: false })),
                ...Array(totalCards - 4).fill(null).map(() => ({ type: 'trivia', data: {}, flipped: true, preFlipped: true }))
            ];
        } else {
            let chosenSpecials = SPECIAL_TYPES.filter(() => Math.random() > 0.3);
            let triviaCount = Math.min(questionsCopy.length, totalCards - chosenSpecials.length);
            let deckQs = questionsCopy.splice(0, triviaCount).sort(() => 0.5 - Math.random());

            newDeck = [
                ...deckQs.map(q => ({ type: 'trivia', data: q, flipped: false })),
                ...chosenSpecials.map(s => ({ type: s, flipped: false }))
            ];

            while (newDeck.length < totalCards) {
                const randomSpecial = SPECIAL_TYPES[Math.floor(Math.random() * SPECIAL_TYPES.length)];
                newDeck.push({ type: randomSpecial, flipped: false });
            }
        }

        setDeck(newDeck.sort(() => 0.5 - Math.random()));
        setAvailableQuestions(questionsCopy);
    }, []);

    const startGame = () => {
        const name = playerName.trim().toLowerCase();
        if (!name) {
            setNameWarning(true);
            return;
        }
        setNameWarning(false);
        playAudio('start');

        const youth = (name === "youth5.0" || name === "7i9o");
        setIsYouthMode(youth);
        setGameState('active');
        setScore(youth ? 96 : 0);

        let initialQs = [...QUESTIONS_DATA];
        if (youth) {
            initialQs = initialQs.sort(() => 0.5 - Math.random()).slice(0, 4);
        }
        initGrid(initialQs, youth);
    };

    const handleCardClick = (index) => {
        if (deck[index].flipped) return;

        playAudio('flip');
        const updatedDeck = [...deck];
        updatedDeck[index].flipped = true;
        setDeck(updatedDeck);

        setTimeout(() => {
            if (updatedDeck[index].type === 'trivia') {
                showQuestion(updatedDeck[index].data);
            } else {
                triggerSpecial(updatedDeck[index].type);
            }
        }, 300);
    };

    const showQuestion = (q) => {
        setCurrentQuestion(q);
        setModalType('question');
        setTimer(30);
        setHiddenOptions([]);
    };

    const triggerSpecial = (type) => {
        const idx = SPECIAL_TYPES.indexOf(type);
        const newInv = [...inventory];
        newInv[idx] = true;
        setInventory(newInv);

        let msg = "", title = type.toUpperCase();

        if (type === 'red') {
            msg = "🚩 RED CARD! Game Over.";
            playAudio('wrong');
            setGameState('over');
            setModalType('over');
            saveLeaderboard({ name: playerName, score: score });
        } else {
            playAudio('special');
        }

        if (type === 'shield') { setStats(s => ({ ...s, shields: s.shields + 1 })); msg = "Shield Collected! 🛡️"; }
        if (type === 'ultra') { setStats(s => ({ ...s, ultraLives: 4 })); msg = "Ultra Joker Collected!<span style='display:block'>(4 Lives) 🃏</span>"; }
        if (type === 'plus') { setScore(s => s + 1); msg = "+1 Point! ⚽"; }
        if (type === 'minus') { setScore(s => s - 1); msg = "-1 Point! 🔻"; }
        if (type === 'x2') { setScore(s => s * 2); msg = "Score Doubled! ✖️2️⃣"; }
        if (type === 'x0') { setScore(0); msg = "Score Reset! 0️⃣"; }
        if (type === 'phone') { setStats(s => ({ ...s, phoneStock: s.phoneStock + 1 })); msg = "Phone-a-Friend Collected! 📞"; }

        if (type !== 'red') {
            setFeedback({ title, msg, type });
            setModalType('feed');
        }
    };

    const handleAnswer = (index, correctIndices) => {
        stopAudio('tick');
        clearInterval(timerInterval.current);

        if (correctIndices.includes(index)) {
            playAudio('correct');
            setScore(s => s + 1);
            setFeedback({ title: 'EXCELLENT!', msg: 'Keep going zlayji!', type: 'bravo' });
            setModalType('bravo');
        } else {
            if (stats.ultraLives > 0) {
                setStats(s => {
                    const nextLives = s.ultraLives - 1;
                    if (nextLives === 0) {
                        const newInv = [...inventory];
                        newInv[SPECIAL_TYPES.indexOf('ultra')] = false;
                        setInventory(newInv);
                    }
                    return { ...s, ultraLives: nextLives };
                });
                setFeedback({ title: 'JOKER USED!', msg: `Ultra Joker saved you!<br> Lives left: ${stats.ultraLives - 1}`, type: 'ultra' });
                setModalType('feed');
            } else if (stats.shields > 0) {
                setStats(s => {
                    const nextShields = s.shields - 1;
                    if (nextShields === 0) {
                        const newInv = [...inventory];
                        newInv[SPECIAL_TYPES.indexOf('shield')] = false;
                        setInventory(newInv);
                    }
                    return { ...s, shields: nextShields };
                });
                setFeedback({ title: 'SHIELD USED!', msg: 'Shield saved you!', type: 'shield' });
                setModalType('feed');
            } else {
                playAudio('wrong');
                setGameState('over');
                setModalType('over');
                saveLeaderboard({ name: playerName, score: score });
            }
        }
    };

    const usePhone = () => {
        if (stats.phoneStock <= 0 || !currentQuestion) return;
        setStats(s => {
            const nextStock = s.phoneStock - 1;
            if (nextStock === 0) {
                const newInv = [...inventory];
                newInv[SPECIAL_TYPES.indexOf('phone')] = false;
                setInventory(newInv);
            }
            return { ...s, phoneStock: nextStock };
        });

        const correctIndices = currentQuestion.c;
        const incorrectIndices = currentQuestion.a.map((_, i) => i).filter(i => !correctIndices.includes(i));
        const toHide = incorrectIndices.sort(() => 0.5 - Math.random()).slice(0, 2);
        setHiddenOptions(toHide);
    };

    useEffect(() => {
        if (modalType === 'question' && timer > 0) {
            timerInterval.current = setInterval(() => {
                setTimer(t => {
                    if (t === 6) playAudio('tick');
                    if (t <= 1) {
                        clearInterval(timerInterval.current);
                        setGameState('over');
                        setModalType('over');
                        saveLeaderboard({ name: playerName, score: score });
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timerInterval.current);
    }, [modalType, timer, score, playerName]);

    const showToast = (msg) => {
        alert(msg); // 1:1 fallback for simplicity if no toast system, though original didn't have one here.
    };

    const resetGame = () => {
        saveLeaderboard({ name: playerName, score: score });
        window.location.reload();
    };

    const handleModalClose = () => {
        setModalType(null);
        const remaining = deck.filter(c => !c.flipped).length;
        if (remaining === 0) {
            setTimeout(() => initGrid([...availableQuestions], isYouthMode), 500);
        }
    };

    const getModalBackground = () => {
        if (modalType === 'question') return "url('/assets/e.webp')";
        if (modalType === 'bravo') return "url('/assets/bravo.webp')";
        if (modalType === 'over') return "url('/assets/over.webp')";
        if (modalType === 'feed') return "url('/assets/feed.webp')";
        if (modalType === 'victory') return "url('/assets/feed.webp')";
        return 'none';
    };

    const getModalStyles = () => {
        let styles = {
            backgroundImage: getModalBackground(),
            aspectRatio: '16 / 9'
        };
        if (modalType === 'question') styles.aspectRatio = '3750 / 1580';
        if (modalType === 'bravo') {
            styles.aspectRatio = '6000 / 3375';
            styles.maxWidth = '1100px';
        }
        return styles;
    };

    return (
        <div className={`quiz-page-body ${gameState === 'active' ? 'game-active' : ''}`}>
            <Link to="/" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
                <img src="/assets/HOME.webp" alt="Home" className="quiz-home-btn" />
            </Link>

            <div id="quiz-sidebar">
                <h1 style={{ textAlign: 'center', color: 'var(--gold)', marginTop: '5px' }}>TOP SCORES</h1>
                <ul id="leaderboard-list">
                    {leaderboard.map((entry, idx) => (
                        <li key={idx}><span>{entry.name}</span><span>{entry.score}</span></li>
                    ))}
                </ul>
            </div>

            <div id="quiz-main-container">
                <div id="quiz-hud" style={{ display: gameState === 'active' ? 'flex' : 'none' }}>
                    <div id="quiz-score-box">
                        {score}{stats.ultraLives > 0 ? ` [Joker: ${stats.ultraLives}]` : ''}
                    </div>
                    <div id="quiz-inventory">
                        {SPECIAL_TYPES.map((type, i) => (
                            <div key={type} className={`inv-slot card-${type} ${inventory[i] ? 'active' : ''}`} title={type}></div>
                        ))}
                    </div>
                </div>

                {gameState === 'home' && (
                    <div id="quiz-home-screen">
                        <h1 style={{ fontSize: '3.5rem', textShadow: '2px 2px 10px black', margin: 0 }}>MOROCCO AFCON QUIZ</h1>
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="ENTER YOUR NAME"
                            style={{ padding: '15px', borderRadius: '10px', fontSize: '1.2rem', width: '300px', textAlign: 'center', marginTop: '30px', border: nameWarning ? '2px solid red' : '2px solid var(--gold)' }}
                        />
                        <div id="name-warning" style={{ display: nameWarning ? 'block' : 'none' }}>PLEASE ENTER YOUR NAME!</div>
                        <br />
                        <button className="play-btn" onClick={startGame}>PLAY</button>
                    </div>
                )}

                <div id="quiz-game-board" style={{ display: gameState === 'active' ? 'grid' : 'none' }}>
                    {deck.map((card, i) => (
                        <div key={i} className={`quiz-card ${card.flipped ? 'flipped' : ''}`} onClick={() => handleCardClick(i)}></div>
                    ))}
                </div>
            </div>

            {modalType && (
                <div id="quiz-modal-overlay" style={{ display: 'flex' }}>
                    <div className="quiz-modal-content" style={getModalStyles()}>
                        {modalType === 'question' && currentQuestion && (
                            <>
                                <div className="timer-circle">{timer}</div>
                                <h2>{currentQuestion.q}</h2>
                                <div className="ans-grid">
                                    {currentQuestion.a.map((ans, i) => (
                                        <button
                                            key={i}
                                            className="ans-btn"
                                            style={{ visibility: hiddenOptions.includes(i) ? 'hidden' : 'visible' }}
                                            onClick={() => handleAnswer(i, currentQuestion.c)}
                                        >
                                            {ans}
                                        </button>
                                    ))}
                                </div>
                                {stats.phoneStock > 0 && (
                                    <button onClick={usePhone} className="modal-action-btn" style={{ marginTop: '20px', fontSize: '1rem' }}>
                                        Use Phone-a-Friend ({stats.phoneStock})
                                    </button>
                                )}
                            </>
                        )}

                        {modalType === 'feed' && (
                            <>
                                <div className="feed-layout">
                                    <div className={`feed-card-img card-${feedback.type}`}></div>
                                    <div>
                                        <h2 style={{ fontSize: '2rem', margin: 0 }}>{feedback.title}</h2>
                                        <h3 style={{ fontSize: '1.5rem', margin: '10px 0' }} dangerouslySetInnerHTML={{ __html: feedback.msg }}></h3>
                                    </div>
                                </div>
                                <button className="modal-action-btn" onClick={handleModalClose}>CONTINUE</button>
                            </>
                        )}

                        {modalType === 'bravo' && (
                            <>
                                <h2 style={{ fontSize: '3rem', marginBottom: 0 }}></h2>
                                <button className="modal-action-btn" style={{ marginTop: '250px' }} onClick={handleModalClose}>CONTINUE</button>
                            </>
                        )}

                        {modalType === 'over' && (
                            <button className="modal-action-btn" style={{ marginTop: '250px' }} onClick={resetGame}>RESTART</button>
                        )}

                        {modalType === 'victory' && (
                            <>
                                <h2 style={{ fontSize: '2.5rem', margin: 0, color: 'gold' }}>CONGRATULATIONS!</h2>
                                <h3 style={{ fontSize: '1.5rem', margin: '20px 0' }}>what a super zlayji <br /> wa9ef 9edami daba</h3>
                                <button className="modal-action-btn" onClick={resetGame}>RESTART</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizPage;
