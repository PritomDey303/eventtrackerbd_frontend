import React from "react";
import Events from "./Events/Events";
import HomeBanner from "./HomeBanner/HomeBanner";

const HomePage = () => {
  return (
    <div>
      <HomeBanner />
      <Events />
    </div>
  );
};

export default React.memo(HomePage);
