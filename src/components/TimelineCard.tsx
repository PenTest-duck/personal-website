"use client";

import Image from "next/image";

interface TimelineCardProps {
  date: string;
  age: number;
  description: string;
  imageUrl?: string;
}

const TimelineCard = ({
  date,
  age,
  description,
  imageUrl,
}: TimelineCardProps) => {
  return (
    <div className="h-64 w-full mb-32">
      <div className="sticky top-1/2 w-1/2 pr-24">
        <p className="text-5xl font-bold text-right">{date}</p>
        <p className="text-right">{age}yo</p>
      </div>
      <div className="absolute left-1/2 mx-24 h-64">
        <p>{description}</p>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={date}
            width={250}
            height={250}
            placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWnpaaXiDhOAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII="
            className="my-8 mx-auto rounded-lg rotate-6 object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default TimelineCard;
