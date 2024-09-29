import Head from "next/head";
import { useRouter } from "next/router";

const normalizeParam = (queryStringParam: string | string[] | undefined) => {
  let claimId;
  if (typeof queryStringParam == "object") {
    claimId = queryStringParam[0];
  } else {
    claimId = queryStringParam;
  }
  return claimId;
};

const InstaDetailsPage = () => {
  const router = useRouter();
  const userId = normalizeParam(router.query.userId);
  const isNew = normalizeParam(router.query.isNew);
  //   const {
  //     claim,
  //     mutate: mutateClaim,
  //     isError,
  //     isLoading,
  //   } = useGetClaim(claimId ?? null);

  //   if (isLoading) {
  //     return <LoadingTruck />;
  //   }

  //   if (isError) {
  //     return <ErrorPage title={isError.name} description={isError.message} />;
  //   }

  return (
    <>
      <Head>
        <title>Claim {userId} Details!</title>
      </Head>
    </>
  );
};

export default InstaDetailsPage;
