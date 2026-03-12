import {
  SiAdobe,
  SiCodewars,
  SiFacebook,
  SiFiverr,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiStackoverflow,
  SiTwitch,
  SiUpwork,
} from "react-icons/si";
import {useAnimate} from "framer-motion";

export const Links = () => {
  return (
    <div className="bg-[#1d2939] px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <ClipPathLinks />
      </div>
    </div>
  );
};

const ClipPathLinks = () => {
  return (
    <div className="divide-y divide-white border-[3px] border-neutral-50">
      <div className="grid grid-cols-2 divide-x divide-white">
        <LinkBox Icon={SiGithub} href="https://github.com/sigma700" />
        <LinkBox
          Icon={SiInstagram}
          href="https://www.instagram.com/dr_s.i.g.m.a"
        />
      </div>
      <div className="grid grid-cols-4 divide-x divide-white">
        <LinkBox Icon={SiStackoverflow} href="#" />
        <LinkBox
          Icon={SiCodewars}
          href="https://www.codewars.com/users/dr_sigma"
        />
        <LinkBox Icon={SiTwitch} href="#" />
        <LinkBox
          Icon={SiFacebook}
          href="https://www.facebook.com/allen.karimi.16/"
        />
      </div>
      <div className="grid grid-cols-3 divide-x divide-white">
        <LinkBox
          Icon={SiUpwork}
          href="https://www.upwork.com/freelancers/~019dd6743ba2128093?viewMode=1"
        />
        <LinkBox
          Icon={SiFiverr}
          href="https://www.fiverr.com/users/allan_muriithi/portfolio"
        />
        <LinkBox
          Icon={SiLinkedin}
          href="https://www.linkedin.com/in/allan-kirimi-31ba92323/"
        />
      </div>
    </div>
  );
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox = ({Icon, href}) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e) => {
    const box = e.target.getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left",
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right",
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top",
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom",
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    });
  };

  const handleMouseLeave = (e) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    });
  };

  return (
    <a
      target="blank"
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36 lg:h-44 xl:h-52"
    >
      <Icon className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl" />

      <div
        ref={scope}
        style={{
          clipPath: BOTTOM_RIGHT_CLIP,
        }}
        className="absolute inset-0 grid place-content-center bg-green-400 text-black"
      >
        <Icon className="text-xl sm:text-3xl md:text-4xl xl:text-5xl" />
      </div>
    </a>
  );
};
