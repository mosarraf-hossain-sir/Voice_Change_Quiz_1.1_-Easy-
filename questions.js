/* =====================================================
   questions.js  —  শুধু এই ফাইলটাই নতুন কুইজে বদলাবে
   (ডিজাইন ও লজিক script.js / style.css / index.html-এ, ওগুলো বদলাতে হবে না)
   answer: সঠিক অপশনের নম্বর (প্রথমটি = 0, দ্বিতীয়টি = 1, ...)
   explanation: উত্তর ভুল বা না দিলে এই ব্যাখ্যা দেখাবে (কেন সঠিক উত্তরটি হলো)
   ===================================================== */
const QUIZ = {
  id: 'voice-change-quiz-01',   // প্রতিটি নতুন Quiz-এ আলাদা ID দিতে হবে
  no: '01',
  title: 'Voice Change Quiz-1',
  topic: 'Voice Change',
  level: 'Easy',
  minutes: 15
};

const questions = [
  {
    "question": "He writes a letter. বাক্যটির Passive Voice কোনটি?",
    "options": [
      "A letter is written by him.",
      "A letter was written by him."
    ],
    "answer": 0,
    "explanation": "Present Indefinite Tense-এর Passive গঠন: Object + is/am/are + Past Participle + by + Subject। writes বর্তমান কালের ক্রিয়া, তাই Passive-এ is written হয়। was written অতীত কালের গঠন।"
  },
  {
    "question": "The work was done by Rahim. বাক্যটির Active Voice কোনটি?",
    "options": [
      "Rahim does the work.",
      "Rahim did the work."
    ],
    "answer": 1,
    "explanation": "was done হলো Past Indefinite-এর Passive। Active করলে Subject + Past ক্রিয়া বসে, তাই did the work হবে। does বর্তমান কালের ক্রিয়া।"
  },
  {
    "question": "নিচের কোনটি Active Voice?",
    "options": [
      "She sings a song.",
      "A song is sung by her."
    ],
    "answer": 0,
    "explanation": "Active Voice-এ Subject নিজে কাজটি করে। She sings a song বাক্যে She-ই গান গাইছে, তাই এটি Active। A song is sung by her-এ কাজের ফল (song) Subject হয়েছে, তাই সেটি Passive।"
  },
  {
    "question": "The book is read by Karim. বাক্যটির Active Voice কোনটি?",
    "options": [
      "Karim reads the book.",
      "Karim read the book."
    ],
    "answer": 0,
    "explanation": "is read হলো Present Indefinite-এর Passive। Active করলে বর্তমান কালের ক্রিয়া বসে, তাই Karim reads the book। read এখানে অতীত কালের রূপ হয়ে যেত।"
  },
  {
    "question": "They play football. বাক্যটির Passive Voice কোনটি?",
    "options": [
      "Football is played by them.",
      "Football was played by them."
    ],
    "answer": 0,
    "explanation": "play বর্তমান কালের ক্রিয়া, তাই Passive-এ is/am/are + V3 বসে: Football is played by them। was played অতীত কালের গঠন।"
  },
  {
    "question": "নিচের কোনটি Passive Voice?",
    "options": [
      "He helps the poor.",
      "The poor are helped by him."
    ],
    "answer": 1,
    "explanation": "Passive Voice-এ Object-কে Subject করা হয় এবং by দিয়ে কর্তা বসে। The poor are helped by him-এ তাই হয়েছে। He helps the poor হলো Active।"
  },
  {
    "question": "Mother cooked rice. বাক্যটির Passive Voice কোনটি?",
    "options": [
      "Rice is cooked by mother.",
      "Rice was cooked by mother."
    ],
    "answer": 1,
    "explanation": "cooked হলো Past Indefinite, তাই Passive-এ was/were + V3 বসে: Rice was cooked by mother। is cooked বর্তমান কালের গঠন।"
  },
  {
    "question": "The letter was written by him. বাক্যটির Active Voice কোনটি?",
    "options": [
      "He writes the letter.",
      "He wrote the letter."
    ],
    "answer": 1,
    "explanation": "was written হলো Past Indefinite-এর Passive। Active করলে Past ক্রিয়া বসে: He wrote the letter। writes বর্তমান কালের ক্রিয়া।"
  },
  {
    "question": "নিচের কোনটি Active Voice?",
    "options": [
      "The door was opened by him.",
      "He opened the door."
    ],
    "answer": 1,
    "explanation": "Active Voice-এ Subject নিজে কাজ করে। He opened the door-এ He-ই দরজা খুলেছে, তাই Active। The door was opened by him-এ দরজা Subject হয়েছে, তাই সেটি Passive।"
  },
  {
    "question": "She is making a cake. বাক্যটির Passive Voice কোনটি?",
    "options": [
      "A cake is being made by her.",
      "A cake was being made by her."
    ],
    "answer": 0,
    "explanation": "is making হলো Present Continuous। এর Passive গঠন: is/am/are + being + V3, তাই A cake is being made by her। was being Past Continuous-এর গঠন।"
  },
  {
    "question": "We should obey our teachers. বাক্যটির Passive Voice কোনটি?",
    "options": [
      "Our teachers should be obeyed by us.",
      "Our teachers are obeyed by us."
    ],
    "answer": 0,
    "explanation": "should একটি Modal Verb। Modal-এর Passive গঠন: Object + modal + be + V3 + by + Subject, তাই Our teachers should be obeyed by us। are obeyed লিখলে should-এর অর্থ হারিয়ে যায়।"
  },
  {
    "question": "নিচের কোনটি Passive Voice?",
    "options": [
      "They built a house.",
      "A house was built by them."
    ],
    "answer": 1,
    "explanation": "Passive Voice-এ কাজ Subject-এর উপর ঘটে। A house was built by them-এ house-এর উপর কাজ হয়েছে, তাই Passive। They built a house হলো Active।"
  },
  {
    "question": "He will buy a pen. বাক্যটির Passive Voice কোনটি?",
    "options": [
      "A pen will be bought by him.",
      "A pen is bought by him."
    ],
    "answer": 0,
    "explanation": "will buy হলো Future Indefinite। এর Passive গঠন: will be + V3, তাই A pen will be bought by him। is bought বর্তমান কালের গঠন।"
  },
  {
    "question": "The room is cleaned by Rina. বাক্যটির Active Voice কোনটি?",
    "options": [
      "Rina cleans the room.",
      "Rina cleaned the room."
    ],
    "answer": 0,
    "explanation": "is cleaned হলো Present Indefinite-এর Passive। Active করলে বর্তমান কালের ক্রিয়া বসে: Rina cleans the room। cleaned অতীত কালের রূপ।"
  },
  {
    "question": "নিচের কোনটি Active Voice?",
    "options": [
      "The match was won by us.",
      "We won the match."
    ],
    "answer": 1,
    "explanation": "Active Voice-এ Subject নিজে কাজ করে। We won the match-এ We-ই ম্যাচ জিতেছে, তাই Active। The match was won by us হলো Passive।"
  },
  {
    "question": "The police caught the thief. বাক্যটির Passive Voice কোনটি?",
    "options": [
      "The thief is caught by the police.",
      "The thief was caught by the police."
    ],
    "answer": 1,
    "explanation": "caught হলো Past Indefinite, তাই Passive-এ was/were + V3 বসে: The thief was caught by the police। is caught বর্তমান কালের গঠন।"
  },
  {
    "question": "English is spoken by many people. বাক্যটির Active Voice কোনটি?",
    "options": [
      "Many people speak English.",
      "Many people spoke English."
    ],
    "answer": 0,
    "explanation": "is spoken হলো Present Indefinite-এর Passive। Active করলে বর্তমান কালের ক্রিয়া বসে। many people বহুবচন, তাই speak (s ছাড়া) হবে। spoke অতীত কাল।"
  },
  {
    "question": "নিচের কোনটি Passive Voice?",
    "options": [
      "He teaches English.",
      "English is taught by him."
    ],
    "answer": 1,
    "explanation": "Passive Voice-এ Object-কে Subject করা হয়। English is taught by him-এ English Subject, কর্তা by him-এর পরে। He teaches English হলো Active।"
  },
  {
    "question": "They are watching TV. বাক্যটির Passive Voice কোনটি?",
    "options": [
      "TV is being watched by them.",
      "TV was watched by them."
    ],
    "answer": 0,
    "explanation": "are watching হলো Present Continuous। এর Passive গঠন: is/am/are + being + V3, তাই TV is being watched by them। was watched Past Indefinite-এর গঠন।"
  },
  {
    "question": "The work has been completed by him. বাক্যটির Active Voice কোনটি?",
    "options": [
      "He has completed the work.",
      "He completed the work."
    ],
    "answer": 0,
    "explanation": "has been completed হলো Present Perfect-এর Passive। Active করলে has/have + V3 বসে: He has completed the work। completed (has ছাড়া) Past Indefinite হয়ে যায়।"
  },
  {
    "question": "নিচের কোনটি Active Voice?",
    "options": [
      "The window was broken by the boy.",
      "The boy broke the window."
    ],
    "answer": 1,
    "explanation": "Active Voice-এ Subject নিজে কাজ করে। The boy broke the window-এ boy-ই জানালা ভেঙেছে, তাই Active। The window was broken by the boy হলো Passive।"
  },
  {
    "question": "He can solve the problem. বাক্যটির Passive Voice কোনটি?",
    "options": [
      "The problem can be solved by him.",
      "The problem could be solved by him."
    ],
    "answer": 0,
    "explanation": "can একটি Modal Verb। Modal-এর Passive গঠন: Object + modal + be + V3, তাই The problem can be solved by him। could হলো can-এর অতীত রূপ, তাই কাল বদলে যায়।"
  },
  {
    "question": "The national anthem is sung by us. বাক্যটির Active Voice কোনটি?",
    "options": [
      "We sing the national anthem.",
      "We sang the national anthem."
    ],
    "answer": 0,
    "explanation": "is sung হলো Present Indefinite-এর Passive। Active করলে বর্তমান কালের ক্রিয়া বসে: We sing the national anthem। sang অতীত কালের রূপ।"
  },
  {
    "question": "নিচের কোনটি Passive Voice?",
    "options": [
      "She wrote a poem.",
      "A poem was written by her."
    ],
    "answer": 1,
    "explanation": "Passive Voice-এ কাজ Subject-এর উপর ঘটে। A poem was written by her-এ poem-এর উপর কাজ হয়েছে, তাই Passive। She wrote a poem হলো Active।"
  },
  {
    "question": "The teacher praised the student. বাক্যটির Passive Voice কোনটি?",
    "options": [
      "The student is praised by the teacher.",
      "The student was praised by the teacher."
    ],
    "answer": 1,
    "explanation": "praised হলো Past Indefinite, তাই Passive-এ was/were + V3 বসে: The student was praised by the teacher। is praised বর্তমান কালের গঠন।"
  },
  {
    "question": "A letter is being written by Mina. বাক্যটির Active Voice কোনটি?",
    "options": [
      "Mina is writing a letter.",
      "Mina was writing a letter."
    ],
    "answer": 0,
    "explanation": "is being written হলো Present Continuous-এর Passive। Active করলে is/am/are + V-ing বসে: Mina is writing a letter। was writing Past Continuous।"
  },
  {
    "question": "নিচের কোনটি Active Voice?",
    "options": [
      "The food is being prepared by mother.",
      "Mother is preparing the food."
    ],
    "answer": 1,
    "explanation": "Active Voice-এ Subject নিজে কাজ করে। Mother is preparing the food-এ Mother-ই রান্না করছে, তাই Active। The food is being prepared by mother হলো Passive।"
  },
  {
    "question": "The song was sung by the girl. বাক্যটির Active Voice কোনটি?",
    "options": [
      "The girl sings the song.",
      "The girl sang the song."
    ],
    "answer": 1,
    "explanation": "was sung হলো Past Indefinite-এর Passive। Active করলে Past ক্রিয়া বসে: The girl sang the song। sings বর্তমান কালের ক্রিয়া।"
  },
  {
    "question": "He has finished the work. বাক্যটির Passive Voice কোনটি?",
    "options": [
      "The work has been finished by him.",
      "The work had been finished by him."
    ],
    "answer": 0,
    "explanation": "has finished হলো Present Perfect। এর Passive গঠন: has/have + been + V3, তাই The work has been finished by him। had been Past Perfect-এর গঠন।"
  },
  {
    "question": "নিচের কোনটি Passive Voice?",
    "options": [
      "Rahim will open the door.",
      "The door will be opened by Rahim."
    ],
    "answer": 1,
    "explanation": "will open হলো Future Indefinite। এর Passive গঠন: will be + V3, তাই The door will be opened by Rahim। Rahim will open the door হলো Active।"
  }
];
