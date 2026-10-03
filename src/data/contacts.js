export const REPLIES = [
  "Haha, okay!",
  "Sounds good 👍",
  "Tell me more",
  "I'll get back to you on that",
  "Sure, let's do it",
  "😂😂",
  "Got it, thanks!",
  "Can we talk later?",
];

export const initialChats = [
  { id: 1, name: "Aisha", color: "#e91e63", unread: 2, messages: [
    { id: 1, text: "Hey! Are we still on for lunch?", from: "them", time: "10:12 AM" },
    { id: 2, text: "Also, I found a great new place nearby", from: "them", time: "10:13 AM" },
  ] },
  { id: 2, name: "Rahul", color: "#3f51b5", unread: 0, messages: [
    { id: 1, text: "Did you see the match last night?", from: "them", time: "9:01 PM" },
    { id: 2, text: "Yes! What a finish 🔥", from: "me", time: "9:03 PM" },
  ] },
  { id: 3, name: "Family 🏠", color: "#ff9800", unread: 5, messages: [
    { id: 1, text: "Dinner at 8 tonight, don't be late", from: "them", time: "4:45 PM" },
  ] },
  { id: 4, name: "Priya", color: "#009688", unread: 0, messages: [
    { id: 1, text: "Thanks for the notes!", from: "them", time: "Yesterday" },
    { id: 2, text: "Anytime 🙂", from: "me", time: "Yesterday" },
  ] },
  { id: 5, name: "Dev Team", color: "#795548", unread: 0, messages: [
    { id: 1, text: "Build is green ✅", from: "them", time: "Mon" },
  ] },
];
