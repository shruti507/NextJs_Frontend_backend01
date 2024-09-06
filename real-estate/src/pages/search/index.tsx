import DummyProperty from "@/components/dummy-property";
import { useRouter } from "next/router";

const SeachPage = function () {
  const router = useRouter();
  const { query } = router;

  // Deserialize the data from query parameters
  const properties = query.data ? JSON.parse(query.data as string) : [];

  return (
    <>
      {/* <h1>This is search component</h1> */}
      <DummyProperty properties={properties} />
    </>
  );
};

export default SeachPage;
