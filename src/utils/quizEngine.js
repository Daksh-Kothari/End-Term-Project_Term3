/**
 * StudyVault AI Quiz Engine
 * ─────────────────────────
 * Generates quiz questions from raw text using NLP techniques:
 * 1. Sentence tokenization
 * 2. Key-term extraction (TF-IDF–inspired scoring)
 * 3. Definition pattern recognition
 * 4. Question generation (fill-blank, true/false, MCQ)
 *
 * No external API required — runs entirely in the browser.
 */

// ── Stop words to ignore during key-term extraction ──
const STOP_WORDS = new Set([
  'the','a','an','is','are','was','were','be','been','being','have','has','had',
  'do','does','did','will','would','shall','should','may','might','must','can',
  'could','am','i','me','my','we','our','you','your','he','she','it','its',
  'they','them','their','this','that','these','those','what','which','who',
  'whom','when','where','why','how','all','each','every','both','few','more',
  'most','other','some','such','no','nor','not','only','own','same','so',
  'than','too','very','just','about','above','after','again','also','and',
  'any','because','before','between','but','by','for','from','if','in',
  'into','of','on','or','out','over','then','there','through','to','under',
  'until','up','with','as','at','during','while','although','however',
  'therefore','thus','hence','since','still','yet','already','also','even',
]);

/**
 * Tokenize text into sentences
 */
function tokenizeSentences(text) {
  // Split on sentence-ending punctuation followed by space or end
  return text
    .replace(/\n+/g, '. ')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20 && s.split(/\s+/).length >= 5);
}

/**
 * Extract words from text, filtering stop words and short tokens
 */
function extractWords(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOP_WORDS.has(w));
}

/**
 * Calculate term frequency scores for each unique word
 */
function calcTermFrequency(words) {
  const freq = {};
  words.forEach((w) => {
    freq[w] = (freq[w] || 0) + 1;
  });
  return freq;
}

/**
 * Score and rank key terms using TF + position weighting
 */
function extractKeyTerms(text, topN = 20) {
  const words = extractWords(text);
  const freq = calcTermFrequency(words);
  const totalWords = words.length;

  // Position weight: terms appearing earlier get a slight boost
  const positionWeight = {};
  words.forEach((w, i) => {
    if (!positionWeight[w]) {
      positionWeight[w] = 1 + (1 - i / totalWords) * 0.5;
    }
  });

  // Score = frequency * position weight
  const scored = Object.entries(freq).map(([term, count]) => ({
    term,
    score: (count / totalWords) * (positionWeight[term] || 1),
    count,
  }));

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map((s) => s.term);
}

/**
 * Find the original-case version of a word in a sentence
 */
function findOriginalCase(sentence, word) {
  const regex = new RegExp(`\\b${word}\\b`, 'i');
  const match = sentence.match(regex);
  return match ? match[0] : word;
}

/**
 * Detect definition sentences (e.g., "X is Y", "X refers to Y")
 */
function findDefinitions(sentences) {
  const patterns = [
    /^(.+?)\s+(?:is|are|was|were)\s+(?:defined as|described as|known as|called|referred to as)\s+(.+)/i,
    /^(.+?)\s+(?:is|are)\s+(?:a|an|the)\s+(.+)/i,
    /^(.+?)\s+(?:refers? to|means?|involves?)\s+(.+)/i,
  ];

  const definitions = [];
  sentences.forEach((sentence) => {
    for (const pattern of patterns) {
      const match = sentence.match(pattern);
      if (match && match[1].split(/\s+/).length <= 5) {
        definitions.push({
          term: match[1].trim(),
          definition: match[2].trim().replace(/\.$/, ''),
          sentence,
        });
        break;
      }
    }
  });

  return definitions;
}

/**
 * Generate fill-in-the-blank questions
 */
function generateFillBlank(sentences, keyTerms) {
  const questions = [];

  sentences.forEach((sentence) => {
    for (const term of keyTerms) {
      const regex = new RegExp(`\\b${term}\\b`, 'i');
      if (regex.test(sentence) && sentence.length < 250) {
        const original = findOriginalCase(sentence, term);
        const blanked = sentence.replace(regex, '_________');

        questions.push({
          type: 'fill_blank',
          question: `Fill in the blank:\n"${blanked}"`,
          correctAnswer: original,
          options: [],
          explanation: sentence,
        });
        break; // one question per sentence
      }
    }
  });

  return questions;
}

/**
 * Generate true/false questions
 */
function generateTrueFalse(sentences, keyTerms) {
  const questions = [];

  sentences.forEach((sentence) => {
    if (sentence.length > 200) return;

    const wordsInSentence = keyTerms.filter((t) =>
      new RegExp(`\\b${t}\\b`, 'i').test(sentence)
    );

    if (wordsInSentence.length >= 1) {
      // True version
      questions.push({
        type: 'true_false',
        question: `True or False:\n"${sentence}"`,
        correctAnswer: 'True',
        options: ['True', 'False'],
        explanation: sentence,
      });

      // False version — swap a key term with another
      if (wordsInSentence.length >= 1 && keyTerms.length >= 3) {
        const termToSwap = wordsInSentence[0];
        const replacement = keyTerms.find(
          (t) => t !== termToSwap && !wordsInSentence.includes(t)
        );

        if (replacement) {
          const falseSentence = sentence.replace(
            new RegExp(`\\b${termToSwap}\\b`, 'i'),
            replacement
          );

          questions.push({
            type: 'true_false',
            question: `True or False:\n"${falseSentence}"`,
            correctAnswer: 'False',
            options: ['True', 'False'],
            explanation: `The correct statement is: "${sentence}"`,
          });
        }
      }
    }
  });

  return questions;
}

/**
 * Generate multiple-choice questions
 */
function generateMCQ(definitions, keyTerms) {
  const questions = [];

  definitions.forEach((def) => {
    // "What is [term]?" style
    const distractors = keyTerms
      .filter(
        (t) =>
          t.toLowerCase() !== def.term.toLowerCase() &&
          t.toLowerCase() !== def.definition.toLowerCase()
      )
      .slice(0, 3);

    if (distractors.length >= 2) {
      const options = shuffleArray([
        def.definition.length > 80
          ? def.definition.substring(0, 80) + '...'
          : def.definition,
        ...distractors.slice(0, 3).map((d) => capitalizeFirst(d)),
      ]);

      questions.push({
        type: 'multiple_choice',
        question: `What is ${def.term}?`,
        correctAnswer:
          def.definition.length > 80
            ? def.definition.substring(0, 80) + '...'
            : def.definition,
        options,
        explanation: def.sentence,
      });
    }
  });

  return questions;
}

/**
 * Shuffle an array (Fisher-Yates)
 */
function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Capitalize first letter
 */
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ──────────────────────────────────────────────
// PUBLIC API
// ──────────────────────────────────────────────

/**
 * Generate a quiz from raw text
 * @param {string} text - The notes/content to generate quiz from
 * @param {number} maxQuestions - Maximum number of questions
 * @returns {{ questions: Array, stats: Object }}
 */
export function generateQuiz(text, maxQuestions = 10) {
  if (!text || text.trim().length < 50) {
    return {
      questions: [],
      stats: { total: 0, error: 'Please provide at least 50 characters of text.' },
    };
  }

  const sentences = tokenizeSentences(text);
  const keyTerms = extractKeyTerms(text, 25);
  const definitions = findDefinitions(sentences);

  // Generate all question types
  const fillBlank = generateFillBlank(sentences, keyTerms);
  const trueFalse = generateTrueFalse(sentences, keyTerms);
  const mcq = generateMCQ(definitions, keyTerms);

  // Combine & shuffle
  let allQuestions = shuffleArray([...fillBlank, ...trueFalse, ...mcq]);

  // Deduplicate by question text
  const seen = new Set();
  allQuestions = allQuestions.filter((q) => {
    const key = q.question.substring(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Limit to maxQuestions
  const questions = allQuestions.slice(0, maxQuestions).map((q, i) => ({
    ...q,
    id: i + 1,
  }));

  return {
    questions,
    stats: {
      total: questions.length,
      fillBlank: questions.filter((q) => q.type === 'fill_blank').length,
      trueFalse: questions.filter((q) => q.type === 'true_false').length,
      mcq: questions.filter((q) => q.type === 'multiple_choice').length,
      keyTermsFound: keyTerms.length,
      sentencesAnalyzed: sentences.length,
      definitionsFound: definitions.length,
    },
  };
}

/**
 * Score a completed quiz
 * @param {Array} questions - Questions with user answers
 * @returns {{ score: number, total: number, percentage: number, results: Array }}
 */
export function scoreQuiz(questions) {
  let correct = 0;
  const results = questions.map((q) => {
    const isCorrect =
      q.userAnswer &&
      q.userAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
    if (isCorrect) correct++;
    return { ...q, isCorrect };
  });

  return {
    score: correct,
    total: questions.length,
    percentage: Math.round((correct / questions.length) * 100),
    results,
  };
}
