export type SocialLink = {
  label: string;
  href: string;
};

export const site = {
  name: "Kharl Rovin Ocampo",
  shortName: "Kharl Rovin",
  role: "Full-stack Developer",
  email: "rovinocampoo@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/rovinocampoo/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rovinocampo/" },
  ] as SocialLink[],
};
