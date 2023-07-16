let quotes = [
  {
    blockquote: `“Be yourself; everyone else is already taken.”`,
    img: "1.jpg",
    name: `Oscar Wilde`,
  },
  {
    blockquote: `“I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.”`,
    img: "2.jpg",
    name: `Marilyn Monroe`,
  },
  {
    blockquote: `“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.”`,
    img: "3.jpg",
    name: `Albert Einstein`,
  },
  {
    blockquote: `“So many books, so little time.”`,
    img: "4.jpg",
    name: `Frank Zappa`,
  },

  {
    blockquote: `“A room without books is like a body without a soul.”`,
    img: "5.jpg",
    name: ` Marcus Tullius Cicero`,
  },

  {
    blockquote: `“Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.”`,
    img: "6.jpg",
    name: `Bernard M. Baruch`,
  },
  {
    blockquote: `“You've gotta dance like there's nobody watching,
    Love like you'll never be hurt,Sing like there's nobody listening,And live like it's heaven on earth.”`,
    img: "7.jpg",
    name: `William W. Purkey`,
  },
  {
    blockquote: `“You know you're in love when you can't fall asleep because reality is finally better than your dreams.”`,
    img: "8.jpg",
    name: `Dr. Seuss`,
  },
  {
    blockquote: `“You only live once, but if you do it right, once is enough.”`,
    img: "9.jpg",
    name: `Mae West`,
  },
  {
    blockquote: `“Be the change that you wish to see in the world.”`,
    img: "10.jpg",
    name: `Mahatma Gandhi`,
  },
  {
    blockquote: `
    “In three words I can sum up everything I've learned about life: it goes on.”`,
    img: "11.jpg",
    name: `Robert Frost`,
  },
  {
    blockquote: `“If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.”`,
    img: "12.jpg",
    name: `J.K. Rowling`,
  },
  {
    blockquote: `“Don’t walk in front of me… I may not follow Don’t walk behind me… I may not lead Walk beside me… just be my friend”`,
    img: "13.jpg",
    name: `Albert Camus`,
  },
  {
    blockquote: `“So many books, so little time.”`,
    img: "14.jpg",
    name: `Frank Zappa`,
  },
  {
    blockquote: `“If you tell the truth, you don't have to remember anything.”`,
    img: "15.jpg",
    name: `Mark Twain`,
  },
  {
    blockquote: `“Friendship ... is born at the moment when one man says to another "What! You too? I thought that no one but myself . . .”`,
    img: "16.jpg",
    name: `C.S. Lewis`,
  },
  {
    blockquote: `“I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.”`,
    img: "17.jpg",
    name: `Maya Angelou`,
  },
  {
    blockquote: `“A friend is someone who knows all about you and still loves you.”`,
    img: "18.jpg",
    name: `Elbert Hubbard`,
  },
  {
    blockquote: `“Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.”`,
    img: "19.jpg",
    name: `Martin Luther King Jr`,
  },
  {
    blockquote: `“We accept the love we think we deserve.”`,
    img: "20.jpg",
    name: `Stephen Chbosky`,
  },
];
let x = -1;
function createRandomQuote() {
  let y = Math.floor(Math.random() * 20);
  if (x === y) {
    createRandomQuote();
    return 0;
  }
  let quote = ``;
  quote += `
  <div class="bl-qu">
  <blockquote>“${quotes[y].blockquote}”</blockquote>
  </div>
  <img src="img/${quotes[y].img}" class="rounded-circle mb-2" alt="" />
  <h2>${quotes[y].name}</h2>
`;
  document.getElementById("demo").innerHTML = quote;
  x = y;
}
