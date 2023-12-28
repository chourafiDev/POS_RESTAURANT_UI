import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = ({ type }: { type: string }) => {
  return (
    <>
      {type === "menu" ? (
        <div className="grid grid-cols-5 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i}>
              <Skeleton height="100px" count={1} />
              <Skeleton count={3} />
            </div>
          ))}
        </div>
      ) : type === "category" ? (
        <div className="grid grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex gap-2 w-full h-full border border-gray-light rounded-xl px-3 py-1"
            >
              <div>
                <Skeleton width={55} height={55} />
              </div>
              <div>
                <Skeleton count={3} width={150} height={10} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-6">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="flex gap-2 w-full h-full border border-gray-light rounded-xl px-3 py-1"
            >
              <Skeleton count={1} width={150} height={70} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Loading;
