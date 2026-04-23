import { useState } from "react";
import "./index.css";

export default function App() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSpeaking, setIsSpeaking] = useState(false);

  const storyArabic = `
في أحد الأيام، عاشت حمامة صغيرة مع صغارها بالقرب من مطعم صغير. 
كان صاحب المطعم يقدم لها فتات الخبز كل يوم. وكانت الحمامة سعيدة وقانعة بما لديها.

رآها غراب ماكر، وأراد الحصول على المزيد من الطعام، فاقترب منها وكسب ثقتها.

اقترح عليها دخول المطعم، لكنها رفضت.

دخل الغراب وحده، لكنه سقط في قدر المرق.

وتعلم أن الجشع يؤدي إلى عواقب وخيمة.
`;

  const questions = [
    {
      id: 0,
      question: "ما معنى الجشع؟",
      options: [
        "الرغبة في شيء نفتقده",
        "الرغبة المستمرة في المزيد دون اكتفاء",
        "القناعة بما نملك",
        "مشاركة الآخرين",
      ],
      correctIndex: 1,
    },
    {
      id: 1,
      question: "من يمثل الجشع؟",
      options: ["الحمامة", "الطباخ", "الغراب", "صاحب المطعم"],
      correctIndex: 2,
    },
    {
      id: 2,
      question: "من يمثل القناعة؟",
      options: ["الحمامة", "الغراب", "الطباخ", "الناس"],
      correctIndex: 0,
    },
    {
      id: 3,
      question: "أين تدور القصة؟",
      options: ["غابة", "مطعم صغير", "منزل", "سوق"],
      correctIndex: 1,
    },
    {
      id: 4,
      question: "ماذا كانت تأكل الحمامة؟",
      options: ["سمك", "حبوب", "فتات الخبز", "لحم"],
      correctIndex: 2,
    },
  ];

  const total = questions.length;

  const score = questions.reduce(
    (acc, q) => acc + (answers[q.id] === q.correctIndex ? 1 : 0),
    0
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
    <div className="app">
      <h1>🐦 قصة الحمامة والغراب</h1>

      <button onClick={handleRead} className="btn">
        {isSpeaking ? "⏹️ إيقاف" : "🔊 اقرأ القصة"}
      </button>

      <div className="story">
        <p>{storyArabic}</p>
      </div>

      <div className="questions">
        {questions.map((q) => (
          <div key={q.id} className="question">
            <h3>
              {q.id + 1}. {q.question}
            </h3>

            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => select(q.id, i)}
                className={`option ${
                  answers[q.id] === i ? "selected" : ""
                }`}
              >
                {opt}
              </button>
            ))}

            {answers[q.id] !== undefined && (
              <p className="result">
                {answers[q.id] === q.correctIndex
                  ? "✅ صحيح"
                  : `❌ الصحيح: ${q.options[q.correctIndex]}`}
              </p>
            )}
          </div>
        ))}
      </div>

      {allAnswered && (
        <div className="final">
          <h2>🎉 النتيجة النهائية</h2>
          <p>
            {score} / {total}
          </p>
          <h3>
            {score === total
              ? "🌟 ممتاز!"
              : score >= 3
              ? "👏 جيد!"
              : "💪 حاول مرة أخرى"}
          </h3>
        </div>
      )}
    </div>
  );
}