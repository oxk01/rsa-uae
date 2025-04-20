import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from "@/components/ui/use-toast";

const createKnowledgeBase = (isArabic: boolean) => ({
  home: {
    title: isArabic ? 'الصفحة الرئيسية' : 'Home Page',
    content: isArabic 
      ? 'الصفحة الرئيسية تقدم نظرة عامة على التطبيق وخدماتنا لتحليل المشاعر من المراجعات.'
      : 'The home page provides an overview of our application and services for sentiment analysis of reviews.'
  },
  about: {
    title: isArabic ? 'من نحن' : 'About Us',
    content: isArabic 
      ? 'نحن شركة متخصصة في تحليل المشاعر باستخدام الذكاء الاصطناعي لمساعدة الشركات على فهم آراء العملاء بشكل أفضل.'
      : 'We are a company specialized in sentiment analysis using AI to help businesses better understand customer opinions.'
  },
  technology: {
    bert: {
      title: isArabic ? 'تقنية BERT' : 'BERT Technology',
      content: isArabic 
        ? 'نموذج BERT هو نموذج لغوي متطور طورته Google يستخدم لفهم السياق العميق للنص. يستخدم تقنية الترميز الثنائي للمحولات وهو مدرب على مجموعة بيانات نصية ضخمة، مما يجعله فعالاً جداً في تحليل المشاعر ومهام معالجة اللغة الطبيعية الأخرى.'
        : 'BERT (Bidirectional Encoder Representations from Transformers) is an advanced language model developed by Google that\'s used for deep contextual understanding of text. It uses bidirectional transformer encoding and is trained on massive text datasets, making it highly effective for sentiment analysis and other NLP tasks.',
      keywords: ['bert', 'transformer', 'google', 'language model', 'bidirectional', 'encoding']
    },
    nlp: {
      title: isArabic ? 'معالجة اللغة الطبيعية' : 'Natural Language Processing',
      content: isArabic
        ? 'معالجة اللغة الطبيعية (NLP) هي فرع من الذكاء الاصطناعي يركز على تفاعل الكمبيوتر مع اللغة البشرية. تتضمن تقنياتنا خوارزميات متقدمة للتعلم الآلي التي تحلل النص لاستخراج المعنى والمشاعر والسياق.'
        : 'Natural Language Processing (NLP) is a branch of AI focused on computer interaction with human language. Our techniques involve advanced machine learning algorithms that analyze text to extract meaning, sentiment, and context.',
      keywords: ['nlp', 'natural language', 'processing', 'ai', 'machine learning', 'text analysis']
    },
    absa: {
      title: isArabic ? 'تحليل المشاعر القائم على الجوانب' : 'Aspect-Based Sentiment Analysis',
      content: isArabic 
        ? 'تحليل المشاعر القائم على الجوانب (ABSA) هو تقنية متقدمة تحدد المشاعر المتعلقة بجوانب محددة من المنتج أو الخدمة. على سبيل المثال، يمكننا تحديد أن العميل راضٍ عن جودة المنتج ولكنه غير راضٍ عن خدمة العملاء.'
        : 'Aspect-Based Sentiment Analysis (ABSA) is an advanced technique that identifies sentiments related to specific aspects of a product or service. For example, we can determine that a customer is satisfied with product quality but dissatisfied with customer service.',
      keywords: ['absa', 'aspect', 'sentiment', 'analysis', 'product', 'service', 'specific']
    },
    bigData: {
      title: isArabic ? 'تقنيات البيانات الضخمة' : 'Big Data Technologies',
      content: isArabic 
        ? 'تقنيات البيانات الضخمة تمكننا من معالجة ملايين المراجعات بسرعة وكفاءة. نستخدم أطر عمل مثل Hadoop وSpark لتوزيع المعالجة وتقديم تحليلات في الوقت الحقيقي تقريباً.'
        : 'Big Data technologies allow us to process millions of reviews quickly and efficiently. We use frameworks like Hadoop and Spark for distributed processing and deliver near real-time analytics.',
      keywords: ['big data', 'hadoop', 'spark', 'distributed', 'processing', 'real-time', 'analytics']
    },
    ai: {
      title: isArabic ? 'الذكاء الاصطناعي' : 'Artificial Intelligence',
      content: isArabic
        ? 'نستخدم تقنيات الذكاء الاصطناعي المتقدمة لفهم وتحليل مراجعات العملاء. تشمل نماذجنا شبكات عصبية عميقة وتعلم آلي متقدم لفهم سياق النص والمشاعر بدقة عالية.'
        : 'We use advanced AI techniques to understand and analyze customer reviews. Our models include deep neural networks and sophisticated machine learning to understand text context and sentiment with high accuracy.',
      keywords: ['ai', 'artificial intelligence', 'machine learning', 'deep learning', 'neural networks']
    }
  },
  dashboard: {
    overview: {
      title: isArabic ? 'لوحة التحكم' : 'Dashboard Overview',
      content: isArabic 
        ? 'لوحة التحكم توفر تحليلاً مرئياً للمشاعر من المراجعات، بما في ذلك الاتجاهات والكلمات الرئيسية وأمثلة المراجعات. يمكنك تخصيص العروض وتصدير التقارير بتنسيقات مختلفة.'
        : 'The dashboard provides visual analysis of sentiment from reviews, including trends, key words, and review examples. You can customize views and export reports in various formats.',
      keywords: ['dashboard', 'visualization', 'reports', 'analytics', 'metrics', 'insights']
    },
    metrics: {
      title: isArabic ? 'المقاييس والتحليلات' : 'Metrics and Analytics',
      content: isArabic
        ? 'نقدم مقاييس متعددة مثل درجة المشاعر الإجمالية، ونسب المشاعر الإيجابية/السلبية/المحايدة، والكلمات الرئيسية، والاتجاهات بمرور الوقت.'
        : 'We provide multiple metrics such as overall sentiment score, positive/negative/neutral sentiment ratios, key topics, and trends over time.',
      keywords: ['metrics', 'analytics', 'sentiment score', 'trends', 'data visualization']
    },
    reports: {
      title: isArabic ? 'التقارير والتصدير' : 'Reports and Export',
      content: isArabic
        ? 'يمكن تصدير التقارير في تنسيقات متعددة مثل PDF و Excel و CSV، مما يسمح بالتحليل الإضافي ومشاركة البيانات مع أصحاب المصلحة.'
        : 'Reports can be exported in multiple formats including PDF, Excel, and CSV, allowing for additional analysis and sharing data with stakeholders.',
      keywords: ['reports', 'export', 'pdf', 'excel', 'csv', 'data sharing']
    }
  },
  features: {
    realtime: {
      title: isArabic ? 'التحليلات في الوقت ��لحقيقي' : 'Real-time Analytics',
      content: isArabic
        ? 'يوفر نظامنا تحليلات في الوقت الحقيقي تقريباً، مما يتيح لك الاستجابة بسرعة للتغييرات في آراء العملاء.'
        : 'Our system provides near real-time analytics, allowing you to respond quickly to changes in customer opinions.',
      keywords: ['real-time', 'analytics', 'responsive', 'immediate', 'quick']
    },
    customization: {
      title: isArabic ? 'التخصيص' : 'Customization',
      content: isArabic
        ? 'يمكن تخصيص نظامنا ليناسب احتياجات عملك المحددة، بما في ذلك الصناعات والأسواق المستهدفة.'
        : 'Our system can be customized to fit your specific business needs, including specific industries and target markets.',
      keywords: ['customization', 'tailored', 'specific', 'industry', 'market']
    },
    integration: {
      title: isArabic ? 'التكامل' : 'Integration',
      content: isArabic
        ? 'يتكامل نظامنا مع العديد من منصات التجارة الإلكترونية وأنظمة CRM ومنصات التواصل الاجتماعي.'
        : 'Our system integrates with many e-commerce platforms, CRM systems, and social media platforms.',
      keywords: ['integration', 'e-commerce', 'crm', 'social media', 'platforms', 'api']
    },
    languages: {
      title: isArabic ? 'دعم اللغات المتعددة' : 'Multi-language Support',
      content: isArabic
        ? 'يدعم نظامنا تحليل المشاعر في لغات متعددة، بما في ذلك العربية والإنجليزية وغيرها.'
        : 'Our system supports sentiment analysis in multiple languages, including Arabic, English, and more.',
      keywords: ['languages', 'multilingual', 'arabic', 'english', 'translation']
    },
    accuracy: {
      title: isArabic ? 'دقة عالية' : 'High Accuracy',
      content: isArabic
        ? 'تحقق خوارزمياتنا دقة تتجاوز 90% في تحليل المشاعر، مما يضمن أن تكون البيانات التي تتلقاها موثوقة وقابلة للتنفيذ.'
        : 'Our algorithms achieve over 90% accuracy in sentiment analysis, ensuring that the data you receive is reliable and actionable.',
      keywords: ['accuracy', 'reliable', 'precision', 'confidence', 'performance']
    }
  },
  pricing: {
    plans: {
      title: isArabic ? 'خطط الأسعار' : 'Pricing Plans',
      content: isArabic
        ? 'نقدم خطط أسعار مرنة تناسب الشركات من جميع الأحجام، بدءاً من الشركات الناشئة وحتى المؤسسات الكبيرة.'
        : 'We offer flexible pricing plans that suit businesses of all sizes, from startups to large enterprises.',
      keywords: ['pricing', 'plans', 'subscription', 'cost', 'payment']
    },
    trial: {
      title: isArabic ? 'النسخة التجريبية المجانية' : 'Free Trial',
      content: isArabic
        ? 'نقدم فترة تجريبية مجانية لمدة 14 يوماً للمستخدمين الجدد لتجربة خدماتنا بدون مخاطر.'
        : 'We offer a 14-day free trial for new users to experience our services risk-free.',
      keywords: ['trial', 'free', '14 days', 'demo', 'test', 'evaluation']
    },
    enterprise: {
      title: isArabic ? 'حلول المؤسسات' : 'Enterprise Solutions',
      content: isArabic
        ? 'تقدم خطة المؤسسات الخاصة بنا مزايا متقدمة مثل الدعم المخصص، والتكامل المخصص، وتحليل البيانات المتقدم.'
        : 'Our enterprise plan offers advanced features like dedicated support, custom integrations, and advanced data analytics.',
      keywords: ['enterprise', 'advanced', 'custom', 'dedicated', 'business', 'corporate']
    }
  },
  general: {
    welcome: {
      content: isArabic 
        ? 'مرحبًا! أنا المساعد الافتراضي الخاص بك. كيف يمكنني مساعدتك اليوم؟'
        : 'Hello! I am your virtual assistant. How can I help you today?'
    },
    notUnderstand: {
      content: isArabic 
        ? 'آسف، لم أفهم سؤالك. هل يمكنك إعادة صياغته بطريقة مختلفة؟'
        : 'Sorry, I did not understand your question. Can you rephrase it in a different way?'
    },
    functionalities: {
      content: isArabic 
        ? 'يمكنني مساعدتك في فهم خدماتنا وتقنياتنا وكيفية استخدام النظام. يمكنني أيضاً توجيهك إلى الموارد ذات الصلة وتقديم دعم أساسي.'
        : 'I can help you understand our services, technologies, and how to use the system. I can also direct you to relevant resources and provide basic support.'
    },
    imageAnalysis: {
      content: isArabic
        ? 'يبدو أنك أرسلت صورة. يمكنني تحليل الصور المتعلقة بتحليل المشاعر أو مراجعات المنتجات. ماذا تريد أن تعرف عن هذه الصورة؟'
        : 'It looks like you\'ve sent an image. I can analyze images related to sentiment analysis or product reviews. What would you like to know about this image?'
    },
    imageProcessing: {
      content: isArabic
        ? 'يمكنني معالجة الصور التي تحتوي على مراجعات نصية أو بيانات المشاعر. هل تريد مني تحليل النص في هذه الصورة أو تقديم رؤى حول بيانات المشاعر المعروضة؟'
        : 'I can process images containing textual reviews or sentiment data. Would you like me to analyze the text in this image or provide insights about the sentiment data displayed?'
    }
  },
  services: {
    overview: {
      title: isArabic ? 'خدماتنا' : 'Our Services',
      content: isArabic 
        ? 'نقدم مجموعة من خدمات تحليل المشاعر، بما في ذلك تحليل مراجعات المنتجات، وتعليقات وسائل التواصل الاجتماعي، والاستبيانات، والمزيد. يمكننا أيضاً تقديم تحليلات مخصصة لاحتياجات عملك المحددة.'
        : 'We offer a range of sentiment analysis services, including product review analysis, social media comment analysis, survey analysis, and more. We can also provide customized analytics for your specific business needs.',
      keywords: ['services', 'sentiment analysis', 'review analysis', 'social media', 'surveys']
    },
    productReviews: {
      title: isArabic ? 'تحليل مراجعات المنتجات' : 'Product Review Analysis',
      content: isArabic
        ? 'خدمة تحليل مراجعات المنتجات تساعد الشركات على فهم ما يقوله العملاء عن منتجاتهم، وتحديد نقاط القوة والضعف، واكتشاف فرص التحسين.'
        : 'Our product review analysis service helps businesses understand what customers are saying about their products, identify strengths and weaknesses, and discover opportunities for improvement.',
      keywords: ['product reviews', 'customer feedback', 'e-commerce', 'ratings', 'improvement']
    },
    socialMedia: {
      title: isArabic ? 'تحليل وسائل التواصل الاجتماعي' : 'Social Media Analysis',
      content: isArabic
        ? 'نقدم تحليلاً شاملاً لتعليقات وسائل التواصل الاجتماعي لفهم مشاعر العملاء ومراقبة سمعة العلامة التجارية عبر جميع المنصات الرئيسية.'
        : 'We provide comprehensive analysis of social media comments to understand customer sentiment and monitor brand reputation across all major platforms.',
      keywords: ['social media', 'comments', 'facebook', 'twitter', 'instagram', 'brand monitoring']
    }
  },
  support: {
    contact: {
      title: isArabic ? 'اتصل بنا' : 'Contact Us',
      content: isArabic
        ? 'يمكنك الاتصال بفريق الدعم لدينا عبر البريد الإلكتروني على support@example.com أو عبر الهاتف على +1-234-567-8900.'
        : 'You can contact our support team via email at support@example.com or by phone at +1-234-567-8900.',
      keywords: ['contact', 'support', 'email', 'phone', 'help', 'assistance']
    },
    hours: {
      title: isArabic ? 'ساعات العمل' : 'Support Hours',
      content: isArabic
        ? 'ساعات عمل فريق الدعم لدينا هي من الاثنين إلى الجمعة، من الساعة 9 صباحاً إلى 5 مساءً بالتوقيت المركزي.'
        : 'Our support team hours are Monday through Friday, 9 AM to 5 PM Central Time.',
      keywords: ['hours', 'support', 'schedule', 'availability', 'time']
    },
    faq: {
      title: isArabic ? 'الأسئلة المتكررة' : 'FAQ',
      content: isArabic
        ? 'يمكنك العثور على إجابات للأسئلة الشائعة في قسم الأسئلة المتكررة على موقعنا.'
        : 'You can find answers to common questions in the FAQ section on our website.',
      keywords: ['faq', 'questions', 'answers', 'help', 'common questions']
    }
  },
  blog: {
    title: isArabic ? 'المدونة' : 'Blog',
    content: isArabic
      ? 'تقدم مدونتنا رؤى صناعية ودراسات حالة وأفضل الممارسات في تحليل المشاعر وتحليلات العملاء وتحسين الأعمال.'
      : 'Our blog provides industry insights, case studies, and best practices in sentiment analysis, customer analytics, and business improvement.',
    keywords: ['blog', 'insights', 'case studies', 'best practices', 'articles', 'research']
  },
  demo: {
    title: isArabic ? 'العرض التوضيحي' : 'Demo',
    content: isArabic
      ? 'يتيح لك العرض التوضيحي الخاص بنا تجربة تحليل المشاعر في الوقت الفعلي. ما عليك سوى إدخال بعض النصوص وسترى على الفور تحليلًا لمشاعرها.'
      : 'Our demo allows you to experience real-time sentiment analysis. Simply input some text and you\'ll instantly see an analysis of its sentiment.',
    keywords: ['demo', 'try', 'test', 'example', 'sentiment analysis', 'real-time']
  },
  images: {
    analysis: {
      title: isArabic ? 'تحليل الصور' : 'Image Analysis',
      content: isArabic
        ? 'يمكن لنظامنا تحليل الصور التي تحتوي على مراجعات أو بيانات المشاعر. نستخدم تقنيات OCR (التعرف الضوئي على الحروف) لاستخراج النص من الصور ثم تحليل المشاعر باستخدام خوارزمياتنا المتقدمة.'
        : 'Our system can analyze images containing reviews or sentiment data. We use OCR (Optical Character Recognition) techniques to extract text from images and then analyze sentiment using our advanced algorithms.',
      keywords: ['image', 'analysis', 'ocr', 'text extraction', 'visual', 'picture', 'photo']
    },
    visualization: {
      title: isArabic ? 'تصور البيانات' : 'Data Visualization',
      content: isArabic
        ? 'نقدم أدوات متقدمة لتصور البيانات تساعدك على فهم نتائج تحليل المشاعر بشكل أفضل من خلال الرسوم البيانية وأشكال التصور الأخرى.'
        : 'We provide advanced data visualization tools that help you better understand sentiment analysis results through charts and other visualization forms.',
      keywords: ['visualization', 'charts', 'graphs', 'dashboard', 'visual', 'display', 'diagram']
    },
    screenshot: {
      title: isArabic ? 'تحليل لقطات الشاشة' : 'Screenshot Analysis',
      content: isArabic
        ? 'يمكننا تحليل لقطات الشاشة من منصات التواصل الاجتماعي أو مواقع التجارة الإلكترونية لاستخراج المراجعات وتحليل المشاعر.'
        : 'We can analyze screenshots from social media platforms or e-commerce sites to extract reviews and analyze sentiment.',
      keywords: ['screenshot', 'screen capture', 'social media', 'e-commerce', 'extract', 'analysis']
    }
  },
  siteNavigation: {
    navigation: {
      title: isArabic ? 'التنقل في الموقع' : 'Website Navigation',
      content: isArabic
        ? 'يمكنك التنقل في موقعنا باستخدام شريط القائمة العلوي. توجد روابط للصفحة الرئيسية ومن نحن ولوحة القيادة والعرض التوضيحي والمدونة والتسعير وصفحات الاتصال.'
        : 'You can navigate our website using the top menu bar. There are links for Home, About, Dashboard, Demo, Blog, Pricing, and Contact pages.',
      keywords: ['navigation', 'menu', 'links', 'pages', 'layout', 'structure', 'header']
    },
    chatbot: {
      title: isArabic ? 'روبوت الدردشة' : 'Website Chatbot',
      content: isArabic
        ? 'روبوت الدردشة الخاص بنا مصمم لمساعدتك في العثور على إجابات لأسئلتك حول خدماتنا وميزاتنا ومحتوى موقعنا. يمكنك طرح أسئلة بلغة طبيعية والحصول على إجابات فورية.'
        : 'Our chatbot is designed to help you find answers to your questions about our services, features, and website content. You can ask questions in natural language and get instant answers.',
      keywords: ['chatbot', 'assistant', 'help', 'questions', 'answers', 'support']
    },
    login: {
      title: isArabic ? 'تسجيل الدخول والتسجيل' : 'Login and Registration',
      content: isArabic
        ? 'يمكنك تسجيل الدخول إلى حسابك أو إنشاء حساب جديد من خلال النقر على زر "تسجيل الدخول" أو "التسجيل" في الزاوية العليا اليمنى من الموقع.'
        : 'You can log in to your account or create a new account by clicking on the "Login" or "Sign up" button in the top right corner of the website.',
      keywords: ['login', 'sign in', 'register', 'signup', 'account', 'credentials', 'password']
    },
    responsiveness: {
      title: isArabic ? 'تجاوب الموقع' : 'Website Responsiveness',
      content: isArabic
        ? 'موقعنا متجاوب بالكامل ويعمل بشكل جيد على أجهزة الكمبيوتر والأجهزة اللوحية والهواتف المحمولة. يتكيف التصميم تلقائيًا ليناسب حجم شاشتك.'
        : 'Our website is fully responsive and works well on desktops, tablets, and mobile phones. The layout automatically adapts to fit your screen size.',
      keywords: ['responsive', 'mobile', 'tablet', 'desktop', 'screen size', 'adaptive']
    },
    darkMode: {
      title: isArabic ? 'الوضع المظلم' : 'Dark Mode',
      content: isArabic
        ? 'يدعم موقعنا الوضع المظلم للاستخدام الليلي المريح. يمكنك تبديل الوضع المظلم من خلال النقر على زر التبديل في القائمة العلوية.'
        : 'Our website supports dark mode for comfortable nighttime usage. You can toggle dark mode by clicking the toggle button in the top menu.',
      keywords: ['dark mode', 'light mode', 'theme', 'toggle', 'night mode', 'color scheme']
    }
  },
  faq: {
    pricing: {
      title: isArabic ? 'أسئلة شائعة حول التسعير' : 'Pricing FAQ',
      content: isArabic
        ? 'نقدم خطط تسعير مرنة تناسب الشركات من جميع الأحجام. تبد�� خطتنا الأساسية من $49 شهريًا وتتضمن جميع الميزات الأساسية. لمزيد من المعلومات، يرجى زيارة صفحة التسعير.'
        : 'We offer flexible pricing plans that suit businesses of all sizes. Our basic plan starts at $49/month and includes all essential features. For more information, please visit our pricing page.',
      keywords: ['pricing', 'cost', 'subscription', 'plans', 'payment', 'monthly', 'annual']
    },
    dataPrivacy: {
      title: isArabic ? 'أسئلة شائعة حول خصوصية البيانات' : 'Data Privacy FAQ',
      content: isArabic
        ? 'نأخذ خصوصية البيانات على محمل الجد. جميع البيانات التي تحملها إلى نظامنا مشفرة وآمنة. لا نشارك بياناتك مع أطراف ثالثة دون موافقتك. يمكنك الاطلاع على سياسة الخصوصية الكاملة في صفحة سياسة الخصوصية.'
        : 'We take data privacy seriously. All data you upload to our system is encrypted and secure. We do not share your data with third parties without your consent. You can view our full privacy policy on our Privacy Policy page.',
      keywords: ['privacy', 'security', 'data', 'encryption', 'confidential', 'policy', 'protection']
    },
    cancellation: {
      title: isArabic ? 'أسئلة شائعة حول الإلغاء' : 'Cancellation FAQ',
      content: isArabic
        ? 'يمكنك إلغاء اشتراكك في أي وقت من خلال لوحة التحكم الخاصة بحسابك. لن يتم تحصيل رسوم إضافية بعد تاريخ الإلغاء، وستستمر في الوصول إلى الخدمة حتى نهاية فترة الفوترة الحالية.'
        : 'You can cancel your subscription at any time through your account dashboard. No additional charges will be applied after the cancellation date, and you\'ll continue to have access to the service until the end of your current billing period.',
      keywords: ['cancel', 'subscription', 'refund', 'terminate', 'billing', 'stop']
    },
    support: {
      title: isArabic ? 'أسئلة شائعة حول الدعم' : 'Support FAQ',
      content: isArabic
        ? 'نحن نقدم دعمًا عبر البريد الإلكتروني والدردشة المباشرة. أوقات الدعم لدينا هي من الاثنين إلى الجمعة، 9 صباحًا - 5 مساءً بالتوقيت المركزي. لأسئلة الدعم العاجلة، يرجى استخدام الدردشة المباشرة.'
        : 'We provide support via email and live chat. Our support hours are Monday-Friday, 9 AM - 5 PM Central Time. For urgent support questions, please use the live chat.',
      keywords: ['support', 'help', 'contact', 'assistance', 'customer service', 'chat']
    }
  },
  websiteInfo: {
    about: {
      title: isArabic ? 'حول الموقع' : 'About the Website',
      content: isArabic 
        ? 'هذا الموقع يحلل مراجعات العملاء باستخدام الذكاء الاصطناعي والبيانات الضخمة. نستخدم نماذج متقدمة مثل BERT وتحليل المشاعر القائم على الجوانب (ABSA) لفهم أي أجزاء من المنتج أعجبت المستخدم أو لم تعجبه.'
        : 'This website analyzes customer reviews using Artificial Intelligence and Big Data. We use advanced models like BERT and Aspect-Based Sentiment Analysis (ABSA) to understand which parts of the product users liked or disliked.',
      keywords: ['about', 'website', 'purpose', 'analysis', 'reviews', 'ai']
    },
    contextualAnalysis: {
      title: isArabic ? 'تحليل المشاعر السياقي' : 'Contextual Sentiment Analysis',
      content: isArabic
        ? 'تحليل المشاعر السياقي يحدد المشاعر (إيجابية أو سلبية أو محايدة) في النص مع مراعاة سياق الكلما��. يستخدم نماذج لغوية مثل BERT لفهم المعنى العميق.'
        : 'Contextual sentiment analysis identifies the sentiment (positive, negative, or neutral) expressed in a text while taking into account the context of the words, not just keywords. It uses language models like BERT to understand the deeper meaning.',
      keywords: ['contextual', 'sentiment', 'analysis', 'context', 'bert']
    },
    bert: {
      title: isArabic ? 'ما هو BERT' : 'What is BERT',
      content: isArabic
        ? 'BERT هو نموذج معالجة لغة طبيعية مطور من قبل Google. يفهم سياق اللغة من كلا الاتجاهين. في هذا المشروع، تم تدريبه لتحليل المراجعات وكشف المشاعر بدقة أكبر.'
        : 'BERT (Bidirectional Encoder Representations from Transformers) is a pre-trained NLP model developed by Google. It understands language context from both directions. In this project, it is fine-tuned to analyze reviews and detect sentiment more accurately.',
      keywords: ['bert', 'nlp', 'google', 'model', 'transformer']
    },
    absa: {
      title: isArabic ? 'ما هو ABSA' : 'What is ABSA',
      content: isArabic
        ? 'ABSA يعني تحليل المشاعر القائم على الجوانب. يركز على تحديد جوانب معينة (مثل "عمر البطارية" أو "خدمة العملاء") في المراجعة ويحدد المشاعر لكل جانب على حدة.'
        : 'ABSA stands for Aspect-Based Sentiment Analysis. It focuses on identifying specific aspects (like "battery life" or "customer service") in a review and determines the sentiment for each aspect individually.',
      keywords: ['absa', 'aspect', 'analysis', 'sentiment']
    },
    benefits: {
      title: isArabic ? 'فوائد للأعمال' : 'Benefits for Business',
      content: isArabic
        ? 'يمكن للشركات مراقبة آراء العملاء في الوقت الفعلي، وتحسين ميزات المنتج بناءً على التعليقات، وتحديد مخاوف العملاء الشائعة، وأتمتة تحليل رضا العملاء.'
        : 'Businesses can monitor customer feedback in real-time, improve product features based on aspect feedback, identify common customer concerns, and automate customer satisfaction analysis.',
      keywords: ['business', 'benefits', 'monitoring', 'feedback', 'improvements']
    },
    privacy: {
      title: isArabic ? 'خصوصية المستخدم' : 'User Privacy',
      content: isArabic
        ? 'يتم تحليل المراجعات المتاحة للجمهور فقط. يتم إخفاء هوية البيانات الشخصية أو إزالتها أثناء المعالجة المسبقة.'
        : 'Only publicly available reviews are analyzed. Personal data is anonymized or removed during preprocessing.',
      keywords: ['privacy', 'security', 'data protection', 'anonymization']
    },
    demo: {
      title: isArabic ? 'تجربة النظام' : 'Try the System',
      content: isArabic
        ? 'نعم! انتقل إلى صفحة "العرض التوضيحي"، وأدخل مراجعتك، وسيقوم النظام بتحليل مشاعر كل جانب باستخدام نموذج BERT-ABSA المدرب.'
        : 'Yes! Go to the "Demo" page, enter your review, and the system will analyze the sentiment of each aspect using the trained BERT-ABSA model.',
      keywords: ['demo', 'try', 'test', 'analyze', 'review']
    },
    technologies: {
      title: isArabic ? 'التقنيات المستخدمة' : 'Technologies Used',
      content: isArabic
        ? 'نستخدم Python، Hugging Face Transformers، TensorFlow/PyTorch، NLTK/SpaCy، وApache Spark لمعالجة البيانات الكبيرة، وFlask/Django للتكامل مع الويب.'
        : 'We use Python, Hugging Face Transformers, TensorFlow/PyTorch, NLTK/SpaCy, Apache Spark for Big Data processing, and Flask/Django for web integration.',
      keywords: ['technology', 'stack', 'tools', 'frameworks', 'languages']
    },
    futureScope: {
      title: isArabic ? 'النطاق المستقبلي' : 'Future Scope',
      content: isArabic
        ? 'نخطط لإضافة تحليل المشاعر متعدد اللغات، والتكامل مع وسائل التواصل الاجتماعي، وأنظمة التغذية المرتدة للدردشة في الوقت الفعلي، وتحليل عاطفي أعمق.'
        : 'Future plans include multilingual sentiment analysis, integration with social media feeds, real-time chatbot feedback systems, and deeper emotional analysis beyond polarity.',
      keywords: ['future', 'roadmap', 'plans', 'development', 'features']
    }
  }
});

export const useGetAnswer = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const isArabic = currentLanguage === 'ar';
  
  const processQuery = (query: string): string[] => {
    const stopWords = ['and', 'the', 'for', 'what', 'how', 'when', 'who', 'where', 'why', 'can', 'you', 
                      'about', 'with', 'this', 'that', 'tell', 'me', 'please', 'would', 'could', 'should'];
    
    const normalizedText = query.toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .replace(/\s{2,}/g, ' ');
    
    const tokens = normalizedText.split(' ')
      .filter(word => word.length > 2 && !stopWords.includes(word));
    
    const ngrams: string[] = [];
    for (let i = 0; i < tokens.length - 1; i++) {
      ngrams.push(`${tokens[i]} ${tokens[i+1]}`);
      if (i < tokens.length - 2) {
        ngrams.push(`${tokens[i]} ${tokens[i+1]} ${tokens[i+2]}`);
      }
    }
    
    return [...tokens, ...ngrams];
  };
  
  const isImageRelatedQuery = (query: string): boolean => {
    const imageKeywords = [
      'image', 'picture', 'photo', 'screenshot', 'scan', 'visual', 'chart', 
      'graph', 'diagram', 'visualization', 'صورة', 'رسم', 'تخطيط', 'بياني', 'مرئي'
    ];
    
    const lowerQuery = query.toLowerCase();
    return imageKeywords.some(keyword => lowerQuery.includes(keyword));
  };
  
  const identifyQuestionType = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    const howToPatterns = ['how to', 'how do i', 'how can i', 'steps to', 'guide for', 'instructions'];
    const whatIsPatterns = ['what is', 'what are', 'define', 'meaning of', 'tell me about', 'explain'];
    const comparisonPatterns = ['difference between', 'compare', 'versus', 'vs', 'or', 'better than'];
    const locationPatterns = ['where is', 'where can i find', 'location of', 'how to find'];
    const timePatterns = ['when is', 'when will', 'what time', 'how long', 'duration', 'schedule'];
    
    if (howToPatterns.some(pattern => lowerQuery.includes(pattern))) {
      return 'how-to';
    } else if (whatIsPatterns.some(pattern => lowerQuery.includes(pattern))) {
      return 'what-is';
    } else if (comparisonPatterns.some(pattern => lowerQuery.includes(pattern))) {
      return 'comparison';
    } else if (locationPatterns.some(pattern => lowerQuery.includes(pattern))) {
      return 'location';
    } else if (timePatterns.some(pattern => lowerQuery.includes(pattern))) {
      return 'time';
    }
    
    return 'general';
  };
  
  const calculateRelevance = (queryTerms: string[], topic: any, hasImage: boolean = false, questionType: string = 'general'): number => {
    if (!topic || !topic.content) return 0;
    
    const content = topic.content.toLowerCase();
    const keywords = topic.keywords || [];
    
    let score = 0;
    let keywordMatches = 0;
    let exactMatches = 0;
    
    if (hasImage && topic.id && topic.id.includes('images')) {
      score += 5;
    }
    
    if (questionType === 'how-to' && topic.id && (topic.id.includes('guide') || topic.id.includes('tutorial'))) {
      score += 3;
    }
    
    if (questionType === 'what-is' && topic.id && (topic.id.includes('definition') || topic.id.includes('overview'))) {
      score += 3;
    }
    
    if (topic.id && topic.id.includes('website')) {
      score += 2;
    }
    
    queryTerms.forEach(term => {
      if (content.includes(term)) {
        score += 1;
        
        const regex = new RegExp('\\b' + term + '\\b', 'i');
        if (regex.test(content)) {
          score += 0.5;
          exactMatches++;
        }
      }
      
      if (keywords.some((keyword: string) => keyword.includes(term) || term.includes(keyword))) {
        score += 2;
        keywordMatches++;
      }
      
      if (topic.title && topic.title.toLowerCase().includes(term)) {
        score += 3;
      }
    });
    
    if (exactMatches > 1) score += exactMatches * 0.5;
    if (keywordMatches > 1) score += keywordMatches;
    
    return score;
  };
  
  const getAllTopics = (kb: any) => {
    const topics: any[] = [];
    
    const extractTopics = (obj: any, parentKey = '') => {
      if (!obj) return;
      
      Object.entries(obj).forEach(([key, value]: [string, any]) => {
        if (value && typeof value === 'object') {
          if (value.content) {
            topics.push({
              id: parentKey ? `${parentKey}.${key}` : key,
              ...value
            });
          } else {
            extractTopics(value, parentKey ? `${parentKey}.${key}` : key);
          }
        }
      });
    };
    
    extractTopics(kb);
    return topics;
  };
  
  const formatResponse = (content: string, questionType: string): string => {
    if (!content) return content;
    
    switch (questionType) {
      case 'how-to':
        if (!content.includes('1.') && !content.includes('Step 1')) {
          const steps = content.split('. ').filter(Boolean);
          if (steps.length > 2) {
            return steps.map((step, index) => `${index + 1}. ${step}`).join('\n');
          }
        }
        break;
        
      case 'comparison':
        if (!content.includes('vs.') && !content.includes('versus')) {
          const parts = content.split('. ').filter(Boolean);
          if (parts.length > 1) {
            return parts.map(part => `• ${part}`).join('\n\n');
          }
        }
        break;
    }
    
    return content;
  };
  
  const getCombinedAnswer = (matchedTopics: any[], query: string, isArabic: boolean, hasImage: boolean = false) => {
    if (matchedTopics.length === 0) {
      return isArabic 
        ? 'عذراً، لم أتمكن من العثور على معلومات حول استفسارك. هل يمكنك إعادة صياغة سؤالك بطريقة مختلفة؟'
        : "I don't have specific information about that topic yet. Could you please rephrase your question or ask about another aspect of our website or services?";
    }

    const questionType = identifyQuestionType(query);

    if (hasImage) {
      const imageTopics = matchedTopics.filter(topic => topic.id && topic.id.includes('images'));
      
      if (imageTopics.length > 0) {
        return formatResponse(imageTopics[0].content, questionType);
      }
      
      return isArabic
        ? 'أرى أنك أرسلت صورة. يمكنني مساعدتك في تحليل المشاعر من المراجعات في هذه الصورة أو تفسير البيانات المرئية المتعلقة بتحليل المشاعر. ما الذي تحتاج إلى معرفته تحديداً حول هذه الصورة؟'
        : "I see you've shared an image. I can help analyze the sentiment in reviews shown in this image or interpret visual data related to sentiment analysis. What would you like to know about this image?";
    }

    const greetings = ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
    const generalQuestions = ['who are you', 'what can you do', 'help me'];
    
    if (greetings.some(g => query.toLowerCase().includes(g))) {
      return isArabic
        ? 'مرحباً! أنا المساعد الافتراضي لموقع تحليل المشاعر. كيف يمكنني مساعدتك اليوم؟'
        : "Hello! I'm the virtual assistant for our sentiment analysis website. How can I help you today? You can ask me about our features, services, or how to navigate the website.";
    }
    
    if (generalQuestions.some(q => query.toLowerCase().includes(q))) {
      return isArabic
        ? 'أنا المساعد الافتراضي ا��مصمم لمساعدتك في استخدام موقعنا والإجابة على أسئلتك حول خدماتنا لتحليل المشاعر. يمكنني مساعدتك في فهم ميزات المنتج، وشرح تقنياتنا، وتقديم معلومات حول خطط التسعير، وتوجيهك خلال الموقع.'
        : "I'm a virtual assistant designed to help you use our website and answer your questions about our sentiment analysis services. I can help you understand product features, explain our technologies, provide information about pricing plans, and guide you through the website.";
    }

    if (matchedTopics.length === 1 && matchedTopics[0].score > 5) {
      return formatResponse(matchedTopics[0].content, questionType);
    }
    
    const lowerQuery = query.toLowerCase();
    
    const comparisonTerms = ['versus', 'vs', 'compared to', 'difference between', 'better than'];
    const isComparison = comparisonTerms.some(term => lowerQuery.includes(term));
    
    if (isComparison && matchedTopics.length >= 2) {
      const [topic1, topic2] = matchedTopics;
      const comparisonResponse = isArabic
        ? `عند مقارنة ${topic1.title} و${topic2.title}: \n\n- ${topic1.title}: ${topic1.content}\n\n- ${topic2.title}: ${topic2.content}`
        : `When comparing ${topic1.title} and ${topic2.title}: \n\n- ${topic1.title}: ${topic1.content}\n\n- ${topic2.title}: ${topic2.content}`;
        
      return formatResponse(comparisonResponse, 'comparison');
    }
    
    if (matchedTopics.length > 1) {
      const topMatches = matchedTopics.slice(0, 2); 
      
      if (isArabic) {
        return formatResponse(`${topMatches[0].content}\n\nبالإضافة إلى ذلك: ${topMatches[1].content}`, questionType);
      } else {
        return formatResponse(`${topMatches[0].content}\n\nAdditionally: ${topMatches[1].content}`, questionType);
      }
    }
    
    return formatResponse(matchedTopics[0].content, questionType);
  };

  const getAnswer = async (question: string, hasFile: boolean = false): Promise<string> => {
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const knowledgeBase = createKnowledgeBase(isArabic);
      const lowerQuestion = question.toLowerCase();

      const greetings = ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
      if (greetings.some(g => lowerQuestion.includes(g)) && !hasFile) {
        return knowledgeBase.general.welcome.content;
      }
      
      const isImageQuery = hasFile || isImageRelatedQuery(question);
      
      const queryTerms = processQuery(question);
      
      const questionType = identifyQuestionType(question);
      
      const allTopics = getAllTopics(knowledgeBase);
      
      const scoredTopics = allTopics.map(topic => ({
        ...topic,
        score: calculateRelevance(queryTerms, topic, isImageQuery, questionType)
      }));
      
      scoredTopics.sort((a, b) => b.score - a.score);
      
      const relevantTopics = scoredTopics.filter(topic => topic.score > 0);
      
      const response = getCombinedAnswer(relevantTopics, question, isArabic, isImageQuery);
      
      if (!response || response.length < 50) {
        return isArabic 
          ? 'لم أستطع العثور على إجابة محددة لسؤالك. هل يمكنك تقديم المزيد من التفاصيل أو طرح سؤالك بطريقة أخرى؟ أنا هنا للمساعدة في الإجابة على أسئلتك حول خدماتنا وميزاتنا ومحتوى موقعنا.'
          : "I couldn't find a specific answer to your question. Could you provide more details or ask your question in a different way? I'm here to help with questions about our services, features, and website content.";
      }
      
      return response;
    } catch (error) {
      console.error('Error processing question:', error);
      
      toast({
        title: "Error",
        description: "Failed to process your question",
        variant: "destructive"
      });
      
      return isArabic 
        ? 'عذرا، حدث خطأ أثناء معالجة سؤالك. يرجى المحاولة مرة أخرى.'
        : "Sorry, I encountered an error while processing your question. Please try again, or you can contact our support team if the problem persists.";
    } finally {
      setIsProcessing(false);
    }
  };
  
  return { getAnswer, isProcessing };
};
