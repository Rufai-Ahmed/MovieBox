import React, { useEffect, useRef, useState } from "react";
import { getData } from "../../APIs/API";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import autoAnimate from "@formkit/auto-animate";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const Movies = () => {
  const [state, setState]: any = useState([]);
  const arr: [] = [];

  const genres = useSelector((state: any) => state.genres);

  const [animationParent] = useAutoAnimate();
  const Document: any = document;

  useEffect(() => {
    getData().then((res) => {
      console.log(res);

      if (!Document.startViewTransition) {
        setState(genres === false ? res : genres);
      } else {
        Document.startViewTransition(() => {
          setState(genres === false ? res : genres);
        });
      }
    });
  }, [genres]);

  return (
    <div ref={animationParent}>
      <div className="grid grid-cols-4 w-full p-5 gap-5  ">
        {state &&
          state.map((el: any) => (
            <Link to={`${el?.id}/detail`}>
              <div className="items-center flex flex-col">
                <img
                  className="w-full h-[400px] object-contain  "
                  src={`https://image.tmdb.org/t/p/w500/${el?.poster_path}`}
                  alt=""
                />
                <div className="rounded-lg font-bold mt-2 text-[20px] ">
                  {el?.title}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
