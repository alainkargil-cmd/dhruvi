export interface PhotoConfig {
  id: string;
  url: string;
  caption: string;
  aspectRatio?: number;
  rotation?: number;
}

export interface GiftConfig {
  id: string;
  title: string;
  subtitle: string;
  boxColor: string;
  ribbonColor: string;
  glowColor: string;
}

export interface BirthdayConfig {
  recipientName: string;
  tagline: string;
  invitation: {
    greeting: string;
    body: string;
    buttonText: string;
  };
  chapters: {
    childhood: {
      id: string;
      title: string;
      subtitle: string;
      theme: string;
      caption: string;
      photo: PhotoConfig;
    };
    solo: {
      id: string;
      title: string;
      subtitle: string;
      theme: string;
      quote: string;
      photos: PhotoConfig[];
    };
    friendship: {
      id: string;
      title: string;
      subtitle: string;
      theme: string;
      messages: string[];
      photos: PhotoConfig[];
    };
    future: {
      id: string;
      title: string;
      subtitle: string;
      theme: string;
      message: string;
      closing: string;
    };
  };
  gifts: {
    laughter: {
      id: string;
      title: string;
      subtitle: string;
      boxColor: string;
      ribbonColor: string;
      warningText: string;
      buttonText: string;
      videoUrl: string;
      videos?: {
        url: string;
        title?: string;
        caption?: string;
      }[];
      afterText: string;
    };
    memories: {
      id: string;
      title: string;
      subtitle: string;
      boxColor: string;
      ribbonColor: string;
      message: string;
    };
    wishes: {
      id: string;
      title: string;
      subtitle: string;
      boxColor: string;
      ribbonColor: string;
      items: string[];
    };
    mystery: {
      id: string;
      title: string;
      subtitle: string;
      boxColor: string;
      ribbonColor: string;
      message: string;
      closingHint: string;
      photo: PhotoConfig;
    };
  };
  celebration: {
    makeAWishText: string;
    blowButtonText: string;
    cakeCutText: string;
    serveSliceText: string;
    headline: string;
    subtitle: string;
    secondaryText: string;
    fireworksReplayText: string;
    nameInStars: string;
  };
  finalLetter: {
    salutation: string;
    paragraphs: string[];
    closing: string;
    signOff: string;
    returnButtonText: string;
    replayCelebrationText: string;
  };
  assets: {
    photosDir: string;
    videosDir: string;
    audioDir: string;
  };
}

export const birthdayConfig: BirthdayConfig = {
  recipientName: "Dhruvi",
  tagline: "Every life is a story. Some people make the pages more beautiful.",
  
  invitation: {
    greeting: "Dear Dhruvi,",
    body: "Some stories deserve a special place.\n\nTonight, I have saved one just for you.",
    buttonText: "ENTER THE LIBRARY",
  },

  chapters: {
    childhood: {
      id: "little-beginning",
      title: "THE LITTLE BEGINNING",
      subtitle: "Where every beautiful story begins.",
      theme: "Childhood",
      caption: "A spark of curiosity and wonder, right from the very start.",
      photo: {
        id: "childhood",
        url: "./assets/photos/childhood.jpg",
        caption: "Where every beautiful story begins — little memories of simpler times.",
      },
    },

    solo: {
      id: "becoming-dhruvi",
      title: "BECOMING DHRUVI",
      subtitle: "A story of growing into yourself.",
      theme: "Growth & Grace",
      quote: "Every chapter brings a new version of you.",
      photos: [
        {
          id: "solo-01",
          url: "./assets/photos/solo-01.jpg",
          caption: "Elegance in every quiet smile.",
        },
        {
          id: "solo-02",
          url: "./assets/photos/solo-02.jpg",
          caption: "Chasing dreams with grace and calm resolve.",
        },
        {
          id: "solo-03",
          url: "./assets/photos/solo-03.jpg",
          caption: "A bright soul who makes every room warmer.",
        },
      ],
    },

    friendship: {
      id: "our-little-chaos",
      title: "OUR LITTLE CHAOS",
      subtitle: "Some chapters are better when shared.",
      theme: "Friendship & Laughter",
      messages: [
        "Somehow, normal conversations were never our speciality.",
        "Too many memories, too little storage.",
        "Officially one of my favourite chapters.",
        "Thanks for being part of all the chaos.",
      ],
      photos: [
        {
          id: "friends-01",
          url: "./assets/photos/friends-01.jpg",
          caption: "Hanging by a thread of pure laughter.",
          rotation: -4,
        },
        {
          id: "friends-02",
          url: "./assets/photos/friends-02.jpg",
          caption: "Pressed into the pages of our favourite scrapbook.",
          rotation: 3,
        },
      ],
    },

    future: {
      id: "the-next-chapter",
      title: "THE NEXT CHAPTER",
      subtitle: "The best pages haven't been written yet.",
      theme: "The Future",
      message:
        "Your story is still unfolding.\n\nThere are so many places to see, dreams to chase, people to meet, and beautiful memories still waiting for you.\n\nMay the chapters ahead be filled with happiness, courage, laughter, and everything your heart wishes for.",
      closing: "And this is only the beginning.",
    },
  },

  gifts: {
    laughter: {
      id: "gift-laughter",
      title: "THE GIFT OF LAUGHTER",
      subtitle: "A highly classified funny memory.",
      boxColor: "#E8B4B8", // Pastel Pink
      ribbonColor: "#F5D77F", // Champagne Gold
      warningText: "WARNING: A highly classified funny memory has been discovered!",
      buttonText: "REVEAL THE EVIDENCE",
      videoUrl: "./assets/videos/funny-filter-video.mp4",
      videos: [
        {
          url: "./assets/videos/funny-filter-video.mp4",
          title: "Act I: The Incriminating Evidence",
          caption: "Some people are naturally funny..."
        },
        {
          url: "./assets/videos/funny-filter-video-2.mp4",
          title: "Act II: The Chaos Continues",
          caption: "...others just need the right filter!"
        }
      ],
      afterText: "Some people are naturally funny. Others just need the right filter.",
    },

    memories: {
      id: "gift-memories",
      title: "THE GIFT OF MEMORIES",
      subtitle: "Little moments become the memories we keep.",
      boxColor: "#9B8EA9", // Muted Lavender
      ribbonColor: "#EFE6DC", // Warm Ivory
      message: "Little moments, familiar faces, and memories worth keeping.",
    },

    wishes: {
      id: "gift-wishes",
      title: "THE GIFT OF A THOUSAND WISHES",
      subtitle: "Every star carries a little wish for you.",
      boxColor: "#3B2219", // Dark Walnut with Gold
      ribbonColor: "#E5C158", // Gold
      items: [
        "May your dreams find their way to you.",
        "May you always have reasons to smile.",
        "May life surprise you beautifully.",
        "May your next chapter be your favourite.",
        "May you never run out of reasons to believe in yourself.",
        "May every sunrise bring you quiet strength and pure joy.",
        "May laughter always be within easy reach.",
      ],
    },

    mystery: {
      id: "gift-mystery",
      title: "THE MYSTERY GIFT",
      subtitle: "A Memory We All Share.",
      boxColor: "#58111A", // Deep Burgundy
      ribbonColor: "#E5C158", // Gold Ribbon with Wax Seal
      message: "Some moments become special because of the people we share them with.",
      closingHint: "One final surprise is waiting...",
      photo: {
        id: "group-surprise",
        url: "./assets/photos/group-surprise.jpg",
        caption: "A timeless memory kept safe in the heart of the library.",
      },
    },
  },

  celebration: {
    makeAWishText: "Make a wish, Dhruvi!",
    blowButtonText: "BLOW OUT THE CANDLES",
    cakeCutText: "A little sweetness for your next chapter!",
    serveSliceText: "SERVE THE FIRST SLICE",
    headline: "HAPPY BIRTHDAY, DHRUVI!",
    subtitle: "May your life always be as beautiful as the stories you create.",
    secondaryText: "Here's to more laughter, unexpected adventures, beautiful memories, and countless wonderful chapters ahead.",
    fireworksReplayText: "WATCH THE FIREWORKS AGAIN",
    nameInStars: "DHRUVI",
  },

  finalLetter: {
    salutation: "Dear Dhruvi,",
    paragraphs: [
      "Some people become a part of our stories without even realising how many pages they make better.",
      "Through all the random conversations, laughter, teasing, and little moments, you've become someone whose presence makes life a little more interesting.",
      "I hope this new chapter brings you countless reasons to smile, opportunities to grow, dreams that come true, and memories you'll treasure forever.",
      "Never stop being the person you are.",
      "Keep growing, keep dreaming, and keep making your own beautiful story."
    ],
    closing: "Happy Birthday, Dhruvi!",
    signOff: "— From your friend",
    returnButtonText: "RETURN TO THE LIBRARY",
    replayCelebrationText: "EXPERIENCE THE CELEBRATION AGAIN",
  },

  assets: {
    photosDir: "./assets/photos/",
    videosDir: "./assets/videos/",
    audioDir: "./assets/audio/",
  },
};
