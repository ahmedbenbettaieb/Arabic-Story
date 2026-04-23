import { useState } from "react";

export default function App() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSpeaking, setIsSpeaking] = useState(false);

  const storyParts = [
    {
      text: "في أحد الأيام، عاشت حمامة صغيرة مع صغارها بالقرب من مطعم صغير.",
      img: "/images/img-1.jpeg",
    },
    {
      text: "كان صاحب المطعم يقدم لها فتات الخبز كل يوم. وكانت الحمامة سعيدة وقانعة بما لديها.",
      img: "/images/img-2.jpeg",
    },
    {
      text: "رآها غراب ماكر، وأراد الحصول على المزيد من الطعام، فاقترب منها وكسب ثقتها.",
      img: "/images/img-3.jpeg",
    },
    {
      text: "اقترح عليها دخول المطعم، لكنها رفضت وأبدت قناعتها بما لديها.",
      img: "/images/img-4.jpeg",
    },
    {
      text: "دخل الغراب وحده، لكنه تعثر وسقط في قدر المرق وتبلل بالكامل.",
      img: "/images/img-5.jpeg",
    },
    {
      text: "وتعلم أن الجشع يؤدي إلى عواقب وخيمة.",
      img: "/images/img-6.jpeg",
    },
  ];

  const storyArabic = storyParts.map((p) => p.text).join("\n");

  const questions = [
    {
      id: 0,
      question: "ما معنى الجشع؟",
      options: [
        "الرغبة في الحصول على شيء نفتقده",
        "الرغبة المستمرة في الحصول على المزيد دون اكتفاء",
        "القناعة بما نملك",
        "مشاركة الآخرين بما لدينا",
      ],
      correctIndex: 1,
    },
    {
      id: 1,
      question: "من الشخصية التي تمثل الجشع في القصة؟",
      options: ["الحمامة", "الطباخ", "الغراب", "صاحب المطعم"],
      correctIndex: 2,
    },
    {
      id: 2,
      question: "أيّ الشخصيات تمثل القناعة والرضا؟",
      options: ["الحمامة", "الطباخ", "الغراب", "الزوار"],
      correctIndex: 0,
    },
    {
      id: 3,
      question: "أين تدور أحداث القصة؟",
      options: [
        "في الغابة البعيدة",
        "بالقرب من مطعم صغير",
        "داخل بيت الحمامة",
        "في السوق",
      ],
      correctIndex: 1,
    },
    {
      id: 4,
      question: "ماذا كان يقدم صاحب المطعم للحمامة؟",
      options: ["السمك", "الحبوب", "فتات الخبز", "الماء"],
      correctIndex: 2,
    },
    {
      id: 5,
      question: "من الذي رأى الحمامة وصغارها؟",
      options: ["العصفور", "الغراب", "النسر", "الديك"],
      correctIndex: 1,
    },
    {
      id: 6,
      question: "لماذا أصبح الغراب صديقًا للحمامة؟",
      options: [
        "لأنه ساعدها في بناء العش",
        "لأنه كسب ثقتها مع مرور الوقت",
        "لأنه كان قويًا",
        "لأنه يعيش بالقرب منها",
      ],
      correctIndex: 1,
    },
    {
      id: 7,
      question: "ماذا اقترح الغراب على الحمامة؟",
      options: [
        "مغادرة المكان",
        "بناء عش جديد",
        "دخول المطعم للحصول على طعام أكثر",
        "البحث عن ماء",
      ],
      correctIndex: 2,
    },
    {
      id: 8,
      question: "كيف ردت الحمامة على اقتراح الغراب؟",
      options: [
        "وافقت فورًا",
        "رفضت وأبدت قناعتها بما لديها",
        "غضبت منه",
        "تجاهلته",
      ],
      correctIndex: 1,
    },
    {
      id: 9,
      question: "ماذا حدث للغراب داخل المطعم؟",
      options: [
        "أكل السمكة وهرب",
        "طرده الطباخ فورًا",
        "تعثر وسقط وتبلل بالمرق",
        "اختبأ ولم يره أحد",
      ],
      correctIndex: 2,
    },
    {
      id: 10,
      question: "ما العبرة من القصة؟",
      options: [
        "التعاون بين الأصدقاء مهم",
        "الجشع يؤدي إلى عواقب وخيمة",
        "العمل أفضل من الراحة",
        "يجب الحذر من الغرباء",
      ],
      correctIndex: 1,
    },
  ];

  const total = questions.length;

  const score = questions.reduce(
    (acc, q) => acc + (answers[q.id] === q.correctIndex ? 1 : 0),
    0,
  );

  const allAnswered = Object.keys(answers).length === total;

  const select = (qId: number, optIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: optIndex,
    }));
  };

  const handleRead = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(storyArabic);
    utterance.lang = "ar-SA";
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-50 to-blue-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-700 mb-6 mt-6">
          🐦 قصة الحمامة والغراب
        </h1>

        {/* BUTTON */}
        <button
          onClick={handleRead}
          className="w-full py-3 mb-6 rounded-xl bg-yellow-400 font-bold text-purple-800 shadow-md hover:scale-[1.02] transition"
        >
          {isSpeaking ? "⏹️ إيقاف" : "🔊 اقرأ القصة"}
        </button>

        {/* STORY */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6 space-y-6">
          {storyParts.map((part, i) => (
            <div key={i} className="space-y-3">
              <p className="text-lg leading-loose text-right text-gray-800">
                {part.text}
              </p>

              <img
                src={part.img}
                alt={`story-${i}`}
                className="w-full rounded-xl shadow"
              />
            </div>
          ))}
        </div>

        {/* QUESTIONS */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-8">
          {questions.map((q) => (
            <div key={q.id}>
              <h3 className="font-bold text-lg text-right mb-3">
                {q.id + 1}. {q.question}
              </h3>

              <div className="space-y-2">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => select(q.id, i)}
                    className={`w-full text-right p-3 rounded-xl border transition ${
                      answers[q.id] === i
                        ? "bg-pink-500 text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {answers[q.id] !== undefined && (
                <p className="mt-2 font-bold text-right">
                  {answers[q.id] === q.correctIndex ? (
                    <span className="text-green-600">✅ صحيح</span>
                  ) : (
                    <span className="text-red-600">
                      ❌ الصحيح: {q.options[q.correctIndex]}
                    </span>
                  )}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* FINAL SCORE */}
        {allAnswered && (
          <div className="mt-6 p-6 text-center rounded-2xl bg-gradient-to-r from-purple-200 to-pink-200">
            <h2 className="text-2xl font-bold mb-2">🎉 النتيجة النهائية</h2>
            <p className="text-xl font-bold">
              {score} / {total}
            </p>
            <p className="mt-2 font-bold">
              {score === total
                ? "🌟 ممتاز!"
                : score >= 3
                  ? "👏 جيد!"
                  : "💪 حاول مرة أخرى"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
