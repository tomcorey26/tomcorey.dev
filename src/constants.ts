type DialogKey = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13';

type DialogOption = { text: string; next: DialogKey };

type Dialog = { text: string; options: DialogOption[] };

type DialogTree = { [key in DialogKey]: Dialog };

export const dialogTree: DialogTree = {
  '1': {
    text: 'Well well... another smoothskin wandering into my terminal. Name\'s Whiskers. I run security around here. You got questions about this vault dweller Tom, or you just passing through?',
    options: [
      {
        text: 'What is this place?',
        next: '2',
      },
      {
        text: 'Got any supplies? I\'m starving.',
        next: '3',
      },
      {
        text: 'I heard you know some pre-war tech.',
        next: '4',
      },
      {
        text: 'Do something cool.',
        next: '5',
      },
    ],
  },
  '2': {
    text: 'You\'re looking at Vault-Tec\'s finest personal terminal. Tom built this whole operation while I kept the radroaches out of the server room. My wheel powered the backup generator. Don\'t let anyone tell you different.',
    options: [
      {
        text: 'What else runs on hamster power?',
        next: '6',
      },
      {
        text: 'I want to see the wheel.',
        next: '7',
      },
      {
        text: 'Tell me about the vault dweller.',
        next: '8',
      },
    ],
  },
  '3': {
    text: 'Supplies? Smoothskin, I\'ve got a stash of irradiated sunflower seeds, some mystery cheese that\'s been aging since before the bombs dropped, and... Tom\'s emergency coffee rations. Don\'t tell him I found those. That\'s 50 caps worth of intel right there.',
    options: [
      {
        text: 'Your secret\'s safe. What else you trading?',
        next: '9',
      },
      {
        text: 'Irradiated coffee? Sounds dangerous.',
        next: '10',
      },
      {
        text: 'Let\'s talk about something else.',
        next: '1',
      },
    ],
  },
  '4': {
    text: 'Pre-war tech? I was BORN in a Pip-Boy factory. Step 1: Grow tiny paws for maximum keyboard coverage. Step 2: Stockpile Nuka-Cola for all-night coding sessions. Step 3: If the code don\'t compile, run in circles until it makes sense. Works every time.',
    options: [
      {
        text: 'That\'s... actually solid wasteland advice.',
        next: '11',
      },
      {
        text: 'What programming languages survived the war?',
        next: '12',
      },
      {
        text: 'Can you debug my life?',
        next: '13',
      },
    ],
  },
  '5': {
    text: '*attempts tactical roll, lands in food bowl* FLAWLESS EXECUTION. I trained with the best wasteland operators. Tom says I\'m better at front-end rolls than backend rolls. That\'s a technical joke. Laugh or I\'ll charge you 10 caps.',
    options: [
      {
        text: '10/10 landing. Here\'s your caps.',
        next: '9',
      },
      {
        text: 'Show me some real tech.',
        next: '6',
      },
      {
        text: 'Got any more wasteland humor?',
        next: '11',
      },
    ],
  },
  '6': {
    text: 'This terminal runs on Astro. Pre-war framework. Faster than a deathclaw on jet, and almost as fast as me sprinting to my food bowl when I hear the lid pop. Tom\'s got other salvage too, if you\'re interested in his operations.',
    options: [
      {
        text: 'Show me everything in the vault.',
        next: '8',
      },
      {
        text: 'Why Astro? There were other frameworks.',
        next: '12',
      },
      {
        text: 'Race you to the reactor core.',
        next: '7',
      },
    ],
  },
  '7': {
    text: '*SQUEAK SQUEAK SQUEAK* BEHOLD THE WHEEL. This bad boy powered half the eastern seaboard before the bombs. Just kidding... or am I? *mysterious wasteland stare* Real power comes from determination and scavenging Stack Overflow ruins for ancient knowledge.',
    options: [
      {
        text: 'Stack Overflow survived the apocalypse?',
        next: '11',
      },
      {
        text: 'You\'re alright for a mutant hamster.',
        next: '9',
      },
      {
        text: 'Tell me about the tech stack.',
        next: '6',
      },
    ],
  },
  '8': {
    text: 'Tom? Best vault dweller I ever worked with. Built this whole terminal from salvage, gives me prime rations, and never tried to trade me for bottle caps. Specializes in React, TypeScript, all that pre-war tech the Brotherhood hoards. Plus he makes me feel like a valued member of the squad.',
    options: [
      {
        text: 'Sounds like a solid wastelander.',
        next: '9',
      },
      {
        text: 'What\'s his best salvage operation?',
        next: '12',
      },
      {
        text: 'Do you review his code?',
        next: '13',
      },
    ],
  },
  '9': {
    text: '*happy wasteland shuffle* You\'re alright, smoothskin. This vault\'s got more to explore - a data log with some writings, or you can review the dweller\'s field operations. I handled QA myself. *tiny salute*',
    options: [
      {
        text: 'Let\'s start this conversation over.',
        next: '1',
      },
      {
        text: 'One more piece of wasteland intel.',
        next: '10',
      },
    ],
  },
  '10': {
    text: '*leans in close* Between you and me, I reorganize Tom\'s code while he sleeps. Moving semicolons for better feng shui. The Brotherhood of Steel thinks it\'s a security breach. I call it art. This stays between us, yeah?',
    options: [
      {
        text: 'Your secret is safe, wastelander.',
        next: '9',
      },
      {
        text: 'THAT explains the bugs in the terminal.',
        next: '11',
      },
      {
        text: 'Tell me more.',
        next: '1',
      },
    ],
  },
  '11': {
    text: 'Here\'s some wasteland wisdom: Why do vault dwellers use dark mode? Because light attracts radroaches. *slaps knee with tiny irradiated paw* I workshopped that one for three months in my bunker.',
    options: [
      {
        text: 'Worth every cap. Got another?',
        next: '13',
      },
      {
        text: 'Not bad for a rodent.',
        next: '9',
      },
      {
        text: 'Let\'s talk about something else.',
        next: '1',
      },
    ],
  },
  '12': {
    text: 'I speak fluent JavaScript. Conversational TypeScript. Learning React from salvaged Pip-Boy manuals. My real specialty is CSS though - I can make anything spin. *does a tactical spin* The Brotherhood wants my skills but I\'m a free agent.',
    options: [
      {
        text: 'Show me the CSS ops.',
        next: '7',
      },
      {
        text: 'What about backend tech?',
        next: '10',
      },
      {
        text: 'Let\'s explore more of the vault.',
        next: '1',
      },
    ],
  },
  '13': {
    text: 'Life debugging? My specialty. Step 1: Take shelter breaks, like me in my tube. Step 2: Regular ration intake. Step 3: Every bug is just a feature the wasteland hasn\'t appreciated yet. Rubber duck debugging works, but hamster debugging has a 47% higher survival rate. That\'s Vault-Tec certified.',
    options: [
      {
        text: 'Hamster debugging it is.',
        next: '9',
      },
      {
        text: 'More wasteland wisdom.',
        next: '11',
      },
      {
        text: 'Back to the beginning.',
        next: '1',
      },
    ],
  },
};
