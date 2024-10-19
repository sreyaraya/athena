/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        darkpurple: "#2f0f47",
      },
      animation: {
        "fade-in-fast": "fade-in 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
      
        "puff-in-center": "puff-in-center 0.5s cubic-bezier(.44,.12,.11,.86)  both",
        "fade-in-bottom": "fade-in-bottom 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
        "nothing": "nothing 1s linear both",
        "highlight": "highlight 0.5s cubic-bezier(1,.01,.5,1.03) both ",
        "scale-in-left": "scale-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "slide-in-blurred-left": "slide-in-blurred-left 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000)   both",
        mypulse: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;",
        spinSlow: 'spin 3s linear infinite',
        goodPulse: "a 0.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;",
        "first": "text 9s cubic-bezier(0.250, 0.460, 0.450, 0.940)  infinite both",
        "second": "text 9s cubic-bezier(0.250, 0.460, 0.450, 0.940) 3s infinite both",
        "third": "text 9s cubic-bezier(0.250, 0.460, 0.450, 0.940) 6s infinite both",      
        "firsta": "emoji 9s cubic-bezier(0.250, 0.460, 0.450, 0.940)  infinite both",
        "seconda": "emoji 9s cubic-bezier(0.250, 0.460, 0.450, 0.940) 3s infinite both",
        "thirda": "emoji 9s cubic-bezier(0.250, 0.460, 0.450, 0.940) 6s infinite both",
        "heartbeat": "heartbeat 1.5s ease  infinite both",
        "vibrate-1": "vibrate-1 0.4s linear  infinite both",
        "pulsate-fwd": "pulsate-fwd 0.5s ease  infinite both",
        "rotate-emoji": "rotate-emoji 0.8s ease  infinite both",
        "scale-in-center": "scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "text-focus-in": "text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
        "text-focus-in-with-delay": "text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) 1s  both",
        "focus-in-expand-fwd": "focus-in-expand-fwd 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
 
      },

      fontFamily: {
        'f': ['DM Sans', 'serif']
        ,
      },
      keyframes: {
        "scale-in-center": {
          "0%": {
              transform: "scale(0)",
              opacity: "1"
          },
          to: {
              transform: "scale(1)",
              opacity: "1"
          }
      },
        "text-focus-in": {
          "0%": {
              filter: "blur(12px)",
              opacity: "0"
          },
          to: {
              filter: "blur(0)",
              opacity: "1"
          }
      },
        "focus-in-expand-fwd": {
            "0%": {
                "letter-spacing": "-.5em",
                transform: "translateZ(-800px)",
                filter: "blur(12px)",
                opacity: "0"
            },
            to: {
                transform: "translateZ(0)",
                filter: "blur(0)",
                opacity: "1"
            }
        }
    },

    keyframes: {
      "fade-in": {
        "0%": {
            opacity: "0"
        },
        to: {
            opacity: "1"
        }
    },

      "puff-in-center": {
        "0%": {
            transform: "scale(2)",
            filter: "blur(2px)",
            opacity: "0"
        },
        to: {
            transform: "scale(1)",
            filter: "blur(0)",
            opacity: "1"
        }
    },


      "fade-in-bottom": {
        "0%": {
            transform: "translateY(50px)",
            opacity: "0"
        },
        to: {
            transform: "translateY(0)",
            opacity: "1"
        }
    },

      "nothing": {
        "0%": {
            opacity: "100%"
        },
        to: {
          opacity: "100%"
        }
      },


      "highlight": {

        "0%": {
          
          transform: "scaleX(1)"
        },
        to: {
          transform: "scaleX(0)"
        }


      },

      "scale-in-left": {
        "0%": {
            transform: "scale(0)",
            "transform-origin": "0% 50%",
            opacity: "1"
        },
        to: {
            transform: "scale(1)",
            "transform-origin": "0% 50%",
            opacity: "1"
        }
    },



      "rotate-emoji": {
        "0%": {
          transform: "rotate(0deg)"
        },
        "100%": {
          transform: "rotate(360deg)"
        }
    },
    "pulsate-fwd": {
      "0%,to": {
          transform: "scale(0.8)"
      },
      "50%": {
          transform: "scale(1.2)"
      }
  },

      "vibrate-1": {
        "0%,to": {
            transform: "translate(0)"
        },
        "20%": {
            transform: "translate(-2px, 2px)"
        },
        "40%": {
            transform: "translate(-2px, -2px)"
        },
        "60%": {
            transform: "translate(2px, 2px)"
        },
        "80%": {
            transform: "translate(2px, -2px)"
        }
    },



      heartbeat: {
        "0%": {
            transform: "scale(1.3)",
            "transform-origin": "center center",
            "animation-timing-function": "ease-out"
        },
        "10%": {
            transform: "scale(.96)",
            "animation-timing-function": "ease-in"
        },
        "17%": {
            transform: "scale(1.1)",
            "animation-timing-function": "ease-out"
        },
        "33%": {
            transform: "scale(.9)",
            "animation-timing-function": "ease-in"
        },
        "45%": {
            transform: "scale(1.3)",
            "animation-timing-function": "ease-out"
        }
    },




      "text": {
        "0%": {
          "letter-spacing": "-.5em",
          filter: "blur(12px)",
          opacity: "0",
          "position": "absolute",
      },
      "5%": {
        "letter-spacing": "0em",
        filter: "blur(0)",
        opacity: "1",
        display:"inline",
        "position": "absolute",
    },
    
    "25%": {
      "letter-spacing": "0em",
      filter: "blur(0)",
      opacity: "1",
        display:"inline",
        "position": "absolute",
        
    },
    "37%": {
      "letter-spacing": "-.5em",
    filter: "blur(12px)",
    opacity: "0",
    "position": "absolute",
    },
      "100%": {
        "letter-spacing": "-.5em",
    filter: "blur(12px)",
    opacity: "0",
    "position": "absolute",
      }
    },
    




    "emoji": {
      "0%": {
      
        opacity: "0",
        "position": "absolute",
        "visible": "none"
      },
      "1%": {
      
        opacity: "0",
        "position": "static",
      },
    "5%": {
      opacity: "1",
      "position": "static",
  },
  
  "25%": {
    opacity: "1",
      "position": "static",
      
  },
  "30%": {
    
    opacity: "0",
    "position": "static",
    
  },
  "37%": {
    
    opacity: "0",
    "position": "absolute",
    "visible": "none"
  },
    "100%": {
      
      opacity: "0",
      "position": "absolute",
      "visible": "none"
    }
  },





    "second": {
      "0%": {
        "letter-spacing": "-.5em",
        filter: "blur(12px)",
        opacity: "0",
        "position": "absolute",
    },
    
  "28%": {
    "letter-spacing": "-.5em",
    filter: "blur(12px)",
    opacity: "0",
    "position": "absolute",
  },
  "33%": {
    "letter-spacing": "0em",
    filter: "blur(0)",
    opacity: "1",
    "position": "static",
  },
  "51%": {
    "letter-spacing": "0em",
    filter: "blur(0)",
    opacity: "1",
    "position": "static",
  },
  "61%": {
    "letter-spacing": "-.5em",
    filter: "blur(12px)",
    opacity: "0",
    "position": "absolute",
  },
    "100%": {
      "letter-spacing": "-.5em",
      filter: "blur(12px)",
      opacity: "0",
      "position": "absolute",
    }
  },

  "third": {
    "0%": {
      "letter-spacing": "-.5em",
      filter: "blur(12px)",
      opacity: "0",
      "position": "absolute",
  },
  
"56%": {
  "letter-spacing": "-.5em",
  filter: "blur(12px)",
  opacity: "0",
  "position": "absolute",
},
"61%": {
  "letter-spacing": "0em",
  filter: "blur(0)",
  opacity: "1",
  "position": "static",
},
"79%": {
  "letter-spacing": "0em",
  filter: "blur(0)",
  opacity: "1",
  "position": "static",
},
"100%": {
  "letter-spacing": "-.5em",
  filter: "blur(12px)",
  opacity: "0",
  "position": "absolute",
},
},
    



      "slide-in-blurred-left": {
        "0%": {
            transform: "translateX(-1000px) scaleX(2.5) scaleY(.2)",
            "transform-origin": "100% 50%",
            filter: "blur(40px)",
            opacity: "0"
        },
        to: {
            transform: "translateX(0) scaleY(1) scaleX(1)",
            "transform-origin": "50% 50%",
            filter: "blur(0)",
            opacity: "1"
        }
    },
      pulse: {
        "0%, 100%": { opacity: 1 },
        "50%": { opacity: 0.4 },
      },
      a: {
        "0%, 100%": { opacity: 1 },
        "50%": { opacity: 0.4 },
      }
    },


    },
  },
  plugins: [require("@tailwindcss/forms")],
}
