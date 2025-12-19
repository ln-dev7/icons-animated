'use client';

import type { Icon } from '@/actions/get-icons';
import { useRef } from 'react';

import { Card, CardActions, CardTitle } from '@/components/card';
import { getIconListByLibrary } from '@/helpers/get-icon-list';
import { useIconLibrary } from '@/providers/icon-library';

type Props = {
  icons?: Icon[];
};

const IconItem = ({
  icon,
  iconList,
}: {
  icon: Icon;
  iconList: ReturnType<typeof getIconListByLibrary>;
}) => {
  const animationRef = useRef<{
    startAnimation: () => void;
    stopAnimation: () => void;
  }>(null);

  const foundIcon = iconList.find(({ name }) => name === icon.name);
  if (!foundIcon) return null;

  const IconComponent = foundIcon.icon;

  return (
    <Card
      key={icon.name}
      animationRef={animationRef}
      onMouseEnter={() => animationRef.current?.startAnimation()}
      onMouseLeave={() => animationRef.current?.stopAnimation()}
    >
      <IconComponent
        ref={animationRef}
        className="flex items-center justify-center [&>svg]:size-10 [&>svg]:text-neutral-800 dark:[&>svg]:text-neutral-100"
      />
      <CardTitle>{icon.name}</CardTitle>
      <CardActions {...icon} />
    </Card>
  );
};

const IconsList = ({ icons: propIcons }: Props) => {
  const { library } = useIconLibrary();
  const iconList = getIconListByLibrary(library);

  const icons =
    propIcons ||
    iconList.map(({ name, keywords }) => ({
      name,
      keywords,
    }));

  return (
    <div className="z-60 mt-[40px] mb-20 w-full">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[3px]">
        {icons.map((icon) => {
          return <IconItem key={icon.name} icon={icon} iconList={iconList} />;
        })}
      </div>
    </div>
  );
};

export { IconsList };
