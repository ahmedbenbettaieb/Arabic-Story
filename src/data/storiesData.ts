export interface StoryMeta {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  cover: string;
  route: string;
  unlocked: boolean;
}

export const stories: StoryMeta[] = [
  {
    id: "pigeon",
    title: "الحمامة والغراب",
    subtitle: "رحلة بين القناعة والجشع",
    emoji: "🐦",
    cover: "/images/img-1.jpeg",
    route: "/story/pigeon",
    unlocked: true,
  },
  {
    id: "ant",
    title: "ملكة النمل ونبي الله سليمان",
    subtitle: "حكمة وإيمان",
    emoji: "🐜",
    cover: "/images/ant-cover.jpeg",
    route: "/story/ant",
    unlocked: false,
  },
  {
    id: "star",
    title: "لينا والنجمة",
    subtitle: "حلم يلمع في السماء",
    emoji: "⭐",
    cover: "/images/star-cover.jpeg",
    route: "/story/star",
    unlocked: false,
  },
  {
    id: "bee",
    title: "الطفل والنحلة",
    subtitle: "تعلّم من الطبيعة",
    emoji: "🐝",
    cover: "/images/bee-cover.jpeg",
    route: "/story/bee",
    unlocked: false,
  },
  {
    id: "friendship",
    title: "الصداقة",
    subtitle: "أجمل هدية في الحياة",
    emoji: "🤝",
    cover: "/images/friendship-cover.jpeg",
    route: "/story/friendship",
    unlocked: false,
  },
];
