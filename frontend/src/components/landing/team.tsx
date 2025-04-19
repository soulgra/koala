import GithubIcon from "@/components/icons/github";
import LinkedInIcon from "@/components/icons/linkedin";
import XIcon from "@/components/icons/x";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
interface TeamProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  positions: string[];
  socialNetworks: SocialNetworkProps[];
}
interface SocialNetworkProps {
  name: string;
  url: string;
}
export const Team = () => {
  const teamList: TeamProps[] = [
    {
      imageUrl: "/assets/images/harsimranjit-dhaliwal.jpg",
      firstName: "Hein",
      lastName: "NHeinDev",
      positions: ["Software Engineer"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/",
        },
        {
          name: "Github",
          url: "https://github.com/",
        },
        {
          name: "X",
          url: "https://x.com/harsimran_d",
        },
      ],
    },
  ];
  const socialIcon = (socialName: string) => {
    switch (socialName) {
      case "LinkedIn":
        return <LinkedInIcon />;
      case "Github":
        return <GithubIcon />;
      case "X":
        return <XIcon />;
    }
  };

  return (
    <section
      id="team"
      className="container mx-auto px-4 py-24 sm:py-32 md:px-0"
    >
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-center text-lg tracking-wider text-primary">
          Team
        </h2>
      </div>

      <div className="flex justify-center">
        {teamList.map(
          (
            { imageUrl, firstName, lastName, positions, socialNetworks },
            index,
          ) => (
            <Card
              key={index}
              className="group/hoverimg flex h-full flex-col overflow-hidden bg-muted/60 dark:bg-card max-w-xs"
            >
              <CardHeader className="gap-0 p-0">
                <div className="h-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt=""
                    width={300}
                    height={300}
                    className="aspect-square size-full w-full object-cover saturate-0 transition-all duration-200 ease-linear group-hover/hoverimg:scale-[1.01] group-hover/hoverimg:saturate-100"
                  />
                </div>
                <CardTitle className="px-6 py-6 pb-4">
                  {firstName}{" "}
                  {lastName && <span className="text-primary">{lastName}</span>}
                </CardTitle>
              </CardHeader>
              {positions.map((position, index) => (
                <CardContent
                  key={index}
                  className={`pb-0 text-muted-foreground ${index === positions.length - 1 && "pb-6"
                    }`}
                >
                  {position}
                  {index < positions.length - 1 && <span>,</span>}
                </CardContent>
              ))}

              <CardFooter className="mt-auto space-x-4">
                {socialNetworks.map(({ name, url }, index) => (
                  <Link
                    key={index}
                    href={url}
                    target="_blank"
                    className="transition-all hover:opacity-80"
                  >
                    {socialIcon(name)}
                  </Link>
                ))}
              </CardFooter>
            </Card>
          ),
        )}
      </div>
    </section>
  );
};
