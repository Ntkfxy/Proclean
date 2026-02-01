import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  image?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  title = "การ์ดบริการ",
  image,
  className = "",
}) => {
  return (
    <div
      className={`
        card 
        bg-base-100 
        shadow-xl 
        border 
        border-base-200 
        overflow-hidden 
        rounded-2xl
        transition-all
        duration-300
        hover:shadow-2xl
        ${className}
      `}
    >
      {image && (
        <figure className="relative w-full overflow-hidden group">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="
              w-full
              object-cover
              h-48
              sm:h-64
              md:h-80
              lg:h-[28rem]
              transition-transform
              duration-500
              ease-in-out
              group-hover:scale-110
            "
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Title on image (desktop only) */}
          <div className="absolute bottom-4 left-4 hidden md:block">
            <span className="bg-base-100/90 text-base-content px-4 py-2 rounded-xl text-sm font-bold shadow">
              {title}
            </span>
          </div>
        </figure>
      )}

      <div className="card-body p-4 sm:p-6 md:p-8">
        {!image && title && (
          <h2 className="card-title text-xl sm:text-2xl md:text-3xl font-bold mb-2">
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>
  );
};

export default Card;
