// create a dialog tree

type DialogKey = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13';

type DialogOption = { text: string; next: DialogKey };

type Dialog = { text: string; options: DialogOption[] };

type DialogTree = { [key in DialogKey]: Dialog };

export const dialogTree: DialogTree = {
  '1': {
    text: 'Oh hey there! I\'m Whiskers, Tom\'s coding buddy! *squeaks excitedly* Want to know a secret about this website?',
    options: [
      {
        text: 'Tell me the secret! 🤫',
        next: '2',
      },
      {
        text: 'What\'s your favorite snack?',
        next: '3',
      },
      {
        text: 'Can you teach me to code?',
        next: '4',
      },
      {
        text: 'Do a backflip!',
        next: '5',
      },
    ],
  },
  '2': {
    text: 'Psst... Tom coded this entire site while I ran on my wheel for motivation! The faster I ran, the faster he typed! *spins wheel proudly*',
    options: [
      {
        text: 'That\'s amazing! What else?',
        next: '6',
      },
      {
        text: 'Can I see your wheel?',
        next: '7',
      },
      {
        text: 'Tell me about Tom',
        next: '8',
      },
    ],
  },
  '3': {
    text: 'OH BOY OH BOY! Sunflower seeds! And tiny bits of cheese! And sometimes Tom shares his coffee beans... *bounces excitedly* Don\'t tell him I know where he keeps the good snacks!',
    options: [
      {
        text: 'Your secret is safe! 🤐',
        next: '9',
      },
      {
        text: 'Coffee beans? Really?',
        next: '10',
      },
      {
        text: 'Want to explore more?',
        next: '1',
      },
    ],
  },
  '4': {
    text: 'Of course! Step 1: Grow tiny paws for better keyboard access. Step 2: Stock up on caffeine. Step 3: Debug by running in circles until it makes sense! *demonstrates by spinning*',
    options: [
      {
        text: 'That\'s... actually good advice?',
        next: '11',
      },
      {
        text: 'What languages do you know?',
        next: '12',
      },
      {
        text: 'Can you debug my life?',
        next: '13',
      },
    ],
  },
  '5': {
    text: '*attempts backflip, lands in food bowl* NAILED IT! Well... sort of. Tom says I\'m better at front-end flips than backend flips. Get it? *winks with tiny hamster eye*',
    options: [
      {
        text: '10/10 landing! 🎪',
        next: '9',
      },
      {
        text: 'Try a frontend demo!',
        next: '6',
      },
      {
        text: 'Tell me more jokes!',
        next: '11',
      },
    ],
  },
  '6': {
    text: 'Did you know this site is built with Astro? It\'s almost as fast as me running to my food bowl! *zooms around cage* Want to see Tom\'s other projects?',
    options: [
      {
        text: 'Show me everything!',
        next: '8',
      },
      {
        text: 'Why Astro?',
        next: '12',
      },
      {
        text: 'Race you to the projects!',
        next: '7',
      },
    ],
  },
  '7': {
    text: '*SQUEAK SQUEAK SQUEAK* Look at me go! This wheel powers the entire website! Just kidding... or am I? *mysterious hamster stare* The real power comes from Tom\'s determination and lots of Stack Overflow!',
    options: [
      {
        text: 'Stack Overflow saves us all!',
        next: '11',
      },
      {
        text: 'You\'re hilarious! 😂',
        next: '9',
      },
      {
        text: 'Tell me about the tech stack',
        next: '6',
      },
    ],
  },
  '8': {
    text: 'Tom is awesome! He built this site to showcase his work and share his thoughts. Plus he gives me the BEST treats! He\'s really good with React, TypeScript, and making me feel important. *puffs out chest proudly*',
    options: [
      {
        text: 'He sounds great!',
        next: '9',
      },
      {
        text: 'What\'s his favorite project?',
        next: '12',
      },
      {
        text: 'Do you help with code reviews?',
        next: '13',
      },
    ],
  },
  '9': {
    text: '*happy hamster dance* You\'re the best! Want to explore more of the site? There\'s a blog with cool posts, or you can learn about Tom\'s experience! I helped with the user testing! *tiny salute*',
    options: [
      {
        text: 'Let\'s start over! 🔄',
        next: '1',
      },
      {
        text: 'One more fun fact!',
        next: '10',
      },
    ],
  },
  '10': {
    text: '*whispers conspiratorially* Between you and me, sometimes I reorganize Tom\'s code while he sleeps. I move semicolons around for better feng shui! Shh! *puts tiny paw to lips*',
    options: [
      {
        text: 'Your secret\'s safe! 🤫',
        next: '9',
      },
      {
        text: 'That explains the bugs! 😄',
        next: '11',
      },
      {
        text: 'Chat more!',
        next: '1',
      },
    ],
  },
  '11': {
    text: 'Here\'s a developer joke: Why do programmers prefer dark mode? Because light attracts bugs! *slaps knee with tiny paw* I came up with that one myself! Well... Tom might have helped...',
    options: [
      {
        text: 'That\'s actually good! 😂',
        next: '9',
      },
      {
        text: 'Tell another!',
        next: '13',
      },
      {
        text: 'Let\'s talk about something else',
        next: '1',
      },
    ],
  },
  '12': {
    text: 'I speak fluent JavaScript, conversational TypeScript, and I\'m learning React! My specialty is CSS - I\'m great at making things spin! *demonstrates by doing a little spin* Want to see the site\'s components in action?',
    options: [
      {
        text: 'Show me your CSS skills!',
        next: '7',
      },
      {
        text: 'What about backend?',
        next: '10',
      },
      {
        text: 'Let\'s explore more!',
        next: '1',
      },
    ],
  },
  '13': {
    text: 'Life debugging is my specialty! Step 1: Take breaks (like me in my tube). Step 2: Snack regularly. Step 3: Remember that every bug is just a feature waiting to be discovered! *wise hamster nod* Also, rubber duck debugging works, but hamster debugging is better!',
    options: [
      {
        text: 'Hamster debugging it is! 🐹',
        next: '9',
      },
      {
        text: 'More wisdom please!',
        next: '11',
      },
      {
        text: 'Let\'s start fresh',
        next: '1',
      },
    ],
  },
};
