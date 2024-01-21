import { User, Users } from "lucide-react";

export const LOBBY_ITEMS = [
  {
    id: "singleplayer",
    title: "Singleplayer",
    Icon: User,
    iconProps: {
      class: "h-5 w-5",
    },
    children: [
      {
        href: "/lobby/new-game",
        title: "New Game",
      },
      {
        href: "/lobby/resume",
        title: "Resume Previous Game",
      },
    ],
  },
  {
    id: "multiplayer",
    title: "Multilayer",
    Icon: Users,
    iconProps: {
      class: "h-5 w-5",
    },
    children: [
      {
        href: "/lobby/rooms",
        title: "Find Room",
      },
      {
        href: "/lobby/new-room",
        title: "Create New Room",
      },
    ],
  },
];

export const NAV_ITEMS = [
  {
    title: "Lobby",
    href: "/lobby",
    subItems: LOBBY_ITEMS,
  },
  {
    title: "Leaderboard",
    href: "/leaderboard",
  },
];
