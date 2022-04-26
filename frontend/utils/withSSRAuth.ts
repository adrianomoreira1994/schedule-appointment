import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { destroyCookie, parseCookies } from "nookies";

export function withSSRAuth<T>(fn: GetServerSideProps<T>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(ctx);

    console.log(cookies);

    if (!cookies["@Finpec:token"]) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    try {
      return await fn(ctx);
    } catch (error) {
      destroyCookie(ctx, "@Finpec:token");
      destroyCookie(ctx, "@Finpec:user");

      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  };
}
