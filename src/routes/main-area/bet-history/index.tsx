import { nextFetch } from "@/libs/nextFetch";
import { Loader } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";

export function BetHistory() {
  const [loading, setLoading] = useState(false);
  const data = useCallback(() => {}, []);

  return <div>{loading ? <Loader color="blue" /> : "data loaded"}</div>;
}
