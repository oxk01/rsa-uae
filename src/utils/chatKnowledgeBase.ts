interface KnowledgeSection {
  title: string;
  content: string;
  keywords: string[];
}

interface TechnologyInfo {
  title: string;
  content: string;
  keywords: string[];
}

interface ProjectInfo {
  title: string;
  content: string;
  keywords: string[];
}

export const createKnowledgeBase = (isArabic: boolean) => ({
  technology: {
    contextualAnalysis: {
      title: isArabic ? 'تحليل المشاعر السياقي' : 'Contextual Sentiment Analysis',
      content: isArabic
        ? 'تحليل المشاعر السياقي يحدد المشاعر في النص مع مراعاة سياق الكلمات، وليس مجرد الكلمات المفتاحية. يستخدم نماذج لغوية مثل BERT لفهم المعنى العميق.'
        : 'Contextual sentiment analysis identifies the sentiment (positive, negative, or neutral) expressed in a text while taking into account the context of the words, not just keywords. It uses language models like BERT to understand the deeper meaning.',
      keywords: ['sentiment', 'analysis', 'context', 'BERT', 'natural language']
    },
    bert: {
      title: isArabic ? 'نموذج BERT' : 'BERT Model',
      content: isArabic
        ? 'BERT هو نموذج معالجة لغة طبيعية متطور من Google يفهم سياق اللغة من كلا الاتجاهين. في مشروعنا، تم تدريبه لتحليل المراجعات وكشف المشاعر بدقة أكبر.'
        : 'BERT (Bidirectional Encoder Representations from Transformers) is a pre-trained NLP model developed by Google. It understands language context from both directions. In this project, it is fine-tuned to analyze reviews and detect sentiment more accurately.',
      keywords: ['BERT', 'Google', 'NLP', 'language model', 'transformers']
    },
    absa: {
      title: isArabic ? 'تحليل المشاعر القائم على الجوانب' : 'Aspect-Based Sentiment Analysis (ABSA)',
      content: isArabic
        ? 'ABSA يركز على تحديد جوانب معينة (مثل "عمر البطارية" أو "خدمة العملاء") في المراجعة وتحديد المشاعر لكل جانب على حدة.'
        : 'ABSA focuses on identifying specific aspects (like "battery life" or "customer service") in a review and determines the sentiment for each aspect individually.',
      keywords: ['ABSA', 'aspect', 'analysis', 'sentiment', 'specific']
    },
    bertWithAbsa: {
      title: isArabic ? 'BERT مع ABSA' : 'BERT with ABSA',
      content: isArabic
        ? 'BERT يعزز ABSA من خلال فهم السياق بشكل أفضل، مما يؤدي إلى كشف أدق للمشاعر لكل جانب مذكور في المراجعة.'
        : 'BERT enhances ABSA by understanding the context better, leading to more accurate sentiment detection for each aspect mentioned in a review.',
      keywords: ['BERT', 'ABSA', 'integration', 'accuracy', 'context']
    }
  },
  project: {
    goals: {
      title: isArabic ? 'أهداف المشروع' : 'Project Goals',
      content: isArabic
        ? 'تحليل مراجعات العملاء باستخدام الذكاء الاصطناعي. تحديد جوانب المنتج أو الخدمة. تحديد المشاعر لكل جانب. استخدام تقنيات البيانات الضخمة للتحليل القابل للتطوير.'
        : 'Analyze customer reviews using AI. Identify specific product or service aspects. Determine sentiment for each aspect. Use Big Data techniques for scalable analysis.',
      keywords: ['goals', 'AI', 'analysis', 'big data', 'sentiment', 'aspects']
    },
    training: {
      title: isArabic ? 'تدريب النموذج' : 'Model Training',
      content: isArabic
        ? 'نقوم بتدريب نموذج BERT مسبق التدريب على مجموعات بيانات مراجعات العملاء المصنفة التي تتضمن مصطلحات الجوانب وتصنيفات المشاعر.'
        : 'We fine-tune a pre-trained BERT model on labeled customer review datasets that include aspect terms and sentiment labels using supervised learning.',
      keywords: ['training', 'supervised learning', 'datasets', 'fine-tuning']
    }
  },
  technical: {
    tools: {
      title: isArabic ? 'الأدوات والأطر المستخدمة' : 'Tools and Frameworks',
      content: isArabic
        ? 'نستخدم Python، Hugging Face Transformers، TensorFlow/PyTorch، NLTK/SpaCy، وApache Spark لمعالجة البيانات الكبيرة.'
        : 'We use Python, Hugging Face Transformers, TensorFlow/PyTorch, NLTK/SpaCy, Apache Spark for Big Data processing.',
      keywords: ['tools', 'python', 'tensorflow', 'pytorch', 'apache spark', 'nlp']
    },
    evaluation: {
      title: isArabic ? 'تقييم الدقة' : 'Accuracy Evaluation',
      content: isArabic
        ? 'نستخدم مقاييس مثل الدقة، الاستدعاء، درجة F1، والدقة الكلية. نستخدم أيضاً مصفوفات الارتباك لتصور الأداء.'
        : 'Using metrics such as Precision, Recall, F1-Score, and Accuracy. We also use confusion matrices to visualize performance.',
      keywords: ['evaluation', 'metrics', 'precision', 'recall', 'accuracy']
    }
  },
  general: {
    overview: {
      title: isArabic ? 'نظرة عامة على الموقع' : 'Website Overview',
      content: isArabic
        ? 'هذا الموقع يحلل مراجعات العملاء باستخدام الذكاء الاصطناعي والبيانات الضخمة. نحن نستخدم نماذج متقدمة مثل BERT وتحليل المشاعر القائم على الجوانب لفهم الأجزاء التي أعجبت المستخدم أو لم تعجبه.'
        : 'This website analyzes customer reviews using Artificial Intelligence and Big Data. We use advanced models like BERT and Aspect-Based Sentiment Analysis (ABSA) to understand which parts of the product users liked or disliked.',
      keywords: ['website', 'overview', 'AI', 'sentiment analysis', 'reviews']
    },
    benefits: {
      title: isArabic ? 'فوائد للأعمال' : 'Benefits for Business',
      content: isArabic
        ? 'يمكن للشركات مراقبة آراء العملاء في الوقت الفعلي، وتحسين ميزات المنتج، وتحديد مخاوف العملاء الشائعة، وأتمتة تحليل رضا العملاء.'
        : 'Businesses can monitor customer feedback in real-time, improve product features based on feedback, identify common customer concerns, and automate customer satisfaction analysis.',
      keywords: ['benefits', 'business', 'monitoring', 'feedback', 'automation']
    },
    privacy: {
      title: isArabic ? 'خصوصية المستخدم' : 'User Privacy',
      content: isArabic
        ? 'يتم تحليل المراجعات المتاحة للجمهور فقط. يتم إخفاء هوية البيانات الشخصية أو إزالتها أثناء المعالجة.'
        : 'Only publicly available reviews are analyzed. Personal data is anonymized or removed during preprocessing.',
      keywords: ['privacy', 'security', 'data protection', 'anonymization']
    },
    demo: {
      tryDemo: {
        title: isArabic ? 'تجربة التحليل' : 'Try the Analysis',
        content: isArabic 
          ? 'نعم! فقط اكتب أو الصق مراجعة العميل - على سبيل المثال: "الشاشة جميلة، ولكن البطارية لا تدوم طويلاً." سيحدد نظامنا الجوانب (مثل "الشاشة" و "البطارية") ويخبرك بالمشاعر تجاه كل منها.'
          : 'Sure! Just type or paste a customer review — for example: "The screen is beautiful, but the battery doesn\'t last long." Our system will identify the aspects (like "screen" and "battery") and tell you the sentiment for each one.',
        keywords: ['demo', 'try', 'analysis', 'example', 'review']
      },
      bertExplanation: {
        title: isArabic ? 'كيف يعمل BERT و ABSA' : 'How BERT and ABSA Work',
        content: isArabic
          ? 'BERT هو نموذج تعلم عميق طوره Google. يفهم معنى الكلمات في سياقها - وليس فقط في اتجاه واحد مثل النماذج القديمة. ABSA يحدد الميزات المحددة المذكورة في المراجعة ويكتشف ما إذا كانت المشاعر تجاه كل منها إيجابية أو سلبية أو محايدة. معًا، يسمح BERT + ABSA لنظامنا بتجاوز المشاعر الأساسية وتقديم تحليل تفصيلي للرأي لكل ميزة في المراجعة.'
          : 'BERT (Bidirectional Encoder Representations from Transformers) is a deep learning model developed by Google. It understands the meaning of words in context — not just in one direction like older models. ABSA (Aspect-Based Sentiment Analysis) identifies specific features (aspects) mentioned in a review and detects whether the sentiment toward each one is positive, negative, or neutral. Together, BERT + ABSA allow our system to go beyond basic sentiment and give a detailed opinion breakdown for each feature in a review.',
        keywords: ['BERT', 'ABSA', 'explanation', 'how it works', 'technology']
      },
      analytics: {
        title: isArabic ? 'التحليلات المرئية' : 'Visual Analytics',
        content: isArabic
          ? 'بالتأكيد! في صفحة لوحة التحكم، يمكنك استكشاف: الجوانب الأكثر تداولًا للمنتج، اتجاهات المشاعر مع مرور الوقت، الرسوم البيانية الدائرية والشريطية التي تظهر الإيجابية أو السلبية لكل جانب، والتحليل في الوقت الفعلي إذا قمت بتوصيل مجموعة بيانات أو تدفق. ما عليك سوى الانتقال إلى قسم لوحة التحكم للغوص في البيانات!'
          : 'Of course! On the Dashboard page, you can explore: Which product aspects are most talked about, Sentiment trends over time, Pie charts and bar graphs showing positivity or negativity per aspect, Real-time analysis if you connect a dataset or stream. Just head to the Dashboard section to dive into the data!',
        keywords: ['analytics', 'dashboard', 'visualization', 'charts', 'trends']
      }
    }
  }
});
