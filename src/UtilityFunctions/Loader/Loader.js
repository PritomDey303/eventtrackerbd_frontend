import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

const Loader = (active, children) => {
  return (
    <LoadingOverlay active={active} spinner={<BounceLoader />}>
      {children}
    </LoadingOverlay>
  );
};

export default Loader;
